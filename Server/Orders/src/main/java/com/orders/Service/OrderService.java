package com.orders.Service;

import java.util.List;
import java.util.UUID;

import com.orders.Model.Orders;

public interface OrderService {

	List<Orders> getAllOrders();
	List<Orders> getOrdersByUserId(Long userId);
	Orders getOrderById(UUID orderId);
	Orders saveOrder(Orders order);
	void deleteOrderById(UUID Id);
	
	
}
