// var env = process.env.NODE_ENV || 'development';
// let dbUrl = 'mongodb://rich_movie:richmovie345642459@127.0.0.1:18888/richmovie'
// if (env === 'development') {
//     dbUrl = 'mongodb://localhost:27017/koaapi';
// };
module.exports= {
    db: 'mongodb://localhost:27017/koaapi',
    // db:'mongodb://rich_movie:richmovie345642459@127.0.0.1:18888/richmovie',
    wechat:{
        appID:'wxa74fa379e56fc98a',
        appsecret:'51e021265600de8df53077641d27e5ad',
        token:'Rich19Lee90Love04you03'
    },
    SITE_ROOT_URL:"http://173gg43187.iok.la",
    "qiniu":{
        "AK":'OBDA2gN9-FJfAzWExCHGNNG9QW5FqNtUrD57IwIi',
        "SK":'lkrOjtgXY4WmN7NcJNSKNXb7aLue13_CPg_0X0NH'
    }
}