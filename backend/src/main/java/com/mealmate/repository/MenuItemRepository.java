package com.mealmate.repository;

import com.mealmate.model.MenuItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends MongoRepository<MenuItem, String> {
    List<MenuItem> findByVendorId(String vendorId);
}
