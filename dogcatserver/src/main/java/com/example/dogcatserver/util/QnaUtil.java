package com.example.dogcatserver.util;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.springframework.http.*;
import org.springframework.web.multipart.*;

import java.io.*;
import java.util.*;

public class QnaUtil {  // notice와 동일
  // pagination
  public static QnaQuestionDto.Pages getPages(int pageno, int pagesize, int blocksize, int totalcount, List<QnaQuestion> qnaQuestions) {
    // 전체 페이지 수
    int numberOfPages = (int)(Math.ceil((double)totalcount/pagesize));
    if (numberOfPages == 0) numberOfPages = 1;

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

  public static String convertToBase64(MultipartFile file) throws IOException {
    byte[] fileBytes = file.getBytes();
    // contentType 은 파일의 형식 ex)image/jpg |  image/png
    // base64 형식으로 데이터를 브라우저에 출력할 때
    //    웹브라우저가 데이터의 종류를 모르면 저장 메뉴를 띄운다
    //    데이터 앞에 파일 형식을 지정하면, 웹브라우저가 처리함
    return "data:" + file.getContentType() + ";base64,"
        + Base64.getEncoder().encodeToString(fileBytes);
  }



}
