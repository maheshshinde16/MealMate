package com.mealmate.service;

import com.mealmate.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();
    UserDto getUserById(String id);
    UserDto updateUser(String id, UserDto userDto);
    void deleteUser(String id);
}
