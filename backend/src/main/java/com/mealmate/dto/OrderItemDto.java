package com.mealmate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {
    private String menuItemId;
    private String menuItemName;
    private Integer quantity;
    private Double price;
    private Double subtotal;
}
