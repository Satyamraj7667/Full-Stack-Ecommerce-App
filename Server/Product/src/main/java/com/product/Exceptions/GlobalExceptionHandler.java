package com.product.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.product.Payload.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> HandlerResourceNotFoundException(ResourceNotFoundException ex){
		String message = ex.getMessage();
		ApiResponse ar = new ApiResponse();
		ar.setMessage(message);
		ar.setSuccess(false);
		ar.setStatus(HttpStatus.NOT_FOUND);
		
		return new ResponseEntity<ApiResponse>(ar,HttpStatus.NOT_FOUND);
	}
}
