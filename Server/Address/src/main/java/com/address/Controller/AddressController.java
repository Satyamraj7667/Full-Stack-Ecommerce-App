package com.address.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.address.Model.Address;
import com.address.Service.AddressService;

@RestController
@RequestMapping("/address")
@CrossOrigin(origins = "http://localhost:3000")
public class AddressController {

	@Autowired
	private AddressService addressService;
	
	@GetMapping("/{id}")
	public ResponseEntity<Address> getById(@PathVariable("id") Long id){
		Address as = addressService.getAddressById(id);
		return ResponseEntity.ok(as);
	}
	
	@PostMapping
	public ResponseEntity<String> saveNewAddress(@RequestBody Address as){
		addressService.saveAddress(as);
		return ResponseEntity.ok("Successfully added!");
	}
	
	@GetMapping
	public ResponseEntity<List<Address>> getAllAddress(){
		List<Address> l = addressService.getAllAddresses();
		return ResponseEntity.ok(l);
	}
	
	@GetMapping("/user/{userid}")
	public ResponseEntity<List<Address>> getAllAddressOfUser(@PathVariable("userid") Long userid){
		List<Address> l = addressService.getAddressByUserId(userid);
		return ResponseEntity.ok(l);
				
	}
	
	@DeleteMapping("/{addressid}")
	public ResponseEntity<String> deleteAddress(@PathVariable("addressid") Long addressid){
		System.out.println("fired successfully");
		addressService.deleteAddress(addressid);
		return ResponseEntity.ok("successfully deleted");
	}
}
