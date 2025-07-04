package com.example.dogcatserver;

import com.example.dogcatserver.dao.NuserDao;
import com.example.dogcatserver.dao.PetDao;
import com.example.dogcatserver.entity.Nuser;
import com.example.dogcatserver.entity.Pet;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

//@SpringBootTest
//public class PetDaoTest {
//    @Autowired
//    private PetDao petDao;
//    @Autowired
//    private NuserDao nuserDao;
//
//
//    @Test
//    public void petsaveTest() {
//        Nuser user = Nuser.builder()
//                .nid("testuser")                    // N_USERNAME
//                .nname("테스xm")                 // N_NAME
//                .zip(1234)
//                .naddr("서울시 테스트구")
//                .ntel("010-1234-5678")
//                .nbirth(LocalDate.of(1990, 1, 1))
//                .nlocation(127.036521)
//                .nlongitude(127.0000)
//                .build();
//
//        nuserDao.save(user);  // ✅ 먼저 부모 키 삽입
//
//
//        Pet testPet = Pet.builder()
//                .pno(1)
//                .nid("testuser")
//                .ptype("강아지")
//                .pmichipe(1)
//                .pbreed("푸들")
//                .pname("멍멍이")
//                .page(LocalDate.of(2020, 1, 1))
//                .pweight(5)
//                .palg(0)
//                .pins(1)
//                .pchronic("없음")
//                .psname("중성화")
//                .pprof("default-image-base64")
//                .build();
//
//        int result = petDao.petsave(testPet);
//        System.out.println("Insert result: " + result);
//        Assertions.assertEquals(1, result);
//    }

