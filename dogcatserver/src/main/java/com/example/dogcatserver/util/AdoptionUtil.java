package com.example.dogcatserver.util;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import jakarta.mail.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.multipart.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;

@Component
public class AdoptionUtil {
  @Value("${file.upload.path:dogcatserver/upload/adoptionImage/}")
  private String uploadPath;


  // pagination
  public static AdoptionDto.Pages getPages(int pageno, int pagesize, int blocksize, int totalcount, List<Adoption> adoptions) {
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
    return new AdoptionDto.Pages(prev, start, end, next, pageno, adoptions);
  }

  // 사진 저장 수정버전(PetUtil)
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
