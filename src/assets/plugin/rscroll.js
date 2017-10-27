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
  init: { mouseWheel: true, click: true },
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
    // this.el.style.height = '100vh';
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
    // const {upGif} = this.vnode.$refs;
    this.S.on("scrollEnd", () => {
      const { maxScrollY, y } = this.S;
      const over = () => {
        setTimeout(() => {
          this.S.refresh();
          console.log(maxScrollY - 20);
          this.S.scrollTo(0, maxScrollY - 30);
        }, 30);
      };
      if (-y > -maxScrollY - 10) {
        // upGif.$data.out = false;
        this.vnode.RS_upload && this.vnode.RS_upload(over);
      }
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
    this.initSet();
    // 初始化
    this.initScroll().then(S => {
      this.S = S;
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

import downGif from "./components/upGif"

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
      components:{
        "r-upgif":downGif
      }
    })

  }
};
