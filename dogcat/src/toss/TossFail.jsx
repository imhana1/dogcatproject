import React from 'react';
import {useNavigate} from "react-router-dom";

const TossFail = () => {
    const navigate = useNavigate();
  const handleRetry = () => {
    // window.history.back(); // 이전 페이지로 이동
      navigate('/reservation/write')
  };

  return (
    <div style={{ padding: '20px' }}>
      결제에 실패했습니다. 다시 시도해주세요
      <br />
      <button onClick={handleRetry} style={{ marginTop: '10px' }}>
        다시 시도하기
      </button>
    </div>
  );
};

export default TossFail;