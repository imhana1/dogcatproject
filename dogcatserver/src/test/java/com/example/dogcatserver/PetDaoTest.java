package com.example.dogcatserver;

import com.example.dogcatserver.dao.NuserDao;
import com.example.dogcatserver.dao.PetDao;
import com.example.dogcatserver.entity.Nuser;
import com.example.dogcatserver.entity.Pet;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;


