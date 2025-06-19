package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.Pet;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface PetDao {
    @Select("select PNO, ANIMAL_TYPES, MICROCHIPPED, BREED, P_NAME, P_AGE, P_WEIGHT, HAS_ALLERGIES, P_PROFILE from PET where PNO=#{pno}")
    Pet findByPname(String pno);
}
