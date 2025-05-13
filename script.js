let price = 1.87;
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
let cash = 0;

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const change = document.getElementById("change");

cid.forEach((element) => {
  change.innerHTML += `<p>${element[0]} ${element[1]}</p>`;
});

const magicTime = () => {
  const inputVal = Number(cashInput.value);
  if (inputVal < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (inputVal === price) {
    changeDue.textContent = `No change due - customer paid with exact cash`;
  } else {
    for (let i=cid.length; i>0; i--) {
      
    }
  }
};

purchaseBtn.addEventListener("click", magicTime);