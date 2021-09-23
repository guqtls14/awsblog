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

// module.exports.insert = (connection, options) => {
//   console.log("options : ", options);
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `select *
//       from article left outer join comment on article.articles_idx = comment.articles_idx
//       left outer join users on article.user_idx = users.user_idx WHERE article.articles_idx = "${options.articles_idx}"`,
//       (error, results, fields) => {
//         if (error) {
//           //When done with the connection, release it.
//           connection.release(); //무조건해줘야함
//           reject(error);
//         }
//         resolve(results);
//       }
//     );
//   });
// };
// module.exports.insert = async (connection, options) => {
//   let query = `INSERT INTO comment SET
//   post_see = post_see +1,
//   post_content = "${options.post_content}";`;
//   let values = [options, options.post_see];
//   return await db.query(connection, {
//     query: query,
//     values: values,
//   });
// };

// module.exports.update = async (connection, options) => {
//   let query = `UPDATE comment SET ? where articles_idx = ?`;
//   console.log("options : ", optioon);
//   let values = [options, options.post_articles_idx];
//   //   if (options.articles_idx) {
//   //     query += " WHERE articles_idx = ?";
//   //     values.push(options.articles_idx);
//   //   }
//   // }
//   // UPDATE comment SET ? WHERE user_idx = ?
//   return await db.query(connection, {
//     query: query,
//     values: values,
//   });
// };

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
// module.exports.update = (connection, options) => {
//   // `UPDATE  article SET star = IFNULL(${options.star},0)+1 WHERE articles_idx = ${options.articles_idx}`
//   //  sql: 'UPDATE  article SET star += 1 WHERE articles_idx = 3' ????
//   console.log("options : ", options);
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `UPDATE comment SET ${options} where articles_idx = "${options.articles_idx}}"`,
//       (error, results, fields) => {
//         if (error) {
//           //When done with the connection, release it.
//           connection.release(); //무조건해줘야함
//           reject(error);
//         }
//         resolve(results);
//       }
//     );
//   });
// };

module.exports.delete = async (connection, options) => {
  let query = `DELETE FROM comment`;
  let values = [];
  if (options) {
    if (options.articles_idx) {
      query += " WHERE articles_idx = ?";
      values.push(options.brand_idx);
    }
  }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};
