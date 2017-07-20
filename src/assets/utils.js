//数组分组		
export const setGroup = function() {
    var args = Array.prototype.slice.call(arguments),
        obj = args.splice(0, 1)[0],
        type = args.slice(0, 1)[0],
        len = args.length,
        extArr = [],
        arr = [],
        i = 0,
        j = 0;
    for (j; j < obj.length; j++) {
        extArr[j] = obj[j];
    };
    var isObject = Object.prototype.toString.call(type) === "[object Object]" ? true : false;
    if (isObject) {
        var eva = Math.ceil(obj.length / type.num);
        while (i < type.num - 1) {
            arr.push(extArr.splice(0, eva));
            i++;
        };
        arr.push(extArr.splice(0, eva));
    } else {
        while (args[i]) {
            arr.push(extArr.splice(0, args[i]));
            i++;
        };
    }
    return arr;
}

//解析more 标题类容正则
export const chineseReg = /([\u4e00-\u9fa5]+)/g;