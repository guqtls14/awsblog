const db = require("../components/db");
//페이지네이션 수정전
module.exports.getList = async (
  connection, // PoolConnection
  options // {idx, name}
) => {
  let offset = 0;
  let query = `SELECT * FROM article`;
  query = `SELECT * FROM article  order by "post_Date" `;
  //Limit ${offset}, 2
  let values = [];
  if (options) {
    if (options.articles_idx) {
      query += " WHERE articles_idx = ? LIMIT 12";
      values.push(options.articles_idx);
    }
  }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};

// page number
// page 당 포스트 2개
// 현재 aritcles count 9
// page : 1, 2, 3, 4, 5

// 1. page number api : 5 -> fd : 총 article list : 50개 : 페이지(12개 -> 5페이지를 응답
// 2. aritile list api(page_number:2) : [ariticle, ariticle] 12개 보내줄게

// https://bbbicb.tistory.com/40
// module.exports.detailinsert = async (connection, options) => {
//   let query = `INSERT INTO article SET ?`;
//   let values = options;
//   return await db.query(connection, {
//     query: query,
//     values: values,
//   });
// };

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
// " WHERE articles_idx IN ( SELECT articles_idx FROM article)";
// module.exports.detailgetList = async (
//   connection, // PoolConnection
//   options // {idx, name}
// ) => {
//   let query = `SELECT * FROM article`;
//   let values = [];
//   if (options) {
//     if (options.articles_idx) {
//       query += " WHERE articles_idx = ?";
//       values.push(options.articles_idx);
//     }
//   }
//   return await db.query(connection, {
//     query: query,
//     values: values,
//   });
// };
// INNER JOIN post_img ON post_img.articles_idx = article.articles_idx

// select article.articles_idx,comment.comment_idx,user.user_idx
// from article left outer join comment on article.articles_idx = comment.aricles_idx
// left outer join user on article_articles_idx = user.articles_idx

//기존 detailget
// module.exports.detailgetList = (connection, options) => {
//   console.log("options : ", options);
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `SELECT * FROM article WHERE articles_idx = ${options.articles_idx}`,
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
//comment, user 포함 detailget
module.exports.detailgetList = (connection, options) => {
  console.log("options : ", options);
  return new Promise((resolve, reject) => {
    connection.query(
      `select *
      from article left outer join comment on article.articles_idx = comment.articles_idx
      left outer join users on article.user_idx = users.user_idx WHERE article.articles_idx = "${options.articles_idx}"`,
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
        resolve(results);
      }
    );
  });
};
//댓글 조회수
// module.exports.Commnetseeupdate = (connection, options) => {
//   //{ -> see req
//   //     "articles_idx":3,
//   //     "post_see":1
//   // }
//   return new Promise((resolve, reject) => {
//     connection.query(
//       // `UPDATE article SET post_see = IFNULL(${options.post_see},0)+1 WHERE articles_idx=${options.articles_idx}`,
//       `UPDATE article SET comment_see = comment_see +1 WHERE articles_idx=${options.articles_idx}`,
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
// module.exports.Starupdate = async (connection, options) => {
//   let query = `UPDATE  article SET star += 1 WHERE articles_idx = ${articles_idx}`;

//   let query = `UPDATE article SET ?  `;
//   let values = [options];
//   if (options) {
//     console.log("option : ", options);
//     if (options.articles_idx) {
//       query += " WHERE articles_idx = ?";
//       values.push(options.articles_idx);
//     }
//   }

//   // UPDATE article SET ? WHERE user_idx = ?
//   return await db.query(connection, {
//     query: query,
//     values: values,
//   });
// };

module.exports.Starupdate = (connection, options) => {
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
        resolve(results);
      }
    );
  });
};
//스타횟수 보기
module.exports.stargetList = async (
  connection, // PoolConnection
  options // {idx, name}
) => {
  let query = `SELECT * FROM article`;
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
