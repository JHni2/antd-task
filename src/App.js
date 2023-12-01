import React, { useState, useEffect, useRef } from 'react'
import { Tooltip } from 'antd'
import { Resizable } from 'react-resizable'
import { Table } from 'antd'
import './index.css'

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation()
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
  )
}

const App = () => {
  const [columns, setColumns] = useState([
    {
      title: 'Date',
      dataIndex: 'date',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (date) => (
        <Tooltip placement="topLeft" title={date}>
          {date}
        </Tooltip>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 100,
      sorter: (a, b) => a.amount - b.amount,
      ellipsis: {
        showTitle: false,
      },
      render: (amount) => (
        <Tooltip placement="topLeft" title={amount}>
          {amount}
        </Tooltip>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (type) => (
        <Tooltip placement="topLeft" title={type}>
          {type}
        </Tooltip>
      ),
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (note) => (
        <Tooltip placement="topLeft" title={note}>
          {note}
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: () => (
        <Tooltip placement="topLeft" title="Delete">
          <a>Delete</a>
        </Tooltip>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (status) => (
        <Tooltip placement="topLeft" title={status}>
          {status}
        </Tooltip>
      ),
    },
    {
      title: 'Upgrade Status',
      dataIndex: 'upgradeStatus',
      width: 300,
      ellipsis: {
        showTitle: false,
      },
      render: (upgradeStatus) => (
        <Tooltip placement="topLeft" title={upgradeStatus}>
          {upgradeStatus}
        </Tooltip>
      ),
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      width: 100,
      ellipsis: {
        showTitle: false,
      },
      render: (creator) => (
        <Tooltip placement="topLeft" title={creator}>
          {creator}
        </Tooltip>
      ),
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (platform) => (
        <Tooltip placement="topLeft" title={platform}>
          {platform}
        </Tooltip>
      ),
    },
  ])

  const data = [
    {
      key: 0,
      date: '2018-02-11',
      amount: 120,
      type: 'income',
      note: 'transfertransfertransfertransfertransfertransfertransfertransfer',
      address: 'London Park no. 0',
      status: 'Finished',
      upgradeStatus: 'Upgraded: 56',
      creator: 'Jack',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgraded: '500',
    },
    {
      key: 1,
      date: '2018-03-11',
      amount: 243,
      type: 'income',
      note: 'transfer',
      address: 'London Park no. 0',
      status: 'Finished',
      upgradeStatus: 'Upgraded: 56',
      creator: 'Jack',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgraded: '500',
    },
    {
      key: 2,
      date: '2018-04-11',
      amount: 98,
      type: 'income',
      note: 'transfer',
      address: 'London Park no. 0',
      status: 'Finished',
      upgradeStatus: 'Upgraded: 56',
      creator: 'Jack',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgraded: '500',
    },
  ]

  const [initialColWidth, setInitialColWidth] = useState([])

  // 초기 칼럼 width
  useEffect(() => {
    const newInitialColWidth = columns.map((column) => ({
      title: column.dataIndex,
      width: column.width,
    }))

    setInitialColWidth(newInitialColWidth)
  }, [])

  const tableRef = useRef()
  const minColWidth = 25.84

  const handleResize =
    (index) =>
    (_, { size }) => {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns]
        const prevtWidth = newColumns[index].width || 0
        const newWidth = size.width

        const isResizingRight = newWidth > prevtWidth
        const isResizingLeft = newWidth < prevtWidth

        newColumns[index] = {
          ...newColumns[index],
          width: size.width,
        }

        let currentIndex = index + 1

        // 칼럼을 오른쪽으로 드래그 했을 떄
        if (isResizingRight) {
          // 더이상 오른쪽으로 갈 수 없어 오른쪽의 칼럼을 줄이는 동작을 수행
          let whileLoopExecuted = false

          while (
            currentIndex < newColumns.length &&
            newColumns[currentIndex] &&
            newColumns[currentIndex].width <= minColWidth
          ) {
            // 가장 오른쪽 칼럼의 가로 너비가 최소값을 갖도록 함
            if (currentIndex + 1 === newColumns.length) {
              return prevColumns
            }

            newColumns[currentIndex] = {
              ...newColumns[currentIndex],
              width: minColWidth,
            }

            if (currentIndex + 1 < newColumns.length) {
              newColumns[currentIndex + 1] = {
                ...newColumns[currentIndex + 1],
                width: newColumns[currentIndex + 1].width + (prevtWidth - newWidth),
              }
            }

            currentIndex++
            whileLoopExecuted = true
          }

          if (
            newColumns[index].width >= initialColWidth[index].width &&
            newColumns[index - 1].width <= initialColWidth[index - 1].width
          ) {
            newColumns[index - 1] = {
              ...newColumns[index - 1],
              width: newColumns[index - 1].width - (prevtWidth - newWidth),
            }

            newColumns[index] = {
              ...newColumns[index],
              width: newColumns[index].width + (prevtWidth - newWidth),
            }
          }

          // 더이상 오른쪽으로 갈 수 O
          if (!whileLoopExecuted && newColumns[index + 1]) {
            newColumns[index + 1] = {
              ...newColumns[index + 1],
              width: newColumns[index + 1].width + (prevtWidth - newWidth),
            }
          }

          return newColumns

          // 칼럼을 왼쪽으로 드래그 했을 떄
        } else if (isResizingLeft) {
          // 더이상 왼쪽으로 갈 수 없어 왼쪽의 칼럼을 줄이는 동작을 수행
          let currentIndex = index
          let whileLoopExecuted = false
          let testBoolean = false

          while (
            newColumns[index + 1] &&
            currentIndex < newColumns.length &&
            newColumns[currentIndex].width <= minColWidth
          ) {
            // 가장 왼쪽 칼럼의 가로 너비가 최소값을 갖도록 함
            if (currentIndex === 0) {
              return prevColumns
            }

            newColumns[currentIndex - 1] = {
              ...newColumns[currentIndex - 1],
              width: newColumns[currentIndex - 1].width - (prevtWidth - newWidth),
            }

            newColumns[currentIndex] = {
              ...newColumns[currentIndex],
              width: minColWidth,
            }

            currentIndex--
            whileLoopExecuted = true
            testBoolean = true
          }

          if (testBoolean) {
            newColumns[index + 1] = {
              ...newColumns[index + 1],
              width: newColumns[index + 1].width + (prevtWidth - newWidth),
            }
          }

          if (
            newColumns[index + 2] &&
            newColumns[index + 1].width >= initialColWidth[index + 1].width &&
            newColumns[index + 2].width <= initialColWidth[index + 2].width
          ) {
            newColumns[index + 2] = {
              ...newColumns[index + 2],
              width: newColumns[index + 2].width + (prevtWidth - newWidth),
            }

            newColumns[index + 1] = {
              ...newColumns[index + 1],
              width: newColumns[index + 1].width - (prevtWidth - newWidth),
            }
          }

          // 더이상 왼쪽으로 갈 수 O
          if (!whileLoopExecuted && newColumns[index + 1] !== undefined) {
            newColumns[index + 1] = {
              ...newColumns[index + 1],
              width: newColumns[index + 1].width + (prevtWidth - newWidth),
            }
          }
        }

        return newColumns
      })
    }

  const mergeColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }))

  return (
    <Table
      className="ant-table"
      ref={tableRef}
      bordered
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
      columns={mergeColumns}
      dataSource={data}
      ellipsis={true}
    />
  )
}

export default App
