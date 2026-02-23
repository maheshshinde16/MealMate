package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetMealDto {
    private String id;
    private String menuItemId;
    private String mealName;
    private Double price;
    private String category; // STUDENT_SPECIAL, OFFICE_COMBO, FAMILY_MEAL
    private String description;
    private String vendorName;
    private String imageUrl;
    private Integer portionSize;
    private Boolean available;
    private Instant createdAt;
}
