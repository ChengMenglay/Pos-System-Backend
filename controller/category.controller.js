const db = require("../util/db");

const getAll = async (req, res) => {
  try {
    const { txtSearch } = req.query;
    var sqlParam = [];
    var sqlWhere = "";
    if (txtSearch != "" && txtSearch != null) {
      sqlWhere = " WHERE category_name LIKE ?";
      sqlParam.push("%" + txtSearch + "%");
    }
    var sql = "SELECT * FROM category" + sqlWhere;
    const data = await db.query(sql, sqlParam);
    if (data) {
      res.json({
        data: data,
      });
    } else {
      res.json({
        error: true,
        message: "Something Went Wrong!",
      });
      return false;
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
const create = async (req, res) => {
  try {
    const { category_name, status } = req.body;
    if (!category_name) {
      res.json({
        message: "Please fil in category name!",
      });
      return false;
    }
    const result = await db.query(
      "INSERT INTO category(category_name,status) VALUE(?,?)",
      [category_name, status]
    );
    if (result.affectedRows > 0) {
      res.json({
        message: "Create Success",
        data: SelectRes,
      });
    } else {
      res.json({
        error: true,
        message: "Something Went Wrong!",
      });
      return false;
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
const update = async (req, res) => {
  try {
    const { category_id, category_name, status } = req.body;
    const result = await db.query(
      "UPDATE category SET category_name= ?, status=? WHERE category_id =?",
      [category_name, status, category_id]
    );
    if (result.affectedRows) {
      res.json({
        message: "Update Success",
      });
    } else {
      res.json({
        error: true,
        message: "Something went wrong!",
      });
      return false;
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    const { category_id } = req.body;
    const result = await db.query("DELETE FROM category WHERE category_id= ?", [
      category_id,
    ]);
    if (result.affectedRows > 0) {
      res.json({
        message: "Delete Success",
      });
    } else {
      res.json({
        error: true,
        message: "Something went wrong!",
      });
      return false;
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
