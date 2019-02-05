package com.bhaveshshah.restapi.exception;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;

@JsonPropertyOrder({ "timeStamp", "code", "path", "message", "details" })
@JsonTypeName(value = "error")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class RestExceptionResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSSZ")
	private Date timeStamp;
	private String message;
	private String details;
	private String code;
	private String path;
	
	public RestExceptionResponse(String code, String message, String details, String path) {
		super();
		this.code = code;
		this.timeStamp = new Date();
		this.message = message;
		this.details = details;
		this.path = path;
	}

	public Date getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
}