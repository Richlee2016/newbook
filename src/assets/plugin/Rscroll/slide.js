import Rscroll from "./index";
class Slide extends Rscroll {
  constructor(el, vnode) {
    super(el, vnode);
    this.o = {
      loop: false,
      autoPlay: true,
      autoTime: 5000
    };
    this.initOpt ={
      click: true,
      probeType: 1,
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: true,
      snapSpeed: 400
    }
    this.autoTimer = null;
  }

  domSet() {
    const oUl = $(this.el).find("ul");
    let aLi = $(this.el).find("ul li");
    if (this.o.loop) {
      const f = aLi.eq(0).clone();
      const l = aLi.eq(aLi.size() - 1).clone();
      oUl.append(f);
      l.insertBefore(aLi.eq(0));
      aLi = $(this.el).find("ul li");
    }
    oUl.css({ width: aLi.size() * 100 + "%" });
  }

  initSet() {
    if (this.o.loop) {
      this.S.goToPage(1, 0, 0);
    }
  }

  loop() {
    this.S.on("scrollEnd", () => {
      const { scrollerWidth, wrapperWidth, pages, x } = this.S;
      if (x === 0) {
        this.S.goToPage(pages.length - 2, 0, 0);
      } else if (x === -(scrollerWidth - wrapperWidth)) {
        this.S.goToPage(1, 0, 0);
      }
    });
  }

  auto() {
    let num = 0;
    let dir = true;
    const { pages } = this.S;
    const autoLoopGO = () => {
      num = num % pages.length + 1;
      if (num === pages.length) {
        num = 2;
      }
      this.S.goToPage(num, 0, 400);
    };
    const autoGo = () => {
      if (num === pages.length - 1) dir = false;
      if (num === 0) dir = true;
      if (dir) {
        num++;
      } else {
        num--;
      }
      this.S.goToPage(num, 0, 400);
    };
    let timer = null;
    if (this.o.loop) {
      timer = setInterval(autoLoopGO, this.o.autoTime);
    } else {
      timer = setInterval(autoGo, this.o.autoTime);
    }
    this.S.on("scroll", () => {
      clearInterval(timer);
    });
  }

  start(opt) {
    this.o = Object.assign({}, this.o, opt || {});
    setTimeout(() => {
      this.domSet();
    }, 460);
    this.init(this.initOpt, 500).then(S => {
      this.S = S;
      this.initSet();
      this.o.loop ? this.loop() : null; //循环
      this.o.autoPlay ? this.auto() : null; //自动播放
    });
  }
}

export default Slide;
