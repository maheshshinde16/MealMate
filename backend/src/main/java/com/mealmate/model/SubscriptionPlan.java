package com.mealmate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "subscription_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionPlan {

    @Id
    private String id;

    private String userId;
    private String planType; // DAILY, WEEKLY, CORPORATE
    private String planName;
    private Double monthlyPrice;
    private String description;
    private Integer mealsPerWeek;
    private Boolean isActive;
    
    @DBRef
    private List<MenuItem> selectedMeals;
    
    private Instant startDate;
    private Instant endDate;
    private Instant createdAt;
    private Instant updatedAt;
}
