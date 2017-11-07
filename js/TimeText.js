(function() {
	window.ui = window.ui || {};

	var TimeText = function(label) {
		this.label = label;
		this.initialize();
	}

	var p = TimeText.prototype = new createjs.Container();

	p.label;
	p.width;
	p.height;
	p.fontSize = 24;
	p.color = 'red';

	p.Container_initialize = p.initialize;

	p.initialize = function() {
		this.Container_initialize();
		this.drawText();
	}

	p.drawText = function() {
		var title = this.labelTxt = new createjs.Text(this.label, this.fontSize + 'px YouYuan', this.color);
//		title.regX = title.getBounds().width;
		this._updateWidth();
		title.y = 0;
		this.addChild(title);
	}
	
	p.setText = function(label){
		this.label = this.labelTxt.text = label;
		this._updateWidth();
//		this.labelTxt.regX = 
	}
	
	p._updateWidth = function(){
		this.labelTxt.x = screen_width - this.labelTxt.getBounds().width - 10;
	}
	
	window.ui.TimeText = TimeText;
})();