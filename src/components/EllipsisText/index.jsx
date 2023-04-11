/* eslint-disable no-constant-condition */
import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { isMac } from '@/util/const';
import './index.less';

const toolTipStyle = {
  fontSize: '14px',
  color: 'rgba(0,0,0,0.65)',
};

const Index = (props) => {
  const { text, direction, toolText, alwaysShowTool, ...rest } = props;
  const ref = useRef();
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    const node = ref.current; // 判断的dom节点，使用ref
    const { clientWidth, offsetWidth, scrollWidth } = node;
    console.log('width', clientWidth, offsetWidth, scrollWidth, node);
    if (offsetWidth < scrollWidth) {
      setOverflow(true);
    }
    return null;
  }, [text]);
  return (
    <Fragment>
      {overflow || alwaysShowTool ? (
        <Tooltip
          color="#ffffff"
          placement="bottomLeft"
          overlayInnerStyle={toolTipStyle}
          title={toolText || text}
          {...rest}
        >
          <span ref={ref} className={`todo-ellipsis ${isMac ? 'mac' : ''}`} style={{ direction }}>
            {text}
          </span>
        </Tooltip>
      ) : (
        <span ref={ref} className={`todo-ellipsis ${isMac ? 'mac' : ''}`}>
          {text}
        </span>
      )}
    </Fragment>
  );
};
Index.propTypes = {
  text: PropTypes.string,
  direction: PropTypes.string,
  toolText: PropTypes.string,
  alwaysShowTool: PropTypes.bool,
};

export default Index;
