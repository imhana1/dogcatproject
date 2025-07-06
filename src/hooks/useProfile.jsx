import { useState } from "react";

function useProfile() {
  // 사용자가 선택한 사진 저장
  const [value, setValue] = useState(null);
  // 사용자가 선택한 사진 or 서버에서 받아온 사진을 볼 수 있는 주소(서버 주소 or base64)
  const [photoUrl, setPhotoUrl] = useState(null);

  const onChange = e=>{
    const file = e.target.files[0];
    setValue(file);

    if(file) {
      const reader = new FileReader();
      reader.onload = ()=>setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoUrl(null);
    }
  }

  return {value, photoUrl, onChange, setPhotoUrl};
}

export default useProfile