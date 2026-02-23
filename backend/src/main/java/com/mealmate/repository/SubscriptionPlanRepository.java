package com.mealmate.repository;

import com.mealmate.model.SubscriptionPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionPlanRepository extends MongoRepository<SubscriptionPlan, String> {
    List<SubscriptionPlan> findByUserId(String userId);
    List<SubscriptionPlan> findByUserIdAndIsActive(String userId, Boolean isActive);
    Optional<SubscriptionPlan> findByIdAndUserId(String id, String userId);
}
