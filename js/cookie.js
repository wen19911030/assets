// cookie 操作方法
export default {
  /**
   * 设置cookie
   * @param {*} name [required] cookie名称
   * @param {*} value [required] cookie值
   * @param {*} expires 用于指定cookie何时应被删除的时间戳，默认情况下，会话结束浏览器会删除所有cookie
   * @param {*} path 对于制定域中的那个路径，应该向服务器发送cookie
   * @param {*} domain cookie对于哪个域是有效的，不设置会被认作来自设置cookie的哪个域
   * @param {*} secure 是否要添加安全标志，使用SSL连接时候才发送到服务端
   * @memberof Cookies
   */
  set(name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString();
    }
    if (path) {
      cookieText += '; path=' + path;
    }
    if (domain) {
      cookieText += '; domain=' + domain;
    }
    if (secure) {
      cookieText += '; secure';
    }
    document.cookie = cookieText;
  },

  /**
   * 获取cookie
   * @param {*} name cookie名称
   * @returns
   * @memberof Cookies
   */
  get(name) {
    var cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;
    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      );
    }
    return cookieValue;
  },

  /**
   * 删除cookie
   * @param {*} name cookie名称
   * @param {*} path url路径
   * @param {*} domain 域
   * @param {*} secure 是否要添加secure标志的布尔值
   * @memberof Cookies
   */
  remove(name, path, domain, secure) {
    this.setCookie(name, '', new Date(0), path, domain, secure);
  },
};
