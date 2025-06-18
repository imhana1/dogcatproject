package com.example.dogcatserver.entity;

import lombok.*;

import java.time.*;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Schedule {
    private LocalDateTime Stime;
    private LocalDateTime day;
    private String Husername;
    private boolean blockStatus;
    private String status;
    private String Hnotice;
}
