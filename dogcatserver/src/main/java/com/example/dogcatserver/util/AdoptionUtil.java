package com.example.dogcatserver.util;

import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import jakarta.mail.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.multipart.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;

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
