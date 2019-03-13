var Crawler = require("crawler");
let baseUrl = "https://sh.lianjia.com/ershoufang/";
var $ = null;

// 最新
var getLastest = new Crawler({
  rateLimit: 1000,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      $ = res.$;
      let url = $(
        "#content > div.leftContent > div.orderFilter > div > ul > li:nth-child(2) > h3 > a"
      ).attr("href");
      baseUrl = "https://sh.lianjia.com" + url;
    }
    done();
  }
});
// 小区信息
var getInfo = new Crawler({
  rateLimit: 1000,
  callback: function(error, res, done) {
    console.log(2, baseUrl);
    if (error) {
      console.log(error);
    } else {
      $ = res.$;
      $(
        "#content > div.leftContent > ul > li:nth-child(30) > div.info.clear > div.address > div > a"
      ).each((i, el) => {
        const str = el.next.data.trim();
        let msgArr = [];
        str.split("|").map(item => {
          let msg = item.trim();
          if (msg.length > 0) msgArr.push(msg);
        });
        console.log({
          community: el.children[0].data,
          type: msgArr[0],
          size: msgArr[1],
          hasLift: msgArr.includes("有电梯")
        });
        console.log("\n");
      });
    }
    done();
  }
});

getLastest.queue(baseUrl);