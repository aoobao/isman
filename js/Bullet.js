(function(window) {

	window.game = window.game || {}

	function Bullet(x, y) {
		this.mx = x;
		this.my = y;
		this.speed = Math.getRandomNumber(config.bulletMinSpeed,config.bulletMaxSpeed);
		this.initialize();
	}

	var p = Bullet.prototype = new createjs.Sprite();

	p.Sprite_initialize = p.initialize;

	p.nextX = null;
	p.nextY = null;

	p.shouldDie = false;

	p.initialize = function() {
		this.Sprite_initialize(spritesheet, "bullet");
		var rnd_position = Utils.GetRandPosition(screen_width, screen_height, config.screen_distance);
		this.x = rnd_position.x;
		this.y = rnd_position.y;

		this.angle = Utils.getAngle(this.x, this.y, this.mx, this.my);

		var excangle = Math.random() * config.exc_angle - Math.random() * config.exc_angle;
		
		this.angle = this.angle + excangle;

		this.paused = true;

	}

	p.getNext = function(dis) {
		var x = dis * Math.cos(this.angle * Math.PI / 180);
		var y = dis * Math.sin(this.angle * Math.PI / 180);
		this.nextX = this.x + x;
		this.nextY = this.y + y;

	}

	p.reset = function() {
		this.shouldDie = false;
	}

	window.game.Bullet = Bullet;

}(window));