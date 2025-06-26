package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.*;
import jakarta.validation.constraints.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class TreatService {
    @Autowired
    private TreatDao treatDao;

    public Treat Write(TreatDto.create dto, String loginId){
        Treat treat = dto.toEntity(loginId);
        treatDao.save(treat);
        return treat;
    }


    public Treat read(int tno) {
        return treatDao.findbyTno(tno)
                .orElseThrow(() -> new EntityNotFoundException("진료 기록을 찾을 수 없습니다"));
    }

}
