### 칼럼소개

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
thumb_content : 게시글 소개

```

### users api

#### post signup(회원가입)

```
회원id, pwd , name 넣어서 가입
{
"user_id":"kim",
"user_pwd":"123",
"user_name":"김민수"
}
```

salt는 암호의 보안성을 높이기 위해 사용되고 일방향성을 가진 해쉬를 생성할떄 무작위 문자열을 생성하여 추가 (cypto js로 여러 암호화 알고리즘을 사용하게 해주는 모듈)

#### post signin(로그인)

```
아이디랑 비밀번호로 확인
req
{
"user_id":"123ddㅜㅓ",
"user_pwd":"asd"
}
```

```
res
{
"login": true,
"result": {
"user_idx": 6,
"user_id": "123ddㅜㅓ",
"user_name": "ㅊㄹ"
}
}
```

#### put 회원정보 수정

```
req
{
"user_idx" : 5,
"user_id" : "kim",
"user_pwd": "322",
"user_name": "wwww"
}
```

```
res
{
"results": {
"fieldCount": 0,
"affectedRows": 1,
"insertId": 0,
"serverStatus": 3,
"warningCount": 0,
"message": "(Rows matched: 1 Changed: 1 Warnings: 0",
"protocol41": true,
"changedRows": 1
}
}
```

#### delete 회원정보 삭제

```
req
{
"user_idx":"4"
}
```

```
req
{
"results": {
"fieldCount": 0,
"affectedRows": 1,
"insertId": 0,
"serverStatus": 3,
"warningCount": 0,
"message": "",
"protocol41": true,
"changedRows": 0
}
}
```
