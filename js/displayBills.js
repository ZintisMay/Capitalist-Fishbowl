import { gameOver } from './PLAYER.js';
const BILL_DIV = document.getElementById('bills');
// const BILL_COOLDOWN = 5;
const BILL_COOLDOWN = 60;

export function displayBills(BILLS, GAME_STATS) {
  const buttons = [];

  if (GAME_STATS.timer % BILL_COOLDOWN === 0) {
    // remove balance from bills
    for (let key in BILLS) {
      const bill = BILLS[key];
      bill.balance -= bill.cost;
      bill.checkBill();
      // if (bill.balance < 0) {
      //   gameOver(bill.gameOverMessage);
      // }
    }
  }

  for (let key in BILLS) {
    const bill = BILLS[key];
    console.log(bill.name, bill.balance);

    const button = renderBillButton(bill, GAME_STATS);
    buttons.push(button);
  }
  BILL_DIV.innerHTML = '';
  BILL_DIV.append(...buttons);
}

function renderBillButton(bill, GAME_STATS) {
  const b = document.createElement('button');
  const isDue = bill.balance === 0;

  let message = isDue ? 'is due' : 'is paid';

  b.style.backgroundColor = isDue ? 'orange' : 'yellow';
  b.style.padding = '5px';
  b.style.minWidth = '200px';
  b.innerHTML = `${bill.name} ${message} ($${bill.cost})`;

  b.style.border = '2px solid black';
  // b.style.backgroundColor = 'yellow';

  b.addEventListener('click', (e) => {
    console.log('bill', bill);
    if (GAME_STATS.money >= bill.cost) {
      bill.payBill();
      GAME_STATS.money -= bill.cost;
    }
  });

  return b;
}
