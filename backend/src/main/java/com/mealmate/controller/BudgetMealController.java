package com.mealmate.controller;

import com.mealmate.util.ApiResponse;
import com.mealmate.dto.BudgetMealDto;
import com.mealmate.service.BudgetMealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget-meals")
@CrossOrigin(originPatterns = {
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173"
})
public class BudgetMealController {

    @Autowired
    private BudgetMealService budgetMealService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllBudgetMeals() {
        try {
            List<BudgetMealDto> meals = budgetMealService.getAllBudgetMeals();
            return ResponseEntity.ok(new ApiResponse<>(true, "Budget meals retrieved", meals));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse> getBudgetMealsByCategory(@PathVariable String category) {
        try {
            List<BudgetMealDto> meals = budgetMealService.getBudgetMealsByCategory(category);
            return ResponseEntity.ok(new ApiResponse<>(true, "Budget meals by category retrieved", meals));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/price-range")
    public ResponseEntity<ApiResponse> getBudgetMealsByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        try {
            List<BudgetMealDto> meals = budgetMealService.getBudgetMealsByPriceRange(minPrice, maxPrice);
            return ResponseEntity.ok(new ApiResponse<>(true, "Budget meals by price range retrieved", meals));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getBudgetMeal(@PathVariable String id) {
        try {
            BudgetMealDto meal = budgetMealService.getBudgetMeal(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Budget meal retrieved", meal));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createBudgetMeal(@RequestBody BudgetMealDto dto) {
        try {
            BudgetMealDto result = budgetMealService.createBudgetMeal(dto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Budget meal created", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateBudgetMeal(
            @PathVariable String id,
            @RequestBody BudgetMealDto dto) {
        try {
            BudgetMealDto result = budgetMealService.updateBudgetMeal(id, dto);
            return ResponseEntity.ok(new ApiResponse<>(true, "Budget meal updated", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBudgetMeal(@PathVariable String id) {
        try {
            budgetMealService.deleteBudgetMeal(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Budget meal deleted", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
