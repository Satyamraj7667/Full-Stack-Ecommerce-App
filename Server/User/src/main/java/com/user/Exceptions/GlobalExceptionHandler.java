package com.user.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.user.Payload.ApiResponse;



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
	
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ApiResponse> HandlerBadCredentialsException(BadCredentialsException ex){
		String message = ex.getMessage();
		ApiResponse apiResponse = ApiResponse.builder()
				                  .message(message)
				                  .success(false)
				                  .status(HttpStatus.BAD_REQUEST)
				                  .build();
		return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(AlreadyExistsException.class)
	public ResponseEntity<ApiResponse> HandlerAlreadyExistsException(AlreadyExistsException ex){
		String message = ex.getMessage();
		ApiResponse apiResponse = ApiResponse.builder()
				                  .message(message)
				                  .success(false)
				                  .status(HttpStatus.CONFLICT)
				                  .build();
		return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.CONFLICT);
	}
}
