import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import SiderMenu from '@/components/SiderMenu';
import pathToRegexp from 'path-to-regexp';
import './BasicLayout.less';
import './SearchTablePage.less';
import Contents from './Contents';
import Config from '../../config/config';

const { menus } = Config;

const { Header } = Layout;

class BasicLayout extends React.PureComponent {
  socket = null;

  static propTypes = {
    children: PropTypes.node,
    route: PropTypes.object,
  };

  static defaultProps = {
    children: null,
    route: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false, // 当前侧边栏收起状态
    };
  }

  componentDidMount() {}

  /**
   * 渲染左侧菜单
   */
  genMenu = () => {
    const menu = menus;
    const { collapsed } = this.state;
    return menu ? (
      <SiderMenu
        menu={menu}
        collapsed={collapsed}
        setMenuCollapsed={() => {
          this.setMenuCollapsed();
        }}
        {...this.props}
      />
    ) : null;
  };

  /**
   * 设置菜单收缩状态
   */
  setMenuCollapsed = (iscollapsed) => {
    const collapsed = iscollapsed || !this.state.collapsed;
    this.setState({ collapsed });
  };

  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority;
    // 递归遍历路由获取authority，子路由若没设置authority，将继承父路由authority
    const getAuthority = (key, routes) => {
      routes.forEach((route) => {
        if (route.path && pathToRegexp(route.path, [], { end: false }).test(key) && route.authority) {
          routeAuthority = route.authority;
        }
        if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            render={() => {
              return (
                <Layout className="todocenter-container">
                  {this.genMenu()}
                  <Layout className="right-layout">
                    <Header className="bnq-global-header">
                      <div className="bnq-global-header-right">
                        <Fragment>
                          <span className="bnq-global-header-action bnq-global-header-account">
                            <span className="bnq-global-header-name" />
                          </span>
                        </Fragment>
                      </div>
                    </Header>
                    <Layout className="ant-layout-ie9">
                      <Contents />
                    </Layout>
                  </Layout>
                </Layout>
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: dispatch.common.logout,
  };
};

const mapState = (state) => {
  return {
    currentUser: state.common.currentUser,
    isShop: state.common.isShop,
    isInQiankun: state.common.isInQiankun,
  };
};

export default connect(mapState, mapDispatch)(BasicLayout);
