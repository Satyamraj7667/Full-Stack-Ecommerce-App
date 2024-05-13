package com.user.Exceptions;

public class AlreadyExistsException extends RuntimeException{
	
	public AlreadyExistsException() {
		super("User with this Email already exists");
	}
	
	public AlreadyExistsException(String message) {
		super(message);
	}

}
