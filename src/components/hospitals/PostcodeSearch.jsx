import React from 'react';
import DaumPostcode from 'react-daum-postcode';

// 우편번호 검색 컴포넌트
// onComplete는 주소 선택 시 호출되는 콜백
const PostcodeSearch = ({ onComplete }) => {
    return (
        <div>
            <DaumPostcode onComplete={onComplete} autoClose />
        </div>
    );
}

export default PostcodeSearch;