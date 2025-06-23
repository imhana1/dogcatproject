package com.example.dogcatserver.security;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.util.*;
import com.example.dogcatserver.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.*;
import org.springframework.stereotype.*;

import java.io.*;

@Component
public class Demo6AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String loginId = authentication.getName();
        ResponseUtil.sendJsonResponse(response,200,loginId);
    }
}
