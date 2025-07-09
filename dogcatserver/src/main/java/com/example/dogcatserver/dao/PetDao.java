package com.example.dogcatserver.dao;

import com.example.dogcatserver.dto.PetDto;
import com.example.dogcatserver.entity.Pet;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PetDao {
    @Select("select PNO as pno, P_WEIGHT as pweight, ANIMAL_TYPES as ptype, MICROCHIPPED as pmichipe, P_BREED as pbreed, P_NAME as pname, P_AGE as page, " +
            "HAS_ALLERGIES as palg, has_insurance as pins, illness_name pchronic, surgery_name as psname, P_PROFILE as pprof from PET where N_USERNAME = #{nid}")
    List<Pet> findByNid(String nid);

    @Select("select PNO as pno, P_WEIGHT as pweight, ANIMAL_TYPES as ptype, MICROCHIPPED as pmichipe, P_BREED as pbreed, P_NAME as pname, P_AGE as page, " +
            "HAS_ALLERGIES as palg, has_insurance as pins, illness_name pchronic, surgery_name as psname, P_PROFILE as pprof from PET where PNO = #{pno}")
    Pet findByPname(String pno);

    @Insert("insert into PET(pno, N_USERNAME, animal_types, microchipped, p_breed, p_name, p_age, p_weight, has_allergies, has_insurance, p_profile, illness_name, surgery_name) VALUES " +
            "(#{pno}, #{nid}, #{ptype}, #{pmichipe}, #{pbreed}, #{pname}, #{page}, #{pweight}, #{palg}, #{pins}, #{pprof}, #{pchronic}, #{psname})")
    int petsave(Pet pet);
    

    @Delete("delete from PET where N_USERNAME=#{nid}")
    int deletepet(String pno);

    @Select("SELECT PNO as pno, P_WEIGHT as pweight, ANIMAL_TYPES as ptype, MICROCHIPPED as pmichipe, P_BREED as pbreed, P_NAME as pname, P_AGE as page, " +
            "HAS_ALLERGIES as palg, HAS_INSURANCE as pins, ILLNESS_NAME as pchronic, SURGERY_NAME as psname, P_PROFILE as pprof, N_USERNAME as nid " +
            "FROM PET WHERE PNO = #{pno} AND N_USERNAME = #{nid}")
    Pet findByPnoAndNid(int pno, String nid);

    @Update("UPDATE PET SET ANIMAL_TYPES = #{ptype}, MICROCHIPPED = #{pmichipe}, P_BREED = #{pbreed}, P_NAME = #{pname}, P_AGE = #{page}, P_WEIGHT = #{pweight}, " +
            "HAS_ALLERGIES = #{palg}, HAS_INSURANCE = #{pins}, ILLNESS_NAME = #{pchronic}, SURGERY_NAME = #{psname}, P_PROFILE = #{pprof} WHERE PNO = #{pno} AND N_USERNAME = #{nid}")
    int updatePet(Pet pet);
}
