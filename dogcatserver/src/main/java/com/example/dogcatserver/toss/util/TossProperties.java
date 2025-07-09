package com.example.dogcatserver.toss.util;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.*;

//
@Component
@Getter
public class TossProperties {
  @Value("${toss.secret-key}")
  private String secretKey;

  @Value("${toss.confirm-url}")
  private String confirmUrl;

  @Value("${toss.create-url}")
  private String createUrl;
}
