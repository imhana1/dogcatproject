package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.*;

import java.time.*;
import java.util.*;

@Service
public class ScheduleService {
    @Autowired
    private HospitalDao hospitalDao;

    @Autowired
    private ScheduleDao scheduleDao;




//    @Scheduled(fixedDelay = 50000)
    public void generateAndInsertSchedules() {
        List<String> userNames = hospitalDao.findAllUserNames();

        // 진료(1시간 단위, 12개): 9~20시
        List<LocalDateTime> treatSlots = generateTimeSlots(6, 9, 21, 1);
        // 미용(2시간 단위, 6개): 9, 11, 13, 15, 17, 19시
        List<LocalDateTime> beautySlots = generateTimeSlots(6, 9, 21, 2);

        List<Schedule> schedules = new ArrayList<>();
        for (String userName : userNames) {
            // 진료 스케줄
            for (LocalDateTime slot : treatSlots) {
                Schedule schedule = new Schedule();
                schedule.setSchedule(slot);
                schedule.setHUsername(userName);
                schedule.setBlockStatus(false); // default지만 명시
                schedule.setSChoice("진료");
                schedules.add(schedule);
            }
            // 미용 스케줄
            for (LocalDateTime slot : beautySlots) {
                Schedule schedule = new Schedule();
                schedule.setSchedule(slot);
                schedule.setHUsername(userName);
                schedule.setBlockStatus(false); // default지만 명시
                schedule.setSChoice("미용");
                schedules.add(schedule);
            }
        }
        // 여기서 리스트 전체를 한 번에 insert하는 것이 아니라,
        // for문으로 하나씩 insert
        for (Schedule s : schedules) {
            scheduleDao.insertSchedule(s);
        }
    }
    private List<LocalDateTime> generateTimeSlots(int days, int startHour, int endHour, int intervalHour) {
        List<LocalDateTime> slots = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (int d = 0; d < days; d++) {
            LocalDate date = today.plusDays(d);
            for (int h = startHour; h < endHour; h += intervalHour) {
                slots.add(LocalDateTime.of(date, LocalTime.of(h, 0)));
            }
        }
        return slots;
    }

    public List<ScheduleDto> findSchedulesByCondition(String hUsername, LocalDate date, String sChoice) {
        List<Schedule> entityList = scheduleDao.selectByCondition(hUsername, date, sChoice);
        List<ScheduleDto> dtoList = new ArrayList<>();
        for (Schedule entity : entityList) {
            ScheduleDto dto = new ScheduleDto();
            dto.setHUsername(entity.getHUsername());
            dto.setDate(entity.getSchedule().toLocalDate());
            dto.setTime(entity.getSchedule().toLocalTime());
            dto.setSChoice(entity.getSChoice());
            // 필요한 필드 복사
            dtoList.add(dto);
        }
        return dtoList;
    }
}
