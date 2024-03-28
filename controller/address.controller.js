const db = require("../util/db");

const getAll = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM address");
    if (data) {
      res.json({
        data: data,
      });
    } else {
      res.json({
        message: "Fail in Selection Data",
      });
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
const getId = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT * FROM address ORDER BY address_id DESC LIMIT 1"
    );
    if (data) {
      res.json({
        data: data[0],
      });
    } else {
      res.json({
        message: "Fail in Selection Data",
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
    db.beginTransaction();
    const { customer_name, street, province, phone_number, array_product } =
      req.body;
    const sqlAddress =
      "INSERT INTO address(customer_name,street,province,phone_number) VALUES(?,?,?,?)";
    const paramAddress = [customer_name, street, province, phone_number];
    const dataAddress = await db.query(sqlAddress, paramAddress);
    //detail product for sell or buy
    array_product.map(async (item, index) => {
      const sqlOrderDetail =
        "INSERT INTO order_detail(address_id,product_id,product_name,product_image,product_quantity,product_qty,product_price,total) VALUES(?,?,?,?,?,?,?,?)";
      const paramOrderDetail = [
        dataAddress.insertId,
        item.product_id,
        item.product_name,
        item.product_image,
        item.product_quantity,
        item.qty,
        item.product_price,
        item.qty * item.product_price,
      ];
      const dataOrderDetail = await db.query(sqlOrderDetail, paramOrderDetail);
    });
    db.commit();
    if (dataAddress.affectedRows > 0) {
      const SelectIdAddress = await db.query(
        "SELECT * FROM address ORDER BY address_id DESC LIMIT 1"
      );
      res.json({
        message: "Insert Success",
        data: SelectIdAddress[0],
      });
    } else {
      message: "Something Went Wrong";
    }
  } catch (error) {
    db.rollback();
    res.json({
      error: true,
      message: error.message,
    });
  }
};
const update = async (req, res) => {
  try {
    const { customer_name, street, province, phone_number, address_id } =
      req.body;
    const result = await db.query(
      "UPDATE address SET customer_name =?,street=?,province=?,phone_number=? WHERE address_id=?",
      [customer_name, street, province, phone_number, address_id]
    );
    if (result.affectedRows > 0) {
      res.json({
        message: "Update Success",
      });
    } else {
      res.json({
        message: "Fail in Updation.",
      });
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
    const result = await db.query("DELETE FROM address WHERE address_id =?", [
      address_id,
    ]);
    if (result.affectedRows > 0) {
      res.json({
        message: "Delete Success",
      });
    } else {
      res.json({
        message: "Fail in Deletion.",
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
  getAll,
  getId,
  create,
  update,
  remove,
};
