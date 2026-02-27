package com.mealmate.service;

import com.mealmate.dto.AuthResponse;
import com.mealmate.dto.GoogleLoginRequest;
import com.mealmate.dto.GoogleRegisterRequest;

public interface GoogleAuthService {
    AuthResponse googleLogin(GoogleLoginRequest request);
    AuthResponse googleRegister(GoogleRegisterRequest request);
}
