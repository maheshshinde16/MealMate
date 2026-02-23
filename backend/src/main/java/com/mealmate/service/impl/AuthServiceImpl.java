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
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;

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
        String normalizedEmail = request.getEmail() != null
                ? request.getEmail().trim().toLowerCase()
                : null;

        // Check if user already exists
        if (normalizedEmail == null || normalizedEmail.isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (userRepository.findByEmailIgnoreCase(normalizedEmail).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(normalizedEmail);
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
            roleName = "ROLE_DELIVERY";
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
        String normalizedEmail = request.getEmail() != null
                ? request.getEmail().trim().toLowerCase()
                : null;

        if (normalizedEmail == null || normalizedEmail.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        Optional<User> userMatch = userRepository.findByEmailIgnoreCase(normalizedEmail);
        if (userMatch.isEmpty()) {
            String escaped = Pattern.quote(normalizedEmail);
            String regex = "^\\s*" + escaped + "\\s*$";
            userMatch = userRepository.findByEmailRegex(regex);
        }

        User user = userMatch.orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Validate user has the requested role
        if (request.getRole() != null && !request.getRole().isEmpty()) {
            String roleType = request.getRole().toLowerCase();
            boolean allowLegacyRiderRole = "rider".equals(roleType);

            // Map role names consistently with register method
            String requestedRole = "vendor".equals(roleType)
                    ? "ROLE_VENDOR"
                    : (allowLegacyRiderRole ? "ROLE_DELIVERY" : "ROLE_USER");
            
            boolean hasRole = user.getRoles().stream()
                    .anyMatch(role -> role.getName().equals(requestedRole)
                            || (allowLegacyRiderRole && role.getName().equals("ROLE_RIDER")));
            
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
