package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.context.*;
import org.springframework.transaction.annotation.*;

/*
******* 롬복 꼬인건지 생성자 오류 미친듯이 나서 여기에서 테스트 못했어요 오라클에서 한번씩 테스트해봄 wishDao도 마찬가지 *********
*/

@SpringBootTest
public class AdoptionDaoTest {
  @Autowired
  private AdoptionDao adoptionDao;

  // @Test
  @Transactional
  public void insertTest() {
    Adoption adoption = Adoption.builder().aProfile("dummy/link").aName("hippo").aAge(29).aGender(AGender.MALE).aBreed("hippo").aCity(ACity.SEOUL).aLocation("거짓구 거짓동").aFoundLocation("사막").username("winter").aContent("무거워요 귀여워요").build();
  }


}
