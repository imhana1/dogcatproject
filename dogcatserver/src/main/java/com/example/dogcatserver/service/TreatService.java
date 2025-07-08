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
public class TreatService {
    @Autowired
    private TreatDao treatDao;
    private ReservationDao reservationDao ;

    // 블록 사이즈는 5로 고정
    private static final int BLOCK_SIZE = 5;

    public TreatDto.pages findAll(int pageno, int pagesize){
        int totalcount = treatDao.count();
        List<Treat> treats = treatDao.findAll(pageno, pagesize);
        return TreatUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalcount, treats);
    }

    // rno를 가지고 고객 아이디 조회 후 엔티티에 추가 + save함수 호출
    public Treat Write(TreatDto.create dto, String loginId){
        String nUsername = reservationDao.FindnUsernameByRno(dto.getRno());
        if(nUsername ==null){
            throw new EntityNotFoundException("예약번호"+ dto.getRno()+ "에 해당되는 아이디가 없습니다");
        }
        Treat treat = dto.toEntity(loginId, nUsername);
        treatDao.save(treat);
        return treat;
    }


    // rno로 진료 결과를 호출
    public Treat read(int rno) {
        return treatDao.findByRno(rno)
                .orElseThrow(() -> new EntityNotFoundException("진료 기록을 찾을 수 없습니다"));
    }

}
