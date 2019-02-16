/* global $ */

const player1 = 1;
const player2 = 2;
const gamePoint = ['0','15','30','40','Ad','_'];

//ゲームカウント用変数
let setMatch = 3;
let setCount = 1;
let server = 0;
let pointUser = 0;
let win = 0;
let point1 = 0;
let point2 = 0;
let game1 = [0,0,0,0,0];
let game2 = [0,0,0,0,0];
let tiebreak1 = [0,0,0,0,0];
let tiebreak2 = [0,0,0,0,0];
let set1 = 0;
let set2 = 0;
//スタッツカウント用変数
let fault = false;
let aces = [0,0];
let doubleFault = [0,0];
let service = [0,0];
let FirstServiceIn = [0,0];
let winOn1stServe = [0,0];
let winOn2ndServe = [0,0];
let netPlay = [0,0];
let netPointWon = [0,0];
let breakPoint = [0,0];
let breakPointWon = [0,0];
let receivePoint = [0,0];
let receivePointWon = [0,0];
let winner = [0,0];
let unfError = [0,0];
let totalPoint = [0,0];


function calcGame() {
	//タイブレークのとき -> 7ポイント先取
	//タイブレーク以外   -> 4ポイント先取
	if (game1[setCount - 1] === 6 && game2[setCount - 1] === 6) {
		//デュースのとき
		if (point1 >= 6 && point2 >= 6) {
			//２点先行 -> GAME
			if(point1 > point2 + 1) {
				countGame(player1);
			} else if (point2 > point1 + 1) {
				countGame(player2);
			}
		} else if (point1 === 7) {
			countGame(player1);
		} else if (point2 === 7) {
			countGame(player2);
		}

	} else {
		//デュースのとき
		if (point1 >= 3 && point2 >= 3) {
			//2点先行 -> GAME
			if (point1 > (point2 + 1)) {
				countGame(player1);
			} else if (point2 > (point1 + 1)) {
				countGame(player2);
			}
		} else if (point1 === 4) {
			countGame(player1);
		} else if (point2 === 4) {
			countGame(player2);
		}
	}
}

function countGame(player) {
	if (player === player1) {
		game1[setCount - 1] ++;
	} else {
		game2[setCount - 1] ++;
	}
	point1 = 0;
	point2 = 0;
	changeServer();
}

function changeServer() {
	if (server === player1) {
		server = player2;
		$(".server-info").find("span:first").addClass("unvisible");
		$(".server-info").find("span:last").removeClass("unvisible");
	} else {
		server = player1;
		$(".server-info").find("span:last").addClass("unvisible");
		$(".server-info").find("span:first").removeClass("unvisible");
	}
}

function calcSet() {
	calcGame();
	
	if (game1[setCount - 1] === 6 && game2[setCount - 1] <= 4) {
		countSet(player1);
		return;
	} else if (game2[setCount - 1] === 6 && game1[setCount - 1] <= 4) {
		countSet(player2);
		return;
	}
	if (game1[setCount - 1] === 7) {
		countSet(player1);
	} else if (game2[setCount - 1] === 7) {
		countSet(player2);
	}
}

function countSet(player) {
	if (player === player1) {
		set1 ++;
	} else {
		set2 ++;
	}
	setCount++;
	if (game1[setCount - 1] === 7 || game2[setCount - 1] === 7) {
		tiebreak1[setCount - 1] = game1[setCount - 1];
		tiebreak2[setCount - 1] = game2[setCount - 1];
	}
	game1[setCount - 1] = 0;
	game2[setCount - 1] = 0;
}

function calcMatch() {
	calcSet();
	if (set1 === setMatch) {
		win = player1;
		$(".winner-info span:first").removeClass("unvisible");
		setCount --;
	} else if (set2 === setMatch) {
		win = player2;
		$(".winner-info span:last").removeClass("unvisible");
		setCount --;
	}
}

function showScore() {
	//計算処理
	calcMatch();
	//スコア表示
	showPoint();
	showGame();
	//スタッツ表示
	showStas();
}

function showPoint() {
	if (game1[setCount - 1] === 6 && game2[setCount - 1] === 6) {
		$(".pts-1").text(point1);
		$(".pts-2").text(point2);
		return;
	}
	if (point1 <= 3) {
		$(".pts-1").text(gamePoint[point1]);
	}
	if (point2 <= 3) {
		$(".pts-2").text(gamePoint[point2]);
	}
	//DUECE
	if (point1 >= 3 && point2 >= 3) {
		if (point1 > point2) {
			$(".pts-1").text(gamePoint[4]); //"Ad"
			$(".pts-2").text(gamePoint[5]); //"  "
		} else if (point1 < point2) {
			$(".pts-2").text(gamePoint[4]); //"Ad"
			$(".pts-1").text(gamePoint[5]); //"  "
		} else {
			$(".pts-2").text(gamePoint[3]); //"40"
			$(".pts-1").text(gamePoint[3]); //"40"
		}
	}
}

function showGame() {
	if (setCount >= 1) {
		$(".set1").find(".score:first").text(game1[0]);
		$(".set1").find(".score:last").text(game2[0]);
		
		if (game1[0] === 7 || game2[0] === 7) {
		$(".set1").find(".tiebreak:first").text(tiebreak1[0]);
		$(".set1").find(".tiebreak:last").text(tiebreak2[0]);
		}
	}
	if (setCount >= 2) {
		$(".set2").find(".score").removeClass("unvisible");
		$(".set2").find(".score:first").text(game1[1]);
		$(".set2").find(".score:last").text(game2[1]);
	}
	if (setCount >= 3) {
		$(".set3").find(".score").removeClass("unvisible");
		$(".set3").find(".score:first").text(game1[2]);
		$(".set3").find(".score:last").text(game2[2]);
	}
	if (setCount >= 4) {
		$(".set4").find(".score").removeClass("unvisible");
		$(".set4").find(".score:first").text(game1[3]);
		$(".set4").find(".score:last").text(game2[3]);
	}
	if (setCount >= 5) {
		$(".set5").find(".score").removeClass("unvisible");
		$(".set5").find(".score:first").text(game1[5]);
		$(".set5").find(".score:last").text(game2[5]);
	}
}

function addStats(player,statsDetail,serviceDetail) {
	if (statsDetail == 1) {
		aces[player - 1] ++;
		winner[player - 1] ++;
		totalPoint[player - 1] ++;
	}
	if (statsDetail == 2) {
		netPointWon[player - 1] ++;
		winner[player - 1] ++;
		totalPoint[player - 1] ++;
	}
	if (statsDetail == 3) {
		winner[player - 1] ++;
		totalPoint[player - 1] ++;
	}
	
	if (statsDetail == 4) {
		unfError[player - 1] ++;
		totalPoint[3 - player - 1] ++;
	}
	
	if (statsDetail === "forcedError") {
		totalPoint[3 - player - 1] ++;
	}

	if (statsDetail === "doubleFault") {
		doubleFault[player - 1] ++;
		unfError[player - 1] ++;
		totalPoint[3 - player - 1] ++;
	}

	let pointPlayer = 0;
	if (statsDetail === "ace" || statsDetail === "netPoint" || statsDetail === "otherPoint") {
		pointPlayer = player;
	} else {
		pointPlayer = 3 - player;
	}
	addServiceStats(server,pointPlayer,statsDetail);

	/*checkFault(true);*/
}

function addServiceStats(server,pointPlayer,statsDetail) {
	if ((statsDetail === "doubleFault") || fault) {
		service[server - 1] += 2;
	} else {
		service[server - 1] ++;
	}

	if (server === pointPlayer) {
		if (fault) {
			winOn2ndServe[server - 1] ++;
		} else {
			winOn1stServe[server - 1] ++;
		}
	} else {
		receivePoint[3 - server - 1] ++;
	}
	
}

function showStas() {
	$(".aces1").text(aces[0]);
	$(".aces2").text(aces[1]);
	
	$(".doubleFault1").text(doubleFault[0]);
	$(".doubleFault2").text(doubleFault[1]);
	
	$(".firstServeIn1").text(createStas(FirstServiceIn[0],service[0]));
	$(".firstServeIn2").text(createStas(FirstServiceIn[1],service[1]));
	
	$(".winOn1stServe1").text(createStas(winOn1stServe[0],FirstServiceIn[0]));
	$(".winOn1stServe2").text(createStas(winOn1stServe[1],FirstServiceIn[1]));

	$(".winOn2ndServe1").text(createStas(winOn2ndServe[0],service[0] - FirstServiceIn[0]));
	$(".winOn2ndServe2").text(createStas(winOn2ndServe[1],service[1] - FirstServiceIn[1]));
	
	$(".netPointWon1").text(netPointWon[0]);
	$(".netPointWon2").text(netPointWon[1]);
	
	$(".breakPointWon1").text(breakPointWon[0]);
	$(".breakPointWon2").text(breakPointWon[1]);

	$(".receivePointWon1").text(receivePointWon[0]);
	$(".receivePointWon2").text(receivePointWon[1]);

	$(".winner1").text(winner[0]);
	$(".winner2").text(winner[1]);

	$(".unfError1").text(unfError[0]);
	$(".unfError2").text(unfError[1]);
	
	$(".totalPoint1").text(totalPoint[0]);
	$(".totalPoint2").text(totalPoint[1]);
}

function createStas(numer,denom) {
	return String(numer) + "/" + String(denom) + "(" + String(getPercent(numer,denom)) + "%)";
	
}

function getPercent(numer,denom) {
	if (denom === 0) {
		return 0;
	}
	
	let val = Math.floor(numer / denom * 100) / 100;
	return val / 100;
}

function addPoint(player) {
	if (player === player1) {
		point1 ++;
	} else {
		point2 ++;
	}
}
//初期設定
$(document).ready(function() {
	$(".player1-button").click(function(){
		console.log('player1');
		$("#point_point_user_id").val($("#point_user_id").val());
		pointUser = player1;
	});

	$(".player2-button").click(function(){
		console.log('player2');
		$("#point_point_user_id").val($("#point_user_id").val());
		pointUser = player2;
	});
	$('input[name="KindOptions"]:radio').change( function () {
		console.log('kind!');
		let kindValue = $(this).val();
		$("#point_kind_id").val(kindValue);
	});
	$('input[name="ServiceOptions"]:radio').change( function () {
		console.log('service!');
		let serviceValue = $(this).val();
		$("#point_service_id").val(serviceValue);
	});
	$(".point-submit").submit(function(){
		console.log('submit!');
		if (win != 0) {
			return false;
		}
		let kindValue = $("#point_kind_id").val();
		let serviceValue = $("#point_service_id").val();
		if (kindValue === '' || serviceValue === '') {
			return false;
		}

		addPoint(pointUser);
		addStats(pointUser,kindValue,serviceValue);
		showScore();
		$("#point_kind_id").val('');
		$("#point_service_id").val('');
	    return true;
	});
	//初回サーバー設定
	changeServer();
	showScore();
	console.log('ready');
});