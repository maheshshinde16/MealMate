package com.mealmate.repository;

import com.mealmate.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByVendorId(String vendorId);
    List<Review> findByUserId(String userId);
}
