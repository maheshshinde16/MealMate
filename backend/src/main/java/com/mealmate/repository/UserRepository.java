package com.mealmate.repository;

import com.mealmate.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailIgnoreCase(String email);
    @Query("{ 'email': { $regex: ?0, $options: 'i' } }")
    Optional<User> findByEmailRegex(String emailRegex);
    Boolean existsByEmail(String email);
}
