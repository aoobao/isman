(function() {
	var getRandomNumber = function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};

	var getCoin = function(num) { //抛硬币,正反面
		if(num == undefined) num = 0.5;
		return Math.random() < num;
	}

	var getQueryString = function(str, name) {
		if(name == undefined) {
			name = str;
			str = window.location.href;
		}
		var arr = new Array();
		arr = str.split("?");
		if(arr.length == 1) return null;
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = arr[1].match(reg);
		if(r != null) return decodeURIComponent(r[2]);
		return null;
	};

	function GetRandPosition(maxX, maxY, distance) {
		var tempX, tempY;
		if(getCoin()) { //X轴范围外面
			tempX = -getRandomNumber(1, distance);
			if(getCoin()) tempX = screen_width - tempX;
			tempY = getRandomNumber(-distance, maxY + distance);
		} else { //Y轴在范围外面
			tempY = -getRandomNumber(1, distance);
			if(getCoin()) tempY = screen_height - tempY;
			tempX = getRandomNumber(-distance, maxX + distance);
		}
		return {
			x: tempX,
			y: tempY
		}

	}

	function getAngle(px, py, mx, my) {
		var x = Math.abs(px - mx);
		var y = Math.abs(py - my);
		var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		if(z == 0) return 0;
		var cos = y / z;
		var radina = Math.acos(cos); //用反三角函数求弧度

		var angle = 180 * radina / Math.PI; //将弧度转换成角度
		//因为算出来的值是[0,90),需要转成[0,360)
		if(mx >= px) {
			if(my >= py) {
				angle = 90 - angle;
			} else {
				angle = 270 + angle;
			}
		} else {
			if(my >= py) {
				angle = 90 + angle;
			} else {
				angle = 270 - angle;
			}
		}
		return angle;

	}

	function getRankList(limit, callback) {
		limit = limit || 10;
		var url = config.webApi + 'api/ranklist/GetRankList?limit=' + limit;
		console.log(url);
		var _data = [];
		$.ajax({
			type: "get",
			url: url,
			async: true,
			success: function(data) {
				if(data.success == 0) {
					_data = data.data;
				}
			},
			error: function(data) {
				console.log(x);
			},
			complete: function() {
				if(typeof callback == 'function') callback(_data);
			}
		});
	}

	function getMyRankList(key, limit, callback) {
		var param = $.param({
			key: key,
			limit: limit
		})
		var url = config.webApi + 'api/ranklist/GetMyRankList?' + param;
		console.log(url);
		var _data = [];
		$.ajax({
			type: "get",
			url: url,
			async: true,
			success: function(data) {
				if(data.success == 0) {
					_data = data.data;
				}
			},
			error: function(data) {
				console.log(x);
			},
			complete: function() {
				if(typeof callback == 'function') callback(_data);
			}
		});
	}

	Math.getRandomNumber = getRandomNumber;
	var Utils = {
		getQueryString: getQueryString,
		GetRandPosition: GetRandPosition,
		getCoin: getCoin,
		getAngle: getAngle,
		getRankList: getRankList, //排行榜.
		getMyRankList: getMyRankList
	}

	window.Utils = Utils;
})();