### 칼럼소개

- primary key: 다른 여러종류의 칼럼과 구별하기위한 일종의 사람이름과같은 유니크한 칼럼
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

### article api 소개

- get(전체목록 조회api)
<img width="896" alt="스크린샷 2021-09-25 오전 11 04 26" src="https://user-images.githubusercontent.com/62092273/134754755-7c663a44-0c7f-49df-a7c1-128575665872.png">

<img width="899" alt="스크린샷 2021-09-25 오전 11 04 44" src="https://user-images.githubusercontent.com/62092273/134754790-83cc6383-5da4-44e6-9fad-4a2aa7f45f11.png">

</br>
이러한 결과값이 나오는것을 알수있다.

 - put(게시글 수정 api)
 <img width="1332" alt="스크린샷 2021-09-25 오전 11 28 28" src="https://user-images.githubusercontent.com/62092273/134754876-5c6fa82c-efb3-410d-81a4-64e2aabbdf22.png">
 
 client는 body부분에 수정하고싶은 게시글의 post_write,user_idx,category_idx,post_title,content를 입력후 수정을한다.
 </br>
 </br>
 </br>
 
 - post(게시글 작성 api)
![스크린샷 2021-09-25 오전 11 34 04](https://user-images.githubusercontent.com/62092273/134755030-12715dfd-6e58-40a0-9d64-379b5c541496.png)
성새패아자 적송허눈 api 상세페이지에 입력할 post_write, user_idx(게시글작성자),content(내용),post_title(제목),category_idx(게시글입력할카테고리(1~6까지있음)를 입력함 **post_Date**는입력안해도됨
</br>
</br>
</br>
- delete(게시글 삭제 api)

![스크린샷 2021-09-25 오전 11 42 14](https://user-images.githubusercontent.com/62092273/134755686-ea3336e6-d884-45a5-a46d-7eaf66c4faaf.png)

![스크린샷 2021-09-25 오전 11 45 01](https://user-images.githubusercontent.com/62092273/134755722-44517099-fcdc-42a5-928b-3483d84c94e3.png)
</br>
</br>
</br>

- get(상세페이지 불러오는 api)

불러오고싶은 상세페이지를 articles_idx에 넣어 페이지를 불러옴
![스크린샷 2021-09-25 오후 12 05 47](https://user-images.githubusercontent.com/62092273/134755863-26650ef4-adc3-4314-9f71-ad451fbb55f9.png)
![스크린샷 2021-09-25 오후 12 05 58](https://user-images.githubusercontent.com/62092273/134755890-967ba3b0-c937-4bd3-99fe-ccfa8d66ca4f.png)
</br>
</br>

- get(찾기 api)

post_title을 기준으로 post_title과 일치하는 게시글을을 불러오는 api

![스크린샷 2021-09-25 오후 12 14 18](https://user-images.githubusercontent.com/62092273/134756023-daf43eed-63e6-4ed2-94bc-d8e8fe54b1ff.png)

<img width="551" alt="스크린샷 2021-09-25 오후 12 13 04" src="https://user-images.githubusercontent.com/62092273/134756004-67e190ae-51d2-4468-8864-0de6a54657a1.png">


- get(페이지네이션)

![스크린샷 2021-09-25 오후 12 15 52](https://user-images.githubusercontent.com/62092273/134756066-0f4cafce-4768-4288-9154-a176fff6f252.png)
![스크린샷 2021-09-25 오후 12 16 45](https://user-images.githubusercontent.com/62092273/134756100-e4d6d26e-9d87-460d-88d4-3de7476dca03.png)

기준페이지(12개게시글)을 기준으로 페이지를 나눠서 보여줌, 기준페이지(12)를 넘어가면 페이지가 +1식된다. ex(page1: 1~12, page2:2~13...)

- put(조회수올리기 api)

![스크린샷 2021-09-25 오후 12 19 55](https://user-images.githubusercontent.com/62092273/134756172-97e9ca9f-94ca-4b27-a223-18b8c6201fcb.png)
![스크린샷 2021-09-25 오후 12 20 38](https://user-images.githubusercontent.com/62092273/134756185-50278134-36ee-4998-9e9a-c3c9d4cca14d.png)

조회수를 올리고 싶은 게시글을 선택해 조회수를 올리는 api, 조회수올릴 articles_idx를 선택해 입력을 하면 조회수가 +1된다(연속해서 api호출하면 호출횟수만큼 조회수+1 이됨)

- put(추천수올리기api)

![스크린샷 2021-09-25 오후 12 29 49](https://user-images.githubusercontent.com/62092273/134756418-62767241-310a-431a-a845-561a65f198a4.png)
![스크린샷 2021-09-25 오후 12 29 58](https://user-images.githubusercontent.com/62092273/134756432-8b18dea3-0076-414b-b1d6-5bca5ec801d4.png)

추천수올리고싶은 게시글에대해서 추천버튼을 눌렀을떄 추천수가 올라가는 api
추천올리고싶은 comment_idx에 대해서 입력을하면 해당 article에있는 star가 +1이됨(중복으로 누르기가능)

### category api

- get(category api)

![스크린샷 2021-09-25 오후 12 35 00](https://user-images.githubusercontent.com/62092273/134756504-b1c104ad-8c10-4123-be8d-10cf43067c67.png)
![스크린샷 2021-09-25 오후 12 35 10](https://user-images.githubusercontent.com/62092273/134756545-f59e8617-8e68-4430-a533-36820a4fe881.png)

카테고리버튼을 눌렀을때 해당 카테고리안에있는 게시글들을 불러오는 api, query부분에 불러올수있는 category 인덱스(1~6)을 입력하면 해당되는 게시글들이 불러와진다.

### comment api

- get(특정 게시글에있는 댓글을볼수있는 api)

![스크린샷 2021-09-25 오후 12 50 43](https://user-images.githubusercontent.com/62092273/134756965-802e4c3f-6637-4f42-a8e4-32165832eb1b.png)
![스크린샷 2021-09-25 오후 12 50 56](https://user-images.githubusercontent.com/62092273/134756969-d594aab6-c050-4b79-a3ec-2f36094e6827.png)


특정게시글에있는 모든 댓글을 볼수있는 api, 특정게시글(articles_idx)에 게시글인덱스(query)를입력하면 해당겍시글에 작성된 모든 댓글을 볼수있다. 

- post(댓글작성 api)

![스크린샷 2021-09-25 오후 12 53 51](https://user-images.githubusercontent.com/62092273/134757020-2db2a6e8-7b37-41a0-ac7d-f07f1bdda731.png)
<img width="894" alt="스크린샷 2021-09-25 오후 12 54 20" src="https://user-images.githubusercontent.com/62092273/134757024-3047d8c2-3846-4490-b58b-5a6760ce9d40.png">

댓글을 잣성하게해주는 api, 댓글을 작성할위치(articles_idx)와 작성자(user_idx)를 입력해 댓글작성

- delete(댓글삭제)

![스크린샷 2021-09-25 오후 12 57 11](https://user-images.githubusercontent.com/62092273/134757079-80a10b1e-0cf7-48c7-b09f-a2eb0ac17add.png)
![스크린샷 2021-09-25 오후 12 57 21](https://user-images.githubusercontent.com/62092273/134757102-e1836718-82ae-4fd3-b8de-4cf931cf1eb4.png)

댓글을 삭제해주는 api, 삭제하고싶은 댓글(comment_idx)을 query부분에 입력하면 해당댓글삭제

- put(댓글수올리기 api)

![스크린샷 2021-09-25 오후 1 08 42](https://user-images.githubusercontent.com/62092273/134757395-9f6e10e2-86aa-4a25-a43b-242342018dd1.png)
![스크린샷 2021-09-25 오후 1 09 06](https://user-images.githubusercontent.com/62092273/134757404-3821b374-8fba-4ce0-971c-ef8709df361f.png)


댓글작성후 해당게시글의 댓글수를 올리기위한 api, 올리기싶은 댓글(comment_idx)를입력하면 comment_see +1 이됨

-put(댓글수정 a[i)

![스크린샷 2021-09-25 오후 1 11 38](https://user-images.githubusercontent.com/62092273/134757469-9bd52e51-a100-4ea4-b6b1-4411029a2baf.png)
<img width="488" alt="스크린샷 2021-09-25 오후 1 13 30" src="https://user-images.githubusercontent.com/62092273/134757513-d5392591-3d04-45cc-94e2-9f35ac458338.png">

댓글수정하는 api로서 수정하고자하는댓글(comment_idx)와 수정내용(post_comment)를 입력하면 댓글이수정됨, 작성자는선택안해도 수정가능


