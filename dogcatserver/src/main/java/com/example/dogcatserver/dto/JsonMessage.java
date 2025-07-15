package com.example.dogcatserver.dto;

import lombok.*;

@Data
public class JsonMessage {
    private String sender;
    private String receiver;
    private String message;
    private String url;
}
