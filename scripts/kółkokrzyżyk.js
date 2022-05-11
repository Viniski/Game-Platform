window.onload = function(){
app.init();
}

class App {
    winningVariants = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    currentPlayer = "X";
    selectedPosition = 0;

    init(){
        document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", this.cellClick)
        );

        document.getElementById("restart-game").addEventListener("click", this.restartGame)
        
    }

    cellClick = (e) => {
        this.playerTurn(e.target);
    }

    initGame() {
        this.currentPlayer = "X";

        document.querySelectorAll(".cell").forEach(
            el => el.innerHTML = "" )
    }

    playerTurn(el){
        if (el.innerHTML == 'X' || el.innerHTML == 'O') return;
        el.innerHTML = this.currentPlayer;

        this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";

        this.selectedPosition++;
        this.checkWinner();
    }

    checkWinner(){
        for(let i = 0; i < this.winningVariants.length; i++){
            const variant = this.winningVariants[i];
            const a = this.getCellValue(variant[0]);
            const b = this.getCellValue(variant[1]);
            const c = this.getCellValue(variant[2]);

            if (a == '' || b == '' || c == '') continue;

            if (a == b && b == c){
                this.setWinner(a);
                this.restartGame();
                this.selectedPosition = 0;
            }
        }
        
        if (this.selectedPosition === 9) alert("REMIS, wybierz Reset gry")

    }

    setWinner(str){
        alert(`Koniec gry! Zwycięzca to ${str}`);
    }

    restartGame = () => {
        this.initGame();
    }

    getCellValue(index){
        return document.querySelector(`.cell[data-index="${index}"]`).innerHTML;
    }
}

const app = new App();

