(function(window) {
	window.game = window.game || {};

	function RankList(title, x, y) {
		this.titleText = title || '排行榜';
		this.width = 300;
		this.height = 350;
		this.randlist = [];
		this.initialize(x, y);
	}

	var textColor = '#ff7700';
	var START_Y = 40;
	var p = RankList.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;

	p.initialize = function(x, y) {
		this.Container_initialize();
		this.x = x;
		this.y = y;
		this.writeRect(x, y);
	}

	p.writeRect = function(x, y) {
		this.background = new createjs.Shape();
		this.background.graphics.beginStroke("red").rr(0, 0, this.width, this.height, 5);
		this.title = new createjs.Text(this.titleText, '20px YouYuan', textColor);
		this.title.regX = this.title.getBounds().width / 2;
		this.title.x = this.width / 2;
		this.title.y = 10;
		this.list = new createjs.Container();
		this.list.x = 0;
		this.list.y = this.height;
		this.addChild(this.background, this.title, this.list);
		//this.mask = new createjs.Shape();
		//this.mask.graphics.beginFill("#fff").drawRect(this.x, this.y, this.width, this.height);

		this.list.mask = new createjs.Shape();
		this.list.mask.graphics.beginFill("#fff").drawRect(0, START_Y, this.width - 5, this.height - START_Y - 10);

	}

	p.setList = function(data) {
		var self = this;
		this.list.removeAllChildren();
		var z = 0;
		if(data == null || data.length == 0) {
			var text = new createjs.Text('暂无成绩', '72px YouYuan', '#fff');
			text.rotation = 330;
			text.x = 10;
			text.y = -this.height / 3 ;
			this.list.addChild(text);
			return;
		}
		for(var i = 0; i < data.length; i++) {
			var item = data[i];
			var rankText = new RankText(item.key, item.score, item.createTime);
			rankText.y = z;
			this.list.addChild(rankText);
			var height = rankText.height;
			z += height + 5;
		}
		this.scrollHeight = z;

		if(this.setIndex) window.clearTimeout(this.setIndex);
		window.setTimeout(function() {
			self.moveList();
		}, 60);
	}

	p.moveList = function() {
		var self = this;
		self.list.y -= 1;
		if(-self.list.y > self.scrollHeight) {
			self.list.y = self.height;
		}
		self.setIndex = window.setTimeout(function() {
			self.moveList();
		}, 60);
	}

	function RankText(title, score, createTime) {
		this.width = 250;
		this.height = 0;
		this.initialize(title, score, createTime);

	}

	var pp = RankText.prototype = new createjs.Container();

	pp.Container_initialize = pp.initialize;

	pp.initialize = function(title, score, createTime) {
		this.Container_initialize();

		this.createText(title, 10);
		this.createText(score, 10);
		this.createText(createTime, 10);

	}

	pp.createText = function(text, x) {
		var title = new createjs.Text(text, '12px YouYuan', '#fff');
		title.x = x;
		title.y = this.height;
		//title.maxWidth = this.width;
		var h = title.getBounds().height;
		this.height += h + 5;
		this.addChild(title);
	}

	window.game.RankList = RankList;

})(window);