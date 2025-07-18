import React, { useEffect, useState } from 'react';
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

function AdminRoute({ element }) {
  const navigate = useNavigate();
  const role = useAuthStore(state => state.role);
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    // role이 null 또는 undefined일 때는 아직 권한 정보 로딩 중이므로 대기
    if (role === undefined || role === null) {
      return;
    }

    if (role !== 'ROLE_ADMIN') {
      alert('관리자만 접근 가능합니다');
      navigate('/', { replace: true });
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  }, [role, navigate]);

  if (allowed === null) {
    // 권한 체크가 완료되기 전에는 로딩 표시 또는 빈 화면
    return <div>Loading...</div>;
  }

  if (allowed === false) {
    // 권한 없으면 아무것도 렌더링하지 않음 (리다이렉트 중)
    return null;
  }

  // 권한 있으면 element 렌더링
  return element;
}

export default AdminRoute;
