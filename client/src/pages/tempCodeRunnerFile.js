const fetch = require('node-fetch'); 

async function postData(url = "", data = {}) {
    // Default options are marked with *
    console.log("data", data, url);
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData("https://letspaywallet.in/api/v1/upi/upiQrGenerateAuth", { 
        transaction_id: "123456789",
        name: "tanishq",
        email: "",
        mobile: "8445933567",
        amount: 100,
   }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });