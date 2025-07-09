package com.example.dogcatserver.toss.util;

import java.nio.charset.*;
import java.util.*;

public class AuthUtil {
  public static String encodedBasicAuth (String secretKey) {
    String auth = secretKey + ":";
    return Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));
  }
}
