package com.mealmate.service.impl;

import com.mealmate.dto.ReviewDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.Review;
import com.mealmate.repository.ReviewRepository;
import com.mealmate.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<ReviewDto> getAllReviews() {
        return reviewRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewDto> getReviewsByVendor(String vendorId) {
        return reviewRepository.findByVendorId(vendorId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = new Review();
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());
        
        Review savedReview = reviewRepository.save(review);
        return convertToDto(savedReview);
    }

    @Override
    public void deleteReview(String id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        reviewRepository.delete(review);
    }

    private ReviewDto convertToDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        return dto;
    }
}
