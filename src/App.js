import React, { useState, useRef, useEffect } from 'react';
import { Resizable } from 'react-resizable';
import { Table } from 'antd';
import './index.css'

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const App = () => {
  const [columns, setColumns] = useState([
    {
      title: 'Date',
      dataIndex: 'date',
      width: 200,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 100,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 100,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: 100,
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: () => <a>Delete</a>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
    },
    {
      title: 'Upgrade Status',
      dataIndex: 'upgradeStatus',
      width: 100,
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      width: 100,
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      width: 200,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      width: 200,
    },
    {
      title: 'Upgraded',
      dataIndex: 'upgraded',
      width: 100,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: 100,
      render: () => <a>Edit</a>,
    },{}
  ]);

  const data = [
    {
      key: 0,
      date: '2018-02-11',
      amount: 120,
      type: 'income',
      note: 'transfer',
      address: 'London Park no. 0',
      status:'Finished',
      upgradeStatus:'Upgraded: 56',
      creator:'Jack',
      platform:'iOS',
      version:'10.3.4.5654',
      upgraded:'500',
    },
    {
      key: 1,
      date: '2018-03-11',
      amount: 243,
      type: 'income',
      note: 'transfer',
      address: 'London Park no. 0',
      status:'Finished',
      upgradeStatus:'Upgraded: 56',
      creator:'Jack',
      platform:'iOS',
      version:'10.3.4.5654',
      upgraded:'500',
    },
    {
      key: 2,
      date: '2018-04-11',
      amount: 98,
      type: 'income',
      note: 'transfer',
      address: 'London Park no. 0',
      status:'Finished',
      upgradeStatus:'Upgraded: 56',
      creator:'Jack',
      platform:'iOS',
      version:'10.3.4.5654',
      upgraded:'500',
    },
  ];

  const [colSum, setColSum] = useState(0);
  const [isDraggingAllowed, setIsDraggingAllowed] = useState(true);

  let newColSum = 0;
  const testNum = 40
  const testRef = useRef();

  const handleResize = (index) => (_, { size }) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const prevtWidth = newColumns[index].width || 0;
      const newWidth = size.width;

      const isResizingRight = newWidth > prevtWidth;
      const isResizingLeft = newWidth < prevtWidth;

      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };

      prevColumns.forEach((column)=>{
        if(column.width){
          newColSum+=column.width
        }
      })      

      setColSum(newColSum);
      setIsDraggingAllowed(colSum + testNum <= testRef.current?.offsetWidth);

      if (isResizingRight) {
        if(isDraggingAllowed) {
          return newColumns
    }
        return prevColumns
      } else if (isResizingLeft) {
        return newColumns
      }
      return newColumns;
    });
  };

  const mergeColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <Table
     ref={testRef}
      bordered
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
      columns={mergeColumns}
      dataSource={data}
    />
  );
};

export default App;