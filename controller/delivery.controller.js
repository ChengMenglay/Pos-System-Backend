const db = require("../util/db");

const getAll = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM delivery");
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
    const { delivery_id } = req.body;
    const data = await db.query("SELECT * FROM delivery WHERE delivery_id=?", [
      delivery_id,
    ]);
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
    const { delivery_name, shipping_charge } = req.body;
    const result = await db.query(
      "INSERT INTO delivery(delivery_name,shipping_charge) VALUES(?,?)",
      [delivery_name, shipping_charge]
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
    const { delivery_name, shipping_charge, delivery_id } = req.body;
    const result = await db.query(
      "UPDATE delivery SET delivery_name =?,shipping_charge=? WHERE delivery_id=?",
      [delivery_name, shipping_charge, delivery_id]
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
    const { delivery_id } = req.body;
    const result = await db.query("DELETE FROM delivery WHERE delivery_id =?", [
      delivery_id,
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
  getOne,
  create,
  update,
  remove,
};
