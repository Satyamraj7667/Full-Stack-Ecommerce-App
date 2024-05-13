package com.orders.Dao;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orders.Model.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, UUID>{

	List<Orders> findByUserId(Long userId); 
}
