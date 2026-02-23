package com.mealmate.service;

import com.mealmate.dto.RecommendationDto;
import java.util.List;

public interface RecommendationService {
    List<RecommendationDto> getUserRecommendations(String userId);
    List<RecommendationDto> getRecommendationsByType(String userId, String type);
    RecommendationDto getRecommendation(String id);
    RecommendationDto createRecommendation(RecommendationDto dto);
    RecommendationDto updateRecommendation(String id, RecommendationDto dto);
    void deleteRecommendation(String id);
    List<RecommendationDto> generateRecommendations(String userId);
}
