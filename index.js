const billdeskjs = require("./gen_message");
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors);

app.post("/getlink", (request, res) => {
  try{
    var pay = null
    async function getDBPayload() {
      try {
        const payloadData = {
      
  
          mercid: "BCRUISEPL",
          orderid: request.body.order_id,
          amount: request.body.amount,
          order_date: getCurrentDateTime(),
          currency: "356",
          ru: "https://www.example.com/merchant/api/pgresponse",
          additional_info: {
            additional_info1: "",
            additional_info2: "",
          },
          itemcode: "DIRECT",
          /* invoice: {
            invoice_number: "",
            invoice_display_number: "",
            customer_name: "",
            invoice_date: "",
            gst_details: {
              cgst: "8.00",
              sgst: "8.00",
              igst: "0.00",
              gst: "16.00",
              cess: "0.00",
              gstincentive: "5.00",
              gstpct: "16.00",
              gstin: "12344567",
            },
          }, */
          device: {
            init_channel: "internet",
            ip: "143.244.130.152",
            user_agent:
              "Mozilla/5.0(WindowsNT10.0;WOW64;rv:51.0)Gecko/20100101Firefox/51.0",
            accept_header: "text/html",
            fingerprintid: "61b12c18b5d0cf901be34a23ca64bb19",
            browser_tz: "-330",
            browser_color_depth: "32",
            browser_java_enabled: "false",
            browser_screen_height: "601",
            browser_screen_width: "657",
  
            browser_language: "en-US",
            browser_javascript_enabled: "true",
          },
        };
        let payload = Object.assign(payloadData, "" || {});
        console.log("payload", payload);
  
        // Define JWT headers
        const jwtHeaders = {
          alg: "HS256",
          clientid: "bcruisepl",
        };
  
        // Define your secret key
        const secretKey = "W0U5fRqcJe2GLEEqpYsm41CSiKLN73DJ";
  
        const encodedPayload = jwt.sign(payload, secretKey, {
          algorithm: "HS256",
          header: jwtHeaders,
        });
  
        pay = encodedPayload;
  
        return encodedPayload;
      } catch (err) {
        throw new Error(err);
      }
    }
    function getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      const timezoneOffsetMinutes = now.getTimezoneOffset();
      const timezoneOffsetHours = Math.abs(
        Math.floor(timezoneOffsetMinutes / 60)
      );
      const timezoneOffsetSign = timezoneOffsetMinutes > 0 ? "-" : "+";
  
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneOffsetSign}${String(
        timezoneOffsetHours
      ).padStart(2, "0")}:${String(Math.abs(timezoneOffsetMinutes) % 60).padStart(
        2,
        "0"
      )}`;
    }
    getDBPayload();
    res.status(200).send(pay);
    console.log(res)
  }catch(err){
    res.status(201).send("failed");
  }

});






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
