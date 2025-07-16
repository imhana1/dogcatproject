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
  @Autowired
  private WishDao wishDao;

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
    int totalCountByACity = adoptionDao.countAllAdoptionByACity(aCity);
    List<Adoption> adoptionsByACity = adoptionDao.findAllAdoptionByACity(aCity, pageno, pageszie);
    return AdoptionUtil.getPages(pageno, pageszie, BLOCK_SIZE, totalCountByACity, adoptionsByACity);
  }

  // 단일 글 읽어오기: findAdoptionByAno
  public Adoption findAdoptionByAno(int ano, String loginId) {
    // 여기도 글 수정, 삭제 결정하려면 작성자유무 판단해야해서 loginId 추가
    return adoptionDao.findAdoptionByAno(ano).orElseThrow(()->new EntityNotFoundException("글을 찾지 못했습니다."));
  }

  // 글 작성: writeAdoption
  public Adoption writeAdoption(AdoptionDto.Write writeDto, String base64Image, String loginId) {
    Adoption adoption = writeDto.toEntity(base64Image, loginId);
    adoptionDao.writeAdoption(adoption);
    return adoption;

  }

//  // 글 작성: writeAdoptionTEst 테스트끝
//  public Adoption writeAdoptionTest(AdoptionDto.WriteTest writeTesteDto, String base64Image) {
//    Adoption adoption = writeTesteDto.toEntity(base64Image);
//    adoptionDao.writeAdoption(adoption);
//    return adoption;
//
//  }

  // 글 수정: updateAdoption
  public Adoption updateAdoption(AdoptionDto.Update updateDto, String base64Image, String loginId) {
    // 글 찾아
    Adoption adoption = adoptionDao.findAdoptionByAno(updateDto.getAno()).orElseThrow(()->new EntityNotFoundException("글을 찾지 못했습니다."));

    // 작성자가 다르면 에러
    if(!adoption.getUsername().equals(loginId)) {
      throw new JobFailException("잘못된 작업입니다.");
    }

    updateDto.setAProfile(base64Image);

//    Adoption updateAdoption = updateDto.toEntity(base64Image);
    adoptionDao.updateAdoption(updateDto);
    return adoption;
  }

  // 글 삭제: deleteAdoptionByAno
  public void deleteAdoptionByAno(int ano, String loginId) {
    Adoption adoption = adoptionDao.findAdoptionByAno(ano).orElseThrow(()->new EntityNotFoundException("글을 찾지 못했습니다."));
    if(!adoption.getUsername().equals(loginId)) {
      throw new JobFailException("잘못된 작업입니다.");
    }
    // 찜목록 존재하면 찜 다 삭제
    if(wishDao.findAllWishByAno(ano)>0) {
      wishDao.removeAllWish(ano);
    }
    adoptionDao.deleteAdoptionByAno(ano);
  }
}
