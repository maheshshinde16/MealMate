package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String id;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String address;
    private Set<String> roles;
}
