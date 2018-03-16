var qs = require('querystring')
import axios from 'axios'

axios.defaults.timeout = 8000;
// let loadinginstace;
// // 添加请求拦截器
// axios.interceptors.request.use(
//   config => {
//     console.log('1::1');
//     return config;
//   },
//   error => {
//     console.log('1::2');
//     return Promise.reject(error);
//   }
// );
// // 添加响应拦截器
// axios.interceptors.response.use(
//   response => {
//     console.log('2::1');
//     return response;
//   },
//   (error,a) => {
//     return Promise.reject(error);
//   }
// );


//  get、post
export default (type, url, data, mixin) => {
    const qsData = qs.stringify(data);
    const opt = {
      method: "get",
      url: url
    };
  
    return new Promise((resolve, reject) => {
      switch (type) {
        case "GET":
          if (data && Object.keys(data).length > 0) {
            Object.assign(opt, {
              url: `${url}?${qsData}`
            });
          }
          break;
  
        case "POST":
          Object.assign(opt, {
            method: "post",
            data: data
          });
          break;
      }
      console.log(opt);
      axios(opt)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };