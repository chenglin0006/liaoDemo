import React, { Fragment } from 'react';
import { Table, Button } from 'antd';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import './index.less';

const Index = (props) => {
  const {
    loading,
    listResult,
    columnsData = [],
    manuBtnList = [],
    curPage,
    pageSize,
    onPageChange,
    rowKey = 'id',
    hasOutManu,
    hasPage = true,
    ...restPropsTable
  } = props;

  let w = 0;
  columnsData.forEach((ele) => {
    w += ele.width || 120;
  });

  return (
    <Fragment>
      {manuBtnList.length ? (
        <div className="manu-table-div">
          {manuBtnList.map((ele) => {
            const { icon, text, className, clickFun, ...restProps } = ele;
            return (
              <Button
                key={text}
                className={`manu-btn ${className}`}
                style={{ marginRight: '10px' }}
                onClick={() => {
                  clickFun();
                }}
                type="primary"
                {...restProps}
              >
                {icon}
                {text}
              </Button>
            );
          })}
        </div>
      ) : null}

      <div className="page-body">
        <AutoSizer>
          {({ width, height }) => {
            const xHeight = height - 55 - 60 - (hasOutManu ? 20 : 0);
            return (
              <div className="table-div" style={{ width, height }}>
                <Table
                  className="record-table"
                  dataSource={listResult.list || []}
                  columns={columnsData}
                  loading={loading}
                  rowKey={(r) => r[rowKey || 'id']}
                  pagination={
                    hasPage
                      ? {
                          showQuickJumper: true,
                          current: curPage,
                          showSizeChanger: true,
                          pageSize,
                          total: listResult.total,
                          onChange: onPageChange,
                          showTotal: (total) => `共${total}条`,
                        }
                      : false
                  }
                  scroll={{ y: xHeight, x: w }}
                  {...restPropsTable}
                />
              </div>
            );
          }}
        </AutoSizer>
      </div>
    </Fragment>
  );
};

Index.propTypes = {
  loading: PropTypes.bool,
  columnsData: PropTypes.array,
  manuBtnList: PropTypes.array,
  onPageChange: PropTypes.func,
  curPage: PropTypes.number,
  pageSize: PropTypes.number,
  listResult: PropTypes.object,
  rowKey: PropTypes.string,
  hasOutManu: PropTypes.bool,
  hasPage: PropTypes.bool,
};

export default Index;
