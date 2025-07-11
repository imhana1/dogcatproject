package com.example.dogcatserver.security;


import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.entity.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.*;

// 아이디를 가지고 db에서 사용자 정보를 읽어와 스프링 시큐리티에 넘겨주는 클래스
@Component
public class Demo6UserDetailsService implements UserDetailsService {
    @Autowired
    private UseMemberDao memberDao;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UseMember m=  memberDao.loadLoginData(username).orElseThrow(()->new UsernameNotFoundException("사용자가 없습니다"));
        //아이디, 비밀번호, 권한, 계정불록여부 등을 담은 스프링 시큐리티 표준 UserDetails를 리턴
        return User.builder().username(m.getUsername()).password(m.getPassword()).roles(m.getRole().name()).accountLocked(m.isLocked()).build();
    }
}
