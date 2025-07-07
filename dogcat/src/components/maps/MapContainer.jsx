import React, { useEffect, useRef, useState } from "react";

const MapContainer = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState("동물병원");
  const [places, setPlaces] = useState([]);
  const markersRef = useRef([]);

  useEffect(() => {
    const { kakao } = window;
    if (!kakao || !kakao.maps) return;

    const defaultCenter = new kakao.maps.LatLng(37.5665, 126.9780);
    const mapOption = { center: defaultCenter, level: 3 };
    const newMap = new kakao.maps.Map(mapRef.current, mapOption);
    setMap(newMap);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          newMap.setCenter(userLatLng);
          // 자동 검색 호출 삭제 (사용자가 직접 검색)
        },
        (error) => {
          console.error("현 위치 정보를 불러올 수 없습니다.", error);
        }
      );
    } else {
      alert("현 위치 정보를 지원하지 않는 브라우저입니다.");
    }
  }, []);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const searchPlaces = (mapInstance, centerLatLng) => {
    if (!window.kakao) return;
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          clearMarkers();

          const newMarkers = [];
          const infowindows = [];

          data.forEach((place, index) => {
            const position = new window.kakao.maps.LatLng(place.y, place.x);

            const marker = new window.kakao.maps.Marker({
              map: mapInstance,
              position,
            });

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:14px;">${place.place_name}</div>`,
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
              infowindows.forEach((info) => info.close());
              infowindow.open(mapInstance, marker);
            });

            newMarkers.push(marker);
            infowindows.push(infowindow);
            bounds.extend(position);
          });

          markersRef.current = newMarkers;
          mapInstance.setBounds(bounds);
          setPlaces(data);
        }
      },
      {
        location: centerLatLng,
        radius: 10000, // 10km 반경
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      }
    );
  };

  const handleSearch = () => {
    if (!map) return;
    searchPlaces(map, map.getCenter());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleListClick = (place, index) => {
    const { kakao } = window;
    const position = new kakao.maps.LatLng(place.y, place.x);
    map.panTo(position);

    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:14px;">${place.place_name}</div>`,
    });
    infowindow.open(map, markersRef.current[index]);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 2 }}>
        <div style={{ margin: "10px" }}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="검색어를 입력하세요 (예: 수원 동물병원)"
            style={{ width: "300px", padding: "8px", fontSize: "14px" }}
          />
          <button onClick={handleSearch} style={{ marginLeft: 8 }}>
            검색
          </button>
        </div>
        <div
          ref={mapRef}
          style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
        />
      </div>

      <div
        style={{
          flex: 1,
          maxHeight: "500px",
          overflowY: "auto",
          borderLeft: "1px solid #eee",
          padding: "10px",
        }}
      >
        <h4>검색 결과</h4>
        {places.length === 0 && <p>결과 없음</p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {places.map((place, index) => (
            <li
              key={place.id}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
              onClick={() => handleListClick(place, index)}
            >
              <strong>{place.place_name}</strong>
              <br />
              <small>{place.road_address_name || place.address_name}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapContainer;