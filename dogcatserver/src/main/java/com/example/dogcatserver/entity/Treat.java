package com.example.dogcatserver.entity;

import lombok.*;

@Getter
@AllArgsConstructor
@Builder
public class Treat {
    private Integer tno;
    private Integer rno;
    private String tWriter;
    private String tTitle;
    private String tContent;
    private String nUsername;
}
