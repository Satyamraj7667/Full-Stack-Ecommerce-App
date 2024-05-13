package com.address.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long addressId;
	private Long userId;
	private Long phoneNumber;
	private String name;
	private String city;
	private String state;
	private Long pincode;
	private String landmark;
	private String addressInfo;
	private String addressType;
	
	
	
	
	
}
