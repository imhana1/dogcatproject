package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import jakarta.mail.*;
import jakarta.mail.internet.*;
import org.apache.commons.lang3.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.mail.javamail.*;
import org.springframework.scheduling.annotation.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;

import java.util.*;

@Service
public class UserMemberService {
    @Autowired
    private UseMemberDao memberDao;

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private UseMemberDao useMemberDao;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private PasswordEncoder passwordEncoder;


    // 아이디 사용 여부 확인
    public boolean checkUsername(UseMemberDto.UsernameCheck dto){return !memberDao.existsByUsername(dto.getUsername());}

    public boolean sendMail(String 보낸이, String 받는이, String 제목, String 내용) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
            try {
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");
                helper.setFrom(보낸이);
                helper.setTo(받는이);
                helper.setSubject(제목);
                helper.setText(내용, true);
                mailSender.send(mimeMessage);
                return true;
            } catch (MessagingException e) {
                e.printStackTrace();
                return false;
            }
    }


    public boolean checkEmail(UseMemberDto.checkCode dto){
        return memberDao.existsByCode(dto.getCode());
    }


    public UseMember islockchange(UseMemberDto.checkCode dto){
        String code= dto.getCode();

        String username = memberDao.findUsernameByCode(code);
        if(username==null){
            //메서드에 전달된 인자가 부적절하거나 허용되지 않을 때 발생시키는 예외
            throw new IllegalArgumentException("사용자를 찾지 못했습니다");
        }
        memberDao.changeIsLocked(username);

        return dto.toEntity(username);
    }



    // 메일 보내고 메일과 코드를 DB에 저장
    @Transactional
    public UseMember emailSending(UseMemberDto.UseMemberCode dto) {
        if (useMemberDao.existsByUsername(dto.getUsername())) {
            throw new IllegalStateException("이미 가입된 사용자입니다.");
        }

        String code = RandomStringUtils.secure().nextAlphanumeric(20);
        UseMember useMember = dto.toEntity(code);

        String html = "<html><body>";
        html += "<p>이메일 인증 코드를 받았습니다.</p>";
        html += "<p style='font-weight:bold; font-size:18px;'>" + code + "</p>";
        html += "</body></html>";

        boolean result = sendMail("midoriya2109@gmail.com", useMember.getEmail(), "가입 확인 메일입니다", html);
        if (!result) {
            throw new IllegalStateException("메일 전송에 실패했습니다.");
        }

        memberDao.emailSave(useMember);
        return useMember;
    }

    public boolean updatePassword(UseMemberDto.changePassword dto, String loginId){
        //기존 비밀번호
        String encodedPassword = memberDao.findPasswordByUsername(loginId);
        if(!encoder.matches(dto.getCurrentPassword(), encodedPassword))
            return false;
        return  useMemberDao.updatePassword(loginId, encoder.encode(dto.getNewPassword()))==1;
    }


    // 임시비밀번호 발급
    public boolean getTemporaryPassword(UseMemberDto.findPassword dto){
        UseMember member = useMemberDao.findUsername(dto.getUsername());
        if(member==null){
            return false;
        }
        String newPassword = RandomStringUtils.secure().nextAlphanumeric(10);
        // 2. 인코딩
        String encodedPassword = passwordEncoder.encode(newPassword);

        useMemberDao.updatePassword(dto.getUsername(), encodedPassword);
        String html = "<p>아래 임시비밀번호로 로그인하세요</p>";
        html += "<p>" + newPassword + "</p>";
        sendMail("midoriya2109@gmail.com", member.getEmail(), "임시비밀번호", html);
        return true;
    }

    public boolean checkPassword(UseMemberDto.CheckPassword dto, String loginId){
        String encodedPassword = useMemberDao.findPasswordByUsername(loginId);
        if(encodedPassword==null)
            return false;
        return encoder.matches(dto.getPassword(), encodedPassword);
    }

    // 아이디 찾기
     public Optional<String> searchUsername(String email){
        return useMemberDao.findUsernameByEmail(email);
     }


    // 5분마다 실행
    //@Scheduled(fixedRate = 5 * 60 * 1000)
     public void delete(){
        memberDao.DeleteTemporaryData(); // 이메일 인증 후 30분이 자니면 삭제
     }



    public void resign(String loginId) {
        useMemberDao.delete(loginId);
    }
}
