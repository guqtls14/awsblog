var express = require("express");
var router = express.Router();
const category = require("../models/category");
const db = require("../components/db");

router.get("/", async function (req, res, next) {
  try {
    const { category_idx } = req.query;
    const connection = await db.getConnection();
    const results = await category.getList(connection, {
      category_idx: category_idx,
    }); //a query

    // for (let i = 0; i < results.length; i++) {
    //   const categoryResult = await category.getList(connection, {
    //     articles_idx: results[i].articles_idx,
    //   });
    //   results[i].category = categoryResult;
    // }
    res.status(200).json({ results });
  } catch (err) {
    console.log("category get error : ", err);
    next();
  }
});

router.get("/page", async function (req, res, next) {
  try {
    const limit = 12;
    // // page number
    const page = req.query.page;
    // // calculate offset
    const offset = (page - 1) * limit;
    // query for fetching data with page number and offset
    const connection = await db.getConnection();
    const results = await article.pagegetList(connection, {
      page: page,
      offset: offset,
      limit: limit,
    }); //a query
    for (let i = 0; i < results.length; i++) {
      const ImgResult = await post_img.getList(connection, {
        articles_idx: results[i].articles_idx,
      });
      results[i].Img = ImgResult;
      const commentResult = await comment.getList(connection, {
        articles_idx: results[i].articles_idx,
      });
      results[i].Comment = commentResult;
    }
    res.status(200).json({ results });
  } catch (err) {
    console.log("article get error : ", err);
    next();
  }
});
// router.post("/", async function (req, res, next) {
//   const body = req.body; // {name:asdf,price:200}
//   try {
//     const connection = await db.getConnection();
//     await db.beginTransaction(connection);
//     const result = await category.insert(connection, body);
//     await db.commit(connection);
//     res.status(200).json({ result });
//   } catch (err) {
//     next();
//   }
// });

// router.put("/", async function (req, res, next) {
//   try {
//     const body = req.body;
//     const connection = await db.getConnection();
//     await db.beginTransaction(connection);
//     const result = await category.update(connection, body);
//     await db.commit(connection);
//     res.status(200).json({ result });
//   } catch (err) {
//     next();
//   }
// });

// router.delete("/", async function (req, res, next) {
//   try {
//     const body = req.body;
//     const connection = await db.getConnection();
//     await db.beginTransaction(connection);
//     const result = await category.delete(connection, body);
//     await db.commit(connection);
//     res.status(200).json({ result });
//   } catch (err) {
//     next();
//   }
// });

module.exports = router;
