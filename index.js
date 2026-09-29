const BASE_URL = "https://api.frankfurter.dev/v2/rate";
/*
for (code in countryList) {
  console.log(code, countryList[code])
}
*/

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.textContent = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  //console.log(select)
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}



const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }


//  console.log(fromCurr.value, toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
  let response = await fetch(URL);
  //console.log(response)
  let data = await response.json();
  //console.log(data);
  let rate = data.rate;
  //console.log(rate)
  let finalAmount = amtVal * rate;
  msg.textContent = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};



const updateFlag = (element) => {
  // element ---> select hai
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png `;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});


window.addEventListener("load", (e) => {
  updateExchangeRate()
})