package com.mealmate.controller;

import com.mealmate.dto.UserDto;
import com.mealmate.service.UserService;
import com.mealmate.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(new ApiResponse<>(true, "Users retrieved successfully", users));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable String id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "User retrieved successfully", user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(@PathVariable String id, @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "User updated successfully", updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "User deleted successfully", null));
    }
}
