package com.user.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.Exceptions.AlreadyExistsException;
import com.user.Exceptions.BadCredentialsException;
import com.user.Model.JwtRequest;
import com.user.Model.JwtResponse;
import com.user.Model.User;
import com.user.Service.UserService;
import com.user.config.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private AuthenticationManager manager;
	
	@Autowired
	private UserService userserv;
	
	@Autowired
	private JwtService helper;
	
	private Logger logger = LoggerFactory.getLogger(AuthController.class);

	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request){
		this.doAuthenticate(request.getEmail(), request.getPassword());
		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
		String token = this.helper.generateToken(userDetails);
		User u = userserv.getByEmail(userDetails.getUsername()).get(0);
		String firstName = u.getFirstname();
		Long userid = u.getId();
		String role = u.getRole();
		JwtResponse response = JwtResponse.builder()
				               .jwtToken(token)
				               .username(userDetails.getUsername())
				               .firstname(firstName)
				               .userid(userid)
				               .role(role)
				               .build();
		return new ResponseEntity<JwtResponse>(response,HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> SaveUser(@RequestBody User u){
		if(userserv.getByEmail(u.getEmail()).isEmpty() == true) {
			userserv.saveUser(u);
			return ResponseEntity.ok().body("Successfully registerd");
		}
		else {
			 throw new AlreadyExistsException();
		}
		
	}
	
	private void doAuthenticate(String email,String password) {
		 UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
	        try {
	            manager.authenticate(authentication);
	        } 
	        catch (BadCredentialsException e) {
	            throw new BadCredentialsException(" Invalid Username or Password  !!");
	        }
	}
}
