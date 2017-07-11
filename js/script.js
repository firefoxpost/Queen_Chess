(function(){
    'use strict';

    function QueenGame(quantity){
        const queenQuantity = quantity;
        const boardSize = Math.pow(quantity, 2);

        var that = this;

        this.queenBoard = [];

        setQueenBoard();

        this.getQueenQuantity = function() {
            return queenQuantity;
        };

        this.getBoardSize = function() {
            return boardSize;
        };

        function setQueenBoard() {
            for (var i = 0; i < queenQuantity; i++){
                that.queenBoard[i] = [];
                for (var j = 0; j < queenQuantity; j++){
                    that.queenBoard[i][j] = 0;
                }
            }
        }
    }

    QueenGame.prototype.startGame = function() {
        this.setQueen(1);
        this.drawBoard();

    };

    QueenGame.prototype.drawBoard = function() {
        document.getElementById('gameboard').innerHTML = this.iterateLines();
    };

    QueenGame.prototype.iterateLines = function() {
        var html  = '';

        for(let i = 0; i < this.getQueenQuantity(); i++){
            let mode = '';
            if(i % 2 === 0) {
                mode = 'even'
            } else {
                mode = 'odd';
            }
            this.queenBoard[i] = [];
            html += this.iterateGrids(i, mode);
        }
        return html;
    };

    QueenGame.prototype.iterateGrids = function(i, mode) {
        var html = "";
        for(let j = 0; j < this.getQueenQuantity(); j++){
            this.queenBoard[j] = []; debugger;
            let colorClass = "", queenClass = this.queenBoard[i][j] ? "grid--queen" : "";
            if(mode === 'odd') {
                if(j % 2 === 0) {
                    colorClass = 'grid--black';
                } else {
                    colorClass = 'grid--white';
                }
            } else {
                if(j % 2 === 0) {
                    colorClass = 'grid--white';
                } else {
                    colorClass = 'grid--black';
                }
            }
            html += '<span class="grid '+colorClass+' '+queenClass+'"></span>';

        }
        return html;
    };

    QueenGame.prototype.setQueen = function(a) {
        if(a === this.getQueenQuantity()) {
            return;
        }

        for(let i = 0; i < this.getQueenQuantity(); i++) {
            // Здесь проверяем, что если поставим в this.queenBoard[a][i] ферзя (единицу),
            // то он будет единственным в этой строке, столбце и диагоналях.
            if(this.tryQueen(a, i)) {
                this.queenBoard[a][i] = 1;
                this.setQueen(a+1);
                this.queenBoard[a][i] = 0;
            }
        }
    };

    QueenGame.prototype.tryQueen = function(a, b) {
        for(let i = 0; i < a; i++) {
            if(this.queenBoard[i][b]) {
                return false;
            }
        }

        for(let i = 1; i <= a && b-i >= 0; i++) {
            if(this.queenBoard[a-i][b-i]) {
                return false;
            }
        }

        for(let i = 1; i <= a && b+i < this.getBoardSize(); i++) {
            if(this.queenBoard[a-i][b+i]) {
                return false;
            }
        }

        return true;
    };

    var game = new QueenGame(8);
    game.startGame();
})();