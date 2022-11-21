const sql = require("./db.model");

const Category = function (category) {
  this.parent = category.parent;
  this.name = category.name;
  this.icon = category.icon;
  this.src = category.src;
  this.isVisible = category.isVisible;
  if (this.isVisible == null) this.isVisible = 1;
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

Category.updateById = (id, datas, result) => {
  sql.query(
    "UPDATE m_category SET name = ? , icon = ? , src = ? , isVisible = ? WHERE id=?",
    [datas.name, datas.icon, datas.src, datas.isVisible, id],
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
      console.log("Updated category: ", { id: id, ...res });
      result(null, { id: id, ...res });
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
    `SELECT * FROM m_category WHERE ${visible} && parent ${parent}`,
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
