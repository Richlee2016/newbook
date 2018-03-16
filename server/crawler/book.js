const cheerio = require("cheerio");
const request = require("request-promise");
class BookCrawler {
    constructor() {
        this.config = {
            dingDianSearch:q => `http://zhannei.baidu.com/cse/search?s=1682272515249779940&entry=1&q=${encodeURIComponent(q)}`,
            read: (id,nid,chapter) => `https://www.23us.cc/html/${nid}/${id}/${chapter}.html`
        }
    }

    async chapter(href){
        try {
            const resHtml = await request(href);
            console.log(href);
            return this._chapter(resHtml);
        } catch (error) {
            console.error(error);
        }
    }

    async read(id,nid,chapter){
        try {
            const resHtml = await request(this.config.read(id,nid,chapter));
            return this._read(resHtml);
        } catch (error) {
            console.error(error);
        }
    }

    async search(name,author){
        try {
            const resHtml = await request(this.config.dingDianSearch(name));
            if(!resHtml) return;
            return this._search(resHtml,author);
        } catch (error) {
            console.error(error);
        }
    }

    _chapter(html) {
        const $ = cheerio.load(html);
        var chapterDom = $('.chapterlist dd a').get();
        console.log($('.chapterlist dd a').html());
        const numReg = /(\d+).html/;
        var chapter = chapterDom.map(function (o) {
            return {
                href: $(o).attr('href').match(numReg)[1],
                // href: $(o).attr('href'),
                text: $(o).text()
            }
        });
        return chapter;
    }

    _read(html) {
        const $ = cheerio.load(html);
        const text = $("#content").html();
        const title = $(".inner h1").text();
        const reg = /\S+/g;
        if (!text) return;
        const result = text.match(reg);
        return {
            title,
            text: result
        }
    }

    _search(html,author){
        const $ = cheerio.load(html);
        const result = $(".result-list>div").get().map(o => {
            const info = $(o).find('.result-game-item-detail a');
            const getAuthor = $(o).find('.result-game-item-info p').eq(0).find('span').eq(1);
            let regChin = str => str.match(/([\u4e00-\u9fa5]+)/g);
            const oneAuthor = regChin(getAuthor.text()) || [""];
            const reg = /http:\/\/www\.23us\.cc\/html\/(\d+)\/(\d+)\//
            let myHref = info.attr("href");
            const [,a,b] = myHref.match(reg);
            return {
                id:[a,b],
                name:info.attr("title"),
                href:info.attr("href"),
                author:oneAuthor[0]
            }
        })
        const book = result.find(o => o.author === author);
        return book;
    }
}

module.exports = new BookCrawler();