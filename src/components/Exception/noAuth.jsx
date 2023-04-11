/*eslint-disable */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Result, Button } from 'antd';
import PropTypes from 'prop-types';

const ExceptionNoAuth = (props) => {
  const { logout } = props;
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您无权访问本系统"
      extra={
        <Button
          style={{ marginLeft: '10px' }}
          type="primary"
          onClick={() => {
            logout({ shouldRequest: true, redirectUrl: location.origin + '/' });
          }}
        >
          退出登录
        </Button>
      }
    />
  );
};

ExceptionNoAuth.propTypes = {
  showLogOutBtn: PropTypes.bool,
  logout: PropTypes.func,
};

const mapDispatch = (dispatch) => {
  return {
    logout: dispatch.common.logout,
  };
};

export default withRouter(connect(null, mapDispatch)(ExceptionNoAuth));
