package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.util.*;
import jakarta.mail.*;
import jakarta.mail.internet.*;
import org.apache.commons.lang3.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.mail.javamail.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.*;
import org.springframework.stereotype.Service;
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
    private JavaMailSender mailSender;
    @Autowired
    private PasswordEncoder encoder;

    @Transactional
    public SignupDto signup (SignupDto.SignupRequestDto dto){
        String useMemberName = dto.getUseMember().getUsername();      // UseMemberDto에서 이름 가져오기
        String hospitalName = dto.getHospital().getHUsername();
        if (!useMemberName.equals(hospitalName)) {
            throw new IllegalArgumentException("UseMember 이름과 Hospital 이름이 일치하지 않습니다.");
        }
        // 1. 회원 비밀번호를 암호화
        String encodedPassword = encoder.encode(dto.getUseMember().getPassword());
        // 2. DTO를 엔티티로 변환 (회원, 병원)
        UseMember useMember = dto.getUseMember().toUseMemberEntity(encodedPassword);
        Hospital hospital = dto.getHospital().toSignEntity();
        // 3. DB에 회원 정보 업데이트 및 병원 정보 저장
        memberDao.signupUpdate(useMember);
        hospitalDao.save(hospital);
        // 4. 요청 DTO를 다시 감싸서 반환 (응답용)
        return new SignupDto(dto);
    }


}
