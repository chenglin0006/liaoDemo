/*eslint-disable */
import * as React from 'react';
import './index.less';
import * as ReactDOM from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
let timer = null;
class Toast extends React.Component {
  static hideToast() {
    hideToast();
  }
  static info(msg, timeout = 3000, extra) {
    init();
    setTime(timeout);
    ReactDOM.render(
      <div className="info content">
        <span style={{ color: '#1890FF' }} role="img" aria-label="info-circle" className="anticon anticon-info-circle">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="info-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
          </svg>
        </span>
        {renderSame(msg, extra)}
      </div>,
      document.getElementById('dark-toast'),
    );
  }
  static success(msg, timeout = 3000, extra) {
    console.log(extra, '222222222222222222222222222222222');
    init();
    setTime(timeout);
    ReactDOM.render(
      <div className="success content">
        <span
          style={{ color: '#52C41A' }}
          role="img"
          aria-label="check-circle"
          className="anticon anticon-check-circle"
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="check-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
          </svg>
        </span>
        {renderSame(msg, extra)}
      </div>,
      document.getElementById('dark-toast'),
    );
  }
  static error(msg, timeout = 3000, extra) {
    init();
    setTime(timeout);
    ReactDOM.render(
      <div className="error content">
        <span
          style={{ color: '#FF4D4F' }}
          role="img"
          aria-label="close-circle"
          className="anticon anticon-close-circle"
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="close-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
          </svg>
        </span>
        {renderSame(msg, extra)}
      </div>,
      document.getElementById('dark-toast'),
    );
  }
}
function init() {
  clearTimeout(timer);
  let dark_toast = document.getElementById('dark-toast');
  if (dark_toast) {
    dark_toast.style.display = 'block';
  } else {
    let div = document.createElement('div');
    div.setAttribute('id', 'dark-toast');
    document.body.appendChild(div);
  }
}
function hideToast() {
  let dark_toast = document.getElementById('dark-toast');
  if (dark_toast) {
    dark_toast.style.display = 'none';
  }
}
function renderSame(msg, extra) {
  return (
    <Fragment>
      <span className="msg-span">{msg}</span>
      {extra ? <span className="extra-span">{extra}</span> : null}
      <span
        className="close-span"
        onClick={(e) => {
          e.stopPropagation();
          hideToast();
        }}
      >
        <CloseOutlined />
      </span>
    </Fragment>
  );
}
function setTime(timeout) {
  timer = setTimeout(() => {
    hideToast();
  }, timeout);
}
export default Toast;
