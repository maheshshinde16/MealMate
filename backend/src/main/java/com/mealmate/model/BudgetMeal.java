package com.mealmate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "budget_meals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetMeal {

    @Id
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
