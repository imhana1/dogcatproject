package com.example.dogcatserver.util;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

public class PetUtil {
  // try ~ catch 는 예외 처리 작업
  // throws 는 예외를 처리하지 않고, 일 시킨 사람에게 떠넘김
  // 지금은 서비스에서 업로드한 이미지를 base64 로 바꿔라 그러면 문제가 발생하면 대처도 서비스가 해야지

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
}