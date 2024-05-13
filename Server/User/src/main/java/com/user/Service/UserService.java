package com.user.Service;

import java.util.List;

import com.user.Model.Product;
import com.user.Model.User;

public interface UserService {

	User saveUser(User u);
	User getUserById(Long id);
	List<User> getAllUsers();
	void deleteUserById(Long id);
	List<User> getByEmail(String email);
//	UserDto login(String email,String password);
	void updateCart(String email, List<Long> Products);
	List<Product> getCart(String email); 
}
