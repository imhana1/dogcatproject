package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import jakarta.mail.*;
import jakarta.mail.internet.*;
import org.apache.commons.lang3.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;

@Service
public class HospitalService {
    @Autowired
    private HospitalDao hospitalDao;

    @Autowired
    private JavaMailSender mailSender;

    // 아이디 사용 여부 확인
    public boolean checkUsername(HospitalDto.UsernameCheck dto){return !hospitalDao.existsByUsername(dto.getUsername());}

    public void sendMail(String 보낸이, String 받는이, String 제목, String 내용) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "utf-8");
            helper.setFrom(보낸이);
            helper.setTo(받는이);
            helper.setSubject(제목);
            helper.setText(내용, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    public boolean checkEmail(UseMemberDto.checkCode dto){
        return !hospitalDao.existsByCode(dto.getCode());
    }


    // 메일 보내고 메일과 코드를 DB에 저장
    @Transactional
    public UseMember emailSending(UseMemberDto.UseMemberCode dto){
        // 랜덤한 20자 알파벳 코드를 생성
        String code = RandomStringUtils.secure().nextAlphanumeric(20);
        UseMember useMember = dto.toEntity(code);


        String html= "<p>이메일 인증 코드를 받았습니다";
        html += "<p>"+code+"</p>";
        sendMail("midoriya2109@gmail.com", useMember.getEmail(), "가입 확인메일입니다", html);
        hospitalDao.emailSave(useMember);

        return useMember;
    }


}
