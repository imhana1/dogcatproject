package com.example.dogcatserver.service;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class KakaoAddressService {

    private final String kakaoApiKey = "0b8f7bfe09e19ae1ce10f7caeb964f75";

    public double[] getCoordinates(String address) {
        RestTemplate restTemplate = new RestTemplate();

        String url = UriComponentsBuilder
                .fromHttpUrl("https://dapi.kakao.com/v2/local/search/address.json")
                .queryParam("query", address)
                .build()
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + kakaoApiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<KakaoResponse> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                KakaoResponse.class
        );

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null &&
                response.getBody().documents != null && !response.getBody().documents.isEmpty()) {
            KakaoResponse.Document doc = response.getBody().documents.get(0);
            double latitude = Double.parseDouble(doc.y);
            double longitude = Double.parseDouble(doc.x);
            return new double[] { latitude, longitude };
        } else {
            throw new RuntimeException("주소 좌표 변환 실패: " + address);
        }
    }

    // 카카오 API 응답 구조에 맞춘 DTO 클래스
    public static class KakaoResponse {
        public java.util.List<Document> documents;

        public static class Document {
            public String x;  // 경도
            public String y;  // 위도
        }
    }
}
