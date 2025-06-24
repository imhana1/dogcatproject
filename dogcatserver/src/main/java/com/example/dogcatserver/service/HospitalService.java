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
    private KakaoAddressService service;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder encoder;

    @Transactional
    public SignupDto signup(SignupDto.SignupRequestDto dto) {
        String useMemberName = dto.getUseMember().getUsername();
        String hospitalName = dto.getHospital().getHUsername();
        if (!useMemberName.equals(hospitalName)) {
            throw new IllegalArgumentException("UseMember 이름과 Hospital 이름이 일치하지 않습니다.");
        }

        String address = dto.getHospital().getHAddress();
        double[] latlng = service.getCoordinates(address);

        System.out.println("주소: " + address);
        System.out.println("위도: " + latlng[0] + ", 경도: " + latlng[1]);

        String encodedPassword = encoder.encode(dto.getUseMember().getPassword());
        UseMember useMember = dto.getUseMember().toUseMemberEntity(encodedPassword);
        Hospital hospital = dto.getHospital().toSignEntity(latlng[0], latlng[1]);

        memberDao.signupUpdate(useMember);
        hospitalDao.save(hospital);

        return new SignupDto(dto);
    }

    public JoinViewInfoDto.HospitalInfo Read(String loginId) {
        HospitalMemberInfo hospitalMemberInfo = hospitalDao.getByUsername(loginId);
        return hospitalMemberInfo.toRead();
    }

    public JoinViewInfoDto.HospitalInfoChange ChangeInfo(JoinViewInfoDto.HospitalInfoChange dto,MultipartFile hProfile, MultipartFile dProfile, String loginId){
        String address = dto.getHAddress();
        double[] latlng = {0, 0};
        if (address != null && !address.isBlank()) {
            latlng = service.getCoordinates(address);
        }

        String base64HImage = "";
        String base64DImage = "";
        try {
            if (dto.getHProfile() != null && !dto.getHProfile().isEmpty()) {
                base64HImage = ProfileUtil.convertToBase64(dto.getHProfile());
            }
            if (dto.getDProfile() != null && !dto.getDProfile().isEmpty()) {
                base64DImage = ProfileUtil.convertToBase64(dto.getDProfile());
            }
        } catch (IOException e) {
            System.out.println("프로필 이미지 변환 실패: " + e.getMessage());
        }

        HospitalMemberInfo existing = hospitalDao.getByUsername(loginId);
        if (base64HImage.isEmpty() && existing != null) {
            base64HImage = existing.getHProfile();
        }
        return hospitalDao.getByUsername(loginId).toChangeRead();
    }
}
