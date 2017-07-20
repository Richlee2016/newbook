var qs = require('querystring')
import axios from 'axios'

//  get、post
export default (type, url, data) => {
    var qsData = qs.stringify(data)
    return new Promise((resolve, reject) => {
        if (type === 'GET') {
            console.log(url, qsData);
            if (data && Object.keys(data).length > 0) {
                url = `${url}?${qsData}`
                console.log(url);
            }
            axios.get(url)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        };

        if (type === 'POST') {
            console.log(url, qsData);
            axios.post(url, qsData)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        }
    });
}