package com.mealmate.service.impl;

import com.mealmate.dto.MenuItemDto;
import com.mealmate.dto.SubscriptionPlanDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.MenuItem;
import com.mealmate.model.SubscriptionPlan;
import com.mealmate.repository.MenuItemRepository;
import com.mealmate.repository.SubscriptionPlanRepository;
import com.mealmate.service.SubscriptionPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionPlanServiceImpl implements SubscriptionPlanService {

    @Autowired
    private SubscriptionPlanRepository subscriptionPlanRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public SubscriptionPlanDto createSubscription(String userId, SubscriptionPlanDto dto) {
        SubscriptionPlan plan = new SubscriptionPlan();
        applyDtoToEntity(dto, plan);
        plan.setUserId(userId);
        plan.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : Boolean.TRUE);

        Instant now = Instant.now();
        plan.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : now);
        plan.setUpdatedAt(dto.getUpdatedAt() != null ? dto.getUpdatedAt() : now);
        plan.setStartDate(dto.getStartDate() != null ? dto.getStartDate() : now);

        SubscriptionPlan saved = subscriptionPlanRepository.save(plan);
        return convertToDto(saved);
    }

    @Override
    public SubscriptionPlanDto getSubscription(String id) {
        SubscriptionPlan plan = subscriptionPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription plan not found with id: " + id));
        return convertToDto(plan);
    }

    @Override
    public List<SubscriptionPlanDto> getUserSubscriptions(String userId) {
        return subscriptionPlanRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SubscriptionPlanDto> getActiveSubscriptions(String userId) {
        return subscriptionPlanRepository.findByUserIdAndIsActive(userId, Boolean.TRUE).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public SubscriptionPlanDto updateSubscription(String id, String userId, SubscriptionPlanDto dto) {
        SubscriptionPlan plan = subscriptionPlanRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription plan not found with id: " + id));

        applyDtoToEntity(dto, plan);
        plan.setUpdatedAt(Instant.now());

        SubscriptionPlan saved = subscriptionPlanRepository.save(plan);
        return convertToDto(saved);
    }

    @Override
    public void cancelSubscription(String id, String userId) {
        SubscriptionPlan plan = subscriptionPlanRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription plan not found with id: " + id));
        plan.setIsActive(Boolean.FALSE);
        plan.setUpdatedAt(Instant.now());
        subscriptionPlanRepository.save(plan);
    }

    @Override
    public SubscriptionPlanDto activateSubscription(String id, String userId) {
        SubscriptionPlan plan = subscriptionPlanRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Subscription plan not found with id: " + id));
        plan.setIsActive(Boolean.TRUE);
        plan.setUpdatedAt(Instant.now());
        SubscriptionPlan saved = subscriptionPlanRepository.save(plan);
        return convertToDto(saved);
    }

    private void applyDtoToEntity(SubscriptionPlanDto dto, SubscriptionPlan plan) {
        plan.setPlanType(dto.getPlanType());
        plan.setPlanName(dto.getPlanName());
        plan.setMonthlyPrice(dto.getMonthlyPrice());
        plan.setDescription(dto.getDescription());
        plan.setMealsPerWeek(dto.getMealsPerWeek());
        plan.setIsActive(dto.getIsActive());
        plan.setStartDate(dto.getStartDate());
        plan.setEndDate(dto.getEndDate());
        plan.setSelectedMeals(convertMealsToEntities(dto.getSelectedMeals()));
    }

    private List<MenuItem> convertMealsToEntities(List<MenuItemDto> mealDtos) {
        if (mealDtos == null) {
            return null;
        }

        return mealDtos.stream()
                .map(mealDto -> {
                    if (mealDto.getId() == null) {
                        throw new ResourceNotFoundException("Menu item id is required for subscription meals");
                    }
                    return menuItemRepository.findById(mealDto.getId())
                            .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + mealDto.getId()));
                })
                .collect(Collectors.toList());
    }

    private SubscriptionPlanDto convertToDto(SubscriptionPlan plan) {
        SubscriptionPlanDto dto = new SubscriptionPlanDto();
        dto.setId(plan.getId());
        dto.setUserId(plan.getUserId());
        dto.setPlanType(plan.getPlanType());
        dto.setPlanName(plan.getPlanName());
        dto.setMonthlyPrice(plan.getMonthlyPrice());
        dto.setDescription(plan.getDescription());
        dto.setMealsPerWeek(plan.getMealsPerWeek());
        dto.setIsActive(plan.getIsActive());
        dto.setSelectedMeals(convertMealsToDtos(plan.getSelectedMeals()));
        dto.setStartDate(plan.getStartDate());
        dto.setEndDate(plan.getEndDate());
        dto.setCreatedAt(plan.getCreatedAt());
        dto.setUpdatedAt(plan.getUpdatedAt());
        return dto;
    }

    private List<MenuItemDto> convertMealsToDtos(List<MenuItem> meals) {
        if (meals == null) {
            return null;
        }

        return meals.stream()
                .map(this::convertMealToDto)
                .collect(Collectors.toList());
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
