package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface QnaAnswerDao {
  // 답변 작성
  @Insert("insert into qna_answer(qno, username, answer_write_day, answer_content) values(#{qno}, #{username}, #{answerWriteDay}, #{answerContent})")
  int writeQnaAnswer(QnaAnswer qnaAnswer);

  // 답변 상태를 true로 변경: QnaQuestioinDao에 있음!

  // qno에 따른 답변 출력
  @Select("select * from qna_answer where qno=#{qno}")
  Optional<QnaAnswer> findQnaAnswerByQno(int qno);
}
