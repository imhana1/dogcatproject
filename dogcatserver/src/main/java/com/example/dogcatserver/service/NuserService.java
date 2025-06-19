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

    public boolean checkNid(NuserDto.NidCheck dto) {return !nuserDao.existsBynId(dto.getNId());
    }
}
