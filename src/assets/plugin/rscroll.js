import IScroll from "iscroll/build/iscroll-probe";
function isPassive() {
  var supportsPassiveOption = false;
  try {
    addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function() {
          supportsPassiveOption = true;
        }
      })
    );
  } catch (e) {}
  return supportsPassiveOption;
}

document.addEventListener(
  "touchmove",
  function(e) {
    e.preventDefault();
  },
  isPassive()
    ? {
        capture: false,
        passive: false
      }
    : false
);

/**
RS_opt={
  init,
  downLoad:false,//下拉刷新
  upLoad:false //上拉刷新
}
 */

let RS_opt = {
  init: { mouseWheel: true, click: true, probeType: 1 },
  downLoad: false, //下拉刷新
  upLoad: false //上拉刷新
};

class Rscroll {
  constructor(el, vnode, opt) {
    this.el = el;
    this.vnode = vnode;
    this.o = opt;
    this.S = null;
  }

  initSet() {
    const list = this.el.querySelector(".scroll-list");
    list.style.minHeight=this.el.offsetHeight + 40 + 'px';
  }

  initScroll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const myScroll = new IScroll(this.el, this.o.init);
        resolve(myScroll);
      }, 100);
    });
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
        this.S.scrollTo(0, maxScrollY + 40,1000);
      }
      if (-y > -maxScrollY - 20) {
        this.vnode.RS_upload && this.vnode.RS_upload(down,over);
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

  scrollGo() {
    // 初始设置
    // this.initSet();
    // 初始化
    this.initScroll().then(S => {
      this.S = S;
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

import downGif from "./components/upGif";

export default {
  install(Vue) {
    Vue.directive("scroll", {
      bind(el, binding, node) {
        const self = node.context;
        const opt = Object.assign({}, RS_opt, self.RS_opt);
        //初始化
        const r_scroll = new Rscroll(el, self, opt);
        r_scroll.scrollGo();
      }
    });

    Vue.mixin({
      components: {
        "r-upgif": downGif
      }
    });
  }
};
