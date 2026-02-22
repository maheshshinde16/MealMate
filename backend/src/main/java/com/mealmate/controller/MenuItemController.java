package com.mealmate.controller;

import com.mealmate.dto.MenuItemDto;
import com.mealmate.service.MenuItemService;
import com.mealmate.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
@CrossOrigin(originPatterns = "*")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MenuItemDto>>> getAllMenuItems() {
        List<MenuItemDto> items = menuItemService.getAllMenuItems();
        return ResponseEntity.ok(new ApiResponse<>(true, "Menu items retrieved successfully", items));
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<ApiResponse<List<MenuItemDto>>> getMenuItemsByVendor(@PathVariable String vendorId) {
        List<MenuItemDto> items = menuItemService.getMenuItemsByVendor(vendorId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Vendor menu items retrieved successfully", items));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MenuItemDto>> getMenuItemById(@PathVariable String id) {
        MenuItemDto item = menuItemService.getMenuItemById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Menu item retrieved successfully", item));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MenuItemDto>> createMenuItem(@RequestBody MenuItemDto menuItemDto) {
        MenuItemDto created = menuItemService.createMenuItem(menuItemDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Menu item created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MenuItemDto>> updateMenuItem(@PathVariable String id, @RequestBody MenuItemDto menuItemDto) {
        MenuItemDto updated = menuItemService.updateMenuItem(id, menuItemDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Menu item updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMenuItem(@PathVariable String id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Menu item deleted successfully", null));
    }
}
