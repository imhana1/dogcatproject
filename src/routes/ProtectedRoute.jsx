import React from 'react';
import { Navigate } from "react-router-dom";

// 로그인한 사용자만 예약 접근 가능한 라우트
function ProtectedRoute({ children }) {
  // 로그인 상태 확인
  const isLoggedIn = !!localStorage.getItem("n_username");
  // 로그인 안했을때 조건문
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  // 로그인 한 후 자식 컴포넌트로
  return children;
}

export default ProtectedRoute;
