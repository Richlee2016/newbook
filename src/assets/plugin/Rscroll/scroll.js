import Rscroll from "./index";
class Scroll extends Rscroll {
  constructor(el, vnode) {
    super(el, vnode);
    this.o = {
      downLoad: false, //下拉刷新
      upLoad: false //上拉刷新
    };
    this.initOpt = { mouseWheel: true, click: true, probeType: 1 }
  }

  initSet() {
    const list = this.el.querySelector(".scroll-list");
    if (list) {
      list.style.minHeight = this.el.offsetHeight + 40 + "px";
    }
  }

  upLoad() {
    const { upGif } = this.vnode.$refs; //获取 vnode

    let down = function() {}; //加载完函数
    let over = function() {}; //加载结束函数

    // 进入页面第一次加载
    this.vnode.RS_upload && this.vnode.RS_upload(down);
    // 请求封装
    const fetchGo = () => {
      const { maxScrollY, y } = this.S;
      down = () => {
        setTimeout(() => {
          this.S.refresh();
          this.S.scrollTo(0, maxScrollY - 30);
        }, 30);
      };
      over = () => {
        upGif.$data.load = false;
        this.S.scrollTo(0, maxScrollY + 40, 1000);
      };
      if (-y > -maxScrollY - 20) {
        this.vnode.RS_upload && this.vnode.RS_upload(down, over);
      }
    };

    this.S.on("scrollEnd", () => {
      fetchGo();
    });
    this.S.on("scroll", () => {
      fetchGo();
    });
  }

  downLoad() {
    let maxY = 0;
    this.S.on("scroll", () => {
      const { y } = this.S;
      if (y > 10) {
        maxY = y;
      }
    });
    this.S.on("scrollEnd", () => {
      const over = () => {
        setTimeout(() => {
          this.S.refresh();
          maxY = 0;
        }, 30);
      };
      if (maxY > 40) {
        this.vnode.RS_download && this.vnode.RS_download(over);
      }
    });
  }

  returnRS(){
    if(!this.vnode.RS){
      this.vnode.RS = this.S;
    };
  }

  start(opt) {
    this.o = Object.assign({}, this.o, opt || {});
    this.initOpt = Object.assign({}, this.initOpt, opt.init || {});
    this.init(this.initOpt).then(S => {
      this.S = S;
      this.returnRS();
      this.initSet();
      this.S.on("beforeScrollStart", () => {
        setTimeout(() => {
          this.S.refresh();
        }, 30);
      });
      // 向上滑动
      this.o.upLoad ? this.upLoad() : null; //向上滑动 加载
      // 向下滑动
      this.o.downLoad ? this.downLoad() : null; //向下滑动 加载
    });
  }
}

export default Scroll;
