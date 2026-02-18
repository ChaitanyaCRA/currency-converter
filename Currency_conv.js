const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");    //dropdowns = [ select1 , select2 ]
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".message")

// loop for accessing the country code and currency code available in the file 'coddes.js'
// for loop will not work here cause the data we wre trying to access is in the form of the object. not int eh array.
// we accessed the dropdowns up.

for (let select of dropdowns){     // <- loop through each dropdown one by one. first loop through first select then second select.
    for (currencyCode in countryList){     // 

        let newOption = document.createElement("option");    // we created the new option which is going to store the countryList data in each option.
        newOption.innerText = currencyCode;                   
        newOption.value = currencyCode;              // it will assign the value ofcountrylist data to each new option. 
        

        if(select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        }else if(select.name === "to" && currencyCode === "SVC"){
            newOption.selected = "selected";
        }
        
        select.append(newOption);
    };

    // The below code is to use when we chane the select means the country name
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target)
    });
};

// Upadate the flag as per the country code changes
const updateFlag = (element) =>{
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();     // it will stop all the default activity when the was clicked.
    let amount = document.querySelector(".amount input");       // accessed the input element.
    let amtVal = amount.value;                   
    console.log(amtVal);

    if(amtVal === "" || amtVal < 1){
        amtVal = 1;                  // this condition is for input amount is 0 or empty then make it 1.
        amount.value = "1";
    }

    
    //  Fetch logic starts here.
    const URL = `${BASE_URL}/${fromCurr.value}`;   // this is to make request of exchange rate.

    let response = await fetch(URL);
    let data = await response.json();

    if (data.result !== "success") {
        alert("API failed");
        return;
    }

    let rate = data.rates[toCurr.value];
    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});