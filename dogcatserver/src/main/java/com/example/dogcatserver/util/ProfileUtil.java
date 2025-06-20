package com.example.dogcatserver.util;

import org.springframework.http.*;

import java.io.*;
import java.util.*;

public class ProfileUtil {
    private static final String PROFILE_FOLDER = System.getProperty("user.dir")+ File.separator +"upload"
            + File.separator + "profile" + File.separator;
    private static final String PROFILE_NAME ="3.jpg";
    public static String getDefaultBase64Profile() {
        try {
            //1. 폴더와 파일명으로 파일 객체를 생성
            File file = new File(PROFILE_FOLDER, PROFILE_NAME);
            //2. FileInputStream을 이용해 open한 파일을 byte로 읽어온다
            FileInputStream fis = new FileInputStream(file);
            byte[] fileBytes = fis.readAllBytes();
            //3. base64로 리턴
            return "data:"+ MediaType.IMAGE_JPEG_VALUE + ";base64,"+
                    Base64.getEncoder().encodeToString(fileBytes);
        }
        catch (IOException e){
            e.printStackTrace();
        }
        return null;
    }
}
