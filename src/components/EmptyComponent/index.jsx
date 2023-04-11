import React, { Fragment } from 'react';
import EmptyImg from '@/assets/img/notFound3.png';
import PropTypes from 'prop-types';
import './index.less';

const Index = (props) => {
  const { text = '暂无内容', width = '64px', className, style } = props;
  return (
    <Fragment>
      <div className={`empty-com-div ${className}`} style={style}>
        <img src={EmptyImg} alt="" style={{ width }} />
        <div className="empty-text">{text}</div>
      </div>
    </Fragment>
  );
};

Index.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Index;
