package com.mealmate.service;

import com.mealmate.dto.SubscriptionPlanDto;
import com.mealmate.model.SubscriptionPlan;
import java.util.List;

public interface SubscriptionPlanService {
    SubscriptionPlanDto createSubscription(String userId, SubscriptionPlanDto dto);
    SubscriptionPlanDto getSubscription(String id);
    List<SubscriptionPlanDto> getUserSubscriptions(String userId);
    List<SubscriptionPlanDto> getActiveSubscriptions(String userId);
    SubscriptionPlanDto updateSubscription(String id, String userId, SubscriptionPlanDto dto);
    void cancelSubscription(String id, String userId);
    SubscriptionPlanDto activateSubscription(String id, String userId);
}
