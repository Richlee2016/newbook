import IScroll from "iscroll/build/iscroll-probe";
class Rscroll {
  constructor(el, vnode) {
    this.el = el;
    this.vnode = vnode;
    this.S = null;
  }
  
  init(init, time = 100) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const myScroll = new IScroll(this.el, init);
        resolve(myScroll);
      }, time);
    });
  }
}

export default Rscroll;
