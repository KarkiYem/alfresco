const billdeskjs = require("./gen_message");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")({ origin: true });
const app = express();
const port = 8000; 

const MID = "BCRUISEPL";
const SEC_ID = "bcruisepl";
const CHECKSUM_KEY = "W0U5fRqcJe2GLEEqpYsm41CSiKLN73DJ";
const RETURN_URL = 'https://www.alfrescogrand.com/getlinkresponse'; 

const client = new billdeskjs(MID, SEC_ID, CHECKSUM_KEY, RETURN_URL);

app.use(bodyParser.json());
app.use(cors);

app.post('/getlink', (request, res) => {
    const amount = request.body.amount;
    const id = request.body.id;
    const phone = request.body.phone;
    const order_id = request.body.order_id;

    const msg = client.get_message(id, amount, phone , order_id);
    const linkk = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment" + "?msg=" + msg;
    res.send(linkk);
});
app.post('/getlinkresponse', (req, res) => {
    const msg = req.body.msg;
    const parts = msg.split("|");
    const arpValue = parts[1];
    const codeValue = parts[14];

    if (codeValue == "0300") {
        const htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Completed</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <div class="alert alert-success text-center">
                    <h4>Payment Completed</h4>
                    <p>You have successfully completed the Payment.</p>
                </div>
            </div>
      
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
        </body>
        </html>`;
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(htmlContent);
    } else {
        const htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Payment Failed</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <div class="alert alert-danger text-center">
                    <h4>Payment Failed</h4>
                    <p>Your payment was not successful. Please try again later.</p>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
        </body>
        </html>`;
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(htmlContent);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


