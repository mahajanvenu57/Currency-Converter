const api = "https://api.exchangerate-api.com/v4/latest/USD";

var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrecy = document.querySelector(".from");
var toCurrecy = document.querySelector(".to");
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");
var resultFrom;
var resultTo;
var searchValue;

fromCurrecy.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});

toCurrecy.addEventListener('change', (event) => {
    resultTo = event.target.value;
});

search.addEventListener('input', updateValue);

function updateValue(e) {
    searchValue = e.target.value;
}

convert.addEventListener("click", getResults);

function getResults() {
    finalValue.innerHTML = "Converting...";
    fetch(`${api}`)
        .then(currency => currency.json())
        .then(displayResults);
}

function displayResults(currency) {
    if (resultFrom && resultTo && searchValue) {
        let fromRate = currency.rates[resultFrom];
        let toRate = currency.rates[resultTo];
        finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
        finalAmount.style.display = "block";
    } else {
        finalValue.innerHTML = "Please select currencies and enter an amount.";
    }
}

function clearVal() {
    window.location.reload();
}
