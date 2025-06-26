package com.example.dogcatserver.dto;

import lombok.*;
import org.springframework.cglib.core.*;

import java.time.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDto {
    private String hUsername;
    private LocalDate date;
    private LocalTime time;
    private String sChoice;

    @Data
    public static class ScheduleBlock{
        private LocalDate date;
        private LocalTime time;
        private String sChoice;
    }
}
