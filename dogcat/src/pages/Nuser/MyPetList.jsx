import React from 'react';

const MyPetList = () => {

    const handleEdit = () => {
        navigate("/nuser-pet");
    }

    return (
        <div>
        <div>
            저장된 반려동물 정보가 없습니다. 
            반려동물 정보를 등록하시겠습니까?
        </div>
        <div>
            <button className="btn btn-outline-dark" onClick={handleEdit} style={{ marginBottom: "20px", width: "100%" }}>등록하기</button>
        </div>
        </div>
    );
};

export default MyPetList;