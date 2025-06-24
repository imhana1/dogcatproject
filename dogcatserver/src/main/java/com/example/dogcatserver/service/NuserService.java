package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.NuserDao;
import com.example.dogcatserver.dao.UseMemberDao;
import com.example.dogcatserver.dto.JoinViewInfoDto;
import com.example.dogcatserver.dto.PetDto;
import com.example.dogcatserver.dto.SignupDto;
import com.example.dogcatserver.entity.Nuser;
import com.example.dogcatserver.entity.NuserInfo;
import com.example.dogcatserver.entity.UseMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NuserService {
    @Autowired
    private NuserDao nuserDao;

    @Autowired
    private UseMemberDao memberDao;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private KakaoAddressService service;


    @Transactional
    public SignupDto nsignup(SignupDto.SignupRequestDto dto) {
        String useMemberName = dto.getUseMember().getUsername();
        String nname = dto.getNuser().getNname();

        if (!useMemberName.equals(nname)) {
            throw new IllegalArgumentException("UseMember 이름과 Nname 이름이 일치하지 않습니다");
        }

        String address = dto.getNuser().getNaddr();
        double[] latlng = service.getCoordinates(address);
        System.out.println("주소: " + address);
        System.out.println("위도: " + latlng[0] + ", 경도: " + latlng[1]);

        String encodedPassword = encoder.encode(dto.getUseMember().getPassword());
        UseMember usemember = dto.getUseMember().toUseMemberEntity(encodedPassword);
        Nuser nuser = dto.getNuser().toSignEntity(latlng[0], latlng[1]);

        memberDao.signupUpdate(usemember);
        nuserDao.save(nuser);

        return new SignupDto(dto);
    }

    public JoinViewInfoDto.NuserInfo Read(String loginId) {
        NuserInfo nuserInfo = nuserDao.getBynUsername(loginId);
        return nuserInfo.toRead();
    }

    public JoinViewInfoDto.NuserInfo ChangeInfo(JoinViewInfoDto.NuserInfoChange dto, String loginId) {
    String address = dto.getNaddr();
    double[] latlng = service.getCoordinates(address);

    Nuser nuser = dto.tonChangeEntity(latlng[0], latlng[1]);
    nuserDao.nchangeInfo(nuser);

    return nuserDao.getBynUsername(loginId).tonChangeRead();
    }


}



//






































