package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class QnaService {
  @Autowired
  private QnaQuestionDao qnaQuestionDao;
  @Autowired
  private QnaAnswerDao qnaAnswerDao;

  // 블록 사이즈는 5로 고정
  private static final int BLOCK_SIZE = 5;

  // 본인이 작성한 질문 리스트 출력 (고객)
  public QnaQuestionDto.Pages findQnaQuestionsByUsername(int pageno, int pagesize, String loginId) {  // Principal: at controller
    int totalCount = qnaQuestionDao.countAllQnaQuestion();
    List<QnaQuestion> qnaQuestions = qnaQuestionDao.findQnaQuestionsByUsername(pageno, pagesize, loginId);
    return QnaUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalCount, qnaQuestions);

  }
}
