package com.example.dogcatserver.util;

import com.example.dogcatserver.dto.AdoptionDto;
import com.example.dogcatserver.dto.WishDto;
import com.example.dogcatserver.entity.Wish;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public class WishUtil {
        @Value("${file.upload.path:dogcatserver/upload/adoptionImage/}")
        private String uploadPath;


        // pagination
        public static WishDto.WishPages getPages(int pageno, int pagesize, int blocksize, int totalcount, List<Wish> wish) {
            // 전체 페이지 수
            int numberOfPages = (int)(Math.ceil((double)totalcount/pagesize));

            int prev = (pageno-1)/blocksize * blocksize;
            int start = prev + 1;
            int end = prev + blocksize;
            int next = end + 1;

            // 마지막 페이지에서 end처리
            if(end>=numberOfPages) {
                end = numberOfPages;
                next = 0;
            }
            return new WishDto.WishPages(prev, start, end, next, pageno, wish);
        }
}
