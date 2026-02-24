package com.mealmate.repository;

import com.mealmate.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

	List<Order> findByUserId(String userId);
	List<Order> findByVendorId(String vendorId);
	List<Order> findByStatus(String status);
	List<Order> findByDeliveryPartnerId(String deliveryPartnerId);
	List<Order> findByStatusAndVendorId(String status, String vendorId);
	List<Order> findByStatusIn(List<String> statuses);
	Optional<Order> findByOrderNumber(String orderNumber);

}
