package com.app.core.exceptions;

public class ServiceException extends AppException{
	
	public ServiceException(String message){
		super(message);
	}
	
	public ServiceException(Exception e){
		super(e);
	}
}
