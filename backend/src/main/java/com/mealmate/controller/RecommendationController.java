package com.mealmate.controller;

import com.mealmate.util.ApiResponse;
import com.mealmate.dto.RecommendationDto;
import com.mealmate.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(originPatterns = {
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173"
})
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse> getUserRecommendations(@PathVariable String userId) {
        try {
            List<RecommendationDto> recommendations = recommendationService.getUserRecommendations(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Recommendations retrieved", recommendations));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/user/{userId}/type/{type}")
    public ResponseEntity<ApiResponse> getRecommendationsByType(
            @PathVariable String userId,
            @PathVariable String type) {
        try {
            List<RecommendationDto> recommendations = recommendationService.getRecommendationsByType(userId, type);
            return ResponseEntity.ok(new ApiResponse<>(true, "Recommendations by type retrieved", recommendations));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getRecommendation(@PathVariable String id) {
        try {
            RecommendationDto recommendation = recommendationService.getRecommendation(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Recommendation retrieved", recommendation));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createRecommendation(@RequestBody RecommendationDto dto) {
        try {
            RecommendationDto result = recommendationService.createRecommendation(dto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Recommendation created", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateRecommendation(
            @PathVariable String id,
            @RequestBody RecommendationDto dto) {
        try {
            RecommendationDto result = recommendationService.updateRecommendation(id, dto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Recommendation updated", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRecommendation(@PathVariable String id) {
        try {
            recommendationService.deleteRecommendation(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Recommendation deleted", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/generate/{userId}")
    public ResponseEntity<ApiResponse> generateRecommendations(@PathVariable String userId) {
        try {
            List<RecommendationDto> recommendations = recommendationService.generateRecommendations(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Recommendations generated", recommendations));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
