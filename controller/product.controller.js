const db = require("../util/db");

const getAll = async (req, res) => {
  try {
    const { txtSearch } = req.query;
    var sqlWhere = "";
    var param = [];
    if (txtSearch != null && txtSearch != "") {
      sqlWhere = " WHERE product_name LIKE ?";
      param.push("%" + txtSearch + "%");
    }
    var sql =
      "SELECT product.*,category.category_name FROM product" +
      " INNER JOIN category ON category.category_id= product.category_id" +
      sqlWhere;
    const data = await db.query(sql, param);
    if (data) {
      res.json({
        data: data,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
const getOne = async (req, res) => {
  const { product_id } = req.body;
  const result = await db.query("SELECT * FROM product WHERE product_id =?", [
    product_id,
  ]);
  if (result) {
    res.json({
      data: result,
    });
  }
};
const create = async (req, res) => {
  try {
    const {
      category_id,
      product_name,
      product_detail,
      product_quantity,
      product_price,
      product_status,
    } = req.body;
    var product_image = "";
    if (req.file) {
      product_image = req.file.filename;
    }
    const data = await db.query(
      "INSERT INTO product(category_id,product_name,product_detail,product_image,product_price,product_quantity,product_status) VALUES(?,?,?,?,?,?,?)",
      [
        category_id,
        product_name,
        product_detail,
        product_image,
        product_price,
        product_quantity,
        product_status,
      ]
    );
    if (data.affectedRows > 0) {
      res.json({
        message: "Insert Success",
        data: data,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
const reStock = async (req, res) => {
  // try {
  //   const { arrayProduct } = req.body;
  //   // Check if arrayProduct is defined and is an array
  //   if (!Array.isArray(arrayProduct)) {
  //     throw new Error("arrayProduct is not defined or is not an array");
  //   } else {
  //     // Use `Promise.all` to wait for all updates to complete
  //     await Promise.all(
  //       arrayProduct.map(async (item) => {
  //         const sqlReStock =
  //           "UPDATE product SET product_quantity=product_quantity-? WHERE product_id =?";
  //         const param = [item.product_qty, item.product_id];
  //         // Use `await` to wait for the query to finish
  //         await db.query(sqlReStock, param);
  //       })
  //     );
  //     // Send response after all updates are complete
  //     res.json({
  //       message: "Products restocked",
  //     });
  //   }
  // } catch (error) {
  //   res.json({
  //     error: error.message,
  //   });
  // }
};
const update = async (req, res) => {
  try {
    const {
      product_id,
      product_name,
      product_detail,
      product_price,
      product_quantity,
      category_id,
      product_status,
    } = req.body;
    var product_image = "";
    if (req.file) {
      product_image = req.file.filename;
    } else {
      product_image = req.body;
    }
    const data = await db.query(
      "UPDATE product SET category_id=?, product_name = ?, product_detail = ?, product_image = ?,product_price=?, product_quantity = ?, product_status = ? WHERE product_id = ?;",
      [
        category_id,
        product_name,
        product_detail,
        product_image,
        product_price,
        product_quantity,
        product_status,
        product_id,
      ]
    );
    if (data.affectedRows > 0) {
      res.json({
        message: "Update Success",
        data: data,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    const { product_id } = req.body;
    const data = await db.query("DELETE FROM product WHERE product_id =? ", [
      product_id,
    ]);
    if (data.affectedRows > 0) {
      res.json({
        message: "Delete Succese",
      });
    } else {
      res.json({
        error: true,
        message: "Product Not found!",
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
  getOne,
  create,
  update,
  reStock,
  remove,
};
