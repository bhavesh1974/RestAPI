package com.bhaveshshah.restapi.controller;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bhaveshshah.restapi.dao.UserDao;
import com.bhaveshshah.restapi.model.Response;
import com.bhaveshshah.restapi.model.User;
import com.bhaveshshah.restapi.util.JSONUtil;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController()
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	@Qualifier("UserDaoImpl") public UserDao userDao;
	
	@PostMapping("/signin")
	public ResponseEntity<Object> signIn(@RequestBody String request, Errors error) throws Exception {
		//Convert JSON request to Map
		Map<String, Object> json = JSONUtil.convertToMap(request);
		
		//Get user from database
		User user = userDao.findByEmail(json.get("email").toString());
		//verify user
		if (user == null) {
			return new ResponseEntity<>(new Response("4001","Email or Password is invalid."), HttpStatus.UNAUTHORIZED);
		}

		//verify password
		if (BCrypt.checkpw(json.get("password").toString(), user.getPassword()) == false) {
			return new ResponseEntity<>(new Response("4001","Email or Password is invalid."), HttpStatus.UNAUTHORIZED);
		}
		
		//verify user is verified
		if (user.getIsVerified() == 0) {
			return new ResponseEntity<>(new Response("4002","Account is not verified yet."), HttpStatus.UNAUTHORIZED);
		}
		
		//verify user is active
		if (user.getIsActive() == 0) {
			return new ResponseEntity<>(new Response("4003","Account is not active."), HttpStatus.UNAUTHORIZED);
		}

		//Add expiration to 7 days
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DAY_OF_MONTH, 7);
		//Generate Token
		String jwt = "";		
		jwt = Jwts.builder()
				  .setSubject("speak")
				  .setExpiration(cal.getTime())
				  .claim("token", user.getEmail())
				  .claim("userId", user.getId())
				  .signWith(
				    SignatureAlgorithm.HS256,
				    "speakSuperJWTSecret".getBytes("UTF-8")
				  )
				  .compact();

		//Prepared response to return in JSON
		Map<String, Object> response = new HashMap<>();
		response.put("token", jwt);
		response.put("userName", user.getFirstName());
		response.put("code", "200");
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@GetMapping("/confirmation/{token}")
	public ResponseEntity<Object> confirmation(@PathVariable("token") String token) {
		//Get user from database
		User user = userDao.findByToken(token);
		//verify user
		if (user == null) {
			return new ResponseEntity<>(new Response("4004","Token is not valid."), HttpStatus.UNAUTHORIZED);
		}
		if (userDao.updateVerification(user.getId()) == false) {
			return new ResponseEntity<>(new Response("4171","Failed to create user."), HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity(new Response("200","Your account is verified now. Please sign in."),HttpStatus.OK);
	}
}
