package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class WishService {
  @Autowired
  private WishDao wishDao;
  @Autowired
  private AdoptionDao adoptionDao;

  // 관심 등록과 삭제
  public int addOrRemoveWish(int ano, String loginId) {
    // 글 확인
    Adoption adoption = adoptionDao.findAdoptionByAno(ano).orElseThrow(()->new EntityNotFoundException("글이 존재하지 않습니다."));
    // 관심 등록x면 관심등록
    if(wishDao.findFromWish(ano, loginId)<1) {
      int result = wishDao.addWishByAno(ano, loginId);
      // 실패
      if(result<1) {
        throw new JobFailException("관심 등록에 실패했습니다");
      }
      // 성공하면 글번호 리턴
      return ano;
    }

    // 관심 등록o면 관심삭제
    else {
      int result = wishDao.removeWishByAno(ano, loginId);
      if(result<1) {
        throw new JobFailException("관심 삭제에 실패했습니다");
      }
      return ano;
    }
  }

  // 글 관심등록 유무 확인 (∵프론트 화면 만들 때 찜 유무에 따라 버튼 이미지 결정)
  public boolean checkIsWished(int ano, String username) {
    return wishDao.findFromWish(ano, username) > 0 ;  // 값이 존재하면 1 리턴하니까 true, 없으면 false
  }
}

