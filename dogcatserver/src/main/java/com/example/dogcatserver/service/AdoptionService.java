package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import com.example.dogcatserver.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.web.multipart.*;

import java.util.*;

@Service
public class AdoptionService {
  @Autowired
  private AdoptionDao adoptionDao;
  @Autowired
  private AdoptionUtil adoptionUtil;

  // 블록 사이즈는 5로 고정
  private static final int BLOCK_SIZE = 5;

  // 글 전체 목록: findAllAdoption
  public AdoptionDto.Pages findAllAdoption(int pageno, int pagesize) {
    int totalCount = adoptionDao.countAllAdoption();
    List<Adoption> adoptions = adoptionDao.findAllAdoption(pageno, pagesize);
    return AdoptionUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalCount, adoptions);
  }

  // 지역별 글 목록: findAllAdoptionByACity
  public AdoptionDto.Pages findAllAdoptionByACity(ACity aCity, int pageno, int pageszie) {
    int totalCountByACity = adoptionDao.countAllAdoption();
    List<Adoption> adoptionsByACity = adoptionDao.findAllAdoptionByACity(aCity, pageno, pageszie);
    return AdoptionUtil.getPages(pageno, pageszie, BLOCK_SIZE, totalCountByACity, adoptionsByACity);
  }

  // 단일 글 읽어오기: findAdoptionByAno
  public Adoption findAdoptionByAno(int ano, String loginId) {
    // 여기도 글 수정, 삭제 결정하려면 작성자유무 판단해야해서 loginId 추가
    return adoptionDao.findAdoptionByAno(ano).orElseThrow(()->new EntityNotFoundException("글을 찾지 못했습니다."));
  }

  // 글 작성: writeAdoption
  public Adoption writeAdoption(AdoptionDto.Write writeDto, MultipartFile profileImage, String loginId) {
    if (profileImage == null || profileImage.isEmpty()) {
      throw new JobFailException("프로필 사진은 필수입니다.");
    }

    // 프로필 사진 저장
    String savedFileName = adoptionUtil.saveAProfile(profileImage);

    // DTO를 Entity로 변환하면서 사진 파일명 설정
    Adoption adoption = writeDto.toEntity(loginId, savedFileName);
    adoptionDao.writeAdoption(adoption);  // DB에 글 등록
    return adoption;

  }

  // 글 수정: updateAdoption
  public Adoption updateAdoption(AdoptionDto.Update updateDto, MultipartFile profileImage, String loginId) {
    // 글 찾아
    Adoption adoption = adoptionDao.findAdoptionByAno(updateDto.getAno()).orElseThrow(()->new EntityNotFoundException("글을 찾지 못했습니다."));

    // 작성자가 다르면 에러
    if(!adoption.getUsername().equals(loginId)) {
      throw new JobFailException("잘못된 작업입니다.");
    }

    String savedFileName = null;

    // 새로운 프로필 이미지가 있으면 교체
    if (profileImage != null && !profileImage.isEmpty()) {
      // 기존 파일 삭제
      adoptionUtil.deleteAProfile(adoption.getAProfile());

      // 새 이미지 저장
      savedFileName = adoptionUtil.saveAProfile(profileImage);
      updateDto.setAProfile(savedFileName); // 업데이트된 파일명 설정
    } else {
      // 이미지가 없다면 기존 이미지를 그대로 사용
      updateDto.setAProfile(adoption.getAProfile());
    }
    // 작성자는 수정하자
    adoptionDao.updateAdoption(updateDto);
    // 수정한 후 글 번호 리턴
    return adoption;
  }

  // 글 삭제: deleteAdoptionByAno
  public void deleteAdoptionByAno(int ano, String loginId) {
    Adoption adoption = adoptionDao.findAdoptionByAno(ano).orElseThrow(()->new EntityNotFoundException("글을 찾지 못했습니다."));
    if(!adoption.getUsername().equals(loginId)) {
      throw new JobFailException("잘못된 작업입니다.");
    }
    adoptionDao.deleteAdoptionByAno(ano);
  }
}
