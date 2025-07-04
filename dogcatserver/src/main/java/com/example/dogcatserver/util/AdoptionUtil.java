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



  private static final String PROFILE_FOLDER = System.getProperty("user.dir") + File.separator + "upload"
      + File.separator + "profile" + File.separator;
  private static final String PROFILE_NAME = "profile_icon.jpg";

  public static String getDefaultBase64Profile() {
    try {
      // 1. 폴더와 파일명으로 파일 객체를 생성
      File file = new File(PROFILE_FOLDER, PROFILE_NAME);
      // 2. FileInputStream 을 이용해 open 한 파일을 읽어온다
      FileInputStream fis = new FileInputStream(file);
      byte[] fileBytes = fis.readAllBytes();

      // 3. Base64 로 리턴한다
      return "data:" + MediaType.IMAGE_JPEG_VALUE + ";base64," + Base64.getEncoder().encodeToString(fileBytes);
    } catch (IOException e) {
      e.printStackTrace();
    }
    // 기본프사를 base64 로 바꾸는 시스템 함수이므로 실패하는 일은 없어야지...
    return null;
  }

  public String saveAProfile(MultipartFile aProfile) {

    try {
      // 파일 형식
      String aProfileType = aProfile.getContentType();
      if(aProfileType==null || !aProfileType.startsWith("image/")) {
        throw new JobFailException("형식이 올바르지 않습니다.");
      }

      // 파일명 생성 (UUID + 확장자)  **
      String originalFilename = aProfile.getOriginalFilename();
      String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
      String savedFileName = UUID.randomUUID().toString() + extension;

      // 파일 저장
      Path aProfilePath = Paths.get(uploadPath, savedFileName);
      Files.copy(aProfile.getInputStream(), aProfilePath, StandardCopyOption.REPLACE_EXISTING);

      return savedFileName;
    } catch (IOException e) {
      throw new JobFailException("사진 업로드에 실패하였습니다.");
    }
    }


    // 삭제 보류
  public void deleteAProfile(String aProfileFilename) {
    try {
      // 삭제할 파일 경로 생성
      Path filePath = Paths.get(uploadPath, aProfileFilename);

      // 파일이 존재하면 삭제
      if (Files.exists(filePath)) {
        Files.delete(filePath);
      }
    } catch (IOException e) {
      throw new JobFailException("사진 삭제에 실패하였습니다.");
    }
  }
}
