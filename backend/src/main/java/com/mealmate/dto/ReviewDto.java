package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private String id;
    private String userId;
    private String vendorId;
    private Integer rating;
    private String comment;
    private LocalDateTime reviewDate;
}
