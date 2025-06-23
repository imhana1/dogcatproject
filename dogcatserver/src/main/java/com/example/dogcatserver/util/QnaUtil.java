package com.example.dogcatserver.util;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;

import java.util.*;

public class QnaUtil {  // notice와 동일
  // pagination
  public static QnaQuestionDto.Pages getPages(int pageno, int pagesize, int blocksize, int totalcount, List<QnaQuestion> qnaQuestions) {
    // 전체 페이지 수
    int numberOfPages = (int)(Math.ceil((double)totalcount/pagesize));

    int prev = (pageno-1)/blocksize * blocksize;
    int start = prev + 1;
    int end = prev + blocksize;
    int next = end + 1;

    // 마지막 페이지에서 end처리
    if(end>=numberOfPages) {
      end = numberOfPages;
      next = 0;
    }
    return new QnaQuestionDto.Pages(prev, start, end, next, pageno, qnaQuestions);
  }
}
