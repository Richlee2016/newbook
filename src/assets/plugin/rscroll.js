import "../utils/sprint.min.js"
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

import downGif from "./components/upGif";
import banner from "./components/banner";
import Slide from "./Rscroll/slide"
import MyScroll from "./Rscroll/scroll"

export default {
  install(Vue) {
    Vue.directive("scroll", {
      bind(el, binding, node) {
        const self = node.context;
        const opt = self.RS_opt||{};
        const r_scroll = new MyScroll(el,self);
        r_scroll.start(opt);
      }
    });

    Vue.directive("slide", {
      bind(el, binding, node) {
        const self = node.context;
        const opt = self.RS_banner||{};
        const r_slide = new Slide(el, self);
        r_slide.start(opt);
      }
    });

    Vue.mixin({
      components: {
        "r-upgif": downGif,
        "r-banner":banner
      }
    });
  }
};
