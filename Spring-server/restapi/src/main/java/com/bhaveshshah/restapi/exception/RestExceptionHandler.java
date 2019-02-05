package com.bhaveshshah.restapi.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.util.CollectionUtils;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.bhaveshshah.restapi.model.Response;

import java.util.Set;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    /**
     * Handles EntityNotFoundException. Created to encapsulate errors with more detail than javax.persistence.EntityNotFoundException.
     *
     * @param ex the EntityNotFoundException
     * @return the RestExceptionResponse object
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleAllException(
            Exception ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4002", "Unknown Error", ex.getMessage(), "");
		return buildResponseEntity(exceptionResponse, headers, HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
	/**
	 * Customize the response for HttpRequestMethodNotSupportedException.
	 * <p>This method logs a warning, sets the "Allow" header, and delegates to
	 * {@link #handleExceptionInternal}.
	 * @param ex the exception
	 * @param headers the headers to be written to the response
	 * @param status the selected response status
	 * @param request the current request
	 * @return a {@code ResponseEntity} instance
	 */
	protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
			HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {

		pageNotFoundLogger.warn(ex.getMessage());

		Set<HttpMethod> supportedMethods = ex.getSupportedHttpMethods();
		if (!CollectionUtils.isEmpty(supportedMethods)) {
			headers.setAllow(supportedMethods);
		}
		String error = ex.getMethod() + " is not supported.";
		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4001", error, ex.getMessage(), request.getDescription(false));
		return buildResponseEntity(exceptionResponse, headers, HttpStatus.BAD_REQUEST);
	}
	
    /**
     * Handle MissingServletRequestParameterException. Triggered when a 'required' request parameter is missing.
     *
     * @param ex      MissingServletRequestParameterException
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the RestExceptionResponse object
     */
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        String error = ex.getParameterName() + " parameter is missing";
		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4002", error, ex.getMessage(), request.getDescription(false));
		return buildResponseEntity(exceptionResponse, headers, HttpStatus.BAD_REQUEST);
    }


    /**
     * Handle HttpMediaTypeNotSupportedException. This one triggers when JSON is invalid as well.
     *
     * @param ex      HttpMediaTypeNotSupportedException
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the RestExceptionResponse object
     */
    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
            HttpMediaTypeNotSupportedException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        StringBuilder error = new StringBuilder();
        error.append(ex.getContentType());
        error.append(" media type is not supported. Supported media types are ");
        ex.getSupportedMediaTypes().forEach(t -> error.append(t).append(", "));

		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4002", error.toString().substring(0, error.length() - 2), ex.getMessage(), request.getDescription(false));
		return buildResponseEntity(exceptionResponse, headers, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

    /**
     * Handle MethodArgumentNotValidException. Triggered when an object fails @Valid validation.
     *
     * @param ex      the MethodArgumentNotValidException that is thrown when @Valid validation fails
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the RestExceptionResponse object
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {

    	StringBuilder error = new StringBuilder();
        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
        	error.append(
        	 fieldError.getObjectName() + "-" + fieldError.getField() + " - " + fieldError.getRejectedValue() + " - " + fieldError.getDefaultMessage() + ", ");        		
        });
		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4002", error.toString().substring(0, error.length() - 2), ex.getMessage(), request.getDescription(false));
		return buildResponseEntity(exceptionResponse, headers, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles javax.validation.ConstraintViolationException. Thrown when @Validated fails.
     *
     * @param ex the ConstraintViolationException
     * @return the RestExceptionResponse object
     */
    @ExceptionHandler(javax.validation.ConstraintViolationException.class)
    protected ResponseEntity<Object> handleConstraintViolation(
            javax.validation.ConstraintViolationException ex) {
    	StringBuilder error = new StringBuilder();
        ex.getConstraintViolations().forEach(constraintError -> {
        	error.append(
        	 constraintError.getMessage() + ", ");        		
        });
		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4002", error.toString().substring(0, error.length() - 2), ex.getMessage(), "");
		return buildResponseEntity(exceptionResponse, null, HttpStatus.BAD_REQUEST);
    	
    }

    /**
     * Handles EntityNotFoundException. Created to encapsulate errors with more detail than javax.persistence.EntityNotFoundException.
     *
     * @param ex the EntityNotFoundException
     * @return the RestExceptionResponse object
     */
    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFound(
            EntityNotFoundException ex) {
		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4002", "Entity not found.", ex.getMessage(), "");
		return buildResponseEntity(exceptionResponse, null, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles EntityNotFoundException. Created to encapsulate errors with more detail than javax.persistence.EntityNotFoundException.
     *
     * @param ex the EntityNotFoundException
     * @return the RestExceptionResponse object
     */
    @ExceptionHandler(UnAuthorizedException.class)
    protected ResponseEntity<Object> handleUnAuthorizedNotFound(
    		UnAuthorizedException ex) {
    	return new ResponseEntity<>(new Response("401","Not Authorized."), HttpStatus.UNAUTHORIZED);
    }
    
    /**
     * Handle HttpMessageNotReadableException. Happens when request JSON is malformed.
     *
     * @param ex      HttpMessageNotReadableException
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the RestExceptionResponse object
     */
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ServletWebRequest servletWebRequest = (ServletWebRequest) request;
        String error = "Malformed JSON request";
		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4003", error, ex.getMessage(), request.getDescription(false));
		return buildResponseEntity(exceptionResponse, headers, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle NoHandlerFoundException.
     *
     * @param ex
     * @param headers
     * @param status
     * @param request
     * @return
     */
    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(
            NoHandlerFoundException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        String error = String.format("Could not find the %s method for URL %s", ex.getHttpMethod(), ex.getRequestURL());
		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4003", error, ex.getMessage(), request.getDescription(false));
		return buildResponseEntity(exceptionResponse, headers, HttpStatus.NOT_FOUND);
    }

    /**
     * Handle Exception, handle generic Exception.class
     *
     * @param ex the Exception
     * @return the RestExceptionResponse object
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex,
                                                                      WebRequest request) {
        String error = String.format(String.format("The parameter '%s' of value '%s' could not be converted to type '%s'", ex.getName(), ex.getValue(), ex.getRequiredType().getSimpleName()));
		RestExceptionResponse exceptionResponse = new RestExceptionResponse("4003", error, ex.getMessage(), request.getDescription(false));
		return buildResponseEntity(exceptionResponse, null, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<Object> buildResponseEntity(RestExceptionResponse restExceptionResponse, HttpHeaders headers, HttpStatus status) {
    	if (headers != null)
    		headers.add("Access-Control-Allow-Origin", "*");
//		headers.add(
//		  "Access-Control-Allow-Headers",
//		  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//		);
//		headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");   
//		headers.add("Access-Control-Allow-Credentials", "true");
//		headers.add("Access-Control-Expose-Headers", "Origin,Access-Control-Request-Method,Access-Control-Allow-Origin,Access-Control-Allow-Credentials");
        return new ResponseEntity<>(restExceptionResponse, headers, status);
    }
}
