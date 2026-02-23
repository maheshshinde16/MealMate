package com.mealmate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "recommendations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recommendation {

    @Id
    private String id;

    private String userId;
    
    @DBRef
    private MenuItem meal;
    
    private String recommendationType; // TASTE_PROFILE, TRENDING, HIDDEN_GEM
    private Double relevanceScore;
    private Boolean viewed;
    private Boolean ordered;
    private Instant createdAt;
}
