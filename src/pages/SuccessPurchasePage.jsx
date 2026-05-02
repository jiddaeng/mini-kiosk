import React from 'react'
import { useNavigate } from 'react-router-dom'

function SuccessPurchasePage() {
    const navigation = useNavigate()
  return (
    <div className="success-page">
      <div className="success-content">
        <p className="success-account">KB국민 781602-00-106155</p>
        <p className="success-message">위 계좌로 보내주시면 감사하겠습니다 ^^</p>
        <p className="success-alternative">만약 송금이 불가한 상황이라면</p>
        <p className="success-contact">
          <span className="success-name">안지호</span>에게 직접 전해주시면 됩니다 ^^
        </p>
      </div>
      <button className="success-back-button" onClick={()=>{navigation('/')}}>홈페이지로 돌아가기</button>
    </div>
  )
}

export default SuccessPurchasePage