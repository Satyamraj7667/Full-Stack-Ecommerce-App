package com.user.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.user.Dao.UserRepository;
import com.user.Exceptions.ResourceNotFoundException;
import com.user.Feign.ProductService;
import com.user.Model.Product;
import com.user.Model.User;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userrepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private ProductService prodserv;
	
	@Override
	public User saveUser(User u) {
	  u.setPassword(passwordEncoder.encode(u.getPassword()));
      userrepo.save(u);
		return u;
	}

	@Override
	public User getUserById(Long id) {
		if(userrepo.findById(id).isEmpty()==false) {
			return userrepo.findById(id).get();
		}
		else {
			throw new ResourceNotFoundException("User with Id : "+id+" not found");
		}
	}

	@Override
	public List<User> getAllUsers() {
		return userrepo.findAll();
	}

	@Override
	public void deleteUserById(Long id) {
		if(userrepo.findById(id).isEmpty()==false) {
			 userrepo.deleteById(id);
		}
		else {
			throw new ResourceNotFoundException("User with Id : "+id+" not found");
		}
	}

	@Override
	public List<User> getByEmail(String email) {
		return userrepo.findByEmail(email);
	}

	@Override
	public void updateCart(String email, List<Long> Products) {
		User ur = getByEmail(email).get(0);
		ur.setCart(Products);
		userrepo.save(ur);
	}

	@Override
	public List<Product> getCart(String email) {
		User ur = getByEmail(email).get(0);
		List<Long> l = ur.getCart();
		List<Product> cartList = new ArrayList<>();
		for(int i=0;i<l.size();i++) {
			cartList.add(prodserv.getProductById(l.get(i)));
		}
		return cartList;
	}

	

	


	
}
