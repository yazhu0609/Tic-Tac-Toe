// 遊戲狀態
const board = Array(9).fill(null); //建立長度為9的陣列,初始值為null
let currentPlayer = "O"; //記錄目前玩家,初始值O先開始
let isGameOver = false; 

const statusEl = document.getElementById("status"); //定義顯示文字
const cells = document.querySelectorAll(".cell"); //定義格子
const restartBtn = document.getElementById("restartBtn"); //定義重新鈕

// 事件定義
cells.forEach(cell => cell.addEventListener("click", handleClick));//呼叫handleClick
restartBtn.addEventListener("click", resetGame);//呼叫resetGame

// 主要流程
function handleClick(e) {
  const idx = e.target.dataset.index; //搜尋被點擊的格子
  if (board[idx] || isGameOver) return; //如果格子已經下過或遊戲結束,則中斷

  board[idx] = currentPlayer; //更新資料
  e.target.textContent = currentPlayer; //更新畫面

  if (checkWinner()) {
    statusEl.textContent = `玩家 ${currentPlayer} 獲勝！`; //textContent=取得元素內的文字
    isGameOver = true;
    return;
  }
  //判斷平手
  if (board.every(cell => cell)) {
    statusEl.textContent = "平手！";
    isGameOver = true;
    return;
  }

  // 換手
  currentPlayer = currentPlayer === "X" ? "O" : "X";//條件Ｘ為真,則O會被執行,反之
  statusEl.textContent = `輪到玩家 ${currentPlayer}`;
}

function checkWinner() {
  var lines = [
    [0,1,2],[3,4,5],[6,7,8], // 三條橫線
    [0,3,6],[1,4,7],[2,5,8], // 三條直線
    [0,4,8],[2,4,6]          // 兩條斜線
  ];
  //逐條檢查
  for ( var i = 0; i < lines.length; i++) {
    var a = lines[i][0];
    var b = lines[i][1];
    var c = lines[i][2];
    //三格都同個符號
    if (board[a] != null &&
        board[a] == board[b] &&
        board[a] == board[c]) {
            return true;
    }
  }
  return false;
}

function resetGame() {
  board.fill(null);//清空資料
  cells.forEach(cell => (cell.textContent = ""));//清空畫面
  currentPlayer = "O";//恢復O先開始
  isGameOver = false;//重置遊戲
  statusEl.textContent = "輪到玩家 O";
}