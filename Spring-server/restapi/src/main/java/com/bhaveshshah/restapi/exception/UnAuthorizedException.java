package com.bhaveshshah.restapi.exception;

public class UnAuthorizedException extends RuntimeException {
	public UnAuthorizedException(String message) {
		super(message);
	}
}
