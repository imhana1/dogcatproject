import React, {Component, useEffect, useState} from 'react';
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";
import testImage from "./testImage.jpg"
import styles from "../notice/Notice.module.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import {findAllAdoption, findAllAdoptionByACity} from "../../utils/adoptionApi";
import Paginations from "../../components/commons/Paginations";

function AdoptionList() {
  const navigate = useNavigate();
  const PAGE_SIZE = 12;
  const [params] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  let pageno = parseInt(params.get('pageno'));
  if (isNaN(pageno) || pageno < 1) {
    pageno = 1;
  }
  const [data, setData] = useState({
    prev: 0,
    start: 0,
    end: 0,
    next: 0,
    adoptions: []
  });

  // 필터 바뀌면 pagination 바뀌게 하려고 props 넘길 때 바로 넘겨줌
  const [pagination, setPagination] = useState({
    prev: 0,
    start: 0,
    end: 0,
    next: 0,
    pageno: pageno,
    moveUrl: `/adoptions?pageno=`
  });

  // // 전체 데이터 불러오는 함수
  // async function fetchAdoptions() {
  //   try {
  //     const response = await findAllAdoption(pageno, PAGE_SIZE);
  //     setData(response.data);
  //   } catch (err) {
  //     console.log('유기동물 입양 목록 가져오기 실패: ', err);
  //   }
  // }

  // 상태 필터링 핸들러
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    navigate("/adoptions?pageno=1");
  };


  // 데이터 가져오기 (all은 전체, 지역 선택하면 지역별로)
  async function fetchAdoptions(){
    setLoading(true);
    try {
      let response;
      // 불러오기
      if(filter==='all') response = await findAllAdoption(pageno, PAGE_SIZE);
      else response = await findAllAdoptionByACity(filter.toUpperCase(), pageno, PAGE_SIZE);
      // 데이터 저장
      setData(response.data);
      setPagination({
        prev: response.data.prev,
        start: response.data.start,
        end: response.data.end,
        next: response.data.next,
        pageno: pageno,
        moveUrl: `/adoptions?pageno=`
      });
      setLoading(false);
    } catch(err) {
      setLoading(false);
      console.log('유기동물 게시판 목록 가져오기 실패: ', err);
    }
  }

  // 불러오기
  useEffect(() => {
    fetchAdoptions();
  }, [pageno, filter]);
  console.log(filter);
  console.log(data);
  return (
    <div className={styles.ntcQnaWrapper}>
      <HeaderNoticeQna title='동물 보호소'/>
      <main>
        <NavNoticeQna activeTab='adoption'/>
        <section>
          <div style={{ padding: '0 20px' }}>
            <h4 className='mb-4 mt-3'>동물 보호소</h4>
            <table className='table table-bordered adoption-table' style={{width:'1080px', borderRadius:'10px', marginBottom:'30px'}}>
              <tbody>
              <tr>
                <td onClick={()=>handleFilterChange('all')} style={{cursor:'pointer', textAlign:'center', color:filter==='all'?'#1e81ec':''}}>전체</td>
                <td onClick={()=>handleFilterChange('seoul')} style={{cursor:'pointer', textAlign:'center', color:filter==='seoul'?'#1e81ec':''}}>서울</td>
                <td onClick={()=>handleFilterChange('busan')} style={{cursor:'pointer', textAlign:'center', color:filter==='busan'?'#1e81ec':''}}>부산</td>
                <td onClick={()=>handleFilterChange('incheon')} style={{cursor:'pointer', textAlign:'center', color:filter==='incheon'?'#1e81ec':''}}>인천</td>
                <td onClick={()=>handleFilterChange('daegu')} style={{cursor:'pointer', textAlign:'center', color:filter==='daegu'?'#1e81ec':''}}>대구</td>
                <td onClick={()=>handleFilterChange('daejeon')} style={{cursor:'pointer', textAlign:'center', color:filter==='daejeon'?'#1e81ec':''}}>대전</td>
              </tr>
              <tr>
                <td onClick={()=>handleFilterChange('gwangju')} style={{cursor:'pointer', textAlign:'center', color:filter==='gwangju'?'#1e81ec':''}}>광주</td>
                <td onClick={()=>handleFilterChange('ulsan')} style={{cursor:'pointer', textAlign:'center', color:filter==='ulsan'?'#1e81ec':''}}>울산</td>
                <td onClick={()=>handleFilterChange('sejong')} style={{cursor:'pointer', textAlign:'center', color:filter==='sejong'?'#1e81ec':''}}>세종</td>
                <td onClick={()=>handleFilterChange('gyeonggi')} style={{cursor:'pointer', textAlign:'center', color:filter==='gyeonggi'?'#1e81ec':''}}>경기</td>
                <td onClick={()=>handleFilterChange('chungbuk')} style={{cursor:'pointer', textAlign:'center', color:filter==='chungbuk'?'#1e81ec':''}}>충북</td>
                <td onClick={()=>handleFilterChange('chungnam')} style={{cursor:'pointer', textAlign:'center', color:filter==='chungnam'?'#1e81ec':''}}>충남</td>
              </tr>
              <tr>
                <td onClick={()=>handleFilterChange('jeonnam')} style={{cursor:'pointer', textAlign:'center', color:filter==='jeonnam'?'#1e81ec':''}}>전남</td>
                <td onClick={()=>handleFilterChange('gyeongbuk')} style={{cursor:'pointer', textAlign:'center', color:filter==='gyeongbuk'?'#1e81ec':''}}>경북</td>
                <td onClick={()=>handleFilterChange('gyeongnam')} style={{cursor:'pointer', textAlign:'center', color:filter==='gyeongnam'?'#1e81ec':''}}>경남</td>
                <td onClick={()=>handleFilterChange('gangwon')} style={{cursor:'pointer', textAlign:'center', color:filter==='gangwon'?'#1e81ec':''}}>강원</td>
                <td onClick={()=>handleFilterChange('jeonbuk')} style={{cursor:'pointer', textAlign:'center', color:filter==='jeonbuk'?'#1e81ec':''}}>전북</td>
                <td onClick={()=>handleFilterChange('jeju')} style={{cursor:'pointer', textAlign:'center', color:filter==='jeju'?'#1e81ec':''}}>제주</td>
              </tr>
              </tbody>
            </table>
            {/* 감싸는 div. 이 안에서 map 돌리면 반복됨 */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px'}}>
              {loading && (<p>로딩중입니다</p>)}
              {!loading && data.adoptions.length > 0 ? (
                  data.adoptions.map(adoption => {
                    console.log('개별 글: ', adoption);
                    return (
                      // 이 div내용들이 반복되는거야
                      <div style={{
                        border: '1px solid #eaeaea',
                        width: '250px',
                        borderRadius: '5%',
                        padding: '25px',
                        cursor: 'pointer',
                        backgroundColor:`#fafafa`
                      }} onClick={() => navigate(`/adoptions/adoption?ano=${adoption.ano}`)} key={adoption.ano}>
                        <img alt='동물 사진' src={adoption.aprofile} style={{width:'200px', height: '200px', borderRadius: 8}}/>
                        <p style={{margin:'10px 0', fontWeight:'bold'}}>{adoption.aname}</p>
                        <p style={{margin:'10px 0', color:'gray', fontSize:'0.8em'}}>{adoption.acity}</p>
                      </div>)
                  })
                )
                : (
                  <div style={{ textAlign: 'center', alignContent:'center', gridColumn: '1 / -1', height:'100px'}}> {/* gridColumn: '1 / -1' }}는 p태그가 한 줄 다 차지하게 하려고 넣은거! 안넣으면 박스 하나의 가운데로 가서 이상해 */}
                  <p >데이터가 존재하지 않습니다</p>
                  </div>
                )}
            </div>
            <div className='mt-3 mb-3' style={{ textAlign: 'center' }}>
              <a type='button' className='btn btn-dark' href='/adoptions/write'>작성하기</a>
            </div>
            <Paginations pagination={pagination} />
          {/* 
            pagination 처리: pagination을 useState로 변경 / 데이터 로딩 후 setPagination해줌 / 백에서 분류 후 카운트 셀 때 전체카운트면 오류남
           */}
          </div>
        </section>
      </main>
      <FooterNoticeQna/>
    </div>
  );
}

export default AdoptionList;