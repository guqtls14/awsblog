### 칼럼소개

- promary key: 다른 여러종류의 칼럼과 구별하기위한 일종의 사람이름과같은 유니크한 칼럼
  </br>

## article 테이블 칼럼 소개

```
star : 추천수
post_title : 게시글 제목
post_Date : 게시글 작성날짜
post_write : 글쓴이
post_comment : 댓글
post_see : 조회수
user_idx : 로그인한 사용자
category_idx : 카테고리
content : 게시글내용
```

## users 테이블 칼럼 소개

```
user_idx: primary key
user_id: id,
user_pwd:pwd,
user_name:닉네임
```

## comment테이블의 칼럼소개

```
comment_idx: primary key
post_comment:댓글내용
user_idx:댓글쓰는회원
articles_idx:댓글쓰는 게시글
```

## post_img 테이블의 칼럼소개

```
img_idx: primary key`
img_paht: 이미지가 저장되는 storage의 주소
articles_idx: 이미지가 입력되는 게시글의 idx
```

## category 테이블의 칼럼소개

```
category_idx : primary key
category_name : 카테고리이름
```

</br>
</br>
</br>
</br>

## api소개

1. article api 소개

- get(전체목록 조회api)

![](./shinhyuplo/데스크탑/스크린샷 2021-09-25 오전 11.04.44.png)
