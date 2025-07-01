package com.example.dogcatserver;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import lombok.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.*;

@Component
@RequiredArgsConstructor
public class InitAdminAccount implements ApplicationRunner {
    @Autowired
    private UseMemberDao memberDao;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 여기에서 초기화 로직 작성
        String adminUsername = "admin";
        String adminPassword = "admin1234";

        if(memberDao.findByUsername(adminUsername).isEmpty()){
            UseMember admin=  UseMember.builder()
                    .username(adminUsername)
                    .password(passwordEncoder.encode(adminPassword))
                    .role(Role.ADMIN)
                    .build();
            memberDao.save(admin);
            System.out.println("✅ [초기화] 관리자 계정 생성 완료");
        } else {
            System.out.println("✅ [초기화] 관리자 계정 이미 존재");
        }
    }
}
