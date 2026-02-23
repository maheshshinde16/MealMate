package com.mealmate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "user_preferences")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPreference {

    @Id
    private String id;

    private String userId;
    private List<String> favoriteCategories;
    private List<String> dietaryPreferences; // VEG, NON_VEG, VEGAN, etc.
    private Double minPrice;
    private Double maxPrice;
    private List<String> favoriteCuisines;
    private List<String> allergies;
    private Instant createdAt;
    private Instant updatedAt;
}
