package com.mealmate.service.impl;

import com.mealmate.config.JwtUtil;
import com.mealmate.dto.AuthResponse;
import com.mealmate.dto.LoginRequest;
import com.mealmate.dto.RegisterRequest;
import com.mealmate.dto.UserDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.Role;
import com.mealmate.model.User;
import com.mealmate.repository.RoleRepository;
import com.mealmate.repository.UserRepository;
import com.mealmate.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());

        Set<Role> roles = new HashSet<>();
        
        // Assign role based on registration request
        String roleType = request.getRole() != null ? request.getRole().toLowerCase() : "user";
        String roleName;
        
        if ("vendor".equals(roleType)) {
            roleName = "ROLE_VENDOR";
        } else if ("rider".equals(roleType)) {
            roleName = "ROLE_RIDER";
        } else {
            roleName = "ROLE_USER";
        }
        
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));
        roles.add(role);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
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

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Validate user has the requested role
        if (request.getRole() != null && !request.getRole().isEmpty()) {
            String requestedRole = "ROLE_" + request.getRole().toUpperCase();
            boolean hasRole = user.getRoles().stream()
                    .anyMatch(role -> role.getName().equals(requestedRole));
            
            if (!hasRole) {
                throw new RuntimeException("This email is not registered as a " + request.getRole());
            }
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, buildUserDto(user));
    }
    
    private UserDto buildUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setFullName(user.getFullName());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setAddress(user.getAddress());
        userDto.setRoles(user.getRoles().stream()
                .map(role -> role.getName().replace("ROLE_", ""))
                .collect(java.util.stream.Collectors.toSet()));
        return userDto;
    }
}
