package com.mealmate.service;

import com.mealmate.dto.BudgetMealDto;
import java.util.List;

public interface BudgetMealService {
    List<BudgetMealDto> getBudgetMealsByCategory(String category);
    List<BudgetMealDto> getAllBudgetMeals();
    List<BudgetMealDto> getBudgetMealsByPriceRange(Double minPrice, Double maxPrice);
    BudgetMealDto getBudgetMeal(String id);
    BudgetMealDto createBudgetMeal(BudgetMealDto dto);
    BudgetMealDto updateBudgetMeal(String id, BudgetMealDto dto);
    void deleteBudgetMeal(String id);
}
