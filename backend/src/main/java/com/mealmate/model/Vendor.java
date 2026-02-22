package com.mealmate.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vendors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vendor {

    @Id
    private String id;

    private String name;
    private String description;
    private String address;
    private String phoneNumber;
    private String cuisineType;
    private Double rating;
}
