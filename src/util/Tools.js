import moment from 'moment';
import React from 'react';
import { Popover } from 'antd';

export default class Tools {
  /**
   * 对下拉菜单的数据进行处理，以满足Select公共控件对于字段的要求
   * MakeSearch中select的字段类型为[name, id]
   * @param data 原始数据
   * @param maps 字段匹配配置 {key: [] || '' }
   *  key为数组时，按照数组中拿到的第一个有数据的字段来处理
   *  例如后端数据格式为{ name: xxx, id: 1, code: 'x111'}
   *  传入maps {id: ['code', id]} 则在后端数据code有值时使用code code无数据时使用id
   * @returns {{name: *, id: *}[]}
   */
  static mapSelect = (data = [], maps = {}) => {
    return data.map((item) => {
      let name = 'name';
      let id = 'id';
      if (Array.isArray(maps.name)) {
        name = maps.name.find((findItem) => {
          return Boolean(item[findItem]);
        });
      } else if (typeof maps.name === 'string') {
        name = maps.name;
      }
      if (Array.isArray(maps.id)) {
        id = maps.id.find((findItem) => {
          return Boolean(item[findItem]);
        });
      } else if (typeof maps.id === 'string') {
        id = maps.id;
      }
      return {
        name: item[name],
        id: item[id],
      };
    });
  };
  /**
   * 生成tabal的columns方法
   * @param options  [{
   *     name: string.isRequired
   * }]，需传递name dataindex
   * @returns {*}
   */
  static genTableOptions = (options) => {
    return options.map((item) => {
      return {
        ...item,
        title: item.name,
        dataIndex: item.dataindex,
        key: item.dataindex,
        width: item.width || 120,
        className: 'tableStyle',
        render: typeof item.render === 'function' && item.render,
      };
    });
  };

  static createUrl = (request) => {
    let { url } = request;
    const { param } = request;

    if (param) {
      url = !url.includes('?') && `${url}?`;
      for (const key of Object.keys(param)) {
        url = `${url + key}=${encodeURI(param[key])}&`;
      }
      if (url.endsWith('&')) {
        url = url.substring(0, url.length - 1);
      }
    }
    return url;
  };

  static getUrlArg = (name, isSearchFromCookies) => {
    let { search } = window.location;
    // IE9(通过window.history.replaceState来判断IE9和其他浏览器，不考虑IE8及以下浏览器)时，search的值从cookie中获取
    if (isSearchFromCookies && !window.history.replaceState) {
      search = unescape(getCookie('CURRENT_SEARCH'));
    }
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const arg = search.substr(1).match(reg);
    return arg ? arg[2] : '';
  };

  //获取url中参数
  static getRequest = (urlStr) => {
    let url = location.search; //获取url中"?"符后的字串
    if (urlStr && urlStr.indexOf('?') !== -1) {
      url = '?' + urlStr.split('?')[1];
    }
    let theRequest = new Object();
    if (url.indexOf('?') != -1) {
      var str = url.substr(1);
      var strs = str.split('&');
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
      }
    }
    return theRequest;
  };

  static getCookie = (cookieName) => {
    const cookieStr = decodeURI(document.cookie);
    const arr = cookieStr.split('; ');
    let cookieValue = '';
    for (let i = 0; i < arr.length; i++) {
      const temp = arr[i].split('=');
      if (temp[0] == cookieName) {
        cookieValue = temp[1];
        break;
      }
    }
    return decodeURI(cookieValue);
  };

  static setCookie = (name, value) => {
    const days = 30;
    const exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
  };
  static formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return date && moment(date).format(format);
  }
  static getPageQuery = () => {
    const url = location.search; //获取url中"?"符后的字串
    const res = {};
    if (url.indexOf('?') != -1) {
      const str = url.substr(1);
      const strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        res[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
      }
    }
    return res;
  };
  //处理超过多少字省略,text-文案，maxLength-允许最长的字符数，placement气泡框位置，styleObject气泡框样式
  static spanTitleDeal = (text, maxLength, placement, styleObject) => {
    let value = text;
    if (text && text.length > maxLength) {
      value = text.substring(0, maxLength) + '...';
    }
    let isShowTitle = text ? (text.length > maxLength ? true : false) : false;
    let baseStyle = { width: '200px', wordBreak: 'break-all' };
    let style = Object.assign({}, baseStyle, styleObject || {});
    return isShowTitle ? (
      <Popover content={text} placement={placement} overlayStyle={style}>
        <span>{value}</span>
      </Popover>
    ) : (
      <span>{text}</span>
    );
  };

  //深拷贝
  static deepClone = (obj) => {
    var str,
      newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
      return;
    } else if (window.JSON) {
      (str = JSON.stringify(obj)), //序列化对象
        (newobj = JSON.parse(str)); //还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
      }
    }
    return newobj;
  };

  //判断字符串/数组/对象/不为空时返回true
  static isNotNull = (obj) => {
    if (obj instanceof Object) {
      for (var a in obj) {
        return true;
      }
      return false;
    }
    return typeof obj != 'undefined' && obj !== null && (Array.isArray(obj) ? obj.length !== 0 : obj !== '');
  };

  /**
   * uuid
   * **/
  static uuid = () => {
    let temp_url = URL.createObjectURL(new Blob());
    let uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf('/') + 1);
  };

  static serialize = (obj) => {
    return Object.entries(obj)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
  };

  // 数组交换顺序 用于元素的前移或者后移
  static swapItems = (arr, index1, index2) => {
    // eslint-disable-next-line prefer-destructuring
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  };

  static formateTime = (t) => {
    const appendZero = (n) => {
      return n.toLocaleString({}, { minimumIntegerDigits: 2 });
    };
    const sec = appendZero(Number.parseInt((t / 1) % 60));
    const min = appendZero(Number.parseInt((t / 60) % 60));
    const hour = appendZero(Number.parseInt(t / 3600));
    return `${hour}:${min}:${sec}`;
  };
  // 格式化千分位数字
  static formatNum = (num) => {
    const newNum =
      num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return newNum;
  };

  static monDiff = (startTime, endTime) => {
    var startTime = new Date(startTime);
    var endTime = new Date(endTime);
    var date2Mon;
    var startDate = startTime.getDate() + startTime.getHours() / 24 + startTime.getMinutes() / 24 / 60;
    var endDate = endTime.getDate() + endTime.getHours() / 24 + endTime.getMinutes() / 24 / 60;
    if (endDate >= startDate) {
      date2Mon = 0;
    } else {
      date2Mon = -1;
    }
    return (endTime.getYear() - startTime.getYear()) * 12 + endTime.getMonth() - startTime.getMonth() + date2Mon;
  };

  static isUrl = (path) => {
    if (!path.startsWith('http')) {
      return false;
    }
    try {
      const url = new URL(path);
      return !!url;
    } catch (error) {
      return false;
    }
  };

  static isImgStr = (path) => {
    return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path);
  };

  static getTokenCommon = () => {
    let accessToken = '';
    if (window.__POWERED_BY_QIANKUN__) {
      // 如果本地没有就从cookie里面取
      if (localStorage.getItem('accessToken')) {
        accessToken = localStorage.getItem('accessToken');
      } else {
        accessToken = this.getCookie('sessionToken');
      }
    } else {
      accessToken = localStorage.getItem('accessTokenLocal');
    }
    return accessToken;
  };

  static download = (src, filename) => {
    const imgsrc = src.indexOf('https') > -1 ? src : src.replace('http', 'https');
    const xhr = new XMLHttpRequest();
    xhr.open('get', imgsrc, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const url = URL.createObjectURL(xhr.response);
      const a = document.createElement('a');
      const event = new MouseEvent('click');
      a.href = imgsrc;
      a.download = filename || '下载  ';
      a.dispatchEvent(event);
      URL.revokeObjectURL(url);
    };
    xhr.send();
  };

  static DownloadAttachment = (fileName, blob, filetype = 'application/vnd.ms-excel') => {
    const blobUrl = window.URL.createObjectURL(new Blob([blob], { type: filetype }));
    if (!blobUrl) window.navigator.msSaveBlob(this.blob, fileName);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.download = fileName;
    a.href = blobUrl;
    a.click();
  };

  static removeInvalidParams = (params) => {
    Object.keys(params).forEach((ele) => {
      if (
        params[ele] === '' ||
        params[ele] === null ||
        params[ele] === undefined ||
        (Array.isArray(params[ele]) && params[ele].length === 0)
      ) {
        delete params[ele];
      }
      if (typeof params[ele] === 'string') {
        params[ele] = params[ele].trim();
      }
    });
    return params;
  };

  static getOpenOrLinkUrl = (url) => {
    if (window.__POWERED_BY_QIANKUN__) {
      return '/todocenter-web' + url;
    } else {
      return url;
    }
  };

  static pointToPercent = (point) => {
    let percent = Number(point * 100).toFixed(0);
    percent += '%';
    return percent;
  };
}
