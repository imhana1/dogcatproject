package com.example.dogcatserver.dao;

import com.example.dogcatserver.entity.Pet;
import org.apache.ibatis.annotations.*;

@Mapper
public interface PetDao {
    @Select("select PNO, P_WEIGHT, ANIMAL_TYPES, MICROCHIPPED, P_BREED, P_NAME, P_AGE, P_WEIGHT, HAS_ALLERGIES, P_PROFILE from PET where N_USERNAME = #{nid}")
    Pet findByNid(String nid);

    @Select("select PNO, P_WEIGHT, ANIMAL_TYPES, MICROCHIPPED, P_BREED, P_NAME, P_AGE, P_WEIGHT, HAS_ALLERGIES, P_PROFILE from PET where N_USERNAME = #{nid}")
    Pet findByPname(String pno);

    @Insert("insert into PET(pno, N_USERNAME, animal_types, microchipped, p_breed, p_name, p_age, p_weight, has_allergies, has_insurance, p_profile, illness_name, surgery_name) VALUES " +
            "(#{pno}, #{nid}, #{ptype}, #{pmichipe}, #{pbreed}, #{pname}, #{page}, #{pweight}, #{palg}, #{pins}, #{pprof}, #{pchronic}, #{psname})")
    int petsave(Pet pet);

    @Update("update PET set P_PROFILE=#{pprof} where PNO=#{pno}")
    int updatepetProfile(String base64Image, String pno);

    @Delete("delete from PET where PNO=#{pno}")
    int deletepet(String pno);
}
