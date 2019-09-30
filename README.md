# 노드JS 웹 크롤링 + mocha 웹 테스트

## 웹 크롤링? 스크래핑?
> 웹 크롤링 - 웹 크롤러(자동화 봇)가 일정 규칙으로 웹페이지를 브라우징 하는 것<br />
웹 스크래핑 - 웹 사이트 상에서 원하는 정보를 추출하는 기술

## 사용할 라이브러리
### 1. Puppeteer
> Python 에서는 selenium 이 주로 쓰입니다.

Puppeteer는 Chrome 브라우저의 개발 도구 프로토콜을 통해서 Chrome 또는 Chromium을 제어할 수 있는 ​​API를 제공하는 Node Js 라이브러리이고, Puppeteer는 기본적으로 헤드리스 브라우저 기능을 제공합니다.

### 2. Mocha + Chai
Mocha 는 노드에서 실행되는 테스트 프레임 워크입니다.

Chai 는 노드 및 브라우저용 BDD(Behaviour-Driven Development) / TDD(Test-Driven Development) 라이브러리로, 모든 자바스크립트 테스트 프레임워크와 짝을 이룰수 있는 라이브러리 입니다.

### 3. cheerio

Cheerio 는 jQuery 문법을 쓰듯이, html 코드를 파싱하고, dom select를 가능하게 해줍니다.

### 4. request + request-promise

HTTP 네트워크 라이브러리 입니다. (브라우저의 fetch)

+ request-promise 로 promise 또는 async, await 문법을 사용하게 해줍니다.


### 테스트 실행

```
bash
$ npm test

$ node test2.js
```

npm test : 에듀스토어 대시보드의 상품명 수정 스토리를 테스트 합니다.
node test2.js : 네이버 인기검색어 1 ~ 20 위 까지를 스크래칭 합니다.