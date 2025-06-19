package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.NuserDao;
import com.example.dogcatserver.dto.NuserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class NuserService {
    @Autowired
    private NuserDao nuserDao;
    @Autowired
    private PasswordEncoder encoder;

    public boolean checkNid(NuserDto.NidCheck dto) {return !nuserDao.existsBynId(dto.getNId());}

    public Nuser signup(NuserDto.Ncreate dto) {
        // 비밀번호 암호화
        String encodedPassword = encoder.encode(dto.getNpwd());
        // 암호화된 비밀번호 dto를 nuser로 변환
        Nuser nuser = dto.toEntity(encodedPassword);

        nuserDao.save(nuser);
        return nuser;
    }
}









































