	const allCanv = document.querySelector(`canvas`);
	const ctx = allCanv.getContext(`2d`);

	allCanv.width = 500;
	allCanv.height = 250;

	const cw = allCanv.width;
	const ch = allCanv.height;

	const ballSize = 10;

	let ballX = (cw / 2) - ballSize / 2;
	let ballY = (ch / 2) - ballSize / 2;

	const paletH = 75;
	const paletW = 15;

	const playerX = 15;
	const aiX = cw - (playerX + paletW / 2);

	const lineW = 4;
	const lineH = 5;

	let ballSpeedX = 0.5;
	let ballSpeedY = 0.5;

	let playerY = ch / 2 - (paletH / 2);
	let aiY = ch / 2 - (paletH / 2);



	let player = function () {
		ctx.fillStyle = `black`;
		ctx.fillRect(playerX, playerY, paletW, paletH);
	}
	let ai = function () {
		ctx.fillStyle = `black`;
		ctx.fillRect(aiX, aiY, paletW, paletH);
	}

	const ball = function () {
		ctx.fillStyle = `white`;
		ctx.fillRect(ballX, ballY, ballSize, ballSize);

		ballX += ballSpeedX;
		ballY += ballSpeedY;
		if (ballY <= 0 || ballY + ballSize / 2 >= ch) {
			ballSpeedY = -ballSpeedY;
			speedUp();
		}
		if (ballX <= 0 || ballX + ballSize / 2 >= cw) {
			ballSpeedX = -ballSpeedX;
			speedUp();
		}
	}



	function table() {
		ctx.fillStyle = `green`;
		ctx.fillRect(0, 0, cw, ch);
		//linie srodka
		for (let i = 0; i < ch; i += 10) {
			ctx.fillStyle = `grey`;
			ctx.fillRect(cw / 2 - lineW / 2, i, lineW, lineH)

		}
	}
	topCanvas = allCanv.offsetTop;

	function playerPosition(e) {
		playerY = e.clientY - topCanvas - paletH / 2;

		if (playerY >= ch - paletH) {
			playerY = ch - paletH;
		}
		if (playerY <= 0) {
			playerY = 0;
		}
	};

	/*---------------przyśpieszeniePiłki---------*/
	function speedUp() {
		if (ballSpeedX > 0 && ballSpeedX < 15) {
			ballSpeedX += 0.2;
		} else if (ballSpeedX < 0 && ballSpeedX > -15) {
			ballSpeedX -= 0.2
		}

		if (ballSpeedY > 0 && ballSpeedY < 15) {
			ballSpeedY += 0.1;
		} else if (ballSpeedY < 0 && ballSpeedY > -15) {
			ballSpeedY -= 0.1;
		} else {
			ballSpeedY = 10;
		}
		console.log(ballSpeedX + ", " + ballSpeedY);
	}

	//sterowanie bota
	function botPos() {
		let middlePalet = aiY + paletH / 2;
		let middleBall = ballY + ballSize / 2;

		if (ballX > cw / 2) {
			if (middlePalet - middleBall > paletH / 2) {
				aiY -= 20;

			} else if (middlePalet - middleBall > paletH / 4) {
				aiY -= 10;
			} else if (middlePalet - middleBall < -paletH / 2) {
				aiY += 20;
			} else if (middlePalet - middleBall < -paletH / 4) {
				aiY += 10;
			}
		}

		if (ballX <= cw / 2 && ballX > playerX) {
			if (middlePalet - middleBall > playerX) {
				aiY -= 6;
			}
			if (middlePalet - middleBall < -playerX) {
				aiY += 6;
			}
		}
		if (aiY <= 0) {
			aiY = 0;
		} else if (aiY + paletH >= ch) {
			aiY = ch - paletH;
		}
	}

	allCanv.addEventListener("mousemove", playerPosition)

	// odbicie pilki



	function odbicie() {
		const paletPozSzer = playerX + paletW;
		const paletPozWysDol = playerY + paletH;
		const trzeciak = (playerY + paletH) / 3;

		if (((paletPozSzer) >= ballX) &&
			(playerY <= (ballY + ballSize / 2)) &&
			((paletPozWysDol) >= ballY)) {
			ballSpeedX = -ballSpeedX;



			if (playerY <= (ballY - ballSize / 2)) {
				ballSpeedY = Math.abs(ballSpeedY) + 1 * Math.random(.5, 2.1);
			} else if (ballY > trzeciak && ballY < trzeciak * 2) {
				ballSpeedY = 0;
			} else if (ballY >= trzeciak * 2 && ballY <= trzeciak * 3) {
				if (Math.abs(ballSpeedY) != -1) {
					ballSpeedY = -Math.abs(ballSpeedY) + 1;
				}
			}
			speedUp();
		}

		OdbicieAi();
	}

	function OdbicieAi() {
		if (ballX + ballSize >= aiX &&
			ballY >= aiY &&
			ballY <= aiY + paletH) {
			ballSpeedX = -ballSpeedX;
			speedUp();

		}
	}

	function game() {
		table();
		player();
		botPos();
		ai();
		ball();
		odbicie();

	}
	setInterval(game, 1000 / 60);
