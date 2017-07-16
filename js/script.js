(function(){
    'use strict';

    function QueenGame(quantity){
        const queenQuantity = quantity;
        const boardSize = Math.pow(quantity, 2);

        this.getQueenQuantity = function() {
            return queenQuantity;
        };

        this.getBoardSize = function() {
            return boardSize;
        };
    }

    QueenGame.prototype.startGame = function() {

        this.drawBoard();
    };

    QueenGame.prototype.drawBoard = function() {
        var boardLength = this.getQueenQuantity()*40; // one grid length in px
        document.getElementById('gameboard').setAttribute("style", "width:"+boardLength+"px; height:"+boardLength+"px;");
        document.getElementById('gameboard').innerHTML = this.iterateLines();
    };

    QueenGame.prototype.iterateLines = function() {
        var html  = '';

        for(var i = 0; i < this.getQueenQuantity(); i++){
            var mode = '';
            if(i % 2 === 0) {
                mode = 'even'
            } else {
                mode = 'odd';
            }
            html += this.iterateGrids(i, mode);
        }
        return html;
    };

    QueenGame.prototype.iterateGrids = function(i, mode) {
        var html = "";
        for(var j = 0; j < this.getQueenQuantity(); j++){
            var colorClass = "";
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
            html += '<span class="grid '+colorClass+'"></span>';
        }
        return html;
    };

    var game = new QueenGame(8);
    game.startGame();
})();