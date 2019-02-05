package com.bhaveshshah.restapi.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.bhaveshshah.restapi.dao.UserDao;
import com.bhaveshshah.restapi.dao.impl.UserDaoImpl;
import com.bhaveshshah.restapi.exception.UnAuthorizedException;
import com.bhaveshshah.restapi.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

public class AuthenticationInterceptor extends HandlerInterceptorAdapter  {
	@Autowired
	@Qualifier("UserDaoImpl") UserDao userDao;
	
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
        throws Exception {
		if( !request.getRequestURI().equals("/restapi/auth/signin") && 
			!request.getRequestURI().equals("/restapi/auth/signup") &&
			!request.getRequestURI().contains("/restapi/auth/confirmation") &&
			!request.getRequestURI().toLowerCase().contains("swagger") &&
			!request.getRequestURI().toLowerCase().contains("api-docs") &&
			!request.getMethod().equals("OPTIONS"))
		{
			String authorization = "";
			authorization = request.getHeader("Authorization");
			if (authorization == null) {
				throw new UnAuthorizedException("Teting");
			}
			if (authorization.length() < 7) {
				throw new UnAuthorizedException("Teting");
			}
			String token = authorization.substring(7);
			Jws<Claims> claims = null;
			try {
				claims = Jwts.parser()
						  .setSigningKey("speakSuperJWTSecret".getBytes("UTF-8"))
						  .parseClaimsJws(token);
				String userId = (String) claims.getBody().get("userId");
				
				//Get user from database
				User user = userDao.get(userId);
				if (user == null) {
					throw new UnAuthorizedException("Not Authorized");
				}
				request.setAttribute("user", user);
			} catch (Exception e) {
				throw new UnAuthorizedException("Not Authorized");
			}
		}
		return true;
    }
}
