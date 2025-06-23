package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.*;

@SpringBootTest
public class QnaDaoTest {
  @Autowired
  private QnaQuestionDao qnaQuestionDao;
  @Autowired
  private QnaAnswerDao qnaAnswerDao;

//  @Test
  public void writeQnaQuestions() {
    for (int i = 0; i < 25; i++) {
      QnaQuestion qnaQuestion = QnaQuestion.builder().qTitle((i + 1) + "번째 질문 제목").qContent((i + 1) + "번째 공지 내용").username("winter").build();
      qnaQuestionDao.writeQnaQuestion(qnaQuestion);
    }
  }

  // @Test
  public void findQnaQuestionByQnoTest() {
    qnaQuestionDao.findQnaQuestionByQno(1);
  }

  // @Test
  public void findAllQnaQuestionTest() {
    qnaQuestionDao.findAllQnaQuestion(3, 10);
  }

  // @Test
  public void countAllQnaQuestionTest() {
    qnaQuestionDao.countAllQnaQuestion();
  }

  // @Test
  public void findQnaQuestionsByUsernameTest() {
    qnaQuestionDao.findQnaQuestionsByUsername(1, 10, "winter");
  }

  // @Test
  public void updateQIsAnsweredTest() {
    qnaQuestionDao.updateQIsAnswered(25);
  }

  // @Test
  public void writeQnaAnswerTest() {
    QnaQuestion qnaQuestion = qnaQuestionDao.findQnaQuestionByQno(25).orElseThrow(()->new EntityNotFoundException("글없음"));
    int qno = qnaQuestion.getQno();  // 같은짓 굳이 2번 반복하는거 알지만,, 해봄
    QnaAnswer qnaAnswer = new QnaAnswer().builder().qno(qno).answerContent("25번째 글에 대한 답변입니다.").username("admin").build();
    qnaAnswerDao.writeQnaAnswer(qnaAnswer);
  }

  // @Test (실패 테스트)
  public void findQnaAnswerByQnoFailTest() {
    QnaQuestion qnaQuestion = qnaQuestionDao.findQnaQuestionByQno(24).orElseThrow(()->new EntityNotFoundException("글없음"));
    int qno = qnaQuestion.getQno();
    qnaAnswerDao.findQnaAnswerByQno(qno).orElseThrow(()->new EntityNotFoundException("답변이 작성되지 않음"));
  }

  // @Test (성공 테스트)
  public void findQnaAnswerByQnoSuccessTest() {
    QnaQuestion qnaQuestion = qnaQuestionDao.findQnaQuestionByQno(25).orElseThrow(()->new EntityNotFoundException("글없음"));
    int qno = qnaQuestion.getQno();
    qnaAnswerDao.findQnaAnswerByQno(qno).orElseThrow(()->new EntityNotFoundException("답변이 작성되지 않음"));
  }
}

