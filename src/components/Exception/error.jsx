import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const Error = ({ code = 'error', msg }) => {
  let codeProp = code;
  const codeList = ['success', 'error', 'info', 'warning', '404', '403', '500'];
  if (codeList.indexOf(`${code}`) === -1) {
    codeProp = 'error';
  }
  return (
    <Result
      status={codeProp}
      title={code}
      subTitle={msg}
      extra={
        <Link to="/">
          <Button type="primary">返回首页</Button>
        </Link>
      }
    />
  );
};

Error.propTypes = {
  code: PropTypes.string,
  msg: PropTypes.string,
};

export default Error;
