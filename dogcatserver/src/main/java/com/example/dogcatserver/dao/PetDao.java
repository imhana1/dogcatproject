package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.Pet;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface PetDao {
    @Select("select PNO, P_WEIGHT, ANIMAL_TYPES, MICROCHIPPED, P_BREED, P_NAME, P_AGE, P_WEIGHT, HAS_ALLERGIES, P_PROFILE from PET where PNO=#{pno}")
    Pet findByPname(String pno);

    int petsave(Pet pet);

    @Update("update PET set P_PROFILE=#{pprof} where PNO=#{pno}")
    int updatepetProfile(String base64Image, String pno);

    @Delete("delete from PET where PNO=#{pno}")
    int deletepet(String pno);
}
