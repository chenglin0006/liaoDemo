export const UA = window.navigator.userAgent.toLowerCase();

// 是否是触摸屏
export const isTouch = 'ontouchstart' in window;

// 移除micromessenger, ipad
export const isMobile = /(iphone|ipod|\sios|android|backerry|webos|symbian|windows phone|phone)/i.test(UA);

// 是否是ipad
// 浏览器设置为访问移动版时，UA中才有ipad，详见UA.md文件
// 浏览器设置为访问桌面版时，UA同mac浏览器，所以通过isTouch判断
export const isIpad = /(ipad)/i.test(UA) || (/(macintosh)/i.test(UA) && isTouch);

// 是否是在微信浏览器打开
export const isWeixin = UA.indexOf('micromessenger') !== -1;

// 是否是在微信浏览器(pc端微信是用内置的浏览器打开的)
export const isWeixinPc = UA.indexOf('micromessenger') !== -1 && UA.indexOf('windowswechat') !== -1;

// 是否是在飞书浏览器打开
export const isFeishu = UA.indexOf('lark') !== -1;

export const layoutSearchForm = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const isMac = /macintosh|mac os x/i.test(UA);

export const colSpanSearchForm = {
  xl: 8,
  lg: 8,
  md: 12,
  sm: 24,
};

export const timeColSpanSearchForm = {
  xl: 12,
  lg: 12,
  md: 12,
  sm: 24,
};
