package com.example.dogcatserver.hosService;

import com.example.dogcatserver.hosDao.*;
import com.example.dogcatserver.hosDto.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

@Service
public class HospitalService {
    @Autowired
    private HospitalDao hospitalDao;

    // 아이디 사용 여부 확인
    public boolean checkUsername(HospitalDto.UsernameCheck dto){return !hospitalDao.existsByUsername(dto.getUsername());}
}
