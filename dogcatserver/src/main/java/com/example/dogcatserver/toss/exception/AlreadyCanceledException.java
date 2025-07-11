package com.example.dogcatserver.toss.exception;

public class AlreadyCanceledException extends RuntimeException {

    public AlreadyCanceledException() {
        super("이미 취소된 결제입니다.");
    }

    public AlreadyCanceledException(String message) {
        super(message);
    }
}
