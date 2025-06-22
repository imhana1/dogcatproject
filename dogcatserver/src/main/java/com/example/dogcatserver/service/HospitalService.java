package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.mail.javamail.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

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
        HospitalMemberInfo hospitalMemberInfo = hospitalDao.findByUsername(loginId);
        return hospitalMemberInfo.toRead();
    }
}
