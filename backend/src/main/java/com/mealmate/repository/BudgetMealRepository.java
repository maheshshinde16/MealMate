package com.mealmate.repository;

import com.mealmate.model.BudgetMeal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetMealRepository extends MongoRepository<BudgetMeal, String> {
    List<BudgetMeal> findByCategory(String category);
    List<BudgetMeal> findByAvailableTrue();
    List<BudgetMeal> findByCategoryAndAvailableTrue(String category);
    
    @Query("{ 'price': { $gte: ?0, $lte: ?1 }, 'available': true }")
    List<BudgetMeal> findByPriceRangeAndAvailable(Double minPrice, Double maxPrice);
}
