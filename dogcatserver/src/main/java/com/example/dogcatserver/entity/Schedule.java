package com.example.dogcatserver.entity;

import lombok.*;

import java.time.*;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Schedule {
    private Integer sId;
    private LocalDateTime schedule;
    private String hUsername;
    private String hospital;
    @Builder.Default
    private boolean blockStatus = false;
    private String sNotice;
    private String sChoice;

    public  void setSchedule(LocalDateTime schedule) {
        this.schedule = schedule;
    }
    public void setHUsername(String hUsername) {
        this.hUsername = hUsername;
    }

    public void setSChoice(String sChoice) {
        this.sChoice = sChoice;
    }
    public void setBlockStatus(boolean blockStatus) {
        this.blockStatus = blockStatus;
    }

    public void setHNotice(String hNotice) {
        this.sNotice = hNotice;
    }
}
