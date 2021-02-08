package com.app.core.exceptions;

import lombok.Getter;
import lombok.Setter;

public class AppException extends RuntimeException{

	@Getter
	@Setter
	int code;

	public AppException(String message){
		super(message);
	}

	public AppException(Exception e){
		super(e);
	}
}
