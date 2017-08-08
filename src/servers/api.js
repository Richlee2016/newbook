const request = require('request-promise');
const cheerio = require('cheerio');
const cookieSet = 'Hm_lvt_a1d10542fc664b658c3ce982b1cf4937=1500511240; Hm_lpvt_a1d10542fc664b658c3ce982b1cf4937=1500511240; app_id=mi_wap; build=8888; device_id=D9501NJS0HC9AXJ4; user_type=2; device_hash=a6643ed74f772a613f4fc225419a8a2d';

exports.read = function(req, res) {
    var query = req.query;
    var id = req.body.id;
    var chapter = req.body.chapter;
    var geturl = `http://dushu.xiaomi.com/drm/v0/fiction/link?fiction_id=${id}&chapter_id=${chapter}&format=jsonp`;
    var options = {
        method: 'GET',
        uri: geturl,
        headers: { 'Cookie': cookieSet },
        json: true
    }
    request(options)
        .then(body => {
            return request(body.url)
                .then(text => {
                    var reg = /\'(.*)\'/g;
                    var txt = reg.exec(text);
                    var result = new Buffer(txt[1], 'base64').toString()
                    res.json({ txt: result })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.free = function(req, res) {
    var freeSet = {
        uri: 'http://dushu.xiaomi.com/hs/v3/channel/371',
        headers: { 'Cookie': cookieSet },
        json: true
    }
    request(freeSet)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
        })
}

exports.searchpage = function(req, res) {
    var freeSet = {
        uri: 'http://dushu.xiaomi.com/store/v0/ad?key=df_search_tags&a=1',
        headers: { 'Cookie': cookieSet },
        json: true
    }
    request(freeSet)
        .then(result => {
            res.json({ msg: result })
        })
        .catch(err => {
            console.log(err);
        })
}

//免费小说获取
//小说free
const prefix = 'http://www.23us.cc';
var bookSrc = {
        search: 'http://zhannei.baidu.com/cse/search?s=1682272515249779940&entry=1&q=',
        book: {},
        chapter: [],
        text: ""
    }
    //test
exports.freeSearch = function(req, res, next) {
    console.log(req.body.name, encodeURI(req.body.name));
    request({
            method: 'GET',
            uri: bookSrc.search + encodeURI(req.body.name),
            json: true
        })
        .then(data => {
            var $ = cheerio.load(data);
            var bookDom = $('.result-item').eq(0).find('.result-game-item-detail a');
            var result = {
                href: bookDom.attr('href'),
                title: bookDom.attr('title')
            }

            if (req.body.name === result.title) {
                req.book = result;
                bookSrc.book = result;
                // return Promise.resolve(result);
            } else {
                console.log('do not have this book');
            };
            next();
        })
        .catch(err => {
            console.log(err);
        })
}


exports.freeChapter = function(req, res, next) {
    var href = req.book.href;
    request({
            method: 'GET',
            uri: href,
            json: true
        })
        .then(data => {
            var $ = cheerio.load(data);
            var chapterDom = $('.chapterlist dd a').get();
            var chapter = chapterDom.map(function(o) {
                return {
                    href: $(o).attr('href'),
                    text: $(o).text()
                }
            });
            res.json({ data: chapter });
        })
        .catch(err => {
            console.log(err);
        })
};
exports.freeRead = function(req, res, next) {
    var chapter = req.params.id;
    request({
            method: 'GET',
            uri: bookSrc.book.href + chapter,
            json: true
        })
        .then(data => {
            var $ = cheerio.load(data);
            var text = $("#content").text();
            var reg = /\S+/g;
            var result = text.match(reg);
            res.json({ data: result });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.emoji = function(req, res, next) {

}