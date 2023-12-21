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
    }}
    )
  console.log(response.data);
    res.send(response.data);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
