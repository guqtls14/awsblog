const db = require("../components/db");

module.exports.getList = async (
  connection, // PoolConnection
  options // {idx, name}
) => {
  //SELECT * FROM comment LEFT JOIN article ON comment.user_idx = article.user_idx
  let query = `SELECT * FROM comment`;
  let values = [];
  if (options) {
    if (options.articles_idx) {
      query += " WHERE comment.articles_idx = ?";
      values.push(options.articles_idx);
    }
  }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};
// post_see = post_see +1 WHERE articles_idx=${options.articles_idx}
module.exports.insert = async (connection, options) => {
  console.log("option : ", options);
  let query = `INSERT INTO comment SET ?`;
  let values = [options];
  return await db.query(connection, {
    query: query,
    values: values,
  });
};

module.exports.update = (connection, options) => {
  console.log("options : ", options);
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE comment SET post_comment = "${options.post_comment}"
      where comment_idx = "${options.comment_idx}"`,
      (error, results, fields) => {
        if (error) {
          //When done with the connection, release it.
          connection.release(); //무조건해줘야함
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports.Commentupdate = (connection, options) => {
  console.log("options : ", options);
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE comment SET comment_see = comment_see +1 
      where comment_idx = "${options.comment_idx}"`,
      (error, results, fields) => {
        if (error) {
          //When done with the connection, release it.
          connection.release(); //무조건해줘야함
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

module.exports.delete = async (connection, options) => {
  let query = `DELETE FROM comment`;
  let values = [];
  if (options) {
    if (options.comment_idx) {
      query += " WHERE comment_idx = ?";
      values.push(options.comment_idx);
    }
  }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};
