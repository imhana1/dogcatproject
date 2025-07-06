import React from "react";
import MapContainer from "../components/maps/MapContainer";

// 지도 보여주는 페이지 컴포넌트

const MapPage = () => {
  return (
    <div>
      <h2>동물병원 지도</h2>
      <MapContainer />
    </div>
  );
};

export default MapPage;