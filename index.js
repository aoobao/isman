(function() {
	window.game = window.game || {};

	function Main(container) {
		this.initialize(container);
	}

	var p = Main.prototype;

	p.preloader;

	p.currentGameStateFunction;
	p.currentScene;

	p.initialize = function(container) {
		canvas = document.getElementById(container);
		stage = new createjs.Stage(canvas);
		screen_width = canvas.width;
		screen_height = canvas.height;

		createjs.Touch.enable(stage);

		this.addBackgroundImage();
		stage.enableMouseOver();
		game.assets = new game.AssetManager();
		this.preloadAssets();

	}

	p.addBackgroundImage = function() {
		var img = new ui.BackgroundImage('img/bg.png');
		stage.addChild(img);
	}

	p.preloadAssets = function() {
		this.preloader = new ui.Preloader('#d2354c', '#FFF');
		this.preloader.x = (canvas.width / 2) - (this.preloader.width / 2);
		this.preloader.y = (canvas.height / 2) - (this.preloader.height / 2);
		stage.addChild(this.preloader);
		game.assets.on(game.assets.ASSETS_PROGRESS, this.onAssetsProgress, this);
		game.assets.on(game.assets.ASSETS_COMPLETE, this.assetsReady, this);
		game.assets.preloadAssets();
	}

	p.onAssetsProgress = function() {
		this.preloader.update(game.assets.loadProgress);
		stage.update();
	}

	p.assetsReady = function() {
		stage.removeChild(this.preloader);
		stage.update();
		this.createSpriteSheet();
		this.gameReady();
	}

	p.createSpriteSheet = function() {
		var assets = game.assets;
		spritesheet = new createjs.SpriteSheet(assets.getAsset(assets.GAME_SPRITES_DATA));
	}

	p.gameReady = function() {
		createjs.Ticker.setFPS(config.FPS);
		createjs.Ticker.on("tick", this.onTick, this);
		this.changeState(game.GAME_STATES.MAIN_MENU);
	}

	p.changeState = function(state) {
		switch(state) {
			case game.GAME_STATES.MAIN_MENU:
				this.currentGameStateFunction = this.gameStateMainMenu;
				break;
			case game.GAME_STATES.GAME:
				this.currentGameStateFunction = this.gameStateGame;
				break;
			case game.GAME_STATES.RUN_SCENE:
				this.currentGameStateFunction = this.gameStateRunScene;
				break;
			case game.GAME_STATES.GAME_OVER:
				this.currentGameStateFunction = this.gameStateGameOver;
				break;
		}
	}

	p.onStateEvent = function(e, obj) {
		var time = e.target.useTime;
		this.useTime = time;
		this.base64_image = e.target.base64;
		this.changeState(obj.state);
	}

	p.disposeCurrentScene = function() {
		if(this.currentScene != null) {
			stage.removeChild(this.currentScene);
			if(this.currentScene.dispose) {
				// this.currentScene.dispose();
			}
			this.currentScene = null;
		}
	}

	p.gameStateMainMenu = function(tickEvent) {
		var scene = new game.GameMenu();
		scene.on(game.GAME_STATE_EVENTS.GAME, this.onStateEvent, this, true, {
			state: game.GAME_STATES.GAME
		});
		stage.addChild(scene); //添加新的Container到舞台
		this.disposeCurrentScene(); //移除旧的currentScene中的Container
		this.currentScene = scene; //设置新的Container为当前currentScene
		this.changeState(game.GAME_STATES.RUN_SCENE); //切换
	}

	p.gameStateRunScene = function(tickEvent) {
		if(this.currentScene.run) {
			this.currentScene.run(tickEvent);
		}
	}

	p.gameStateGame = function(tickEvent) {
		var scene = new game.Game();
		scene.on(game.GAME_STATE_EVENTS.GAME_OVER, this.onStateEvent, this, true, {
			state: game.GAME_STATES.GAME_OVER
		});
		stage.addChild(scene);
		this.disposeCurrentScene()
		this.currentScene = scene;
		this.changeState(game.GAME_STATES.RUN_SCENE);
	}

	p.gameStateGameOver = function(tickEvent) {
		var scene = new game.GameOver(this.useTime, this.base64_image);
		stage.addChild(scene);
		scene.on(game.GAME_STATE_EVENTS.MAIN_MENU, this.onStateEvent, this, true, {
			state: game.GAME_STATES.MAIN_MENU
		});
		scene.on(game.GAME_STATE_EVENTS.GAME, this.onStateEvent, this, true, {
			state: game.GAME_STATES.GAME
		});
		this.disposeCurrentScene();
		this.currentScene = scene;
		this.changeState(game.GAME_STATES.RUN_SCENE);
	}

	p.onTick = function(e) {
		if(this.currentGameStateFunction != null) {
			this.currentGameStateFunction(e);
		}
		stage.update();
	}

	window.game.Main = Main;
})();