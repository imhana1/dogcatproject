import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import React, { useEffect, useState } from "react";

function PrivateRoute({ element }) {
  const username = useAuthStore(state => state.username);
  const isAuthChecked = useAuthStore(state => state.isAuthChecked);
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    // 인증 완료 전이면 아무 것도 하지 않음
    if (!isAuthChecked) return;

    if (!username) {
      alert('로그인이 필요한 서비스입니다.');
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [username, isAuthChecked]);

  if (allowed === false) {
    return <Navigate to='/login' replace />;
  }

  return element;
}

export default PrivateRoute;
