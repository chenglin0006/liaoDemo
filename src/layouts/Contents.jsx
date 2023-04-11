import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Router from '../router/Router';

const { Content } = Layout;

class Contents extends Component {
  render() {
    const paddingList = ['https://btadmin', 'https://todo', 'http://localhost'];

    let showPadding = false;
    paddingList.forEach((ele) => {
      if (location.origin.startsWith(ele)) {
        showPadding = true;
      }
    });
    return (
      <Fragment>
        <Content className={`fomCont ${showPadding ? 'show-padding' : ''} ${this.props.isShop ? 'changeBgc' : ''}`}>
          {Router.genRouter()}
        </Content>
      </Fragment>
    );
  }
}
Contents.propTypes = {
  isShop: PropTypes.bool,
};
Contents.defaultProps = {
  isShop: false,
};
export default Contents;
