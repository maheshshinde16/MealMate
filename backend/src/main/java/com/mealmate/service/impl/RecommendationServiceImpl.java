package com.mealmate.service.impl;

import com.mealmate.dto.MenuItemDto;
import com.mealmate.dto.RecommendationDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.MenuItem;
import com.mealmate.model.Recommendation;
import com.mealmate.repository.MenuItemRepository;
import com.mealmate.repository.RecommendationRepository;
import com.mealmate.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    private static final String DEFAULT_RECOMMENDATION_TYPE = "TRENDING";
    private static final double DEFAULT_RELEVANCE_SCORE = 0.5d;
    private static final int DEFAULT_RECOMMENDATION_LIMIT = 10;

    @Autowired
    private RecommendationRepository recommendationRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public List<RecommendationDto> getUserRecommendations(String userId) {
        return recommendationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RecommendationDto> getRecommendationsByType(String userId, String type) {
        return recommendationRepository.findByUserIdAndRecommendationType(userId, type).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public RecommendationDto getRecommendation(String id) {
        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation not found with id: " + id));
        return convertToDto(recommendation);
    }

    @Override
    public RecommendationDto createRecommendation(RecommendationDto dto) {
        Recommendation recommendation = new Recommendation();
        applyDtoToEntity(dto, recommendation);
        recommendation.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : Instant.now());

        Recommendation saved = recommendationRepository.save(recommendation);
        return convertToDto(saved);
    }

    @Override
    public RecommendationDto updateRecommendation(String id, RecommendationDto dto) {
        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation not found with id: " + id));

        applyDtoToEntity(dto, recommendation);
        Recommendation saved = recommendationRepository.save(recommendation);
        return convertToDto(saved);
    }

    @Override
    public void deleteRecommendation(String id) {
        Recommendation recommendation = recommendationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation not found with id: " + id));
        recommendationRepository.delete(recommendation);
    }

    @Override
    public List<RecommendationDto> generateRecommendations(String userId) {
        List<Recommendation> existing = recommendationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        if (!existing.isEmpty()) {
            return existing.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        }

        List<MenuItem> menuItems = menuItemRepository.findAll();
        if (menuItems.isEmpty()) {
            return Collections.emptyList();
        }

        List<Recommendation> generated = menuItems.stream()
                .limit(DEFAULT_RECOMMENDATION_LIMIT)
                .map(menuItem -> {
                    Recommendation recommendation = new Recommendation();
                    recommendation.setUserId(userId);
                    recommendation.setMeal(menuItem);
                    recommendation.setRecommendationType(DEFAULT_RECOMMENDATION_TYPE);
                    recommendation.setRelevanceScore(DEFAULT_RELEVANCE_SCORE);
                    recommendation.setViewed(Boolean.FALSE);
                    recommendation.setOrdered(Boolean.FALSE);
                    recommendation.setCreatedAt(Instant.now());
                    return recommendation;
                })
                .collect(Collectors.toList());

        return recommendationRepository.saveAll(generated).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private void applyDtoToEntity(RecommendationDto dto, Recommendation recommendation) {
        recommendation.setUserId(dto.getUserId());
        recommendation.setRecommendationType(dto.getRecommendationType());
        recommendation.setRelevanceScore(dto.getRelevanceScore());
        recommendation.setViewed(dto.getViewed());
        recommendation.setOrdered(dto.getOrdered());

        if (dto.getMeal() != null && dto.getMeal().getId() != null) {
            MenuItem meal = menuItemRepository.findById(dto.getMeal().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + dto.getMeal().getId()));
            recommendation.setMeal(meal);
        } else {
            recommendation.setMeal(null);
        }
    }

    private RecommendationDto convertToDto(Recommendation recommendation) {
        RecommendationDto dto = new RecommendationDto();
        dto.setId(recommendation.getId());
        dto.setUserId(recommendation.getUserId());
        dto.setRecommendationType(recommendation.getRecommendationType());
        dto.setRelevanceScore(recommendation.getRelevanceScore());
        dto.setViewed(recommendation.getViewed());
        dto.setOrdered(recommendation.getOrdered());
        dto.setCreatedAt(recommendation.getCreatedAt());
        dto.setMeal(convertMealToDto(recommendation.getMeal()));
        return dto;
    }

    private MenuItemDto convertMealToDto(MenuItem meal) {
        if (meal == null) {
            return null;
        }

        MenuItemDto dto = new MenuItemDto();
        dto.setId(meal.getId());
        dto.setVendorId(meal.getVendorId());
        dto.setVendorName(meal.getVendorName());
        dto.setName(meal.getName());
        dto.setCategory(meal.getCategory());
        dto.setPrice(meal.getPrice());
        dto.setDescription(meal.getDescription());
        dto.setAvailable(meal.getAvailable());
        dto.setImageUrl(meal.getImageUrl());
        dto.setCreatedAt(meal.getCreatedAt());
        return dto;
    }
}
