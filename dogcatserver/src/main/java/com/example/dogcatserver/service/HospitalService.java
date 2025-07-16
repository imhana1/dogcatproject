package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.mail.javamail.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;
import org.springframework.web.multipart.*;

import java.io.*;

@Service
public class HospitalService {

    @Autowired
    private HospitalDao hospitalDao;

    @Autowired
    private UseMemberDao memberDao;

    @Autowired
    private ReservationDao reservationDao;

    @Autowired
    private ReviewDao reviewDao;

    @Autowired
    private  ScheduleDao scheduleDao;


    @Autowired
    private KakaoAddressService service;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private TreatDao treatDao;

    // 병원 주소 좌표화 + 회원 가입 정보 입력
    @Transactional
    public SignUpResponse.HospitalResponse signup(SignupDto.SignupRequestDto dto) {
//        String useMemberName = dto.getUseMember().getUsername();
//        String hospitalName = dto.getHospital().getHUsername();
//        if (!useMemberName.equals(hospitalName)) {
//            throw new IllegalArgumentException("UseMember 이름과 Hospital 이름이 일치하지 않습니다.");
//        }

        String address = dto.getHospital().getHAddress();
        double[] latlng = service.getCoordinates(address);

        System.out.println("주소: " + address);
        System.out.println("위도: " + latlng[0] + ", 경도: " + latlng[1]);

        String encodedPassword = encoder.encode(dto.getUseMember().getPassword());
        RoleUserUsermemberResponse.RoleHospital useMember = dto.getUseMember().toUseMemberEntity(encodedPassword);
        Hospital hospital = dto.getHospital().toSignEntity(latlng[0], latlng[1]);

        memberDao.signupHUpdate(useMember);
        hospitalDao.save(hospital);

        return SignUpResponse.HospitalResponse.builder()
                .hospital(hospital)
                .roleHospital(useMember)
                .build();
    }

    // 병원 정보 읽어오는 기능
    public JoinViewInfoDto.HospitalInfo Read(String loginId) {
        HospitalMemberInfo hospitalMemberInfo = hospitalDao.getByUsername(loginId);
        return hospitalMemberInfo.toRead();
    }

    // 병원 정보 변경 하는 기능 좌표 + 프로필(병원 사진은 null로 통일)
    public HospitalInfoChangeResponse ChangeInfo(JoinViewInfoDto.HospitalInfoChange dto, String base64HImage, String base64DImage) {
        String address = dto.getHAddress();
        double[] latlng = {0, 0};

        if (address != null && !address.isBlank()) {
            latlng = service.getCoordinates(address);
        }

        HospitalMemberInfo existing = hospitalDao.getByUsername(dto.getHUsername());

        // 업로드한 이미지가 없으면 기존 이미지 유지
        if ((base64HImage == null || base64HImage.isEmpty()) && existing != null) {
            base64HImage = existing.getHProfile();
        }
        if ((base64DImage == null || base64DImage.isEmpty()) && existing != null) {
            base64DImage = existing.getDProfile();
        }

        HospitalMemberInfo hospitalMemberInfo = dto.toChangeEntity(
                latlng[0], latlng[1], base64HImage, base64DImage
        );

        hospitalDao.changeInfo(hospitalMemberInfo);

        return hospitalDao.getByUsername(dto.getHUsername()).toChangeRead();
    }

    public LocationResult findloaction(String address){
        Hospital hospital = hospitalDao.findAddress(address);
        if (hospital == null) {
            throw new RuntimeException("해당 주소로 등록된 병원이 없습니다: " + address);
        }
        return LocationResult.builder().hLocation(hospital.getHLocation()).hLongitude(hospital.getHLongitude()).build();
    }



    // 회원 탈퇴
    @Transactional
    public void resign (String loginId){
        reviewDao.AllDelete(loginId);
        hospitalDao.deletePay(loginId);
        treatDao.deleteTreat(loginId);
        reservationDao.AllDelete(loginId);
        scheduleDao.AllDelet(loginId);
        hospitalDao.deletehospital(loginId);
        memberDao.delete(loginId);
    }

//     공개 병원 정보 보기
    public HospitalDto.PublicInfo getPublicHospitalInfo(String hUsername) {
        HospitalMemberInfo info = hospitalDao.getByUsername(hUsername);
        if(info==null) return null;

        HospitalDto.PublicInfo dto = new HospitalDto.PublicInfo();
        dto.setHUsername(info.getHUsername());
        dto.setHospital(info.getHospital());
        return dto;
    }


    // 소개 페이지 정보 불러오기 + 병원 이름 아이디 불러오기
    public HospitalMemberInfo readInfo(String hAddress, String hospital){
        HospitalMemberInfo infoHospital= hospitalDao.hospitalInfo(hAddress, hospital);
        return infoHospital;
    }


}
