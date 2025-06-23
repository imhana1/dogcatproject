package com.example.dogcatserver.util;

import org.springframework.http.*;
import org.springframework.web.multipart.*;

import java.io.*;
import java.util.*;

public class ProfileUtil {
    public static String convertToBase64(MultipartFile file)throws IOException {
        byte[] fileBytes = file.getBytes() ;
        // contenetType는 파일의 형식.
        // base64 형식으로 데이터를 브라우저에 출력할 때
        //  데이터 앞에 파일을 형식을 지정하면 웹브라우저가 처리
        return "data:"+ file.getContentType() + ";base64,"+
                Base64.getEncoder().encodeToString(fileBytes);
    }

    private static final String PROFILE_FOLDER = System.getProperty("user.dir")+ File.separator +"upload"
            + File.separator + "profile" + File.separator;
    private static final String PROFILE_NAME ="flower.jpg";
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
