var express = require("express");
var router = express.Router();
const article = require("../models/article");
// const category = require("../models/comment");
const post_img = require("../models/post_img");
const util = require("../components/util");
const db = require("../components/db");
const comment = require("../models/comment");
router.get("/", async function (req, res, next) {
  try {
    // const limit = 2;
    const { articles_idx } = req.query;
    // const { page } = req.query;
    console.log("req.page : ", req.query.page);
    const connection = await db.getConnection();
    const results = await article.getList(connection, {
      articles_idx: articles_idx,
      page: req.query.page,
    }); //a query

    // article get할시 같이 나오는 것들
    for (let i = 0; i < results.length; i++) {
      const ImgResult = await post_img.getList(connection, {
        articles_idx: results[i].articles_idx,
      });
      results[i].Img = ImgResult;
    }
    res.status(200).json({ results });
  } catch (err) {
    console.log("article get error : ", err);
    next();
  }
});
//사진은 수정전
router.put("/detail", async function (req, res, next) {
  //기존에 있었던 파일 여기서 전제는 수정할 파일도 미리 있다는것이 조건
  //수정 입력 될 파일
  //원래는 기존사진 수정, 삭제, 추가의 과정을 거치지만 너무번거로우니까 한번에 다지우고 추가하는방법으로 감
  const connection = await db.getConnection();
  await db.beginTransaction(connection);
  try {
    const body = req.body;
    // const images = body.images; //images라는 객체로 묶어서 사진전송
    // const originArticleimg = await post_img.getList(connection, {
    //   img_idx: body.img_idx,
    // });
    // const deleteResult = await post_img.delete(connection, {
    //   //ppt 회원수정 위쪽 3번과정 -> db에 경로 업데이트과정
    //   articles_idx: body.articles_idx,
    // });
    // for (let i = 0; i < images.length; i++) {
    //   await post_img.insert(connection, {
    //     articles_idx: body.articles_idx,
    //     img_path: images[i],
    //   });
    // }
    // delete body.images;
    const result = await article.postput(connection, body);
    //상품을 지우고 수정까지 완료
    await db.commit(connection);
    // if (originArticleimg && deleteResult) {
    //   // ppt 4번째 과정
    //   //밑의 반복문은 db에는 지워지지만 storage에만 존재하는 쓸떄없는파일을 뜻함
    //   for (let i = 0; i < originArticleimg.length; i++) {
    //     if (!images.includes(originArticleimg[i].img_path)) {
    //       const dir = `public/${originArticleimg[i].img_path}`;
    //       fs.existsSync(dir) && fs.unlinkSync(dir); //파일이있다면 지운다
    //     }
    //   }
    // }
    res.status(200).json({ result });
  } catch (err) {
    await db.rollback(connection);
    console.log("article update err : ", err);
    next();
  }
});

//상세페이지보기
router.get("/detail", async function (req, res, next) {
  try {
    const connection = await db.getConnection();
    const results = await article.detailgetList(connection, {
      articles_idx: req.query.articles_idx,
      // comment: req.body.comment_idx,
      // user: req.body.user_idx,
    }); //a query
    console.log("results : ", results);
    for (let i = 0; i < results.length; i++) {
      const ImgResult = await post_img.getList(connection, {
        articles_idx: results[i].articles_idx,
      });
      results[i].Img = ImgResult;

      const commentResult = await comment.getList(connection, {
        articles_idx: results[i].articles_idx,
      });
      results[i].Comment = commentResult;
      // const articleResult = await article.getList(connection, {
      //   articles_idx: results[i].articles_idx,
      // });
      // results[i].article = articleResult;
    }
    res.status(200).json({ results });
  } catch (err) {
    console.log("article get error : ", err);
    next();
  }
});
//여기
// 왜빈값이..? -> 완료
router.get("/search", async function (req, res, next) {
  try {
    const body = req.body;
    console.log("req.body : ", req.body);
    const connection = await db.getConnection();
    const results = await article.SearchgetList(connection, body); //a query

    // //article get할시 같이 나오는 것들
    // for (let i = 0; i < results.length; i++) {
    //   const categoryResult = await category.getList(connection, {
    //     articles_idx: results[i].articles_idx,
    //   });
    // }

    res.status(200).json({ results });
  } catch (err) {
    console.log("article get error : ", err);
    next();
  }
});
//커사 페이지네이션 -> ?????????????
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
      page: req.query.page,
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

// router.get("/page", async function (req, res, next) {
//   // limit as 20
//   const limit = 2;
//   // page number
//   const page = req.query.page;
//   // calculate offset
//   const offset = (page - 1) * limit;
//   // query for fetching data with page number and offset
//   const prodsQuery =
//     "select * from article limit " + limit + " OFFSET " + offset;
//   pool.getConnection(function (err, connection) {
//     connection.query(prodsQuery, function (error, results, fields) {
//       // When done with the connection, release it.
//       connection.release();
//       if (error) throw error;
//       // create payload
//       var jsonResult = {
//         article_page_count: results.length,
//         page_number: page,
//         article: results,
//       };
//       // create response
//       var myJsonString = JSON.parse(JSON.stringify(jsonResult));
//       res.statusMessage = "article for page " + page;
//       res.statusCode = 200;
//       res.json(myJsonString);
//       res.end();
//     });
//   });
// });
//게시글작성 -> 상세페이지 작성
router.post("/", async function (req, res, next) {
  const body = req.body; // {name:asdf,price:200}
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const articleDate = util.getCurrentTime();
    const articleResult = await article.insert(connection, {
      // articles_idx: req.query.articles_idx,
      post_write: body.post_write,
      // post_comment: body.post_comment,
      post_Date: articleDate,
      user_idx: body.user_idx,
      category_idx: body.category_idx,
      post_title: body.post_title,
      content: body.content,
      // comment_see: body.comment_see,
      // thumb_content: body.thumb_content,
    });
    await db.commit(connection);
    res.status(200).json({ articleResult });
  } catch (err) {
    console.log("err : ", err);
    next();
  }
});

//조회수
router.put("/post_see", async function (req, res, next) {
  //   {
  //     "articles_idx":3,
  //     "post_see":2
  // }
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await article.Seeupdate(connection, {
      articles_idx: req.query.articles_idx,
      // post_see: req.body.post_see,
    });
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("err : ", err);
    next();
  }
});

//댓글조회수
// router.put("/comment_see", async function (req, res, next) {
//   //   {
//   //     "articles_idx":3,
//   //     "post_see":2
//   // }
//   try {
//     const connection = await db.getConnection();
//     await db.beginTransaction(connection);
//     const result = await article.Commnetseeupdate(connection, {
//       articles_idx: req.query.articles_idx,
//       // post_see: req.body.post_see,
//     });
//     await db.commit(connection);
//     res.status(200).json({ result });
//   } catch (err) {
//     console.log("err : ", err);
//     next();
//   }
// });
// //집계함수(mysql,group by)
//추천수
router.put("/staradd", async function (req, res, next) {
  //   {
  //   "star":1
  // }
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    // const articleList = await article.stargetList(connection, {
    //   star: req.body.star, //[]의형태로 가져옴 -> 그냥규칙임 암기하셈
    // });
    // console.log("req.query.articles_idx : ", req.query.articles_idx);
    // console.log("articleList : ", articleList);
    // if (articleList.length > 0) {
    //   //[]형태로옴
    //   return res.status(409).json({ errorMessage: "Duplicate recommend" }); //return쓰면 여기서 종료되므로 굳이 else if 안써도됨
    // }

    const result = await article.Starupdate(connection, {
      articles_idx: req.query.articles_idx,
      // star: req.body.star,
    });
    // console.log("result : ", result.length);
    // if (result.length > 0) {
    //   //[]형태로옴
    //   return res.status(409).json({ errorMessage: "Duplicate recommend" }); //return쓰면 여기서 종료되므로 굳이 else if 안써도됨
    // }
    // await db.commit(connection);
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    console.log("err : ", err);
    next();
  }
});
// router.post("/postcomment", async function (req, res, next) {
//   try {
//     const body = req.body;
//     const connection = await db.getConnection();
//     await db.beginTransaction(connection);
//     const result = await article.update(connection, body);
//     await db.commit(connection);
//     res.status(200).json({ result });
//   } catch (err) {
//     next();
//   }
// });

//게시글삭제
router.delete("/", async function (req, res, next) {
  try {
    const connection = await db.getConnection();
    await db.beginTransaction(connection);
    const result = await article.delete(connection, {
      articles_idx: req.query.articles_idx,
    });
    await db.commit(connection);
    res.status(200).json({ result });
  } catch (err) {
    next();
  }
});

module.exports = router;
