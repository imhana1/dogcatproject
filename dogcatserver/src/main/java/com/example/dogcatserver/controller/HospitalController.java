package com.example.dogcatserver.controller;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import com.example.dogcatserver.service.*;
import io.swagger.v3.oas.annotations.*;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.validation.*;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;

@Validated
@Controller
public class HospitalController {
    @Autowired
    private HospitalService service;

    @Autowired
    private HospitalDao hospitalDao;



//    public ResponseEntity<String> signup(@RequestParam String username, @RequestBody @Valid HospitalDto dto, @RequestBody UseMemberDto uDto){
//
//    }




}
