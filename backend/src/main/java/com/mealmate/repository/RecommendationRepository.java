package com.mealmate.repository;

import com.mealmate.model.Recommendation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends MongoRepository<Recommendation, String> {
    List<Recommendation> findByUserId(String userId);
    List<Recommendation> findByUserIdAndRecommendationType(String userId, String recommendationType);
    List<Recommendation> findByUserIdOrderByCreatedAtDesc(String userId);
}
