const serBook = require('../api/book')
const myBook = new serBook();
class Crawler {
  constructor() {}
  async fetchFreeBook(req, res) {
    const { params: { id }, query: { name, author } } = req;
    console.log(id, name, author);
    const resg = await myBook.fetchChapter(id, name, author);
    res.json(resg)
  }
  async fetchFreeRead(req, res) {
    const { id,nid,chapter } = req.query;
    console.log( id,nid,chapter);
    const resg = await myBook.FetchContent(id,nid,chapter);
    res.json(resg)
  }
}

module.exports= new Crawler();
