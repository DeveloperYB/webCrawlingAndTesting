const { assert, expect } = require('chai');
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG

const timeout = 10000;

//테스트할 ID
const test_id = process.env.test_id;
//테스트할 PW
const test_pw = process.env.test_pw;

//입력 할 텍스트
const insert_name =  'insert_' + Math.random().toString(36).substring(2, 15);
const insert_description = 'insert_' + Math.random().toString(36).substring(2, 15);

const delay = (time) => {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

before(async () => {
  const headless = true;
  // const headless = false;
  //브라우저 열기
  browser = await puppeteer.launch({ headless });
  page = await browser.newPage();
});

describe('CRUD체크', () => {
  it('웹사이트 로딩', async () => {
    const response = await page.goto('http://partner-store.classting.net', {waitUntil: 'networkidle2'});
    assert.strictEqual( response.status(), 200 , '웹사이트 응답 없음');
  }).timeout(timeout);

  it('로그인 시도', async () => { 
    expect( await page.$('input#email') , '로그인 아이디 input 없음' ).to.not.null;
    expect( await page.$('input[name="password"]') , '로그인 패스워드 input 없음' ).to.not.null;
    expect( await page.$('button[type="submit"]') , '로그인 버튼이 없음' ).to.not.null;
    await page.focus('input#email');
    await page.keyboard.type(test_id);
    await page.focus('input[name="password"]');
    await page.keyboard.type(test_pw);
    await page.evaluate(() => {
      document.querySelector('button[type="submit"]').click();
    });
    // 리엑트 웹은 value 로 직접 넣어서 안되는 이슈발생.
    // await page.evaluate((a, b) => {
    //   document.querySelector('input#email').value = a;
    //   document.querySelector('input[name="password"]').value = b;
    //   console.log({a, b});
    //   // document.querySelector('button[type="submit"]').click();
    // }, test_id, test_pw);
    const titleEl = '.sc-fYiAbW.jwELaS';
    await page.waitForSelector(titleEl);
    const element = await page.$(titleEl);
    const text = await page.evaluate(element => element.textContent, element);
    expect( text, '첫 페이지가 상품 조회/수정이 아님' ).to.equal('상품 조회/수정');
  }).timeout(timeout);

  it('첫 상품 수정페이지 진입', async () => {
    const editButtonEl = '.MuiTableBody-root tr td:nth-child(2) button';
    await page.waitForSelector(editButtonEl);
    const buttons = await page.$$(editButtonEl);
    expect(buttons.length, '첫페이지 10개 수정 버튼').to.equal(10);
    expect( await page.$(editButtonEl), '상품 수정 버튼이 없음' ).to.not.null;
    await page.evaluate((el) => {
      document.querySelectorAll(el)[0].click();
    }, editButtonEl);
    const titleEl = '.sc-fcdeBU.hOGwYE';
    await page.waitForSelector(titleEl);
    const element = await page.$(titleEl);
    const text = await page.evaluate(element => element.textContent, element);
    expect( text, '상품 수정페이지로 이동 안됨' ).to.have.string('상품 ');
  }).timeout(timeout);

  it('상품명 수정', async () => {
    await delay(2000);
    const productNameInputEl = 'input[placeholder="상품명을 입력해주세요"]';
    expect( await page.$(productNameInputEl) , '상품명 input 없음' ).to.not.null;
    await page.focus(productNameInputEl);
    const value = await page.$eval(
      productNameInputEl,
      el => el.value || el.innerText || ""
    );
    for (let i = 0; i < value.length; i++) {
      await page.keyboard.press("Backspace");
    }
    await page.keyboard.type(insert_name);
    await delay(1000);
    await page.evaluate(() => {
      document.querySelector('button[type="submit"]').click();
    });
    const modalTextEl = '.MuiDialog-root .MuiDialogContent-root.sc-ifAKCX.drTFNF > p';
    await page.waitForSelector(modalTextEl);
    const modalSuccessButtonEl = '.MuiDialogActions-root.MuiDialogActions-spacing > button';
    await page.waitForSelector(modalSuccessButtonEl);
    const modalText = await page.$eval(modalTextEl, p => p.textContent.trim());
    assert.equal( modalText , '상품 수정을 완료하였습니다.', '상품 수정 실패, (모달 내용 틀림)');
  }).timeout(timeout);

  it('상품 수정 완료, 조회/수정 페이지로 재이동', async () => {
    const modalSuccessButtonEl = '.MuiDialogActions-root.MuiDialogActions-spacing > button';
    await page.evaluate((el) => {
      document.querySelector(el).click();
    }, modalSuccessButtonEl);

    const titleEl = '.sc-fYiAbW.jwELaS';
    await page.waitForSelector(titleEl);
    const element = await page.$(titleEl);
    const text = await page.evaluate(element => element.textContent, element);
    expect( text, '상품 조회/수정로 재이동 안함' ).to.equal('상품 조회/수정');
  }).timeout(timeout);

  it('수정명 체크', async () => {
    await delay(2000);
    const productNameEl = '.MuiTableBody-root tr td:nth-child(5) div';
    const productNames = await page.$$(productNameEl);
    expect(productNames.length, '첫페이지 10개 수정명').to.equal(10);
    const productName = await page.$eval('.MuiTableBody-root tr:nth-child(1) td:nth-child(5) div', div => div.textContent.trim());
    assert.equal( productName , insert_name, '상품 수정 실패, (이름이 다름)');
  }).timeout(timeout);
});


// 브라우저 닫기
after(async () => {
  await browser.close();
});