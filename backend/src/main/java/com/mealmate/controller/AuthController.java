package com.mealmate.controller;

import com.mealmate.dto.AuthResponse;
import com.mealmate.dto.GoogleLoginRequest;
import com.mealmate.dto.GoogleRegisterRequest;
import com.mealmate.dto.LoginRequest;
import com.mealmate.dto.RegisterRequest;
import com.mealmate.service.AuthService;
import com.mealmate.service.GoogleAuthService;
import com.mealmate.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3002"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private GoogleAuthService googleAuthService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Registration successful", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", response));
    }

    @PostMapping("/google/login")
    public ResponseEntity<ApiResponse<AuthResponse>> googleLogin(@RequestBody GoogleLoginRequest request) {
        AuthResponse response = googleAuthService.googleLogin(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Google login successful", response));
    }

    @PostMapping("/google/register")
    public ResponseEntity<ApiResponse<AuthResponse>> googleRegister(@RequestBody GoogleRegisterRequest request) {
        AuthResponse response = googleAuthService.googleRegister(request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Google registration successful", response));
    }
}
