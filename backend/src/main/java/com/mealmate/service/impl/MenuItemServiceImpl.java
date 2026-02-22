package com.mealmate.service.impl;

import com.mealmate.dto.MenuItemDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.MenuItem;
import com.mealmate.repository.MenuItemRepository;
import com.mealmate.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuItemServiceImpl implements MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public List<MenuItemDto> getAllMenuItems() {
        return menuItemRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MenuItemDto> getMenuItemsByVendor(String vendorId) {
        return menuItemRepository.findByVendorId(vendorId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemDto getMenuItemById(String id) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
        return convertToDto(item);
    }

    @Override
    public MenuItemDto createMenuItem(MenuItemDto menuItemDto) {
        MenuItem item = new MenuItem();
        item.setVendorId(menuItemDto.getVendorId());
        item.setVendorName(menuItemDto.getVendorName());
        item.setName(menuItemDto.getName());
        item.setCategory(menuItemDto.getCategory());
        item.setPrice(menuItemDto.getPrice());
        item.setDescription(menuItemDto.getDescription());
        item.setAvailable(menuItemDto.getAvailable() != null ? menuItemDto.getAvailable() : Boolean.TRUE);
        item.setImageUrl(menuItemDto.getImageUrl());
        item.setCreatedAt(menuItemDto.getCreatedAt() != null ? menuItemDto.getCreatedAt() : Instant.now());

        MenuItem savedItem = menuItemRepository.save(item);
        return convertToDto(savedItem);
    }

    @Override
    public MenuItemDto updateMenuItem(String id, MenuItemDto menuItemDto) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));

        item.setVendorId(menuItemDto.getVendorId());
        item.setVendorName(menuItemDto.getVendorName());
        item.setName(menuItemDto.getName());
        item.setCategory(menuItemDto.getCategory());
        item.setPrice(menuItemDto.getPrice());
        item.setDescription(menuItemDto.getDescription());
        item.setAvailable(menuItemDto.getAvailable());
        item.setImageUrl(menuItemDto.getImageUrl());

        MenuItem updatedItem = menuItemRepository.save(item);
        return convertToDto(updatedItem);
    }

    @Override
    public void deleteMenuItem(String id) {
        MenuItem item = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + id));
        menuItemRepository.delete(item);
    }

    private MenuItemDto convertToDto(MenuItem item) {
        MenuItemDto dto = new MenuItemDto();
        dto.setId(item.getId());
        dto.setVendorId(item.getVendorId());
        dto.setVendorName(item.getVendorName());
        dto.setName(item.getName());
        dto.setCategory(item.getCategory());
        dto.setPrice(item.getPrice());
        dto.setDescription(item.getDescription());
        dto.setAvailable(item.getAvailable());
        dto.setImageUrl(item.getImageUrl());
        dto.setCreatedAt(item.getCreatedAt());
        return dto;
    }
}
