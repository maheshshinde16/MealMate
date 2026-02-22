package com.mealmate.service.impl;

import com.mealmate.dto.VendorDto;
import com.mealmate.exception.ResourceNotFoundException;
import com.mealmate.model.Vendor;
import com.mealmate.repository.VendorRepository;
import com.mealmate.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorServiceImpl implements VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Override
    public List<VendorDto> getAllVendors() {
        return vendorRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public VendorDto getVendorById(String id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + id));
        return convertToDto(vendor);
    }

    @Override
    public VendorDto createVendor(VendorDto vendorDto) {
        Vendor vendor = new Vendor();
        vendor.setName(vendorDto.getName());
        vendor.setDescription(vendorDto.getDescription());
        vendor.setAddress(vendorDto.getAddress());
        vendor.setPhoneNumber(vendorDto.getPhoneNumber());
        vendor.setCuisineType(vendorDto.getCuisineType());
        
        Vendor savedVendor = vendorRepository.save(vendor);
        return convertToDto(savedVendor);
    }

    @Override
    public VendorDto updateVendor(String id, VendorDto vendorDto) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + id));
        
        vendor.setName(vendorDto.getName());
        vendor.setDescription(vendorDto.getDescription());
        vendor.setAddress(vendorDto.getAddress());
        vendor.setPhoneNumber(vendorDto.getPhoneNumber());
        vendor.setCuisineType(vendorDto.getCuisineType());
        
        Vendor updatedVendor = vendorRepository.save(vendor);
        return convertToDto(updatedVendor);
    }

    @Override
    public void deleteVendor(String id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + id));
        vendorRepository.delete(vendor);
    }

    private VendorDto convertToDto(Vendor vendor) {
        VendorDto dto = new VendorDto();
        dto.setId(vendor.getId());
        dto.setName(vendor.getName());
        dto.setDescription(vendor.getDescription());
        dto.setAddress(vendor.getAddress());
        dto.setPhoneNumber(vendor.getPhoneNumber());
        dto.setCuisineType(vendor.getCuisineType());
        return dto;
    }
}
