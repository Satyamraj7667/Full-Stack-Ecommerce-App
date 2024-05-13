package com.user.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.Model.Product;
import com.user.Model.User;
import com.user.Service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userserv;
	
	
	@GetMapping
	public ResponseEntity<List<User>> getAllUsers(){
		List<User> l = userserv.getAllUsers();
		return ResponseEntity.ok(l);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getSingleUser(@PathVariable("id") Long id){
		User u = userserv.getUserById(id);
		return ResponseEntity.ok(u);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email){
		List<User> l = userserv.getByEmail(email);
		User u = l.get(0);
		return ResponseEntity.ok(u);
	}
	
    @DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
		userserv.deleteUserById(id);
		return  ResponseEntity.ok("User successfully deleted");
	}
	 
    @PatchMapping("/cart/{email}")
    public ResponseEntity<?> updateCartOfUser(@PathVariable("email") String email, @RequestBody List<Long> Products ){
    	try {
            userserv.updateCart(email, Products);
            return ResponseEntity.ok("Cart updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update cart");
        }
    }  
    @GetMapping("/cart/{email}")
    public ResponseEntity<List<Product>> getCartData(@PathVariable("email") String Email){
    	List<Product> l = userserv.getCart(Email);
    	return ResponseEntity.ok(l);
    	
    }
    

}
