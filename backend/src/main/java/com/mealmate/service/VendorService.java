package com.mealmate.service;

import com.mealmate.dto.VendorDto;

import java.util.List;

public interface VendorService {
    List<VendorDto> getAllVendors();
    VendorDto getVendorById(String id);
    VendorDto createVendor(VendorDto vendorDto);
    VendorDto updateVendor(String id, VendorDto vendorDto);
    void deleteVendor(String id);
}
