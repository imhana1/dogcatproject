package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.exception.EntityNotFoundException;
import com.example.dogcatserver.util.AdoptionUtil;
import com.example.dogcatserver.util.WishUtil;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.*;

@Transactional
@Service
public class NuserService {
    @Autowired
    private NuserDao nuserDao;

    @Autowired
    private UseMemberDao memberDao;

    @Autowired
    private PetDao petDao;

    @Autowired
    private UseMemberDao useMemberDao;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private KakaoAddressService service;

    @Autowired
    private WishDao wishDao;

    @Autowired
    private TreatDao treatDao;

    @Autowired
    private ReviewDao reviewDao;

    @Autowired
    private ReservationDao reservationDao;

    @Autowired
    private PayDao payDao;


    // 회원가입
    @Transactional
    public SignUpResponse.NormalResponse nsignup(SignupNdto.SignupRequestDto dto) {
//        String useMemberName = dto.getUseMember().getUsername();
//        String nid = dto.getNuser().getNid();
//
//        if (!useMemberName.equals(nid)) {
//            throw new IllegalArgumentException("UseMember 이름과 Nname 이름이 일치하지 않습니다");
//        }

        String address = dto.getNuser().getNaddr();
        double[] latlng = service.getCoordinates(address);
        System.out.println("주소: " + address);
        System.out.println("위도: " + latlng[0] + ", 경도: " + latlng[1]);

        String encodedPassword = encoder.encode(dto.getUseMember().getPassword());
        RoleUserUsermemberResponse.RoleNormal usemember = dto.getUseMember().toUseMemberEntity(encodedPassword);
        Nuser nuser = dto.getNuser().toSignEntity(latlng[0], latlng[1]);

        memberDao.signupNUpdate(usemember);
        nuserDao.save(nuser);

        return SignUpResponse.NormalResponse.builder()
                .nuser(nuser)
                .roleNormal(usemember)
                .build();

    }

    // 회원 정보 보기
    public JoinViewInfoDto.NuserInfo Read(String loginId) {
        NuserInfo nuserInfo = nuserDao.getBynUsername(loginId);
        return nuserInfo.toRead();
    }

    // 회원 정보 수정
    public JoinViewInfoDto.NuserInfo ChangeInfo(JoinViewInfoDto.NuserInfoChange dto, String loginId) {
    String address = dto.getNaddr();
    double[] latlng = service.getCoordinates(address);

    Nuser nuser = dto.tonChangeEntity(latlng[0], latlng[1]);
    nuserDao.nchangeInfo(nuser);

    return nuserDao.getBynUsername(loginId).tonChangeRead();
    }

    @Transactional
    public void nresign(String loginId) {

        reviewDao.deleterv(loginId);
        payDao.deleteNpay(loginId);
        treatDao.deleteNtreat(loginId);
        reservationDao.deleteReserv(loginId);
        petDao.deletepet(loginId);
        nuserDao.delete(loginId);
        useMemberDao.delete(loginId);
    }


    private static final int BLOCK_SIZE = 5;

    public WishDto.WishPages AdoptionLikelist(int pageno, int pagesize, String loginId) {
        int totalCount = wishDao.AdoptionLike();
        List<Wish> wish = wishDao.AdoptionLikeList(pageno, pagesize, loginId);
        return WishUtil.getPages(pageno, pagesize, BLOCK_SIZE, totalCount, wish);
    }

    // 회원 좌표 조회 메소드
    public Optional<NuserLocationDto> getUserLocation(String loginId) {
        Nuser user = nuserDao.LocationNusername(loginId);

        if(user == null || user.getNlocation() == null || user.getNlongitude() == null) {
            return Optional.empty();
        }
        return Optional.of(new NuserLocationDto(user.getNlocation(), user.getNlongitude()));
    }

}








































