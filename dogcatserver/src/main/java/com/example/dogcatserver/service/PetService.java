package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.PetDao;
import com.example.dogcatserver.dto.PetDto;
import com.example.dogcatserver.entity.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetService {
    @Autowired
    private PetDao petDao;

//    public PetDto.Pread Pread(String pno) {
//        Pet pet = petDao.findByPname(pno);
//        return Pet.toRead();
//    }
}
