package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.*;

@Mapper
public interface QnaQuestionDao {
  // qna 질문 글 작성
  int writeQnaQuestion(QnaQuestion qnaQuestion);

  // qna 질문 단일 글 출력
  @Select("select * from qna_question where qno=#{qno}")
  Optional<QnaQuestion> findQnaQuestionByQno(int qno);

  // qna 질문 답변과 함께 출력
  Optional<Map<String, Object>> findQnaQuestionByQnoWithAnswer(int qno);

  // qna 전체 질문 목록 출력
  //@Select("select * from qna_question")
  List<QnaQuestion> findAllQnaQuestion(int pageno, int pagesize);

  // 답변 상태에 따른 질문 목록 출력
  List<QnaQuestion> findAllQnaQuestionByIsAnswered(boolean qIsAnswered, int pageno, int pagesize);

  // qna 전체 글 개수 확인 for pagination
  @Select("select count(*) from qna_question")
  int countAllQnaQuestion();

  // qna 답변상태별 글 개수 확인 for pagination
  @Select("select count(*) from qna_question where q_is_answered=#{qIsAnswered}")
  int countAllQnaQuestionByQIsAnswered(boolean qIsAnswered);

  // 본인이 작성한 질문 글 개수 확인 for pagination
  @Select("select count(*) from qna_question where username=#{username}")
  int countQnaQuestionsByUsername(String username);

  // qna 질문 본인이 작성한 목록 출력 (qna 내림차순 = 작성일 최신순)
//  @Select("select * from qna_question where username=#{username} order by qno desc offset (#{pageno}-1) * #{pagesize} rows fetch next #{pagesize} rows only")
  List<QnaQuestion> findQnaQuestionsByUsername(String username, int pageno, int pagesize);

  // question의 답변상태 true로 변경 (답변이 달리면 답변 상태를 true로 변경)
  // oracle에서는 q_is_answered의 값을 0 또는 1로 설정할거라 1로 변경. 스프링에선 boolean으로 선언해서 알아서 변환해줌
  @Update("update qna_question set q_is_answered=1 where qno=#{qno}")
  int updateQIsAnswered(int qno);
}
