package com.mealmate.controller;

import com.mealmate.dto.VendorDto;
import com.mealmate.service.VendorService;
import com.mealmate.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(originPatterns = "*")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<VendorDto>>> getAllVendors() {
        List<VendorDto> vendors = vendorService.getAllVendors();
        return ResponseEntity.ok(new ApiResponse<>(true, "Vendors retrieved successfully", vendors));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VendorDto>> getVendorById(@PathVariable String id) {
        VendorDto vendor = vendorService.getVendorById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Vendor retrieved successfully", vendor));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<VendorDto>> createVendor(@RequestBody VendorDto vendorDto) {
        VendorDto createdVendor = vendorService.createVendor(vendorDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Vendor created successfully", createdVendor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<VendorDto>> updateVendor(@PathVariable String id, @RequestBody VendorDto vendorDto) {
        VendorDto updatedVendor = vendorService.updateVendor(id, vendorDto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Vendor updated successfully", updatedVendor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteVendor(@PathVariable String id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Vendor deleted successfully", null));
    }
}
