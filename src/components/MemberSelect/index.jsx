import React, { Fragment, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select, Spin } from 'antd';
import debounce from 'lodash.debounce';
import './index.less';

const { Option } = Select;

const Index = (props) => {
  const {
    memberEnum = [],
    getEmployeeListByKeywordLoading,
    getEmployeeListByKeyword,
    disabled,
    value,
    onChange,
    mode = '',
  } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (memberEnum && memberEnum.length) {
      const l = memberEnum.map((ele) => {
        return ele;
      });
      setOptions(l);
    }
    return null;
  }, [memberEnum]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = async (keyword) => {
      setOptions([]);
      if (!keyword.trim()) return;
      const data = await getEmployeeListByKeyword({ deptPoolId: 2, keyword, status: 1 });
      setOptions(data);
    };
    return debounce(loadOptions, 800);
  }, [getEmployeeListByKeyword]);

  return (
    <Fragment>
      <Select
        filterOption={false}
        showSearch
        allowClear
        disabled={disabled}
        mode={mode}
        placeholder="请输入姓名或者工号查询"
        onSearch={debounceFetcher}
        notFoundContent={getEmployeeListByKeywordLoading ? <Spin size="small" /> : null}
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <Option value={item.username} key={item.username}>{`${item.realname}/${item.username}`}</Option>
        ))}
      </Select>
    </Fragment>
  );
};
Index.propTypes = {
  memberEnum: PropTypes.array,
  value: PropTypes.array,
  getEmployeeListByKeywordLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  mode: PropTypes.string,
  getEmployeeListByKeyword: PropTypes.func,
  onChange: PropTypes.func,
};
const mapDispatch = (dispatch) => {
  return {
    getEmployeeListByKeyword: dispatch.common.getEmployeeListByKeyword,
  };
};

const mapState = (state) => {
  return {
    getEmployeeListByKeywordLoading: state.loading.effects.common.getEmployeeListByKeyword,
  };
};

export default connect(mapState, mapDispatch)(Index);
