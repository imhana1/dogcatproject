import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import './MapStyle.css';
import { useNavigate } from 'react-router-dom';
import HeaderMaps from '../../fragments/maps/HeaderMaps';

const MapContainer =({ username, role, logInlogOutHandler, hospitalMyPage})=> {

  // 상태 선언
  const mapRef = useRef(null);                              // 지도를 표시할 div 참조
  const [map, setMap] = useState(null);                     // 생성된 kakao map 객체 저장
  const [userLocation, setUserLocation] = useState(null);   // 지도 중심 좌표 저장할 변수
  const [keyword, setKeyword] = useState("");               // 검색어
  const [places, setPlaces] = useState([]);                 // 검색 결과 장소 목록
  const markersRef = useRef([]);                            // 마커 목록
  const overlaysRef = useRef([]);                           // 오버레이를 여러 개 저장할 변수
  const navigate = useNavigate();                           // 헤더에 사용할 네비 불러오기

  // 사용자 위치 받아오기
  useEffect(()=> {
    axios.get ("http://localhost:8080/api/nuser/location", { withCredentials : true })
    .then((res)=> {
      // 위도, 경도 받아오기
      setUserLocation(res.data);
    }) 
    .catch(()=> {
      // 실패 시 서울 시청이 기본 좌표가 된다
      setUserLocation({ latitude : 37.5665, longitude : 126.9780 });
    });
  },[]);

  // 카카오 지도 SDK 가 로드됐는지 검증
  useEffect(()=> {
    if(!userLocation) return;

    const checkKakao = setInterval(()=> {
      if(window.kakao && window.kakao.maps) {
        clearInterval(checkKakao);

        const { latitude, longitude } = userLocation;
        const center = new window.kakao.maps.LatLng(latitude, longitude);

        const options = { center, level:2 }; // 중심 좌표, 확대 레벨
      
        const newMap = new window.kakao.maps.Map(mapRef.current, options);
        setMap(newMap); // map 객체 저장
      }
    },100);

    return ()=> clearInterval(checkKakao);
  }, [userLocation]);

  const clearMarkersAndOverlays =()=> {
    // 마커 초기화
      markersRef.current.forEach(marker => marker.setMap(null));
      overlaysRef.current.forEach(overlay => overlay.setMap(null));
      markersRef.current = [];
      overlaysRef.current = [];
  }

  // 검색 핸들러
  const handleSearch =()=> {

    if(!map || !window.kakao) return;

    const ps = new window.kakao.maps.services.Places();

    // 장소 검색
    ps.keywordSearch(keyword, (data, status)=> {
      console.log('검색 상태:', status);
      console.log('검색 데이터:', data);
      if (status === window.kakao.maps.services.Status.OK) {
        clearMarkersAndOverlays();
        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers = [];
        const newOverlays = [];

        data.forEach ((place, index) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          
          // 마커 생성
          const marker = new window.kakao.maps.Marker({ map, position, });
          
          // 커스텀 오버레이 내용 생성
          const overlayContent = document.createElement("div");
          overlayContent.className = "custom-overlay";

          // overlay 내부 HTML 구조
          overlayContent.innerHTML = `
            <div class = "title">${place.place_name}</div>
            <div class = "body">
              <p>${place.road_address_name || place.address_name || ""}</p>
            </div>
            <div class = "link-group">
              <a href ="${"http://localhost:3000/hospital"}" target="_blank" rel="noopener noreferrer">예약하기</a>
            </div>
            <div class ="close">x</div>
          `;

          // 닫기 버튼 이벤트 등록
          overlayContent.querySelector(".close").onclick=()=> {
            overlay.setMap(null);
          };
          
          // 커스텀 오버레이 생성
          const overlay = new window.kakao.maps.CustomOverlay({
            content: overlayContent,
            position,
            yAnchor: 1,
            clickable:true,
          });

          // 마커 클릭 시 기존 오버레이 닫고 새 오버레이 열기
          window.kakao.maps.event.addListener(marker, "click", ()=> {
            // 기존 오버레이가 있으면 닫기
            overlaysRef.current.forEach(o=>o.setMap(null));

            // 마커 클릭 시 지도 확대
            map.setLevel(1); // 숫자가 작을수록 더 확대
            map.setCenter(marker.getPosition());

            // 새로운 오버레이 열기
            overlay.setMap(map);
          });

          newMarkers.push(marker);    // 마커를 배열에 저장
          newOverlays.push(overlay);  // 오버레이 저장
          bounds.extend(position);    // 마커가 보이도록 지도의 범위를 자동 조정
        });

        // 마커, 오버레이 상태 저장
        markersRef.current = newMarkers;
        overlaysRef.current = newOverlays;

        map.setBounds(bounds);   // 검색 결과 전체를 지도에 맞게 보기
        setPlaces(data);         // 리스트로 보여주기
      } else {
        clearMarkersAndOverlays();
        setPlaces([]);
      }
    });
  };

  // 엔터키 검색 이벤트
  const handleKeyPress =(e)=> {
    if (e.key=== "Enter") handleSearch();
  };
  
  // 리스트 클릭 시 해당 위치로 지도 이동 + 오버레이 열기
  const handleListClick = (place, index) => {
    if (!map || !window.kakao) return;
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    map.setLevel(2);
    map.panTo(position);

    overlaysRef.current.forEach(o=>o.setMap(null));
    overlaysRef.current[index].setMap(map);
  };

  // 화면 구성
  return (
    <>
      {/* 헤더 */}
      <HeaderMaps 
        username = {username}
        role = {role}
        logInlogOutHandler = {logInlogOutHandler}
        hospitalMyPage = {hospitalMyPage}
      />

      {/* 검색창 */}
      <div style={{ margin: '10px' }}>
        <input
          type="text"
          placeholder="장소를 입력하세요 (예: 동물병원)"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          className='search-input'
        />
        <button onClick={handleSearch} className='search-button'>
          검색
        </button>
      </div>

      {/* 리스트 + 지도 감싸는 컨테이너 */}
      <div className='map-container'>
      
        {/* 검색 결과 리스트 */}
        <ul className='place-list'>
          {places.length > 0 ? (
            places.map((place, index) => (
              <li key={index} className='place-list-item' onClick={() => handleListClick(place, index)}>
                <div className='place-name'>{place.place_name}</div>
                <div className='place-address'>{place.road_address_name || place.address_name}</div>
              </li>
            ))
          ) : (
            <li className='place-list-item'>검색 결과가 없습니다.</li>
          )}
        </ul>

        {/* 지도 */}
        <div ref={mapRef} style={{ width: '100%', height: '500px', border: '1px solid #ccc' }} />
      </div>
    </>
  )
}

export default MapContainer