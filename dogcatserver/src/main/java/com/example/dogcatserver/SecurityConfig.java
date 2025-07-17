package com.example.dogcatserver;

import lombok.*;
import org.springframework.context.annotation.*;
import org.springframework.http.*;
import org.springframework.security.config.annotation.method.configuration.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.*;
import org.springframework.security.web.*;
import org.springframework.security.web.access.*;
import org.springframework.security.web.authentication.*;
import org.springframework.security.web.authentication.logout.*;
import org.springframework.web.cors.*;

import java.util.*;

@EnableMethodSecurity(securedEnabled = true)
@Configuration
// final로 선언한 필드를 대상으로 하는 생성자를 만들어준다 - 스프링에서 생성자를 이용해 객체를 주입할 때 사용가능
@RequiredArgsConstructor
public class  SecurityConfig {
    // 401 오류 처리(로그인이 필요하다)
    private final AuthenticationEntryPoint authenticationEntryPoint;
    // 403 오류처리(권한 오류) -> 로그인 했는데 권한이 없다
    private final AccessDeniedHandler authenticationHandler;
    // 로그인 성공 - 200으로 응답
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    // 로그인 실패 - 409로 응답
    private final AuthenticationFailureHandler authenticationFailureHandler;
    // 로그아웃 성공 - 200으로 응답
    private final LogoutSuccessHandler logoutSuccessHandler;
//    // PasswordEncoder Bean 추가
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return NoOpPasswordEncoder.getInstance(); // 평문 비밀번호용
//    }

    // 스프링 시큐리티는 11개의 필터들의 집합체(FilterChain)
    // 필터를 생성, 등록하는 설정 함수
    // localhost:8080/login 에서 로그인 가능
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity config) throws Exception {
        config.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        config.csrf(csrf -> csrf.disable());
        config.formLogin(form->form.loginPage("/login").loginProcessingUrl("/login")
                .successHandler(authenticationSuccessHandler).failureHandler(authenticationFailureHandler));
        config.logout(logout->logout.logoutUrl("/logout").logoutSuccessHandler(logoutSuccessHandler));
        config.exceptionHandling(handler->handler.accessDeniedHandler(authenticationHandler)
                .authenticationEntryPoint(authenticationEntryPoint));
        config.authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/register", "/public**").permitAll()    // 누구나 접근 가능
                .requestMatchers(HttpMethod.GET, "/api/notices/**", "/api/adoptions/**").permitAll()  // 웹소켓 추가 후 공지사항, 유기동물 게시판 비로그인 접근 막혀서 추가. 문제 해결하면 삭제
                .requestMatchers(HttpMethod.POST, "/nmembersignup/**", "/hospital/signup").permitAll()                // 일반 회원 가입, 병원 회원 가입 비로그인 접근 가능
                .requestMatchers(HttpMethod.GET, "/hospital-signup/**","/api/hospital/check-username").permitAll()    // 병원 회원가입, username 체크 비로그인 접근 가능
                .requestMatchers(HttpMethod.POST, "/email-send").permitAll()                                            // 이메일 인증 보내기 비로그인 접근 가능
                .requestMatchers(HttpMethod.PUT, "/email-check").permitAll()                                            // 이메일 인증 확인 비로그인 접근 가능
                .requestMatchers("/reservation/**").authenticated()                     // 예약 관련은 로그인이 필요함
                .requestMatchers("/toss/cancel/**").authenticated()
                .anyRequest().authenticated()                                             // 그 외 모든 요청 인증 필요
        );
        return config.build();


    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "PATCH", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", config);
        return src;
    }


}
