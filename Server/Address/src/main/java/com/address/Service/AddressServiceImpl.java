package com.address.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.address.Dao.AddressRepository;
import com.address.Exceptions.ResourceNotFoundException;
import com.address.Model.Address;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressRepository addressRepository;

	@Override
	public void saveAddress(Address as) {
		addressRepository.save(as);
	}

	@Override
	public Address getAddressById(Long id) {
		if(addressRepository.findById(id).isEmpty()==true) {
			throw new ResourceNotFoundException("Address with given Id : "+id+" not found");
		}
		else {
			return addressRepository.findById(id).get();
		}
	}

	@Override
	public List<Address> getAllAddresses() {
		return addressRepository.findAll();
	}

	@Override
	public List<Address> getAddressByUserId(Long userId) {
		List<Address> l = addressRepository.findByUserId(userId);
		return l;
	}

	@Override
	public void deleteAddress(Long addressid) {
		addressRepository.deleteById(addressid);
		
	}
	
	
}
