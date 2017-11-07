(function() {
	window.game = window.game || {};
	var config = {
		FPS: 60, //每秒帧数
		backgroundImage: 'img/bg.png',
		startGameText: '开始游戏',
		screen_distance: 30,
		speed: 150,
		bulletCount: 150,
		bulletMinSpeed: 50,
		bulletMaxSpeed: 150,
		exc_angle: 15, //偏移角度(子弹会在偏移范围内瞄准飞机过来,0就是100%瞄准)
		webApi: 'http://111.231.1.136:8090/',
		imageApi: 'http://111.231.1.136:8090/image/'
//		webApi:'http://211.149.195.123:8090/',
//		imageApi:'http://211.149.195.123:8090/image'
//		webApi:'http://192.168.1.99:8091/',
//		imageApi:'http://192.168.1.99:8091/image'
		
	}

	var GAME_STATES = {
		MAIN_MENU: 0,
		RUN_SCENE: 1,
		GAME: 10,
		GAME_OVER: 20,
		SUBMIT_SCORE: 30
	}

	var GAME_STATE_EVENTS = {
		MAIN_MENU: 'main menu event',
		GAME_OVER: 'game over event',
		MAIN_MENU_SELECT: 'game menu select event',
		GAME: 'game event',
		SUBMIT_SCORE: 'submit score'
	}

	var ARROW_KEY = {
		SPACE: 32,
		ENTER: 13,
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39
	}
	
	
	window.game.GAME_WIDTH = 2000;
	window.game.GAME_HEIGHT = 2000;
	
	window.game.ARROW_KEY = ARROW_KEY;
	window.game.GAME_STATES = GAME_STATES;
	window.game.GAME_STATE_EVENTS = GAME_STATE_EVENTS;
	window.config = config;

})();

