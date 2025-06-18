package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class HospitalService {
    @Autowired
    private HospitalDao hospitalDao;

    // 아이디 사용 여부 확인
    public boolean checkUsername(HospitalDto.UsernameCheck dto){return !hospitalDao.existsByUsername(dto.getUsername());}
}
