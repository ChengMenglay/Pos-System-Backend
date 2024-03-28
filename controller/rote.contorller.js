const db = require("../util/db");

const getAll = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM role");
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
const create = async (req, res) => {
  try {
    const { role_name, description, permission, default_role } = req.body;
    const data = await db.query(
      "INSERT INTO role(role_name,description,permission,default_role) VALUES(?,?,?,?)",
      [role_name, description, permission, default_role]
    );
    if (data.affectedRows > 0) {
      res.json({
        message: "Create Successfuly",
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
    const { role_id, role_name, description, permission, default_role } =
      req.body;
    const result = await db.query(
      "UPDATE role SET role_name= ?, description=?,permission=?,default_role=?  WHERE role_id =?",
      [role_name, description, permission, default_role, role_id]
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
    const { role_id } = req.body;
    const result = await db.query("DELETE FROM role WHERE role_id= ?", [
      role_id,
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
