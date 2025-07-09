package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.PetDao;
import com.example.dogcatserver.dto.PetDto;
import com.example.dogcatserver.entity.Pet;
import com.example.dogcatserver.util.PetUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetService {
    @Autowired
    private PetDao petDao;

    public Pet petsave(PetDto.@Valid psave dto, String base64Image) {

        Pet pet = dto.toEntity(base64Image);
        System.out.println(dto);
        petDao.petsave(pet);

        return pet;
    }

    public List<PetDto.pread> petread(String nid) {
        List<Pet> pet = petDao.findByNid(nid);
        if (pet == null || pet.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"해당 사용자의 반려동물이 없습니다.");
        }
        return pet.stream()
                .map(Pet::toRead)
                .collect(Collectors.toList());
    }

    public void deletepet(String pno) {
        petDao.deletepet(pno);
    }


    public PetDto.pread updatePet(PetDto.petchange dto, String base64Image) {
        Pet pet = petDao.findByPnoAndNid(dto.getPno(), dto.getNid());
        if (pet == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 반려동물을 찾을수 없습니다.");
        }

        pet.setPtype(dto.getPtype());
        pet.setPmichipe(dto.getPmichipe());
        pet.setPbreed(dto.getPbreed());
        pet.setPname(dto.getPname());
        pet.setPage(dto.getPage());
        pet.setPweight(dto.getPweight());
        pet.setPalg(dto.getPalg());
        pet.setPins(dto.getPins());
        pet.setPchronic(dto.getPchronic());
        pet.setPsname(dto.getPsname());

        if (base64Image != null && !base64Image.isBlank()) {
            pet.setPprof(base64Image);
        }
        petDao.updatePet(pet);

        return pet.toRead();
    }
}





























