package com.mealmate.service.impl;

import com.mealmate.dto.BudgetMealDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.BudgetMeal;
import com.mealmate.repository.BudgetMealRepository;
import com.mealmate.service.BudgetMealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetMealServiceImpl implements BudgetMealService {

    @Autowired
    private BudgetMealRepository budgetMealRepository;

    @Override
    public List<BudgetMealDto> getBudgetMealsByCategory(String category) {
        return budgetMealRepository.findByCategoryAndAvailableTrue(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BudgetMealDto> getAllBudgetMeals() {
        return budgetMealRepository.findByAvailableTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BudgetMealDto> getBudgetMealsByPriceRange(Double minPrice, Double maxPrice) {
        return budgetMealRepository.findByPriceRangeAndAvailable(minPrice, maxPrice).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public BudgetMealDto getBudgetMeal(String id) {
        BudgetMeal meal = budgetMealRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget meal not found with id: " + id));
        return convertToDto(meal);
    }

    @Override
    public BudgetMealDto createBudgetMeal(BudgetMealDto dto) {
        BudgetMeal meal = new BudgetMeal();
        meal.setMenuItemId(dto.getMenuItemId());
        meal.setMealName(dto.getMealName());
        meal.setPrice(dto.getPrice());
        meal.setCategory(dto.getCategory());
        meal.setDescription(dto.getDescription());
        meal.setVendorName(dto.getVendorName());
        meal.setImageUrl(dto.getImageUrl());
        meal.setPortionSize(dto.getPortionSize());
        meal.setAvailable(dto.getAvailable() != null ? dto.getAvailable() : Boolean.TRUE);
        meal.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : Instant.now());

        BudgetMeal savedMeal = budgetMealRepository.save(meal);
        return convertToDto(savedMeal);
    }

    @Override
    public BudgetMealDto updateBudgetMeal(String id, BudgetMealDto dto) {
        BudgetMeal meal = budgetMealRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget meal not found with id: " + id));

        meal.setMenuItemId(dto.getMenuItemId());
        meal.setMealName(dto.getMealName());
        meal.setPrice(dto.getPrice());
        meal.setCategory(dto.getCategory());
        meal.setDescription(dto.getDescription());
        meal.setVendorName(dto.getVendorName());
        meal.setImageUrl(dto.getImageUrl());
        meal.setPortionSize(dto.getPortionSize());
        meal.setAvailable(dto.getAvailable());
        meal.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : meal.getCreatedAt());

        BudgetMeal updatedMeal = budgetMealRepository.save(meal);
        return convertToDto(updatedMeal);
    }

    @Override
    public void deleteBudgetMeal(String id) {
        BudgetMeal meal = budgetMealRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget meal not found with id: " + id));
        budgetMealRepository.delete(meal);
    }

    private BudgetMealDto convertToDto(BudgetMeal meal) {
        BudgetMealDto dto = new BudgetMealDto();
        dto.setId(meal.getId());
        dto.setMenuItemId(meal.getMenuItemId());
        dto.setMealName(meal.getMealName());
        dto.setPrice(meal.getPrice());
        dto.setCategory(meal.getCategory());
        dto.setDescription(meal.getDescription());
        dto.setVendorName(meal.getVendorName());
        dto.setImageUrl(meal.getImageUrl());
        dto.setPortionSize(meal.getPortionSize());
        dto.setAvailable(meal.getAvailable());
        dto.setCreatedAt(meal.getCreatedAt());
        return dto;
    }
}
