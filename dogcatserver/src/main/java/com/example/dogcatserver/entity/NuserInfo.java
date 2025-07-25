package com.example.dogcatserver.entity;

import com.example.dogcatserver.dto.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NuserInfo {
    private String nid;
    private String nname;
    private String ntel;
    private String naddr;
    private Integer zip;
    private String email;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate nbirth;
    private String nsubaddr;

    public JoinViewInfoDto.NuserInfo toRead() {
        return new JoinViewInfoDto.NuserInfo(nid, nname, ntel, zip, naddr, email, nbirth, nsubaddr);
    }

    public JoinViewInfoDto.NuserInfo tonChangeRead() {
        return new JoinViewInfoDto.NuserInfo(nid, nname, ntel,zip, naddr, email, nbirth, nsubaddr);
    }
}
