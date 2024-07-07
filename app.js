// const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// const BASE_URL="https://v6.exchangerate-api.com/v6/407d5337bd3d68d2ed2128f7/latest";

const dropdowns= document.querySelectorAll(".dropdown select");
const Btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const exRateText = document.querySelector(".msg");
const exIcon = document.querySelector("#reverse");


for(let select of dropdowns){
    for (currCode in countryList){
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            if(select.name === "from" && currCode === "USD"){
                newOption.selected="selected";
            }else if(select.name === "to" && currCode === "INR"){
                newOption.selected="selected";
            };
            select.append(newOption);
        };
        select.addEventListener("change",(evt) => {
            updateFlag(evt.target);
        });
};


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


async function getExchangeRate(){
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    exRateText.innerText="Getting exchange rate...";
    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/407d5337bd3d68d2ed2128f7/latest/${fromCurr.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCurr.value];
        const totalExRate = (amtVal * exchangeRate).toFixed(2);
        exRateText.innerText = `${amtVal} ${fromCurr.value} = ${totalExRate} ${toCurr.value}`
    }catch(error){
        exRateText.innerText = "Something went wrong...";
    }
};


// Event listner for button and exchange icon click 
window.addEventListener("load",getExchangeRate);
Btn.addEventListener("click",(e)=>{
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener("click",()=>{
    [fromCurr.value, toCurr.value] = [toCurr.value, fromCurr.value];
    [fromCurr, toCurr].forEach((select)=>{
        const currCode = select.value;
        const countryCode = countryList[currCode];
        const newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
        const img = select.parentElement.querySelector("img");
        img.src = newSrc;
    });
    getExchangeRate();
})
