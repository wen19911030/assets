import { toArray } from "./utils";

export default class Event {
  constructor() {
    this._events = Object.create(null);
  }
  /**
   * 订阅事件
   *
   * @param {*} event [string | Array<string>] 事件名称
   * @param {*} fn [function]
   * @returns this
   * @memberof Event
   */
  $on(event, fn) {
    if (typeof event === 'string' && !Array.isArray(this._events[event])) {
      this._events[event] = [];
    }
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.$on(event[i], fn);
      }
    } else {
      this._events[event].push(fn);
    }
    return this;
  }
  /**
   * 发布事件
   *
   * @param {*} event [string] 事件名称
   * @param {*} args [array] 执行函数额外传参
   * @returns this
   * @memberof Event
   */
  $emit(event, ...args) {
    let cbs = this._events[event];
    if (Array.isArray(cbs)) {
      for (let i = 0; i < cbs.length; i++) {
        let fn = cbs[i];
        try {
          args.length ? fn.apply(this, args) : fn.call(this);
        } catch (e) {
          console.log(e);
          throw e;
        }
      }
    }
    return this;
  }
  /** 
   * 执行一次
   * @param {string} event 事件名称
   * @param {function} fn 
   */
  $once(event, fn = noop) {
    function on() {
      this.$off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.$on(event, on);
    return this;
  }
  $off(event, fn = noop) {
    if (!arguments.length) {
      return;
    }
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        this.$off(event[i], fn);
      }
      return this;
    }
    const cbs = this._events[event];
    if (!cbs) {
      return this;
    }
    if (!fn) {
      this._events[event] = null;
      return this;
    }
    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }
}
