package com.example.dogcatserver.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileAndLocationResult {
    private String base64HImage;
    private String base64DImage;
    private double lat;
    private double lng;
}