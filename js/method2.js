$(document).ready(function () {
    var boardIds = [
        ["top-l", "top-m", "top-r"],
        ["mid-l", "mid-m", "mid-r"],
        ["bot-l", "bot-m", "bot-r"],
    ];

    var playableBoxes = [],
        classname = document.getElementsByClassName("box-content"),
        resetGame = document.getElementById("reset-game-btn"),
        clickBoard = document.getElementById("game-area"),
        scoreHolderX = document.getElementById("player-x"),
        scoreHolderO = document.getElementById("player-o"),
        playingLetter = "X",
        winner = false,
        moveCounter = 0;

    var scoreX = 0,
        scoreO = 0;

    scoreHolderX.innerText = scoreX;
    scoreHolderO.innerText = scoreO;

    var gameBoard = [
        ["~", "~", "~"],
        ["~", "~", "~"],
        ["~", "~", "~"]
    ];

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', clickEvents, false);
        playableBoxes.push(classname[i].id);
    }

    function clickEvents() {
        moveCounter++;
        modifyBox(this);
        trackGameMoves(this.id);
        checkWinStatus();

        // Switch active letter after move
        playingLetter = (playingLetter == "X") ? playingLetter = "O" : "X";
        if (moveCounter == 9) {
            noWinners();
        }
    };

    var noWinners = function noWinners() {
        if (winner == false) {
            for (var i = 0; i < classname.length; i++) {
                var element = document.getElementById(classname[i].id);
                element.style.backgroundColor = "#d9534f";
                element.style.color = "white";
            }
        };
        clearForNextGame();
    }

    var checkWinStatus = function checkWinStatus() {
        // Check rows and columns for winner
        for (var x in gameBoard) {
            if (!gameBoard[x][0].includes("~")) {
                if (checkMatch(gameBoard[x][0], gameBoard[x][1], gameBoard[x][2])) {
                    addColor(boardIds[x]);
                    gameOver(gameBoard[x][0]);
                }
            }
            if (![gameBoard[0][x], gameBoard[1][x], gameBoard[2][x]].includes("~")) {
                if (checkMatch(gameBoard[0][x], gameBoard[1][x], gameBoard[2][x])) {
                    addColor([boardIds[0][x], boardIds[1][x], boardIds[2][x]]);
                    gameOver(gameBoard[0][x]);
                }
            }
        };

        // Check diagnols for winner 
        if (![gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]].includes("~")) {
            if (checkMatch(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])) {
                addColor([boardIds[0][0], boardIds[1][1], boardIds[2][2]]);
                gameOver(gameBoard[0][0]);
            }
        }
        if (![gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]].includes("~")) {
            if (checkMatch(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])) {
                addColor([boardIds[0][2], boardIds[1][1], boardIds[2][0]]);
                gameOver(gameBoard[0][2]);
            }
        }
    };

    function gameOver(letter) {
        (letter == "O") ? scoreHolderO.innerText = ++scoreO: scoreHolderX.innerText = ++scoreX;
        clickBoard.style.pointerEvents = "none";
        winner = true;
        for (var i = 0; i < classname.length; i++) {
            var element = document.getElementById(classname[i].id);
            element.style.pointerEvents = "none";
        }
        clearForNextGame();
    }

    var clearForNextGame = function clearForNextGame() {
        var delayTime = window.setTimeout(delayClear, 2000);

        function delayClear() {
            for (var i = 0; i < classname.length; i++) {
                var element = document.getElementById(classname[i].id);
                element.innerText = "";
                element.style.backgroundColor = "white";
                element.style.color = "black";
                element.style.pointerEvents = "auto";
                playableBoxes.push(classname[i].id);
            }

            winner = false;
            moveCounter = 0;
            gameBoard = [
                ["~", "~", "~"],
                ["~", "~", "~"],
                ["~", "~", "~"]
            ];

            playableBoxes = [];
        }
    };

    function checkMatch(box1, box2, box3) {
        var matchStatus = (box1 == box2 && box1 == box3) ? true : false;
        return matchStatus;
    }

    function addColor(list) {
        for (var x in list) {
            var element = document.getElementById(list[x]);
            element.style.backgroundColor = "#5cb85c";
            clickBoard.style.color = "grey";
            element.style.color = "white";
        }
    };

    var modifyBox = function modifyBox(clickedBox) {
        clickedBox.innerText = playingLetter;
        clickedBox.classList.remove("hover-over");
        clickedBox.style.pointerEvents = "none";
        playableBoxes.splice(playableBoxes.indexOf(this.id), 1);
    }

    var trackGameMoves = function trackGameMoves(clickedId) {
        var column = "",
            row = "";
        for (var x in boardIds) {
            boardIds[x].includes(clickedId) ? column = x : "";
        }
        row = boardIds[column].indexOf(clickedId);
        gameBoard[column][row] = playingLetter;
    }

    resetGame.addEventListener("click", function () {
        location.reload();
    })
});