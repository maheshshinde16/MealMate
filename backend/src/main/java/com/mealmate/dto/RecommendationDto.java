package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationDto {
    private String id;
    private String userId;
    private MenuItemDto meal;
    private String recommendationType; // TASTE_PROFILE, TRENDING, HIDDEN_GEM
    private Double relevanceScore;
    private Boolean viewed;
    private Boolean ordered;
    private Instant createdAt;
}
