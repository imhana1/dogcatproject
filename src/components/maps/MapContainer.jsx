import React, { useEffect, useRef } from "react";


// 지도 UI 컴포넌트

const MapContainer = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const { kakao } = window;
    const center = new kakao.maps.LatLng(37.5665, 126.9780); // 서울 시청 기준
    const options = { center, level: 3 };

    const map = new kakao.maps.Map(mapRef.current, options);

    // 테스트 마커 표시
    new kakao.maps.Marker({ map, position: center });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "500px", border: "1px solid #ddd" }}
    />
  );
};

export default MapContainer;