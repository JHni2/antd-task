import GoToHome from '../components/utils/GoTo'
import TopThreeFaildTasks from '../components/chart/TopThreeFaildTasks'

const ChartPage = () => {
  return (
    <>
      <GoToHome />
      <div>
        <p className="text-bold">이력 요청 - IP별 실패한 적업 종류 (상위 작업 3개만 표시)</p>
      </div>
      <TopThreeFaildTasks />
    </>
  )
}

export default ChartPage
