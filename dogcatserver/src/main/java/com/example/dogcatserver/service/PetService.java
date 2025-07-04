package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.PetDao;
import com.example.dogcatserver.dto.PetDto;
import com.example.dogcatserver.entity.Pet;
import com.example.dogcatserver.util.PetUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PetService {
    @Autowired
    private PetDao petDao;

    public Pet petsave(PetDto.@Valid psave dto) {
        MultipartFile petprofile = dto.getPetprofile();
        boolean 프사_존재 = petprofile != null && !petprofile.isEmpty();

        String base64Image;
        try {
            base64Image = 프사_존재
                    ? PetUtil.convertToBase64(petprofile)
                    : PetUtil.getDefaultBase64Profile();
        } catch (IOException e) {
            throw new RuntimeException("펫 프로필 이미지 처리 중 오류 발생", e);
        }

        Pet pet = dto.toEntity(base64Image);
        petDao.petsave(pet);
        return pet;
    }

    public PetDto.pread petread(String pno) {
        Pet pet = petDao.findByPname(pno);
        return pet.toRead();
    }

    public PetDto.pread changepetProfile(MultipartFile petprofile, String pno) {
        String base64Image = "";

        try {
            base64Image = PetUtil.convertToBase64(petprofile);
            petDao.updatepetProfile(base64Image, pno);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return petDao.findByPname(pno).toRead();
    }

    public void deletepet(String pno) {
        petDao.deletepet(pno);
    }
}





























