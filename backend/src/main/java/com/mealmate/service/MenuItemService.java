package com.mealmate.service;

import com.mealmate.dto.MenuItemDto;

import java.util.List;

public interface MenuItemService {
    List<MenuItemDto> getAllMenuItems();
    List<MenuItemDto> getMenuItemsByVendor(String vendorId);
    MenuItemDto getMenuItemById(String id);
    MenuItemDto createMenuItem(MenuItemDto menuItemDto);
    MenuItemDto updateMenuItem(String id, MenuItemDto menuItemDto);
    void deleteMenuItem(String id);
}
