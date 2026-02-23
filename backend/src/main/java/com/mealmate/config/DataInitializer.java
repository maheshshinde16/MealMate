package com.mealmate.config;

import com.mealmate.model.Role;
import com.mealmate.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
    }

    private void initializeRoles() {
        // Create ROLE_USER if not exists
        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setName("ROLE_USER");
            roleRepository.save(userRole);
            System.out.println("✓ Created ROLE_USER");
        }

        // Create ROLE_VENDOR if not exists
        if (roleRepository.findByName("ROLE_VENDOR").isEmpty()) {
            Role vendorRole = new Role();
            vendorRole.setName("ROLE_VENDOR");
            roleRepository.save(vendorRole);
            System.out.println("✓ Created ROLE_VENDOR");
        }

        // Create ROLE_DELIVERY if not exists
        if (roleRepository.findByName("ROLE_DELIVERY").isEmpty()) {
            Role deliveryRole = new Role();
            deliveryRole.setName("ROLE_DELIVERY");
            roleRepository.save(deliveryRole);
            System.out.println("✓ Created ROLE_DELIVERY");
        }

        System.out.println("✓ All roles initialized successfully");
    }
}
