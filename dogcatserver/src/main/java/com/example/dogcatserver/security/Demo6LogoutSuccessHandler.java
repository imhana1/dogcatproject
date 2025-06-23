package com.example.dogcatserver.security;

import com.example.dogcatserver.util.*;
import com.example.dogcatserver.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.logout.*;
import org.springframework.stereotype.*;

import java.io.*;

//MVC 방식 ss의 기본구현은 로그아웃에 성공하면 루트페이지로 "이동"한다
//REST 방식 "백에서 redirect한다" 개녕이 존재할 수 없다 -> 반드시 변경해줘야한다
@Component
public class Demo6LogoutSuccessHandler implements LogoutSuccessHandler {
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        ResponseUtil.sendJsonResponse(response, 200,"로그아웃 성공");
    }
}
