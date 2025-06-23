package com.example.dogcatserver.security;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.util.*;
import com.example.dogcatserver.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.*;
import org.springframework.stereotype.*;

import java.io.*;

// 로그인에 실패하면 "로그인에 몇회 실패했습니다"라고 출력
// 로그인에 5번 실패하면 계정을 볼록한 다음 "계정이 블록되었습니다"라고 출력
@Component
public class Demo6AuthenticationFailureHandler implements AuthenticationFailureHandler {


    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if (exception instanceof LockedException) {
            ResponseUtil.sendJsonResponse(response, 403, "블록된 계정");
        } else {
            ResponseUtil.sendJsonResponse(response, 401, "로그인 실패");
        }
    }
}
