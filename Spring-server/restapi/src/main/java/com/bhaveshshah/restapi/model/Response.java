package com.bhaveshshah.restapi.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Response {
	String code = "";
	String message = "";
	Object data = null;

	public Response(String code, String message) {
		super();
		this.code = code;
		this.message = message;
	}
	
	public Response(String code, Object data) {
		super();
		this.code = code;
		this.data = data;
	}
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
}

