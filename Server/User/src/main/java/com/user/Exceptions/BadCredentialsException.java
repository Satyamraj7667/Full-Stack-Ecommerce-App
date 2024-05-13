package com.user.Exceptions;

public class BadCredentialsException extends RuntimeException {
  
	public BadCredentialsException() {
		super("Invalid Credentials");
	}
	
	public BadCredentialsException(String message) {
		super(message);
	}
}
