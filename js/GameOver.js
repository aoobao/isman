(function(window) {

	window.game = window.game || {}

	function GameOver(t, img) {
		this.baseimg = img;
		this.time = t;
		this.initialize(t);

	}

	var p = GameOver.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;

	p.initialize = function(t) {
		this.Container_initialize();
		createjs.Sound.stop();
		this.time = t;
		this.addMessage();
		this.addScore(t);
		this.addButton();
		this.setControls();
		
	}
	
	p.addMessage = function() {
		var msg = new createjs.Sprite(spritesheet, 'gameOver');
		msg.regX = msg.getBounds().width / 2;
		msg.regY = msg.getBounds().height / 2;
		msg.x = screen_width / 2;
		msg.y = 250;
		msg.scaleX = msg.scaleY = 0;
		createjs.Tween.get(msg).to({
			scaleX: 1,
			scaleY: 1,
			rotation: 360
		}, 500);
		this.addChild(msg);
	}
	p.addScore = function(t) {
		var scorePoint = {
			x: 220,
			y: 310
		};
		//var scoreTxt = new createjs.BitmapText(game.score, spritesheet);
		var str = "你坚持了" + t / 1000 + '秒';
		var scoreTxt = new createjs.Text(str, 'bold 40px YouYuan', '#ff7700');
		scoreTxt.x = screen_width / 2 - scoreTxt.getBounds().width / 2;
		scoreTxt.y = scorePoint.y;
		this.addChild(scoreTxt);
	}
	p.addButton = function() {
		var playBtn, menuBtn;
		var playBtnPoint = {
			x: 170,
			y: 380
		};
		var menuBtnPoint = {
			x: 340,
			y: 380
		};
		var submitPoint = {
			x: 510,
			y: 380
		};
		var me = this;
		playBtn = new ui.SimpleButton('再玩一次');
		playBtn.on('click', this.playAgain, this);
		playBtn.setButton({
			upColor: '#d2354c',
			color: '#FFF',
			borderColor: '#FFF',
			overColor: '#900'
		});
		playBtn.x = playBtnPoint.x;
		playBtn.y = playBtnPoint.y;
		this.addChild(playBtn);
		menuBtn = new ui.SimpleButton('返回主页');
		menuBtn.on('click', this.mainMenu, this);
		menuBtn.setButton({
			upColor: '#d2354c',
			color: '#FFF',
			borderColor: '#FFF',
			overColor: '#900'
		});
		menuBtn.x = menuBtnPoint.x;
		menuBtn.y = menuBtnPoint.y;
		this.addChild(menuBtn);
		this.submitBtn = new ui.SimpleButton("提交成绩");
		this.submitBtn.on("click", this.submitMenu, this);
		this.submitBtn.setButton({
			upColor: '#d2354c',
			color: '#FFF',
			borderColor: '#FFF',
			overColor: '#900'
		});
		this.submitBtn.x = submitPoint.x;
		this.submitBtn.y = submitPoint.y;
		this.addChild(this.submitBtn);

	}
	p.setControls = function() {
		document.onkeyup = this.handleKeyUp.bind(this);
	}
	
	p.handleKeyUp = function(e){
		e = !e ? window.event :e;
		switch (e.keyCode){
			case game.ARROW_KEY.SPACE:
			case game.ARROW_KEY.ENTER:
				this.playAgain(this);
				break;
			default:
				break;
		}
	}
	
	p.playAgain = function(e) {
		this.dispatchEvent(game.GAME_STATE_EVENTS.GAME);
	}
	p.mainMenu = function(e) {
		this.dispatchEvent(game.GAME_STATE_EVENTS.MAIN_MENU);
	}
	p.submitMenu = function(e) {
		var self = this;
		self.submitBtn.removeAllEventListeners();
		submitCallback({
			usetime: self.time,
			base64_image: self.baseimg
		}, function(opt) {
			if(opt.success == 200) {
				var text = new createjs.Text(opt.msg, 'bold 50px YouYuan', '#ff7700');
				text.rotation = 320;
				text.x = 50;
				text.y = 20;
				self.submitBtn.addChild(text);
				self.submitBtn.enableButtom();
			}else{
				//alert('提交服务器出错,错误原因:\n' + opt.msg );
				self.submitBtn.setButtonListeners();
				self.submitBtn.on("click", self.submitMenu, self);
			}
		});
	}

	window.game.GameOver = GameOver;

}(window));