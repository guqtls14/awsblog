var express = require("express");
var router = express.Router();
const comment = require("../models/comment");

const db = require("../components/db");

router.get("/", async function (req, res, next) {
  try {
    const { comment_idx } = req.query;
    const connection = await db.getConnection();
    const results = await comment.getList(connection, {
      comment_idx: comment_idx,
    }); //a query

    res.status(200).json({ results });
  } catch (err) {
    console.log("comment get error : ", err);
    next();
  }
});

//댓글작성 -> 다른회원이 같은게시글을 선택해서 댓글을 쓸떄는 어떻게 해야하는가? -> 문제는 articles_idx를 com에넣는순간 get의 article이 null이됨
//댓글을추가할떄마다 반복문이 이상하게 반복됨;;
router.post("/", async function (req, res, next) {
  const body = req.body; // {name:asdf,price:200}
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const commentResult = await comment.insert(connection, {
      articles_idx: body.articles_idx,
      // comment_see: body.comment_see,
      post_comment: body.post_comment,
      // post_see: body.post_see,
      user_idx: body.user_idx,
    });
    await db.commit(connection);
    res.status(200).json({ commentResult });
  } catch (err) {
    console.log("err : ", err);
    next();
  }
});

//댓글수정
router.put("/", async function (req, res, next) {
  const body = req.body; // {name:asdf,price:200}
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const commentResult = await comment.update(connection, {
      comment_idx: body.comment_idx,
      // user_idx: body.user_idx,
      post_comment: body.post_comment,
      // user_idx: body.user_idx,
      // articles_idx: body.articles_idx,
    });
    await db.commit(connection);
    res.status(200).json({ commentResult });
  } catch (err) {
    console.log("err : ", err);
    next();
  }
});

//댓글작성수
router.put("/commentSee", async function (req, res, next) {
  // const body = req.body; // {name:asdf,price:200}
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const commentResult = await comment.Commentupdate(connection, {
      comment_idx: req.query.comment_idx,
    });
    await db.commit(connection);
    res.status(200).json({ commentResult });
  } catch (err) {
    console.log("err : ", err);
    next();
  }
});
//댓글삭제
router.delete("/", async function (req, res, next) {
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const commentResult = await comment.delete(connection, {
      comment_idx: req.query.comment_idx,
      // post_comment: body.post_comment,
      // user_idx: body.user_idx,
    });
    await db.commit(connection);
    res.status(200).json({ commentResult });
  } catch (err) {
    console.log("err : ", err);
    next();
  }
});
// `UPDATE article SET comment_see = comment_see +1 WHERE articles_idx=${options.articles_idx}`,
// router.post("/", async function (req, res, next) {
//   const body = req.body; // {name:asdf,price:200}
//   try {
//     const connection = await db.getConnection();
//     await db.beginTransaction(connection);
//     const result = await comment.insert(connection, body);
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
//     const result = await comment.update(connection, body);
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
//     const result = await comment.delete(connection, body);
//     await db.commit(connection);
//     res.status(200).json({ result });
//   } catch (err) {
//     next();
//   }
// });

module.exports = router;
