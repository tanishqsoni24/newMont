const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const axios = require('axios');
const FormData = require('form-data');

// Enable CORS
app.use(cors());

// Enable JSON use
app.use(express.json());

app.post("/recieve", async (req, res) => {
  let data = req.body;
  let formData = new FormData();
  formData.append("transaction_id", data.transaction_id);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("mobile", data.mobile);
  formData.append("amount", data.amount);
  console.log(data)
  // res.json(data)

  const response = await axios.post("https://letspaywallet.in/api/v1/upi/upiQrGenerateAuth",formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      "Token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZXBzX2tleSI6IjkyYzA1NzhjMDllOTZkNmMxNDJkZmI1MSIsImFlcHNfaXYiOiJjZWU5NDU3YTdlNjI0OTIzODQxNWY0YzUzY2Y5In0.MhqxLp9mUUhMIoatcTiJHMW3iu2IzLjgIXZH2ro-XFo"
    }
  }
    )
  console.log(response.data);
    res.send(response.data);
});

app.post("/withdraw", async (req, res) => {

  let data = req.body;
  let formData = new FormData();
  // #   transaction_id:aux9813953701837886
  //               #   account_holder_name:Tanishq Soni
  //               #   bank_name:Punjab National Bank
  //               #   account_number:0314000109273398
  //               #   ifsc_code:PUNB0031400
  //               #   mobile_number:8445933567
  //               #   email:abcsample@mail.com
  //               #   amount:140
  formData.append("transaction_id", data.transaction_id);
  formData.append("account_holder_name", data.account_holder_name);
  formData.append("bank_name", data.bank_name);
  formData.append("account_number", data.account_number);
  formData.append("ifsc_code", data.ifsc_code);
  formData.append("mobile_number", data.mobile_number);
  formData.append("email", data.email);
  formData.append("amount", data.amount);
  console.log(data)

  const response = await axios.post("https://letspaywallet.in/api/v1/upi/upiWithdrawal",formData,

  {
    headers: {

      "Content-Type": "multipart/form-data",
      "Token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZXBzX2tleSI6IjkyYzA1NzhjMDllOTZkNmMxNDJkZmI1MSIsImFlcHNfaXYiOiJjZWU5NDU3YTdlNjI0OTIzODQxNWY0YzUzY2Y5In0.MhqxLp9mUUhMIoatcTiJHMW3iu2IzLjgIXZH2ro-XFo"
    }
  })
  console.log(response.data);
  res.send(response.data);
}
);


app.post("/paymentAck", async (req, res) => {
  let data = req.body;
  let formData = new FormData();
  formData.append("transaction_id", data.transaction_id);
  console.log(data)

  const response = await axios.post("http://letspaywallet.in/api/v1/upi/upiTxnStatusCheck",formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      "Token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZXBzX2tleSI6IjkyYzA1NzhjMDllOTZkNmMxNDJkZmI1MSIsImFlcHNfaXYiOiJjZWU5NDU3YTdlNjI0OTIzODQxNWY0YzUzY2Y5In0.MhqxLp9mUUhMIoatcTiJHMW3iu2IzLjgIXZH2ro-XFo"
    }
  })

  console.log(response.data);
  res.send(response.data);
});

app.get("/generateTrxnId", (req, res)=>{
  let randomNumber = Math.floor(Math.random() * 10000000000000000);
  res.send({transaction_id: "aux"+randomNumber});
}) 


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
