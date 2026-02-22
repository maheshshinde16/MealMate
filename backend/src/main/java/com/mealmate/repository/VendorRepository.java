package com.mealmate.repository;

import com.mealmate.model.Vendor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorRepository extends MongoRepository<Vendor, String> {
    List<Vendor> findByCuisineType(String cuisineType);
}
