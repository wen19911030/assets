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
    window.location.href.indexOf('#') < window.location.href.indexOf('?')
      ? window.location.href
      : window.location.search;
  const searchStr = str.split('?')[1];
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
    let str = d.toLocaleString('zh-CN', {
      hour12: false,
    });
    str = str.replace(/\//g, '-').replace(/\d+/g, (a) => a.padStart(2, '0'));
    return str;
  } catch (e) {
    return e.message;
  }
}

/**
 * 时间格式化
 * @param {*} formater 格式化字符串
 * @param {*} t 可识别的时间格式
 */
export function dateFormater(formater, t) {
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s);
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
  if (start === end || typeof start !== 'number') {
    return;
  }
  const requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (cb) {
        window.setTimeout(cb, 1000 / 60);
      }
    );
  })();

  const step = function () {
    start += (end - start) / rate;
    if (Math.abs(end - start) < 1) {
      callback(end, true);
      return;
    }
    callback(start, false);
    requestAnimationFrame(step);
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
  const tuples = arr.map((item) => [item, 1]);
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

/**
 * 获取给定字符串中出现次数最多的字符及出现次数
 * @param {*} str
 */
export function getMaxNumberOfChar(str) {
  return (str + '').split('').reduce(
    function (pre, cur, index, arr) {
      cur in pre ? pre[cur]++ : (pre[cur] = 1);
      pre[cur] > pre.value && ((pre.char = cur), (pre.value = pre[cur]));
      return pre;
    },
    { value: 0 }
  );
}

/**
 * 将列表转为树结构
 *
 * @export
 * @param {*} list [{ id: "1", parentId: "0", name: "浙江省" }, { id: "1-1", parentId: "1", name: "杭州市" }]
 * @param {string} [parentId="0"] 父节点
 * @param {number} [level=1] 等级
 * @returns [{ id: "1", parentId: "0", name: "浙江省", level: 1, children: [{ id: "1-1", parentId: "1", name: "杭州市", level: 2}] }]
 */
export function convertToTree(list, parentId = '0', level = 1) {
  const out = [];
  for (let i = 0; i < list.length; i++) {
    count++;
    let node = list[i];
    if (node.parentId === parentId) {
      node.level = Number(level);
      const children = convertToTree(list, node.id, node.level + 1);
      if (Array.isArray(children.length) && children.length.length > 0) {
        node.children = children;
      }
      out.push(node);
      list.splice(i, 1);
      i--;
    }
  }
  return out;
}

/**
 * 树结构拍平
 *
 * @export
 * @param {*} tree [{ id: "1", parentId: "0", name: "浙江省", level: 1, children: [{ id: "1-1", parentId: "1", name: "杭州市", level: 2}] }]
 * @returns [{ id: "1", parentId: "0", name: "浙江省", level: 1 }, { id: "1-1", parentId: "1", name: "杭州市", level: 2 }]
 */
export function doFlattenTree(tree) {
  const out = [];
  tree.forEach((node) => {
    const { children, ...rest } = node;
    if (Array.isArray(children)) {
      out.push({ ...rest });
      out.push(...doFlattenTree(children));
    } else {
      out.push({ ...rest });
    }
  });
  return out;
}

// 获取数据类型
export function getRawType(target) {
  let type = Object.prototype.toString.call(target);
  return type.slice(8, -1).toLocaleLowerCase();
}

// 检测数据是不是除了symbol外的原始数据
export function isStatic(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null
  );
}

// 检测数据是不是原始数据
export function isPrimitive(value) {
  return isStatic(value) || typeof value === 'symbol';
}

// 判断给定变量是否定义
export function isDef(value) {
  return value !== undefined && value !== null;
}

// 判断给定变量是否对象
export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

/**
 * 深拷贝
 *
 * @export
 * @param {*} target 拷贝对象
 * @param {*} [map=new WeakMap()] WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的
 * @returns
 */
export function deepClone(target, map = new WeakMap()) {
  if (getRawType(target) === 'object' || Array.isArray(target)) {
    let to = Array.isArray(target) ? [] : {};
    // 防止循环引用
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, to);
    Object.keys(target).forEach((key) => {
      to[key] = deepClone(target[key], map);
    });
    return to;
  } else {
    return target;
  }
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
export function camelize(str) {
  const camelizeRE = /-(w)/g;
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
}

// 类数组转数组
export function toArray(list, start = 0) {
  const ret = Array.from(list);
  return ret.slice(start);
}

// 数组去重
export function uniqArray(list) {
  return Array.from(new Set(list));
}

/**
 * 获取北京时间当前时钟
 */
export function getBeiJingHours() {
  const timezone = 8; // 目标时区时间，东八区
  const utcHour = new Date().getUTCHours();
  return utcHour + timezone >= 24
    ? utcHour + timezone - 24
    : utcHour + timezone;
}

/**
 * 判断是否存在该日期
 * @param {string} dateStr 日期
 * @param {string} sign 年月日分隔符
 * @returns {boolean}
 */
export function isExistDate(dateStr, sign) {
  const dateObj = dateStr.split(sign); // yyyy/mm/dd yyyy-mm-dd

  // 列出12個月，每月最大日期限制
  const limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const theYear = parseInt(dateObj[0], 10);
  const theMonth = parseInt(dateObj[1], 10);
  const theDay = parseInt(dateObj[2], 10);
  const isLeap = new Date(theYear, 1, 29).getDate() === 29; // 是否為閏年?

  if (isLeap) {
    // 若為閏年，最大日期限制改為 29
    limitInMonth[1] = 29;
  }

  // 比對該日是否超過每個月份最大日期限制
  return theDay <= limitInMonth[theMonth - 1];
}

// 运行环境是浏览器
export const inBrowser = typeof window !== 'undefined';
// 运行环境是微信
export const inWeex =
  typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
// 浏览器 UA 判断
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
export const isEdge = UA && UA.indexOf('edge/') > 0;
export const isAndroid =
  (UA && UA.indexOf('android') > 0) || weexPlatform === 'android';
export const isIOS =
  (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios';
