const db = require("../components/db");
//페이지네이션 수정전
module.exports.getList = async (
  connection, // PoolConnection
  options // {idx, name}
) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM article`, (error, results, fields) => {
      if (error) {
        //When done with the connection, release it.
        connection.release(); //무조건해줘야함
        reject(error);
      }
      connection.release(); //무조건해줘야함
      resolve(results);
    });
  });
};

module.exports.detailput = async (
  connection, // PoolConnection
  options // {idx, name}
) => {
  let query = `UPDATE article SET ? WHERE articles_idx = ?`;
  let values = [options, options.articles_idx];
  // if (options) {
  //   if (options.articles_idx) {
  //     query += " WHERE article.articles_idx = ?";
  //     values.push(options.articles_idx);
  //   }
  // }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};

module.exports.detailgetList = (connection, options) => {
  console.log("options : ", options);
  return new Promise((resolve, reject) => {
    connection.query(
      `select * 
      from article 
      left join users on article.user_idx = users.user_idx
       WHERE article.articles_idx = "${options.articles_idx}"`,
      (error, results, fields) => {
        if (error) {
          //When done with the connection, release it.
          connection.release(); //무조건해줘야함
          reject(error);
        }
        connection.release(); //무조건해줘야함
        resolve(results);
      }
    );
  });
};

//pagination
module.exports.pagegetList = (connection, options) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from article limit ${options.limit} OFFSET ${options.offset}`,
      (error, results, fields) => {
        if (error) {
          //When done with the connection, release it.
          connection.release(); //무조건해줘야함
          reject(error);
        }
        connection.release();
        resolve(results);
      }
    );
  });
};

module.exports.SearchgetList = (connection, options) => {
  console.log("options : ", options);
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM article WHERE post_title = ?`,
      [options.post_title],
      (error, results, fields) => {
        if (error) {
          //When done with the connection, release it.
          connection.release(); //무조건해줘야함
          reject(error);
        }
        connection.release(); //무조건해줘야함
        resolve(results);
      }
    );
  });
};

module.exports.insert = async (connection, options) => {
  let query = `INSERT INTO article SET ?`;
  let values = options;
  return await db.query(connection, {
    query: query,
    values: values,
  });
};

module.exports.postput = async (connection, options) => {
  let query = `UPDATE  article SET ?`;
  let values = [options];
  if (options) {
    if (options.articles_idx) {
      query += " WHERE articles_idx = ?";
      values.push(options.articles_idx);
    }
  }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};

// module.exports.Seeupdate = async (connection, options) => {
//   //${}어떻게보냄?
//   // let query = `UPDATE article SET stars += ${star} WHERE articles_idx = ${articles_idx} `;
//   let query = `UPDATE  article SET ?  `;
//   let values = [options];
//   if (options) {
//     if (options.articles_idx) {
//       query += " WHERE options.articles_idx = ?";
//       values.push(options.articles_idx);
//     }
//   }

//   // UPDATE article SET ? WHERE user_idx = ?
//   return await db.query(connection, {
//     query: query,
//     values: values,
//   });
// };
module.exports.Seeupdate = (connection, options) => {
  //{ -> see req
  //     "articles_idx":3,
  //     "post_see":1
  // }
  return new Promise((resolve, reject) => {
    connection.query(
      // `UPDATE article SET post_see = IFNULL(${options.post_see},0)+1 WHERE articles_idx=${options.articles_idx}`,
      `UPDATE article SET post_see = post_see +1 WHERE articles_idx=${options.articles_idx}`,
      (error, results, fields) => {
        if (error) {
          //When done with the connection, release it.
          connection.release(); //무조건해줘야함
          reject(error);
        }
        // connection.release(); //무조건해줘야함
        resolve(results);
      }
    );
  });
};

module.exports.Starupdate = (connection, options) => {
  // `UPDATE  article SET star = star + 1 WHERE articles_idx = ${options.articles_idx}`;
  // `UPDATE  article SET star = IFNULL(${options.star},0)+1 WHERE articles_idx = ${options.articles_idx}`
  //  sql: 'UPDATE  article SET star += 1 WHERE articles_idx = 3' ????
  console.log("options : ", options);
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE  article SET star = star + 1 WHERE articles_idx = ${options.articles_idx}`,
      (error, results, fields) => {
        if (error) {
          //When done with the connection, release it.
          connection.release(); //무조건해줘야함
          reject(error);
        }
        // connection.release(); //무조건해줘야함
        resolve(results);
      }
    );
  });
};

module.exports.stargetList = async (
  connection, // PoolConnection
  options // {idx, name}
) => {
  let query = `SELECT star FROM article`;
  let values = [];
  if (options) {
    if (options.star) {
      query += " WHERE star = ?";
      values.push(options.star);
    }
  }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};

module.exports.delete = async (connection, options) => {
  let query = `DELETE FROM article`;
  let values = [];
  if (options) {
    if (options.articles_idx) {
      query += " WHERE articles_idx = ?";
      values.push(options.articles_idx);
    }
  }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};
