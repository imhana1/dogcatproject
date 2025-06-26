package com.example.dogcatserver.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationResult {
    private double hLocation;
    private double hLongitude;
}