const db = require("../util/db");
const bcrypt = require("bcrypt");
const getAll = async (req, res) => {
  try {
    const data = await db.query(
      "SELECT user.*, role.* FROM user INNER JOIN role ON role.role_id = user.role_id"
    );
    if (data) {
      for (let i = 0; i < data.length; i++) {
        delete data[i].password;
      }
      res.json({
        data: data,
      });
    } else {
      res.json({
        error: true,
        message: "Something Went Wrong",
      });
      return false;
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
const Signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirm_password, role_id } =
      req.body;
    const message = {};
    if (!email) {
      message.email = "Please Fil in Email!";
    }
    if (!password) {
      message.password = "Please Fil in Password!";
    }
    if (!confirm_password) {
      message.confirm_password = "Please Fil in ConfirmPassword!";
    }
    if (password !== confirm_password) {
      message.compare = "Password and Confirm Password are different!";
    }
    if (Object.keys(message).length > 0) {
      res.json({
        message: message,
      });
      return false;
    }
    const checkEmail = await db.query("SELECT * FROM user WHERE email=?", [
      email,
    ]);
    if (checkEmail && checkEmail.length > 0) {
      res.json({
        message: "Email has already existed!",
      });
      return false;
    }
    const hash = await bcrypt.hashSync(password, 10);
    const data = await db.query(
      "INSERT INTO user(firstname, lastname, email, password,role_id) VALUES(?,?,?,?,?)",
      [firstname, lastname, email, hash, role_id]
    );
    if (data.affectedRows > 0) {
      res.json({
        message: "Create Success",
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
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const message = {};
    if (!email) {
      message.email = "Please Fil in Email!";
    }
    if (!password) {
      message.password = "Please Fil in Password!";
    }
    if (Object.keys(message).lenth > 0) {
      res.json({
        message: message,
      });
      return false;
    }
    const result = await db.query(
      "SELECT user.* ,role.role_name FROM user INNER JOIN role ON role.role_id =user.role_id WHERE email=? ",
      [email]
    );
    if (result) {
      if (result.length === 0) {
        res.json({
          message: "Email doesn't exist",
        });
        return false;
      }
      var hashpass = result[0].password;
      const comparePassword = await bcrypt.compareSync(password, hashpass);
      if (!comparePassword) {
        res.json({
          message: "Password Incorrect!",
        });
        return false;
      } else {
        delete result[0].password;
        res.json({
          message: "Login Success",
          data: result[0],
        });
      }
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    const { user_id } = req.body;
    const del = await db.query("DELETE FROM user WHERE user_id=?", [user_id]);
    if (del.affectedRows > 0) {
      res.json({
        message: "Delete Success",
      });
    } else {
      res.json({
        message: "User doesn't exsit",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
module.exports = {
  getAll,
  Signup,
  Login,
  remove,
};
