const db = require("../util/db");
const getAll = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM payment_method");
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
const getOne = async (req, res) => {
  try {
    const { payment_method_id } = req.body;
    const data = await db.query(
      "SELECT * FROM payment_method WHERE payment_method_id=?",
      [payment_method_id]
    );
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
const create = async (req, res) => {
  try {
    const { payment_method_name } = req.body;
    var payment_method_image = "";
    if (req.file) {
      payment_method_image = req.file.filename;
    }
    const result = await db.query(
      "INSERT INTO payment_method(payment_method_name,payment_method_image) VALUES(?,?)",
      [payment_method_name]
    );
    if (result.affectedRows > 0) {
      res.json({
        message: "Create Success",
      });
    } else {
      res.json({
        message: "Fail in Creation.",
      });
    }
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
const update = async (req, res) => {
  try {
    const { payment_method_name, payment_method_id } = req.body;
    var payment_method_image = "";
    if (req.file) {
      payment_method_image = req.file.filename;
    }
    const result = await db.query(
      "UPDATE payment_method SET payment_method_name =?,payment_method_image=? WHERE payment_method_id=?",
      [payment_method_name, payment_method_image, payment_method_id]
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
    const { payment_method_id } = req.body;
    const result = await db.query(
      "DELETE FROM payment_method WHERE payment_method_id =?",
      [payment_method_id]
    );
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
  getOne,
  create,
  update,
  remove,
};
