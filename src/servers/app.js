var api = require("./api");
const Free = require('../../server/routes/book')
module.exports = function(app) {
    console.log(0);
    app.get("/book/read", api.read);
    app.get("/api/free", api.free);
    app.get("/api/searchpage", api.searchpage);
    app.get("/api/freeBookSearch", api.freeBookSearch);
    app.get("/api/fetchFreeBook", api.fetchFreeBook);
    app.get('/free/book/:id', Free.fetchFreeBook)
    app.get('/free/read', Free.fetchFreeRead)   
};
