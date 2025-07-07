// pagination

import { Pagination } from "react-bootstrap";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useNavigate } from "react-router-dom";
import { findAll } from "../../utils/noticeApi";

const Paginations = ({ pagination }) => {
    const navigate = useNavigate();

    // pagination 아직 안왔을 때
    if (!pagination) {
        return null;
    }

    console.log(pagination);  // 확인용
    const { prev, start, end, next, pageno, moveUrl } = pagination;  // 받아와

    // 번호 넣어
    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    // 이동
    const move = (pageno) => navigate(`${moveUrl}${pageno}`);

    return (
        <Pagination style={{ justifyContent: 'center' }} className="mt-5">
            {/* 이전으로: prev가 0 이상 */}
            {prev > 0 && <Pagination.Item onClick={() => move(prev)}>이전으로</Pagination.Item>}
            {/* 숫자버튼들 */}
            {pages.map(i => (
                <Pagination.Item key={i} active={pageno === i} onClick={() => move(i)}>{i}</Pagination.Item>
            ))}
            {/* 다음으로: next가 0 이상 */}
            {next > 0 && <Pagination.Item onClick={() => move(next)}>다음으로</Pagination.Item>}
        </Pagination>
    );

}

export default Paginations;