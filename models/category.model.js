const sql = require("./db.model");

const Category = function (category) {
  this.parent = category.parent;
  this.name = category.name;
  this.icon = category.icon;
  this.src = category.src;
  this.isVisible = category.isVisible;
};

Category.add = (data, result) => {
  sql.query("INSERT INTO m_category SET ?", data, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    console.log("Category added: ", {
      id: res.insertId,
      ...data,
    });
    result(null, {
      id: res.insertId,
      ...data,
    });
  });
};

Category.updateById = (id, data, result) => {
  sql.query(
    "UPDATE m_category SET name = ? , icon = ? , src = ? , isVisible = ? WHERE id=?",
    [data.name, data.icon, data.src, data.isVisible, id],
    (err, res) => {
      if (err) {
        console.log("Query error: " + err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        //this user id not found
        result({ msg: "not_found" }, null);
        //Mistake return so sent more than one response
        return;
      }
      console.log("Updated category: ", { id: id, ...data });
      result(null, { id: id, ...data });
    }
  );
};

Category.deleteById = (id, result) => {
  sql.query("DELETE FROM  m_category WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Query error: " + err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ msg: "not_found" }, null);
      return;
    }
    console.log("Deleted category id: ", id);
    result(null, { id: id });
  });
};

Category.getCategory = (visible, parent, result) => {
  sql.query(
    `SELECT * FROM category WHERE isVisible = ? && parent = ?`,
    [visible, parent],
    (err, res) => {
      if (err) {
        console.log("Query error: " + err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Category;
