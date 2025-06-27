package com.example.dogcatserver;

import org.junit.jupiter.api.Test;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.swing.text.Caret;

@SpringBootTest
public class DBconn {
    @Autowired
    private SqlSessionTemplate tpl;

    @Test
    public void tplTest() {
        System.out.println(tpl);
    }
}
