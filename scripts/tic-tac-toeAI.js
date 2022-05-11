//TO ZMIENIAM NA FUNKCYJNY
const winningVariants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = "X";
let selectedPosition = 0;

const cellClick = (e) => {
    playerTurn(e.target);
}

const restartGame = () => {
    initGame();
}
    
document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", cellClick));
    
document.getElementById("restart-game").addEventListener("click", restartGame)
    

    
function initGame() {
    currentPlayer = "X";
    
    document.querySelectorAll(".cell").forEach(
    el => el.innerHTML = "" )
}
    
        const playerTurn = (el) => {
            if (el.innerHTML == 'X' || el.innerHTML == 'O') return;
            el.innerHTML = currentPlayer;
    
            currentPlayer = currentPlayer == "X" ? "O" : "X";
    
            selectedPosition++;
            checkWinner();
        }
    
        const checkWinner = () => {
            for(let i = 0; i < winningVariants.length; i++){
                const variant = winningVariants[i];
                const a = getCellValue(variant[0]);
                const b = getCellValue(variant[1]);
                const c = getCellValue(variant[2]);
    
                if (a == '' || b == '' || c == '') continue;
    
                if (a == b && b == c){
                    setWinner(a);
                    restartGame();
                    selectedPosition = 0;
                }
            }
            
            if (selectedPosition === 9) alert("REMIS, wybierz Reset gry")
    
        }
    
        const setWinner = (str) => {
            alert(`Koniec gry! Zwycięzca to ${str}`);
        }
    

    
        const getCellValue = (index) => {
            return document.querySelector(`.cell[data-index="${index}"]`).innerHTML;
        }

    
    