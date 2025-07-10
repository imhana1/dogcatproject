package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import com.example.dogcatserver.util.*;
import jakarta.validation.constraints.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class ReviewService {

    @Autowired
    private ReservationDao reservationDao;

    @Autowired
    private ReviewDao reviewDao;
    // 블록 사이즈는 5로 고정
    private static final int BLOCK_SIZE = 5;

    public ReviewDto.pages findAll(int pageno, int pagesize){
        int totalcount = reviewDao.count();
        List<Review> posts = reviewDao.findAll(pageno, pagesize);
        return ReviewUtill.getPages(pageno, pagesize, BLOCK_SIZE, totalcount, posts);
    }

    public Review RevWrite(ReviewDto.write dto, String loginId){
        String hUsername= reservationDao.FindhUsrnameByRno(dto.getRno());
        System.out.println(hUsername);
        if (hUsername == null || hUsername.isBlank()) {
            throw new EntityNotFoundException("해당 예약번호에 해당하는 병원을 찾을 수 없습니다.");
        }
        System.out.println(hUsername);
        Review review = dto.toEntity(hUsername, loginId);
        reviewDao.save(review);
        return review;
    }

    public Review read(int revNo){
        Review review=  reviewDao.findByRevNo(revNo).orElseThrow(()-> new EntityNotFoundException("리뷰를 찾을 수 없습니다"));
        return review;
    }

    // 리뷰번호를 받아 글 정보 변경 결과 값을 반환이 필요 없는 작업
    public void update(ReviewDto.update dto, String loginId){
        Review review=  reviewDao.findByRevNo(dto.getRevNo()).orElseThrow(()-> new EntityNotFoundException("리뷰를 찾을 수 없습니다"));
        if(!review.getRevWriter().equals(loginId)){
            throw  new JobFailException("잘못된 작업입니다");
        }
        reviewDao.update(dto);
    }

    public void delete(@NotNull Integer revNO, String loginId){
        Review review=  reviewDao.findByRevNo(revNO).orElseThrow(()-> new EntityNotFoundException("리뷰를 찾을 수 없습니다"));
        if(!review.getRevWriter().equals(loginId)){
            throw  new JobFailException("잘못된 작업입니다");
        }
        reviewDao.delete(revNO);
    }
}
