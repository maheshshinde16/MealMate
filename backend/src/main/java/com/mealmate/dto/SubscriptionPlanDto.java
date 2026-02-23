package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionPlanDto {
    private String id;
    private String userId;
    private String planType; // DAILY, WEEKLY, CORPORATE
    private String planName;
    private Double monthlyPrice;
    private String description;
    private Integer mealsPerWeek;
    private Boolean isActive;
    private List<MenuItemDto> selectedMeals;
    private Instant startDate;
    private Instant endDate;
    private Instant createdAt;
    private Instant updatedAt;
}
