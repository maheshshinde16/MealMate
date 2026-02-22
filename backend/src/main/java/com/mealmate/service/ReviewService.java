package com.mealmate.service;

import com.mealmate.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    List<ReviewDto> getAllReviews();
    List<ReviewDto> getReviewsByVendor(String vendorId);
    ReviewDto createReview(ReviewDto reviewDto);
    void deleteReview(String id);
}
