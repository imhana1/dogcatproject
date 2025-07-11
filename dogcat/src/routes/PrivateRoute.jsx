import {Navigate, useNavigate} from "react-router-dom";
import useAuthStore from "../stores/useAuthStore"

// 로그인 한 모든 유저

function PrivateRoute({ element }) {
  const navigate = useNavigate();
  const username = useAuthStore(state => state.username);

  // role 확인 불가면 리턴하고 관리자면 element 보여죽 아니면 홈
  if(username === undefined) return;
  if(!username)  {
    alert('로그인이 필요한 서비스입니다.');
    navigate('/login');
  }
  return element;

}

export default PrivateRoute