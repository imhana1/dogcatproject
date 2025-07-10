import React, {Component, useEffect, useState} from 'react';
import styles from "../notice/Notice.module.css";
import HeaderNoticeQna from "../../fragments/noticeQna/HeaderNoticeQna";
import NavNoticeQna from "../../fragments/noticeQna/NavNoticeQna";
import Paginations from "../../components/commons/Paginations";
import FooterNoticeQna from "../../fragments/noticeQna/FooterNoticeQna";
import {
    findAllHospitalMember,
    findAllHospitalMemberByStatus,
    findHospitalMemberByWord
} from "../../utils/hMemberManageApi";
import useAuthStore from "../../stores/useAuthStore";
import {useNavigate, useSearchParams} from "react-router-dom";

function HMemberList () {
    // 필요한거
    const {username, role} = useAuthStore();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [filter, setFilter] = useState('all');  // 기본상태: 전체
    const PAGE_SIZE = 20;
    //dropdown 검색바
    const [isOpen, setIsOpen] = useState(false);  // 처음엔 닫혀있어
    const [searchType, setSearchType] = useState('both');  // 기본상태: id+name
    const [searchWord, setSearchWord] = useState('');
    let pageno = parseInt(params.get('pageno'));
    if (isNaN(pageno) || pageno<1)
        pageno = 1;

    const toggleDropdown = () => setIsOpen(!isOpen);  // 눌렀을 때 이전과 반대대는 상태 저장되게

    const [data, setData] = useState({
        prev: 0,
        start: 1,
        end: 1,
        next: 0,
        pageno: pageno,
        normalMemberList: []
    })

    const pagination = {
        prev: data.prev,
        start: data.start,
        end: data.end,
        next: data.next,
        pageno: pageno,
        moveUrl: `?pageno=`
    }

    // 상태 필터링 핸들러
    const setAllHandler = () =>  setFilter('all');
    const setNormalHandler = () =>  setFilter('normal');
    const setWarningHandler = () =>  setFilter('warning');
    const setBlockHandler = () =>  setFilter('block');

    // 데이터 불러오는 함수 밖으로 뺌
    async function fetchHMemberList() {
        try {
            let response;
            if (filter==='all') {
                response = await findAllHospitalMember(pageno, PAGE_SIZE);
            } else if (filter === 'normal') {
                response = await findAllHospitalMemberByStatus('normal', pageno, PAGE_SIZE);
            } else if (filter === 'warning') {
                response = await findAllHospitalMemberByStatus('warning', pageno, PAGE_SIZE);
            } else if (filter === 'block') {
                response = await findAllHospitalMemberByStatus('block', pageno, PAGE_SIZE);
            }
            setData(response.data);
        } catch(err) {
            console.log('일반 회원 리스트를 가져오지 못했습니다: ', err);
        }
    }

    // 검색
    const searchHandler = async() => {
        try {
            const response = await findHospitalMemberByWord(searchType, searchWord, pageno, PAGE_SIZE);
            if(response.data.hospitalMemberList.length===0) {
                setData({
                    prev: 0,
                    start: 1,
                    end: 1,
                    next: 0,
                    pageno: pageno,
                    hospitalMemberList: []
                });  // 데이터 없으면 data를 전부 초기화 ∵list만 초기화했더니 필터가 안바뀌면 안바뀜
            } else {
                setData(response.data);
            }
        } catch(err) {
            console.log('검색 데이터를 불러오지 못했습니다: ', err);
        }
    }

    // const changeSearchType = e => setSearchType(e.target.value);
    const changeSearchWord = e => setSearchWord(e.target.value);

    // 데이터 가져오는 상태
    useEffect(() => {
        // 안했으면 이 페이지 접근 못함 ∵PrivateRoute App.js에 걸어둠  <- 삭제 고민해보자 ********
        if (username === undefined || role === undefined) return null;
        if (searchWord) return;  // 검색어가 있으면 여기에서 나가
        fetchHMemberList();
    }, [pageno, filter, role, username]);

    console.log(data);
        return (
            <div className={styles.ntcQnaWrapper}>
                <HeaderNoticeQna />
                <main>
                    <NavNoticeQna activeTab = 'hMemberManage' />
                    <section>
                        <div style={{ padding: '0 20px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className='mb-4 mt-3'>병원 회원 관리</h4>
                                <div className='d-flex align-items-center gap-2'>
                                    <div className='dropdown'>
                                        <button className='btn btn-ligh dropdown-toggle mb-6 btn-sm' type='button dropdown-toggle'
                                                onClick={() => toggleDropdown()} style={{border: '1px solid lightgray', width:'100px'}}>
                                            {searchType === 'both' && 'id + 이름'}
                                            {searchType === 'id' && 'id '}
                                            {searchType === 'name' && '이름'}
                                        </button>
                                        {isOpen && (
                                            <ul className="dropdown-menu show">
                                                <li><a className="dropdown-item" href="#" onClick={() => {
                                                    setSearchType('both');
                                                    toggleDropdown();
                                                }}>id + 이름</a></li>
                                                <li><a className="dropdown-item" href="#" onClick={() => {
                                                    setSearchType('id');
                                                    toggleDropdown();
                                                }}>id</a></li>
                                                <li><a className="dropdown-item" href="#" onClick={() => {
                                                    setSearchType('name');
                                                    toggleDropdown();
                                                }}>이름</a></li>
                                            </ul>
                                        )}
                                    </div>
                                    <div className="input-group mb-6 input-group-sm" style={{width:'300px'}}>
                                        <input type="text" className="form-control" placeholder="검색" value={searchWord} onChange={changeSearchWord}/>
                                        <button className="btn btn-secondary" onClick={()=> searchHandler()} >검색</button>
                                    </div>
                                </div>
                            </div>
                            <ul style={{overflow: 'hidden', border: '1px solid black', padding: '7px', borderRadius: '10px'}}>
                                <li style={{
                                    float: 'left',
                                    width: '120px',
                                    height: '38px',
                                    margin: '3px 7px',
                                    textAlign: 'center',
                                    lineHeight: '38px',
                                    fontWeight: 'bold'
                                }}>회원 상태
                                </li>
                                <li style={{float: 'left'}}>
                                    <button className={'btn btn-outline-dark'}
                                            style={{width:'120px', margin:'3px 7px', backgroundColor:filter==='all'? '#F6F6F6' : '#D8D8D8'}}
                                            onClick={()=>setAllHandler()}>전체</button>
                                </li>
                                <li style={{float:'left'}}>
                                    <button className={'btn btn-outline-dark'}
                                            style={{width:'120px', margin:'3px 7px', backgroundColor:filter==='normal'? 'white' : '#D8D8D8'}}
                                            onClick={()=>setNormalHandler()}>일반</button>
                                </li>
                                <li style={{float:'left'}}>
                                    <button className={'btn btn-outline-dark'}
                                            style={{width:'120px', margin:'3px 7px', backgroundColor:filter==='warning'? 'white' : '#D8D8D8'}}
                                            onClick={()=>setWarningHandler()}>경고</button>
                                </li>
                                <li style={{float:'left'}}>
                                    <button className={'btn btn-outline-dark'}
                                            style={{width:'120px', margin:'3px 7px', backgroundColor:filter==='block'? 'white' : '#D8D8D8'}}
                                            onClick={()=>setBlockHandler()}>차단</button>
                                </li>
                            </ul>
                        </div>
                        <table className='mb-3 mt-3 table table-hover noticeList' style={{ margin: '20px 0' }}>
                            <thead className='mb-3 mt-3 table-secondary'>
                            <tr style={{ textAlign: 'center' }}>
                                <th style={{ width: '200px' }}>아이디</th>
                                <th style={{ width: '200px' }}>회원명</th>
                                <th style={{ width: '200px' }}>가입일</th>
                                <th style={{ width: '200px' }}>회원 상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.hospitalMemberList && data.hospitalMemberList.length>0? (
                                data.hospitalMemberList.map(hMember => {
                                    console.log('개별 hMember:', hMember);
                                    return (
                                        <tr key={hMember.username} style={{cursor:'pointer'}} onClick={()=>navigate(`/h-members/h-member?username=${hMember.username}`)}>
                                            <td style={{ textAlign: 'center' }}>
                                                {hMember.username}
                                            </td>
                                            <td  style={{ textAlign: 'center' }}>
                                                {hMember.hospital}
                                            </td>
                                            {/* 날짜부분만 잘라냄 */}
                                            <td style={{ textAlign: 'center' }}>{hMember.signDt.substring(0, 10)}</td>
                                            <td style={{ textAlign: 'center' }}>{hMember.status} </td>

                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan='5' style={{textAlign:'center'}}> 회원이 존재하지 않습니다. </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <Paginations pagination={pagination} />
                    </section>
                </main>
                <FooterNoticeQna />
            </div>
        );
}



export default HMemberList;