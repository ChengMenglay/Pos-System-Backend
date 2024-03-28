const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
const port = process.env.DB_PORT;
app.listen(port, (error) => {
  if (!error) {
    console.log("http://localhost:" + port);
  } else {
    console.log("Error occurred , server can't start ", error);
  }
});

const user = require("./Router/user.route");
user(app);
const product = require("./Router/product.route");
product(app);
const category = require("./Router/category.route");
category(app);
const delivery = require("./Router/delivery.route");
delivery(app);
const payment_method = require("./Router/payment_method.route");
payment_method(app);
const address = require("./Router/address_route");
address(app);
const orderDetail = require("./Router/order_detail.route");
orderDetail(app);
const role = require("./Router/role.route");
role(app);
const invoice = require("./Router/invoice.route");
invoice(app);
