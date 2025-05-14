let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
/* let cid = [
  ['PENNY', 0.4],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
]; */
const cashValues = [
  0.01,
  0.05,
  0.10,
  0.25,
  1.00,
  5.00,
  10.00,
  20.00,
  100.00
];
let cash = 0;

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const change = document.getElementById("change");

function updateRegister() {
  change.innerHTML = ``;
  cid.forEach((element) => {
    change.innerHTML += `<p>${element[0]} ${element[1]}</p>`;
  });
};

updateRegister();

const magicTime = () => {
  let inputVal = Number(cashInput.value);
  if (inputVal < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (inputVal === price) {
    changeDue.textContent = `No change due - customer paid with exact cash`;
  } else {
    let userChange = Math.round((inputVal-price)*100) / 100;
    console.log(userChange)
    let cidCopy = JSON.parse(JSON.stringify(cid));
    let inDebt = true;
    changeDue.innerText = `Status: OPEN`;
    let temp = 0;
    for (let i=cidCopy.length-1; i>-1; i--) {
      while (cashValues[i] <= userChange && cidCopy[i][1] >= cashValues[i]) {
        //console.log(cidCopy[i][1] -= cashValues[i]);
        userChange -= cashValues[i];
        userChange = Math.round(userChange*100) / 100;

        cidCopy[i][1] -= cashValues[i];
        cidCopy[i][1] = Math.round(cidCopy[i][1]*100) / 100;
        if (cidCopy[i][1] < 0) {
          inDebt = true;
          break;
        }
        inDebt = false;
      }
      cidCopy[i][1] = Math.round(cidCopy[i][1]*100) / 100;
      if (cidCopy[i][1] != cid[i][1]) {
        temp = Math.round(Number(eval(`${cid[i][1]} - ${cidCopy[i][1]}`)) * 100) / 100;
        changeDue.innerText += ` \n${cid[i][0]}: \$${temp}`
      }
      console.log(cidCopy[i][1], cashValues[i]);
      console.log(cid[i][1]);
    }
    console.log(inDebt);
    console.log(userChange);
    if (userChange > 0) { inDebt = true; };
    if (inDebt) { 
      changeDue.innerText = `Status: INSUFFICIENT_FUNDS`;
    } else {
      cid = JSON.parse(JSON.stringify(cidCopy));
      if (!cid.find((element) => element[1] > 0)) {
        let text = String(changeDue.innerText).replace("OPEN", "CLOSED");
        changeDue.innerText = `${text}`;
      }
      updateRegister();
    }
  }
};

purchaseBtn.addEventListener("click", magicTime);