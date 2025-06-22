package com.example.dogcatserver.entity;

import com.example.dogcatserver.dto.*;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HospitalMemberInfo {
    private String hUsername;
    private String director;
    private String hospital;
    private String hTel;
    private String hReptel;
    private String hAddress;
    private String email;

    public JoinViewInfoDto.HospitalInfo toRead(){
        return new JoinViewInfoDto.HospitalInfo(hUsername,director,hospital,hTel,hReptel,hAddress,email);
    }
}
