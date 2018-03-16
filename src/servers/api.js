const request = require('request-promise');
const cheerio = require('cheerio');
const cookieSet = 'Hm_lvt_a1d10542fc664b658c3ce982b1cf4937=1500511240; Hm_lpvt_a1d10542fc664b658c3ce982b1cf4937=1500511240; app_id=mi_wap; build=8888; device_id=D9501NJS0HC9AXJ4; user_type=2; device_hash=a6643ed74f772a613f4fc225419a8a2d';

exports.read = function(req, res) {
    var id = req.query.id;
    var chapter = req.query.chapter;
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

const prefixFree = 'http://127.0.0.1:7001/api/books/' 
const freeApi = {
    free:(id,name,author) => `${prefixFree}FreeBooks/${id}?name=${name}&author=${author}`,
    read:(id,chapter) => `${prefixFree}FreeBookRead?id={id}&chapter=${chapter}`
}

exports.freeBookSearch = function(req,res,next){
//     const {name,author,id} = req.query;
//     request('https://www.baidu.com/?tn=39042058_27_oem_dg')
//     .then(data => {
//         res.json(data);
//     })
}

exports.fetchFreeBook = function(req,res,next){
//     const {id,chapter} = req.query;
//     request({
//         method:'get',
//         uri:freeApi.read(id,chapter),
//         json:true
//     })
//     .then(data => {
        // res.json(data);
//     })
}