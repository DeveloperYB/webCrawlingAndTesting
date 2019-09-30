const request = require('request-promise');
const cheerio = require('cheerio');

const test = async () => {
  const secondTest = 'https://www.naver.com';
  const testHTML = await request(secondTest);
  const $ = cheerio.load(testHTML, {decodeEntities: false});
  const tdElementsTest = $('.PM_CL_realtimeKeyword_list_base').find('ul li a:nth-child(1) span:nth-child(2).ah_k');
  const testObj = [];
  for(let a = 0; a < tdElementsTest.length; a++) {
    console.dir(tdElementsTest[a].children);
    testObj.push(tdElementsTest[a].children[0].data.trim());
  }
  
  console.dir({ length: tdElementsTest.length, testObj });  
};
test();