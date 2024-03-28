const db = require("../util/db");
const getByAddressId = async (req, res) => {
  try {
    const { address_id } = req.body;
    const data = await db.query(
      "SELECT order_detail.*,address.* FROM order_detail" +
        " INNER JOIN address ON order_detail.address_id=address.address_id" +
        " WHERE order_detail.address_id =?",
      [address_id]
    );
    if (data) {
      res.json({
        message: "Get data Success",
        data: data,
      });
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
const create = async (req, res) => {
  try {
    const {
      address_id,
      product_id,
      product_name,
      product_image,
      product_quantity,
      product_qty,
      product_price,
    } = req.body;
    const sqlOrderDetail =
      "INSERT INTO order_detail(address_id,product_id,product_name,product_image,product_quantity,product_qty,product_price,total) VALUES(?,?,?,?,?,?,?,?)";
    const paramOrderDetail = [
      address_id,
      product_id,
      product_name,
      product_image,
      product_quantity,
      product_qty,
      product_price,
      product_qty * product_price,
    ];
    const dataOrderDetail = await db.query(sqlOrderDetail, paramOrderDetail);
    if (dataOrderDetail) {
      const data = await db.query(
        "SELECT order_detail.*,address.* FROM order_detail" +
          " INNER JOIN address ON order_detail.address_id=address.address_id" +
          " WHERE order_detail.address_id =?",
        [address_id]
      );
      if (data) {
        res.json({
          message: "Get data Success",
          data: data,
        });
      }
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
const updateQty = async (req, res) => {
  try {
    const { order_detail_id, product_qty, product_price, address_id } =
      req.body;
    const result = await db.query(
      "UPDATE order_detail SET product_qty=?, total=? WHERE order_detail_id=?",
      [product_qty, product_price * product_qty, order_detail_id]
    );
    if (result) {
      const data = await db.query(
        "SELECT order_detail.*,address.* FROM order_detail" +
          " INNER JOIN address ON order_detail.address_id=address.address_id" +
          " WHERE order_detail.address_id =?",
        [address_id]
      );
      if (data) {
        res.json({
          message: "Get data Success",
          data: data,
        });
      }
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    const { address_id } = req.body;
    const data = await db.query("DELETE FROM order_detail WHERE address_id=?", [
      address_id,
    ]);
    if (data.affectedRows > 0) {
      res.json({
        message: "Delete Success",
      });
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
const removeOne = async (req, res) => {
  try {
    const { order_detail_id } = req.body;
    const data = await db.query(
      "DELETE FROM order_detail WHERE order_detail_id=?",
      [order_detail_id]
    );
    if (data.affectedRows > 0) {
      res.json({
        message: "Delete Success",
      });
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
module.exports = {
  getByAddressId,
  create,
  updateQty,
  remove,
  removeOne,
};
