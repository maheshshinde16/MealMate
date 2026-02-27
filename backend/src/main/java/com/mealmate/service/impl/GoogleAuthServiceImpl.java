package com.mealmate.service.impl;

import com.mealmate.config.JwtUtil;
import com.mealmate.dto.AuthResponse;
import com.mealmate.dto.GoogleLoginRequest;
import com.mealmate.dto.GoogleRegisterRequest;
import com.mealmate.dto.UserDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.Role;
import com.mealmate.model.User;
import com.mealmate.repository.RoleRepository;
import com.mealmate.repository.UserRepository;
import com.mealmate.service.GoogleAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class GoogleAuthServiceImpl implements GoogleAuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public AuthResponse googleLogin(GoogleLoginRequest request) {
        String normalizedEmail = request.getEmail() != null
                ? request.getEmail().trim().toLowerCase()
                : null;

        if (normalizedEmail == null || normalizedEmail.isEmpty()) {
            throw new RuntimeException("Email is required for Google login");
        }

        if (request.getGoogleId() == null || request.getGoogleId().isEmpty()) {
            throw new RuntimeException("Google ID is required");
        }

        // Try to find user by email
        Optional<User> userOptional = userRepository.findByEmailIgnoreCase(normalizedEmail);
        
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found. Please register first.");
        }

        User user = userOptional.get();

        // Validate user has the requested role
        if (request.getRole() != null && !request.getRole().isEmpty()) {
            String roleType = request.getRole().toLowerCase();
            String requestedRole = "vendor".equals(roleType)
                    ? "ROLE_VENDOR"
                    : ("rider".equals(roleType) ? "ROLE_DELIVERY" : "ROLE_USER");

            boolean hasRole = user.getRoles().stream()
                    .anyMatch(role -> role.getName().equals(requestedRole)
                            || ("rider".equals(roleType) && role.getName().equals("ROLE_RIDER")));

            if (!hasRole) {
                throw new RuntimeException("This email is not registered as a " + request.getRole());
            }
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return buildAuthResponse(token, user);
    }

    @Override
    public AuthResponse googleRegister(GoogleRegisterRequest request) {
        String normalizedEmail = request.getEmail() != null
                ? request.getEmail().trim().toLowerCase()
                : null;

        if (normalizedEmail == null || normalizedEmail.isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (request.getGoogleId() == null || request.getGoogleId().isEmpty()) {
            throw new RuntimeException("Google ID is required");
        }

        // Check if user already exists by email
        if (userRepository.findByEmailIgnoreCase(normalizedEmail).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Check if user already exists by Google ID
        Optional<User> existingGoogleUser = userRepository.findByGoogleId(request.getGoogleId());
        if (existingGoogleUser.isPresent()) {
            throw new RuntimeException("This Google account is already registered");
        }

        // Create new user
        User user = new User();
        user.setEmail(normalizedEmail);
        user.setFullName(request.getFullName());
        user.setGoogleId(request.getGoogleId());
        user.setPicture(request.getPicture());
        user.setGoogleAuth(true);
        
        // Generate a random password for Google auth users
        user.setPassword(passwordEncoder.encode(generateRandomPassword()));

        // Set role
        Set<Role> roles = new HashSet<>();
        String roleType = request.getRole() != null ? request.getRole().toLowerCase() : "user";
        String roleName = "vendor".equals(roleType)
                ? "ROLE_VENDOR"
                : ("rider".equals(roleType) ? "ROLE_DELIVERY" : "ROLE_USER");

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));
        roles.add(role);
        user.setRoles(roles);

        // Save user
        User savedUser = userRepository.save(user);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getEmail());

        return buildAuthResponse(token, savedUser);
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setFullName(user.getFullName());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setAddress(user.getAddress());
        userDto.setRoles(user.getRoles().stream()
                .map(role -> role.getName().replace("ROLE_", ""))
                .collect(java.util.stream.Collectors.toSet()));

        return new AuthResponse(token, userDto);
    }

    /**
     * Generate a secure random password for Google auth users
     */
    private String generateRandomPassword() {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        
        for (int i = 0; i < 16; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        
        return password.toString();
    }
}
