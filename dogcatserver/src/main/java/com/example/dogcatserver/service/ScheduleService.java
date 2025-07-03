package com.example.dogcatserver.service;

import com.example.dogcatserver.dao.*;
import com.example.dogcatserver.dto.*;
import com.example.dogcatserver.entity.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.*;

@Service
public class ScheduleService {
    @Autowired
    private HospitalDao hospitalDao;

    @Autowired
    private ScheduleDao scheduleDao;




//   @Scheduled(fixedDelay = 50000)
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
    // 날짜와 시간 for문으로 반복문
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
    // 추가 된 시간을 담는 리스트
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


    // 공지 사항 업데이트
    public boolean updateNotice(String hUsername, String notice) {
        return scheduleDao.updateNotice(notice, hUsername) > 0;
    }

    // 공지 사항 읽어오기
    public String getNotice(String hUsername) {
        return scheduleDao.findNoticeByUsername(hUsername);
    }

    public String findNotice(String hospital){
        String hUsername = hospitalDao.findhUsername(hospital);
        return scheduleDao.findNoticeByUsername(hUsername);
    }

    // 날짜에 대한 블록처리
    @Transactional
    public int blockDate(String loginId, String sChoice, List<LocalDate> dates) {
        int result = 0;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (LocalDate date : dates) {
            String formattedDate = date.format(formatter); // ← LocalDate → String 변환
            result += scheduleDao.blockTimes(loginId, formattedDate, sChoice);
        }

        return result;
    }
    // 시간에 대한 블록처리
    public int blockTime(String loginId, LocalDate date, LocalTime time, String sChoice) {
        return scheduleDao.blockTime(loginId, date, time, sChoice);
    }

    // 삭제 된 시간을 저장해 중복 삭제를 방지
    private final Set<LocalDateTime> deletedSet = new HashSet<>();

//    @Scheduled(fixedDelay = 6000) // 60초 한번 실행
    public void deletePastSchedules(){
        LocalDateTime now = LocalDateTime.now().withSecond(0).withNano(0);
        List<Schedule> schedules = scheduleDao.findAll(); // 스케즐 전체 리스트

        for(Schedule schedule: schedules){
            LocalDateTime scheduleTime = schedule.getSchedule();
            if(now.equals(scheduleTime) && !deletedSet.contains(scheduleTime)){
                scheduleDao.scheduleDelete(scheduleTime.toLocalDate(), scheduleTime.toLocalTime());
            }
            deletedSet.add(scheduleTime); // 삭제된 시간 저장
        }


    }

}
