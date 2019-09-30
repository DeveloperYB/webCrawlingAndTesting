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