package com.mealmate.controller;

import com.mealmate.dto.ReviewDto;
import com.mealmate.service.ReviewService;
import com.mealmate.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getAllReviews() {
        List<ReviewDto> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(new ApiResponse<>(true, "Reviews retrieved successfully", reviews));
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<ApiResponse<List<ReviewDto>>> getReviewsByVendor(@PathVariable String vendorId) {
        List<ReviewDto> reviews = reviewService.getReviewsByVendor(vendorId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Vendor reviews retrieved successfully", reviews));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewDto>> createReview(@RequestBody ReviewDto reviewDto) {
        ReviewDto createdReview = reviewService.createReview(reviewDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Review created successfully", createdReview));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(@PathVariable String id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Review deleted successfully", null));
    }
}
