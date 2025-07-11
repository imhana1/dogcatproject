import React from 'react';
import useAuthStore from "../stores/useAuthStore";
import {useNavigate} from "react-router-dom";

function AdminRoute ({element}) {
  const navigate = useNavigate();
  const role = useAuthStore(state => state.role);

  // role 확인 불가면 리턴하고 관리자면 element 보여죽 아니면 홈
  if(role === undefined) return;
  if(role!=='ADMIN')  {
    alert('관리자만 접근 가능합니다');
    navigate('/');
  }
  return element;

}

export default AdminRoute;