import { useState, useEffect } from 'react'
import GoToHome from '../components/utils/GoTo'

const RegExPage = () => {
  const [ipv4InputVal, setIpv4InputVal] = useState('')
  const [ipv6InputVal, setIpv6InputVal] = useState('')
  const [ipv4IsValid, setIpv4IsValid] = useState(false)
  const [ipv6IsValid, setIpv6IsValid] = useState(false)

  const handleIpv4InputChange = (event) => {
    setIpv4InputVal(event.target.value)
  }

  function is_valid_ipv4_addr(_target) {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        _target,
      )
    ) {
      setIpv4IsValid(true)
      return
    }
    setIpv4IsValid(false)
    return
  }

  useEffect(() => {
    is_valid_ipv4_addr(ipv4InputVal)
  }, [ipv4InputVal])

  const handleIpv6InputChange = (event) => {
    setIpv6InputVal(event.target.value)
  }

  function is_valid_ipv6_addr(_target) {
    if (/^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(_target)) {
      setIpv6IsValid(true)
      return
    }
    setIpv6IsValid(false)
    return
  }

  useEffect(() => {
    is_valid_ipv6_addr(ipv6InputVal)
  }, [ipv6InputVal])

  return (
    <>
      <GoToHome />
      <div>
        <p className="text-bold">IPV4 유효성 검사</p>
        <input type="text" id="iv4Input" value={ipv4InputVal} onChange={handleIpv4InputChange} />
        {ipv4InputVal.length > 0 && (ipv4IsValid ? <p>유효합니다.</p> : <p>유효하지 않습니다.</p>)}
      </div>
      <br />
      <div>
        <p className="text-bold">IPV6 유효성 검사</p>
        <input type="text" id="iv6Input" value={ipv6InputVal} onChange={handleIpv6InputChange} />
        {ipv6InputVal.length > 0 && (ipv6IsValid ? <p>유효합니다.</p> : <p>유효하지 않습니다.</p>)}
      </div>
    </>
  )
}

export default RegExPage
