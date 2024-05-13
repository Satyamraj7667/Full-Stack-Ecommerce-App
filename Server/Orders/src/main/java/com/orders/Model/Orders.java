package com.orders.Model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID Id;
	private Long userId;
	@Enumerated(EnumType.STRING)
    private OrderStatus status;
 
    private List<Integer> orderProductQuantities;
    private List<Long> orderProductIds;
	private Long shippingAddressId;
	private LocalDateTime orderDate;
	private Double totalAmount;
	private Double deliveryFee;
	private String paymentStatus;
	private String paymentMethod;
	private String paymentId;
	
	
}
