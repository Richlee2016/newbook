var cookieSet =
    "uLocale=zh_CN; Hm_lvt_a1d10542fc664b658c3ce982b1cf4937=1489720605,1489996190,1490060009,1490144056; Hm_lpvt_a1d10542fc664b658c3ce982b1cf4937=1490144059; app_id=mi_wap; build=8888; device_id=D950FH275FLEFLJX; user_type=2; device_hash=76dc2d8d805f607f7e10f8596e06730a; user_id=1236127735; token=s4xOpaiEvnQH-8h_y541nhFPb6E-Nf3j_8ZBQDTS5gYkuzGxs5cko2iW-tJ9Mvl8";

module.exports = {
    context: [
        "/hs/v3/channel/418", //首页
        "/rock/book/recommend", //瀑布流请求
        "/store/v0/ad", //搜索页面
        "/store/v0/fiction/list/", //banner
        "/hs/v3/channel/", //频道更多
        "/store/v0/ad/persistent", //更多专题
        "/hs/v0/android/store/category", //分类
        "/store/v0/fiction/category/",
        "/hs/v0/android/fiction/category/",
        "/store/v0/fiction/tag",
        "/store/v0/ad/ranks", //排行
        "/store/v0/fiction/rank",
        "/hs/v0/android/fiction/book/", //详情
        // '/store/v0/ad?key=df_search_tags&a=1', //搜索页面
        "/store/v0/lib/query/onebox", //搜索
        "/store/v0/fiction/detail/" //章节
    ],
    options: {
        target: "http://dushu.xiaomi.com/",
        changeOrigin: true,
        onProxyReq: function(proxyReq, req, res) {
            proxyReq.setHeader("Cookie", cookieSet);
        }
    }
};