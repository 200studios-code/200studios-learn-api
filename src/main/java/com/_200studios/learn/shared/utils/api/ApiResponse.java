package com._200studios.learn.shared.utils.api;

import java.time.Instant;

public class ApiResponse<T> {
    private final String status;
    private final T data;
    private final String message;
    private final Instant timestamp;

    public ApiResponse(String status, T data, String message) {
        this.status = status;
        this.data = data;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public String getStatus() { return status; }
    public T getData() { return data; }
    public String getMessage() { return message; }
    public Instant getTimestamp() { return timestamp; }
}