//换一换
const change = {
    data() {
        return {
            num: 0
        }
    },
    methods: {
        onemore() {
            this.num++;
            this.num = this.num % 3;
        }
    }
}

const loading = {
    methods: {
        _loading(axios, options, cb) {
            [axios](options).then(res => {
                    vue.$offLoading();
                    cb && cb();
                    return Promise.resolve(res);
                })
                .then(res => {
                    vue.$onLoading(pullAxios);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    // created() {
    //     vue.$onLoading(this._loading);
    // },
    // activated() {
    //     vue.$onLoading(this._loading);
    // }
}



export { translate, change, loading };