
let dolarAmericano;
let euroCoin;
let bitcoin;



let button = document.querySelector("#btn");
let select = document.querySelector("#select");
let cotacao = document.querySelector("#cotacao-hoje");

let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL";

function inputValue() {
    let input = document.querySelector("#input").value;
    let valorReal = document.querySelector("#valor-real");
    let valorCurrency = document.querySelector("#valor-currency");

    valorReal.innerHTML = new Intl.NumberFormat("pt-BR",
    {style: "currency", currency: "BRL"}).format(input);

    if(select.value === "$ Dólar americano") {
        valorCurrency.innerHTML = new Intl.NumberFormat("en-US",
        {style: "currency", currency: "USD"}).format(input / dolarAmericano);
        cotacao.innerText = `1 USD = R$ ${dolarAmericano}`;
    } 
    
    if (select.value === "€ Euro") {
        valorCurrency.innerHTML = new Intl.NumberFormat("de-DE",
        {style: "currency", currency: "EUR"}).format(input / euroCoin);
        cotacao.innerText = `1 Eur = R$ ${euroCoin}`;
    }

    if (select.value === "฿ Bitcoin") {
        valorCurrency.innerHTML = parseFloat(input / bitcoin).toFixed(8);
        cotacao.innerText = `1 BTC = ${new Intl.NumberFormat("pt-BR",
        {style: "currency", currency: "BRL"}).format(bitcoin)}`;
    }
}

function checkInput() {
    let inputField = document.getElementById('input');
    let errorMessage = document.getElementById('error-message');
    
    if (inputField.value.trim() === '') {
        errorMessage.style.display = 'inline';
    } else {
        errorMessage.style.display = 'none';
    }
}


async function cotacaoMoedas() {
   await fetch(url)
    .then(response => response.json())
    .then(dolar => {
        dolarAmericano = Number(dolar.USDBRL.bid).toFixed(2);
    });

    await fetch(url)
    .then(response => response.json())
    .then(euro => {
        euroCoin = Number(euro.EURBRL.bid).toFixed(2);
    });

    await fetch(url)
    .then(response => response.json())
    .then(btc => {
        bitcoin = Number(btc.BTCBRL.bid);
    })
}

cotacaoMoedas();


function changeCurrency() {
    let nameCurrency = document.querySelector("#name-currency");
    let imageCurrency = document.querySelector("#image-currency");

   if(select.value === "€ Euro") {
    nameCurrency.innerHTML = "Euro";
    imageCurrency.src = "./images/euro.png"
   }
   
   if(select.value === "$ Dólar americano") {
    nameCurrency.innerHTML = "Dólar Americano";
    imageCurrency.src = "./images/dolar.png";
   }

   if(select.value === "฿ Bitcoin") {
    nameCurrency.innerHTML = "Bitcoin";
    imageCurrency.src = "./images/bitcoin.png";
   }

   inputValue()

}

document.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        button.click();
    }
})

button.addEventListener("click", inputValue);
select.addEventListener("change",changeCurrency)