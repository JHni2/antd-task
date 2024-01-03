import { useState, useEffect } from 'react'
import failData from '../../store/Datas'
import { Column } from '@ant-design/plots'

const TopThreeFaildTasks = () => {
  const [data, setData] = useState(failData)
  const [resetState, setResetState] = useState(false)
  const [showTable, setShowTable] = useState(false)

  const resetSubjectCount = () => {
    const updatedData = data.map((data) => ({
      ...data,
      SubjectCount: 1,
    }))

    setData(updatedData)
    setResetState(true)
  }

  const result = Object.values(
    data.reduce((acc, { IP, SubjectCount, WorkType }) => {
      const key = `${IP}-${WorkType}`

      acc[key] = acc[key] || { IP, SubjectCount: 0, WorkType }
      acc[key].SubjectCount += SubjectCount
      return acc
    }, {}),
  )

  result.sort((a, b) => {
    if (a.IP === b.IP) {
      return b.SubjectCount - a.SubjectCount
    }
    return a.IP.localeCompare(b.IP)
  })

  let testNum = 0
  const getTopThree = () => {
    const topThreeData = result.filter((data, index) => {
      if (index === 0) {
        return true
      } else {
        if (result[index - 1] && data.IP === result[index - 1].IP && testNum < 2) {
          testNum++
          return true
        } else if (result[index - 1] && data.IP !== result[index - 1].IP && index !== 0) {
          testNum = 0
          return true
        }
      }

      return false
    })
    setData(topThreeData)
    setShowTable(true)
  }

  useEffect(() => {
    resetState && getTopThree()
  }, [resetState])

  useEffect(() => {
    resetSubjectCount()
  }, [])

  const config = {
    data: data,
    isStack: true,
    xField: 'IP',
    yField: 'SubjectCount',
    seriesField: 'WorkType',
    label: {
      textBaseline: 'bottom',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hIPe-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  }

  return <>{showTable && <Column {...config} />}</>
}

export default TopThreeFaildTasks
