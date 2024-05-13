package com.address.Service;

import java.util.List;

import com.address.Model.Address;

public interface AddressService {

	void saveAddress(Address as);
	Address getAddressById(Long id);
	List<Address> getAllAddresses();
	List<Address> getAddressByUserId(Long userId);
	void deleteAddress(Long addressid);
}
