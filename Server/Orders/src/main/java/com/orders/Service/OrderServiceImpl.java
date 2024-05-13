package com.orders.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orders.Dao.OrderRepository;
import com.orders.Exceptions.ResourceNotFoundException;
import com.orders.Model.Orders;

@Service
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private OrderRepository orderrepo;

	@Override
	public List<Orders> getOrdersByUserId(Long userId) {
		return orderrepo.findByUserId(userId);
	}

	@Override
	public Orders getOrderById(UUID orderId) {
		if(orderrepo.findById(orderId).isEmpty()==false) {
	        return orderrepo.findById(orderId).get();
		}
		else {
			throw new ResourceNotFoundException("Order with ID : "+orderId+" ,not found!");
		}
	}

	@Override
	public Orders saveOrder(Orders order) {
		return orderrepo.save(order);
	}

	@Override
	public void deleteOrderById(UUID orderId) {
		if(orderrepo.findById(orderId).isEmpty()==false) {
	        orderrepo.deleteById(orderId);
		}
		else {
			throw new ResourceNotFoundException("Order with ID : "+orderId+" ,not found!");

		}
	}

	@Override
	public List<Orders> getAllOrders() {
		List<Orders> l = orderrepo.findAll();
		return l;
	}

}
