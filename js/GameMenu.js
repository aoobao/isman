(function(window) {
	window.game = window.game || {}

	function GameMenu() {
		this.initialize();
	}

	var p = GameMenu.prototype = new createjs.Container();
	p.playBtn;
	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();
		this.addTitle();
		this.addButton();
		this.setControls();
		var name = user_key;
		if(name) this.addName('你好，' + name);
	}

	p.setControls = function() {
		document.onkeyup = this.handleKeyUp.bind(this);
	}

	p.handleKeyUp = function(e) {
		e = !e ? window.event : e;
		switch(e.keyCode) {
			case game.ARROW_KEY.SPACE:
				break;
			case game.ARROW_KEY.ENTER:
				this.playGame(this);
				break;
			default:
				break;
		}
	}

	p.addTitle = function() {
		var titleYPos = 100;
		var title = new createjs.Text("是男人就坚持20秒", "bold 70px YouYuan", "#ff7700");
		//var title = new createjs.Sprite(spritesheet, 'title');
		title.regX = title.getBounds().width / 2;
		title.x = screen_width / 2;
		title.y = titleYPos;
		title.alpha = 0;
		createjs.Tween.get(title).to({
				alpha: 1
			}, 1000) //TODO
			.call(this.bringTitle, null, this);
		this.addChild(title);

	}

	p.addName = function(strName) {
		var name = new createjs.Text(strName, '24px YouYuan', '#fff');
		name.regX = name.getBounds().width / 2;
		name.regY = name.getBounds().height / 2;
		name.x = screen_width / 2;
		name.y = 50;
		name.alpha = 0;
		createjs.Tween.get(name).to({
			alpha: 1
		}, 2000);

		this.addChild(name);

	}

	p.addRankList = function() {
		var self = this;
		self.rankList = new game.RankList("游戏排行榜", 20, 200);
		Utils.getRankList(10, function(data) {
			var arr = data.map(function(item, index) {
				item.key = "第" + (index + 1) + '名:' + item.key;
				item.score = '时长:' + item.score / 1000;
				item.createTime = '记录时间:' + item.createTime;
				return item;
			});
			self.rankList.setList(arr);
		});

		//个人排行榜.
		self.myRankList = new game.RankList("个人排行榜", 480, 200);
		Utils.getMyRankList(user_key, 10, function(data) {
			var arr = data.map(function(item, index) {
				item.key = 'No.' + (index + 1);
				item.score = '时长:' + item.score / 1000;
				item.createTime = '记录时间:' + item.createTime;
				return item;
			});
			self.myRankList.setList(arr);
		});

		self.addChild(self.rankList, self.myRankList);

	}

	p.addButton = function() {
		this.playBtn = new ui.SimpleButton('开始游戏');
		this.playBtn.on('click', this.playGame, this);
		this.playBtn.regX = this.playBtn.width / 2;
		this.playBtn.x = canvas.width / 2;
		this.playBtn.y = 400;
		this.playBtn.alpha = 0;
		this.playBtn.setButton({
			upColor: '#d2354c',
			color: '#FFF',
			borderColor: '#FFF',
			overColor: '#900'
		});
		this.addChild(this.playBtn);
	}
	p.bringTitle = function(e) {
		createjs.Tween.get(this.playBtn).to({
			alpha: 1
		}, 500);
		this.addRankList();

	}
	p.playGame = function(e) {
		createjs.Sound.play(game.assets.EXPLOSION);
		this.dispatchEvent(game.GAME_STATE_EVENTS.GAME);
	}

	p.dispose = function() {

	}

	window.game.GameMenu = GameMenu;

}(window));