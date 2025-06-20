package com.example.dogcatserver.hosController;

import com.example.dogcatserver.hosDto.*;
import com.example.dogcatserver.hosService.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

@Validated
@Controller
public class HospitalController {
    @Autowired
    private HospitalService service;



    @GetMapping("/api/hospital/check-username")
    @Operation(summary = "아이디 확인", description = "아이디가 사용가능한지 확인")
    public ResponseEntity<String> checkUsername(@ModelAttribute @Valid HospitalDto.UsernameCheck dto, BindingResult br){
        boolean result = service.checkUsername(dto);
        if(result)
            return  ResponseEntity.ok("사용가능합니다");
        return ResponseEntity.status(HttpStatus.CONFLICT).body("사용중인 아이디입니다");
    }

}
