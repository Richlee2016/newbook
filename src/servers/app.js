var api = require("./api");

module.exports = function(app) {
    console.log(0);
    app.get("/book/read", api.read);
    app.get("/api/free", api.free);
    app.get("/api/searchpage", api.searchpage);
    app.get("/api/freeBookSearch", api.freeBookSearch);
};
