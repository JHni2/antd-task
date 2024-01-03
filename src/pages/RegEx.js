import { useState, useEffect } from 'react'
import GoToHome from '../components/utils/GoTo'

const RegExPage = () => {
  const [ipv4InputVal, setIpv4InputVal] = useState('')
  const [ipv6InputVal, setIpv6InputVal] = useState('')
  const [ipv46InputVal, setIpv46InputVal] = useState('')

  const [ipv4IsValid, setIpv4IsValid] = useState(false)
  const [ipv6IsValid, setIpv6IsValid] = useState(false)
  const [ipv46IsValid, setIpv46IsValid] = useState(false)

  const handleInputChange = (event, validationFunction, setValidation) => {
    const inputValue = event.target.value
    setValidation(validationFunction(inputValue))
    switch (validationFunction) {
      case is_valid_ipv4_addr:
        setIpv4InputVal(inputValue)
        break
      case is_valid_ipv6_addr:
        setIpv6InputVal(inputValue)
        break
      case is_valid_ipv46_addr:
        setIpv46InputVal(inputValue)
        break
      default:
        break
    }
  }

  const is_valid_ipv4_addr = (_target) => {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      _target,
    )
  }

  const is_valid_ipv6_addr = (_target) => {
    return /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(_target)
  }

  const is_valid_ipv46_addr = (_target) => {
    return is_valid_ipv4_addr(_target) || is_valid_ipv6_addr(_target)
  }

  useEffect(() => {
    is_valid_ipv4_addr(ipv4InputVal) && setIpv4IsValid(true)
  }, [ipv4InputVal])

  useEffect(() => {
    is_valid_ipv6_addr(ipv6InputVal) && setIpv6IsValid(true)
  }, [ipv6InputVal])

  useEffect(() => {
    is_valid_ipv46_addr(ipv46InputVal) && setIpv46IsValid(true)
  }, [ipv46InputVal])

  return (
    <>
      <GoToHome />
      <div>
        <p className="text-bold">IPV4 유효성 검사</p>
        <input
          type="text"
          id="iv4Input"
          value={ipv4InputVal}
          onChange={(e) => handleInputChange(e, is_valid_ipv4_addr, setIpv4IsValid)}
        />
        {ipv4InputVal.length > 0 && (ipv4IsValid ? <p>유효합니다.</p> : <p>유효하지 않습니다.</p>)}
      </div>
      <br />
      <div>
        <p className="text-bold">IPV6 유효성 검사</p>
        <input
          type="text"
          id="iv6Input"
          value={ipv6InputVal}
          onChange={(e) => handleInputChange(e, is_valid_ipv6_addr, setIpv6IsValid)}
        />
        {ipv6InputVal.length > 0 && (ipv6IsValid ? <p>유효합니다.</p> : <p>유효하지 않습니다.</p>)}
      </div>
      <br />
      <div>
        <p className="text-bold">IPV4/6 유효성 검사</p>
        <input
          type="text"
          id="iv46Input"
          value={ipv46InputVal}
          onChange={(e) => handleInputChange(e, is_valid_ipv46_addr, setIpv46IsValid)}
        />
        {ipv46InputVal.length > 0 && (ipv46IsValid ? <p>유효합니다.</p> : <p>유효하지 않습니다.</p>)}
      </div>
    </>
  )
}

export default RegExPage
