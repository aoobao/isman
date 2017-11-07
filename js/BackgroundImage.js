(function(window) {
	window.ui = window.ui || {};

	var BackgroundImage = function(url) {
		this.image_url = url;
		this._initialize();
	}

	var p = BackgroundImage.prototype = new createjs.Container();

	p.Container_initialize = p.initialize;

	p._initialize = function() {
		var self = this;
		self.Container_initialize();
		self.imgDom = document.createElement("img");
		self.imgDom.src = self.image_url;
		self.imgDom.onload = function(){
			self._drawImage();
		}
	}

	p._drawImage = function() {
		var self = this;
		var map = new createjs.Bitmap(self.imgDom);
		var rect = map.getBounds(); //获得图片宽高
		var sw = screen_width / rect.width; //获取缩放比.
		var sh = screen_height / rect.width;
		map.scaleX = sw;
		map.scaleY = sw;

		this.addChild(map);

	}

	window.ui.BackgroundImage = BackgroundImage;

})(window);