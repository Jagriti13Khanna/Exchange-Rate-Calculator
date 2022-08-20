const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');

const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rates and update the DOM
function calculate() {
    const currencyOneInput = currencyOne.value;
    const currencyTwoInput = currencyTwo.value;

    //console.log(currencyOneInput, currencyTwoInput);

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneInput}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data);

        const rate = data.rates[currencyTwoInput];
        //console.log(rate);

        rateEl.innerText = `1 ${currencyOneInput} = ${rate} ${currencyTwoInput}`;
        amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
}

//Event listeners
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);

currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    
    calculate();
});


calculate();