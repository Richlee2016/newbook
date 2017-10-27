export default {
  install(Vue) {
    //切换loading完成取消
    Vue.prototype.$overLoad = function(time = 800) {
      console.log(`overload${time}ms`);
      const fn = () => {
        if (this.$parent) {
          this.$parent.fade = false;
        }
        if (this.$parent.$parent) {
          this.$parent.$parent.fade = false;
        }
      };
      if (time && typeof time === "number") {
        setTimeout(() => {
          fn();
        }, time);
      } else {
        fn();
      }
    };
    Vue.prototype.$overOut = function(time = 1000) {
      console.log(time);
      const fn = () => {
        if (this.$parent) {
          this.$parent.fade = true;
        }
        if (this.$parent.$parent) {
          this.$parent.$parent.fade = true;
        }
      };
      if (time && typeof time === "number") {
        setTimeout(() => {
          fn();
        }, time);
      } else {
        fn();
      }
    };
  }
};
