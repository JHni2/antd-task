import React, { useState, useEffect, useRef } from 'react'
import { Tooltip } from 'antd'
import { Resizable } from 'react-resizable'
import { Table } from 'antd'
import { useDrag } from '../contexts/DragContext'

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

function throttle(func, delay) {
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

  const { isDrag } = useDrag(false)
  const [dragDir, setDragDir] = useState('')

  if (isDrag) {
  }

  const prevX = useRef(0)

  useEffect(() => {
    const getMouseDirection = (event) => {
      const xDir = prevX.current <= event.pageX ? 'right' : 'left'
      prevX.current = event.pageX

      setDragDir(xDir)
    }

    const throttledGetMouseDirection = throttle(getMouseDirection, 50)

    if (isDrag) {
      window.addEventListener('mousemove', throttledGetMouseDirection)
    } else {
      window.removeEventListener('mousemove', throttledGetMouseDirection)
    }

    return () => {
      // Cleanup: remove the event listener when the component unmounts or isDrag changes
      window.removeEventListener('mousemove', throttledGetMouseDirection)
    }
  }, [isDrag])

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
        const newColLenghts = newColumns.length
        const prevtWidth = newColumns[index].width || 0
        const newWidth = size.width

        newColumns[index] = {
          ...newColumns[index],
          width: size.width,
        }

        // 칼럼을 오른쪽으로 드래그 했을 떄
        if (dragDir === 'right') {
          let currentIndex = index + 1
          let whileLoopExecuted = false

          // 더이상 오른쪽으로 갈 수 없어 오른쪽의 칼럼을 줄이는 동작을 수행
          while (
            newColumns[index + 1] &&
            currentIndex <= newColLenghts &&
            newColumns[currentIndex].width <= minColWidth
          ) {
            // 가장 오른쪽 칼럼의 가로 너비가 최소값을 갖도록 함
            if (currentIndex + 1 === newColLenghts) {
              return prevColumns
            }
            console.log('오른쪽, 미는 중')

            newColumns[currentIndex] = {
              ...newColumns[currentIndex],
              width: minColWidth,
            }

            newColumns[currentIndex + 1] = {
              ...newColumns[currentIndex + 1],
              width: newColumns[currentIndex + 1].width + (prevtWidth - newWidth),
            }

            currentIndex++
            whileLoopExecuted = true
          }

          // 옆 칼럼이 말줄임표가 됐을 경우 늘어나기
          let testIndex = index
          while (
            newColumns[testIndex - 1] &&
            newColumns[testIndex + 1].width >= minColWidth &&
            newColumns[testIndex].width >= initialColWidth[testIndex].width &&
            testIndex - 1 >= 0 &&
            newColumns[0].width <= initialColWidth[0].width
          ) {
            testIndex--
          }

          // 더이상 오른쪽으로 갈 수 O
          if (!whileLoopExecuted && newColumns[testIndex] && newColumns[index].width > minColWidth + 3) {
            console.log('오른쪽, 안 미는 중')

            if (testIndex !== index) {
              newColumns[testIndex] = {
                ...newColumns[testIndex],
                width: newColumns[testIndex].width - (prevtWidth - newWidth),
              }
              newColumns[testIndex + 1] = {
                ...newColumns[testIndex + 1],
                width: newColumns[testIndex + 1].width + (prevtWidth - newWidth),
              }
            } else {
              newColumns[testIndex] = {
                ...newColumns[testIndex],
                width: newColumns[testIndex].width - (prevtWidth - newWidth) * 0.1,
              }
            }

            newColumns[testIndex + 1] = {
              ...newColumns[testIndex + 1],
              width: newColumns[testIndex + 1].width + (prevtWidth - newWidth),
            }
          }

          return newColumns

          // 칼럼을 왼쪽으로 드래그 했을 떄
        } else if (dragDir === 'left') {
          // 더이상 왼쪽으로 갈 수 없어 왼쪽의 칼럼을 줄이는 동작을 수행
          let currentIndex = index
          let whileLoopExecuted = false

          while (
            newColumns[index + 1] &&
            currentIndex <= newColLenghts &&
            newColumns[currentIndex].width <= minColWidth
          ) {
            // 가장 왼쪽 칼럼의 가로 너비가 최소값을 갖도록 함
            if (currentIndex === 0) {
              return prevColumns
            }
            console.log('왼쪽, 미는 중')

            if (newColumns[currentIndex].width <= minColWidth) {
              newColumns[currentIndex] = {
                ...newColumns[currentIndex],
                width: minColWidth,
              }
            } else {
              newColumns[currentIndex] = {
                ...newColumns[currentIndex],
                width: newColumns[currentIndex].width,
              }
            }

            if (newColumns[currentIndex - 1].width >= minColWidth + 3) {
              newColumns[index + 1] = {
                ...newColumns[index + 1],
                width: newColumns[index + 1].width + (prevtWidth - newWidth),
              }
            }

            newColumns[currentIndex - 1] = {
              ...newColumns[currentIndex - 1],
              width: newColumns[currentIndex - 1].width - (prevtWidth - newWidth),
            }

            currentIndex--
            whileLoopExecuted = true
          }

          // 옆 칼럼이 말줄임표가 됐을 경우 늘어나기
          let testIndex = index
          while (
            newColumns[testIndex + 2] &&
            newColumns[testIndex].width >= minColWidth &&
            newColumns[testIndex + 1].width >= initialColWidth[testIndex + 1].width &&
            testIndex + 2 <= newColLenghts &&
            newColumns[newColLenghts - 1].width <= initialColWidth[newColLenghts - 1].width
          ) {
            testIndex++
          }

          // 더이상 왼쪽으로 갈 수 O
          if (!whileLoopExecuted && newColumns[testIndex + 1] && newColumns[testIndex].width > minColWidth + 3) {
            console.log('왼쪽, 안 미는 중')

            newColumns[testIndex + 1] = {
              ...newColumns[testIndex + 1],
              width: newColumns[testIndex + 1].width + (prevtWidth - newWidth),
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

export default TableComponent
