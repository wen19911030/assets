/**
 * 查询location参数
 *
 * @export
 * @param {*} name 参数名称
 * @returns null | string
 */
export function queryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  let str =
    window.location.href.indexOf("#") < window.location.href.indexOf("?")
      ? window.location.href
      : window.location.search;
  const searchStr = str.split("?")[1];
  if (searchStr) {
    const r = searchStr.match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
  }
  return null;
}

/**
 * 时间格式化 'YYYY-MM-DD HH:mm:ss'
 *
 * @export
 * @param {*} date 可识别的时间格式
 * @returns 'Invalid Date' | 'YYYY-MM-DD HH:mm:ss'
 */
export function dateFormat(date) {
  try {
    const d = date ? new Date(date) : new Date();
    let str = d.toLocaleString("zh-CN", {
      hour12: false
    });
    str = str.replace(/\//g, "-").replace(/\d+/g, a => a.padStart(2, "0"));
    return str;
  } catch (e) {
    return e.message;
  }
}

export function dateFormater(formater, t){
    let date = t ? new Date(t) : new Date(),
        Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g,Y)
        .replace(/YY|yy/g,Y.substr(2,2))
        .replace(/MM/g,(M<10?'0':'') + M)
        .replace(/DD/g,(D<10?'0':'') + D)
        .replace(/HH|hh/g,(H<10?'0':'') + H)
        .replace(/mm/g,(m<10?'0':'') + m)
        .replace(/ss/g,(s<10?'0':'') + s)
}

/**
 * 位置动画函数
 *
 * @param {*} start 起始位置
 * @param {*} end 目标位置
 * @param {*} rate 缓动速率
 * @param {*} callback 变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）
 * @returns
 */
export function easeout(start, end = 0, rate = 2, callback) {
  if (start == end || typeof start != "number") {
    return;
  }
  requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  const step = function() {
    start = start + (end - start) / rate;
    if (start < 1) {
      callback(end, true);
      return;
    }
    callback(start, false);
    requeststartnimationFrame(step);
  };
  step();
}

/**
 * 函数防抖
 *
 * @export
 * @param {*} func 执行函数
 * @param {*} delay 间隔时间
 * @param {*} [timer=null] 定时器
 * @returns
 */
export function debounce(func, delay, timer = null) {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(func.bind(null, ...args), delay);
  };
}

/**
 * 函数节流
 *
 * @export
 * @param {*} func 执行函数
 * @param {number} [delay=60] 间隔时间
 * @returns
 */
export function throttle(func, delay = 60) {
  let lock = false;
  return (...args) => {
    if (lock) {
      return;
    }
    func(...args);
    lock = true;
    setTimeout(() => (lock = false), delay);
  };
}

/**
 * 词频统计
 *
 * @export
 * @param {*} [arr=[]] 由原始类型组成的数组
 * @returns 返回一个二元数组，按出现次数从高到低排列 如：[['a', 10], ['b', 5]];
 */
export function frequency(arr = []) {
  const tuples = arr.map(item => [item, 1]);
  for (let i = 0; i < tuples.length; i++) {
    for (let j = i + 1; j < tuples.length; j++) {
      if (tuples[i][0] === tuples[j][0]) {
        tuples[i][1]++;
      }
    }
  }
  const filterArr = tuples
    .filter((item, i) => {
      return arr.indexOf(item[0]) === i;
    })
    .sort((pre, cur) => {
      return cur[1] - pre[1];
    });
  return filterArr;
}

// 获取数据类型
export function getRawType(target) {
  let type = Object.prototype.toString.call(target);
  return type.slice(8, -1).toLocaleLowerCase();
}

// 检测数据是不是除了symbol外的原始数据
export function isStatic(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "undefined" ||
    value === null
  );
}

// 检测数据是不是原始数据
export function isPrimitive(value) {
  return isStatic(value) || typeof value === "symbol";
}

// 判断给定变量是否定义
export function isDef(value) {
  return value !== undefined && value !== null;
}

// 判断给定变量是否对象
export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === "object" || type === "function");
}

// 深拷贝对象
export function deepAssign(to, from) {
  Object.keys(from).forEach(key => {
    const val = from[key];
    if (getRawType(val) === "object" || Array.isArray(val)) {
      if (getRawType(val) === "object" && getRawType(to[key]) !== "object") {
        to[key] = {};
      }
      if (Array.isArray(val) && !Array.isArray(to[key])) {
        to[key] = [];
      }
      deepAssign(to[key], val);
    } else if (val !== undefined) {
      to[key] = val;
    }
  });
  return to;
}

// 深拷贝
export function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  if (getRawType(obj) === "object") {
    return deepAssign({}, obj);
  }
  return obj;
}

// 记忆函数：缓存函数的运算结果
export function cached(fn) {
  let cache = Object.create(null);
  return function cachedFn(str) {
    let hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

// 横线转驼峰命名
const camelizeRE = /-(w)/g;
export function camelize(str) {
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
}

// 运行环境是浏览器
export const inBrowser = typeof window !== 'undefined';
// 运行环境是微信
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
// 浏览器 UA 判断
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
export const isEdge = UA && UA.indexOf('edge/') > 0;
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
export const isChrome = UA && /chrome/d+/.test(UA) && !isEdge;
