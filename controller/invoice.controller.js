const db = require("../util/db");

const getAll = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT invoice.*, address.*,delivery.*, payment_method.payment_method_name FROM invoice" +
        " INNER JOIN address ON address.address_id=invoice.address_id" +
        " INNER JOIN delivery ON delivery.delivery_id =invoice.delivery_id" +
        " INNER JOIN payment_method ON payment_method.payment_method_id=invoice.payment_method_id" +
        " ORDER BY invoice.invoice_id DESC"
    );
    if (data) {
      res.json({
        message: "Get Data Successfuly",
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
const getOne = async (req, res) => {
  const { invoice_id } = req.body;
  const data = await db.query(
    "SELECT invoice.*, address.*,delivery.*, payment_method.payment_method_name FROM invoice" +
      " INNER JOIN address ON address.address_id=invoice.address_id" +
      " INNER JOIN delivery ON delivery.delivery_id =invoice.delivery_id" +
      " INNER JOIN payment_method ON payment_method.payment_method_id=invoice.payment_method_id" +
      " WHERE invoice.invoice_id = ?",
    [invoice_id]
  );
  if (data) {
    res.json({
      data: data,
    });
  }
};
const create = async (req, res) => {
  try {
    const {
      address_id,
      payment_method_id,
      delivery_id,
      payment_status,
      note,
      total,
      arrayProduct,
    } = req.body;
    const result = await db.query(
      "INSERT INTO invoice(address_id,payment_method_id,delivery_id,payment_status,note,total) VALUES(?,?,?,?,?,?)",
      [address_id, payment_method_id, delivery_id, payment_status, note, total]
    );
    if (result.affectedRows > 0) {
      const SelectInvoice = await db.query(
        "SELECT invoice.*, address.*,delivery.*, payment_method.payment_method_name FROM invoice" +
          " INNER JOIN address ON address.address_id=invoice.address_id" +
          " INNER JOIN delivery ON delivery.delivery_id =invoice.delivery_id" +
          " INNER JOIN payment_method ON payment_method.payment_method_id=invoice.payment_method_id " +
          " ORDER BY invoice.invoice_id DESC LIMIT 1"
      );
      if (SelectInvoice) {
        res.json({
          dataInvoice: SelectInvoice,
        });
      }
      arrayProduct.map(async (item) => {
        const sqlReStock =
          "UPDATE product SET product_quantity=product_quantity-? WHERE product_id =?";
        const param = [item.product_qty, item.product_id];
        await db.query(sqlReStock, param);
      });
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
const update = async (req, res) => {};
const remove = async (req, res) => {
  try {
    const { invoice_id, address_id, arrayProduct } = req.body;
    const result = await db.query("DELETE FROM invoice WHERE invoice_id=?", [
      invoice_id,
    ]);
    if (result) {
      const removeOrderDetail = await db.query(
        "DELETE FROM order_detail WHERE address_id=?",
        [address_id]
      );
      arrayProduct.map(async (item) => {
        const sqlReStock =
          "UPDATE product SET product_quantity=product_quantity+? WHERE product_id =?";
        const param = [item.product_qty, item.product_id];
        await db.query(sqlReStock, param);
      });
      const removeAddress = await db.query(
        "DELETE FROM address WHERE address_id=?",
        [address_id]
      );
      if (removeOrderDetail && removeAddress) {
        res.json({
          message: "Remove Success",
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

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
