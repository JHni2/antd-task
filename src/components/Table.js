import React, { useState, useEffect, useRef } from 'react'
import { Table } from 'antd'
import { Tooltip } from 'antd'
import { Resizable } from 'react-resizable'
import { useDrag } from '../contexts/DragContext'
import GoToComponent from './GoTo.js'

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props
  const { setDragState } = useDrag()

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
      onResizeStart={(e) => setDragState(true)}
      onResizeStop={(e) => setDragState(false)}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

const throttle = (func, delay) => {
  let lastTime = 0

  return function (event) {
    const currentTime = new Date().getTime()

    if (currentTime - lastTime > delay) {
      func(event)
      lastTime = currentTime
    }
  }
}

const TableComponent = () => {
  const [columns, setColumns] = useState([
    {
      title: 'Date',
      dataIndex: 'date',
      width: 150,
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
      width: 100,
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
      width: 250,
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
      width: 100,
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
      width: 250,
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
      width: 100,
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

  const { isDrag } = useDrag(false)
  const [dragDir, setDragDir] = useState('')
  const prevX = useRef(0)
  const error = 100

  // 드래그 방향 알아내는 함수
  useEffect(() => {
    const getMouseDirection = (event) => {
      const dx = event.pageX - prevX.current
      const xDir = dx <= 0 || dx > error ? 'left' : 'right'
      prevX.current = event.pageX

      setDragDir(xDir)
    }

    const throttledGetMouseDirection = throttle(getMouseDirection, 30)

    if (isDrag) {
      window.addEventListener('mousemove', throttledGetMouseDirection)
    } else {
      window.removeEventListener('mousemove', throttledGetMouseDirection)
    }

    return () => {
      window.removeEventListener('mousemove', throttledGetMouseDirection)
    }
  }, [isDrag])

  const tableContent = document.getElementsByClassName('ant-table-content')

  // 표 리사이징하는 함수
  const handleResize =
    (index) =>
    (_, { size }) => {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns]
        const prevtWidth = newColumns[index].width || 0
        const newWidth = size.width
        const wDiff = prevtWidth - newWidth

        newColumns[index] = {
          ...newColumns[index],
          width: size.width,
        }

        // 왼쪽으로 드래그할 때
        if (dragDir === 'left') {
          // overflow 됐을 때 칼럼 줄이기
          if (tableContent[0]?.clientWidth < tableContent[0]?.scrollWidth) {
            // 마지막 index인 경우
            if (!newColumns[index + 1]) {
              return newColumns
            }

            newColumns[index + 1] = {
              ...newColumns[index + 1],
              width: newColumns[index + 1].width,
            }

            return newColumns
          } else {
            // overflow 되지 않았을 때 칼럼 줄이기 - 마지막 index인 경우
            if (!newColumns[index + 1]) {
              return prevColumns
            }

            // overflow 되지 않을 때 칼럼 줄이기 - 일반 index인 경우
            newColumns[index + 1] = {
              ...newColumns[index + 1],
              width: newColumns[index + 1].width + wDiff,
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
    <>
      <GoToComponent component="chart" />
      <Table
        className="ant-table"
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
    </>
  )
}

export default TableComponent
