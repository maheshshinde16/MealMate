package com.mealmate.exception;

import com.mealmate.util.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {
        ApiResponse<Void> response = new ApiResponse<>(false, ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGlobalException(
            Exception ex, WebRequest request) {
        ApiResponse<Void> response = new ApiResponse<>(false, "An error occurred: " + ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Void>> handleRuntimeException(
            RuntimeException ex, WebRequest request) {
        ApiResponse<Void> response = new ApiResponse<>(false, ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
