import React, {useState} from 'react';
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";
import styles from "../notice/Notice.module.css";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import {writeAdoption} from "../../utils/adoptionApi";

function AdoptionWrite() {
  const navigate = useNavigate();
  const {username, role} = useAuthStore();  // username 가져오려면 있어야해

  // 각 값 상태 저장
  // 사진, 이름, 연령, 세부종류, 성별(드롭다운), 발견장소, 현재위치(드롭다운), 상세위치, 소개글
  const [aProfile, setAProfile] = useState(null);  // 사진은 초기 상태 null
  const [aName, setAName] = useState();
  const [aAge, setAAge] = useState();
  const [aBreed, setABreed] = useState();
  const [aGender, setAGender] = useState("");
  const [aFoundLocation, setAFoundLocation] = useState();
  const [aCity, setACity] = useState("");
  const [aLocation, setALocation] = useState();
  const [aContent, setAContent] = useState();
  const [aIsAdopted, setAIsAdopted] = useState(false);  // 일단 false

  // 상태 변화 잡아내기
  const changeAProfile = e => {
    const file = e.target.files[0];
    setAProfile(file || null);  // file 존재하면 파일 객체만 저장 (base64 변환 아직x)
  }
  const changeAName = e => setAName(e.target.value);
  const changeAAge = e => setAAge(e.target.value);
  const changeABreed = e => setABreed(e.target.value);
  const changeAGender = e => setAGender(e.target.value);
  const changeAFoundLocation = e => setAFoundLocation(e.target.value);
  const changeACity = e => setACity(e.target.value);
  const changeALocation = e => setALocation(e.target.value);
  const changeAContent = e => setAContent(e.target.value);
  const changeAIsAdopted = (e) => {
    const value = e.target.value;
    setAIsAdopted(value === 'true');  // 'true' 문자열 => 불리언 true
  };

  // 드롭다운 매핑용
  const cityMap = {
    '서울특별시': 'SEOUL',
    '부산광역시': 'BUSAN',
    '인천광역시': 'INCHEON',
    '대구광역시': 'DAEGU',
    '대전광역시': 'DAEJEON',
    '광주광역시': 'GWANGJU',
    '울산광역시': 'ULSAN',
    '세종특별자치시': 'SEJONG',
    '경기도': 'GYEONGGI',
    '충청북도': 'CHUNGBUK',
    '충청남도': 'CHUNGNAM',
    '전라남도': 'JEONNAM',
    '경상북도': 'GYEONGBUK',
    '경상남도': 'GYEONGNAM',
    '강원특별자치도': 'GANGWON',
    '전북특별자치도': 'JEONBUK',
    '제주특별자치도': 'JEJU',
  };
  const genderMap = {
    '남': 'MALE',
    '여': 'FEMALE',
    '확인 불가': 'UNKNOWN'
  };


  // 작성 핸들러
  const writeHandler = async () => {
    // 하나라도 작성 안했으면 내보내
    if (!aProfile || !aName || !aAge || !aBreed || !aGender || !aFoundLocation || !aCity || !aLocation || !aContent) {
      alert('내용을 모두 입력하세요. ');
      return;
    }
    // 다 제대로 작성했으면 try-catch
    try {
      // writeDto 작성 (username은 어차피 서버에서 principal로 넘겨서 안적어도 됨)
      const writeDto = {
        aname: aName,
        aage: aAge,
        agender: aGender,
        abreed: aBreed,
        acity: aCity,
        alocation: aLocation,
        afoundLocation: aFoundLocation,
        username: username,
        acontent: aContent,
        aisAdopted: aIsAdopted
      }
      // formData 작성
      const formData = new FormData();
      // writeDto를 JSON Blob로 변환하여 추가 (Content-Type 지정)
      const writeDtoBlob = new Blob([JSON.stringify(writeDto)], {
        type: 'application/json'
      });
      formData.append('writeDto', writeDtoBlob);
      // 이미지 추가
      formData.append("aProfile", aProfile);

      // writeAdoption 사용
      const response = await writeAdoption(formData);
      const ano = response.data.ano;
      alert('입양 글 작성이 완료되었습니다. ');
      navigate(`/adoptions/adoption?ano=${ano}`);
    } catch (err) {
      console.log('글 작성에 실패했습니다: ', err);
      alert('문의글 작성에 실패했습니다.');
    }
  }

  // 취소 핸들러
  const cancelHandler = () => {
    const result = window.confirm('작성한 내용은 저장되지 않습니다. \n취소하시겠습니까?');
    if (result)
      navigate('/adoptions')
  }

  return (
    <div className={styles.ntcQnaWrapper}>
      <HeaderNoticeQna title='동물 보호소'/> {/* 글 목록 페이지도 수정해주기 */}
      <main>
        <NavNoticeQna activeTab='adoption'/>
        <section>
          {/*
                        div 1: 사진 + 정보
                            div 1-1: 사진+정보1
                            div 1-2: 정보2
                        div 2: 소개글
                   */}
          <div style={{padding: '0 20px'}}>
            <h4 className='mb-3 mt-3'>입양 글 작성</h4>
            <div style={{display: 'flex', gap: '50px', alignItems: 'flex-end'}}> {/* 사진+정보글 div */}
              <div style={{width: '525px'}}> {/* div 1-1: 사진 + 정보1 */}
                <div className='mb-3 mt-3' style={{display: 'flex', alignItems: 'center'}}>
                  <label className='text-secondary' style={{width: '110px', fontWeight: 'bold'}}>입양 상태</label>
                  <div className="form-check form-check-inline" style={{marginLeft: '-20px'}}>
                    <input className="form-check-input" type="radio" id="adoptedTrue" value="true"
                           checked={aIsAdopted === true} onChange={changeAIsAdopted}/>
                    <label className="form-check-label ms-1" htmlFor="adoptedTrue">입양 완료</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="adoptedFalse" value="false"
                           checked={aIsAdopted === false} onChange={changeAIsAdopted}/>
                    <label className="form-check-label" htmlFor="adoptedFalse">입양 미완료</label>
                  </div>
                </div>
                <div className='mb-3 mt-3'
                     style={{display: "flex", alignItems: "center"}}> {/* input 하나씩 */}
                  <label className='text-secondary'
                         style={{width: '110px', fontWeight: 'bold'}}>사진</label>
                  <input className='form-control' type='file' id='aprofile' onChange={changeAProfile}/>
                </div>
                <div className='mb-3 mt-3 ' style={{display: 'flex', alignItems: 'center'}}>
                  <label className='text-secondary '
                         style={{width: '110px', fontWeight: 'bold'}}>이름</label>
                  <input className='form-control' type='text' id='aname' placeholder='이름 입력' value={aName}
                         onChange={changeAName}/>
                </div>
                <div className='mb-3 mt-3 ' style={{display: 'flex', alignItems: 'center'}}>
                  <label className='text-secondary '
                         style={{width: '110px', fontWeight: 'bold'}}>연령</label>
                  <input className='form-control' type='text' id='aage' placeholder='나이 입력' value={aAge}
                         onChange={changeAAge}/>
                </div>
                <div className='mb-3 mt-3 ' style={{display: 'flex', alignItems: 'center'}}>
                  <label className='text-secondary ' style={{width: '110px', fontWeight: 'bold'}}>세부 종류</label>
                  <input className='form-control' type='text' id='abreed' placeholder='종 입력 (예: 푸들, 스트릿출신 ... )'
                         value={aBreed} onChange={changeABreed}/>
                </div>

              </div>
              <div style={{width: '525px'}}> {/* div1-2: 정보2 */}
                <div className='mb-3 mt-3'
                     style={{display: "flex", alignItems: "center"}}> {/* input 하나씩 */}
                  <label className='text-secondary'
                         style={{width: '110px', fontWeight: 'bold'}}>성별</label>
                  <select
                    className="form-select"
                    value={aGender}
                    onChange={(e) => setAGender(e.target.value)}
                  >
                    <option value="" disabled hidden>성별 선택</option>
                    {Object.keys(genderMap).map(label => (
                      <option key={label} value={label}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className='mb-3 mt-3 ' style={{display: 'flex', alignItems: 'center'}}>
                  <label className='text-secondary '
                         style={{width: '110px', fontWeight: 'bold'}}>발견 위치</label>
                  <input className='form-control' type='text' id='afoundLocation' placeholder='발견 위치 입력'
                         value={aFoundLocation} onChange={changeAFoundLocation}/>
                </div>
                <div className='mb-3 mt-3 ' style={{display: 'flex', alignItems: 'center'}}>
                  <label className='text-secondary '
                         style={{width: '110px', fontWeight: 'bold'}}>현재 위치</label>
                  <select className='form-select' value={aCity} onChange={changeACity}>
                    <option value="" disabled hidden>지역 선택</option>
                    {Object.keys(cityMap).map(label => (
                      <option key={label} value={label}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className='mb-3 mt-3 ' style={{display: 'flex', alignItems: 'center'}}>
                  <label className='text-secondary ' style={{width: '110px', fontWeight: 'bold'}}>상세 위치</label>
                  <input className='form-control' type='text' id='alocation' placeholder='상세 위치 입력' value={aLocation}
                         onChange={changeALocation}/>
                </div>

              </div>
            </div>

            <hr className='mb-4 mt-4 text-secondary'/>
            <div className='mb-3 mt-3 ' style={{display: 'flex', alignItems: 'flex-start'}}> {/* 소개글 div */}
              <label className=' text-secondary'
                     style={{width: '100px', fontWeight: 'bold', marginTop: '7px'}}>내용</label>
              <textarea className='form-control' rows='10' id='qContent' placeholder='제목을 입력하세요. '
                        style={{borderWidth: '0', outline: 'none', width: '1050px'}} value={aContent}
                        onChange={changeAContent}/>

            </div>

          </div>
          <div style={{textAlign: 'center'}}>
            <button className='mb-3 mt-3 btn btn-dark me-2' onClick={() => writeHandler()}>등록하기</button>
            <button className='mb-3 mt-3 btn btn-secondary' onClick={() => {
              cancelHandler()
            }}>취소하기
            </button>
          </div>
        </section>
      </main>
      <FooterNoticeQna/>
    </div>
  );
}


export default AdoptionWrite;