package com.bhaveshshah.restapi.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bhaveshshah.restapi.dao.UserDao;
import com.bhaveshshah.restapi.model.Response;
import com.bhaveshshah.restapi.model.User;
import com.bhaveshshah.restapi.util.ApplicationUtil;
import com.bhaveshshah.restapi.util.JSONUtil;

@RestController
@RequestMapping("/user")
public class UserController extends BaseController implements InitializingBean {
	@Autowired
	ServletContext context; 
	@Autowired
	@Qualifier("UserDaoImpl") UserDao userDao;
	
	Properties props = new Properties();

	@PostMapping("/signup")
	public ResponseEntity<Object> signUp (@RequestBody User user, BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<>(new Response("4221","Please provide valid values."), HttpStatus.NOT_ACCEPTABLE);
		}
		
		//Generate and set new ID
		user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12)));
		user.setVerificationToken(ApplicationUtil.generateToken(32));
		
		if (userDao.save(user) == null) {
			return new ResponseEntity<>(new Response("4171","Failed to create user."), HttpStatus.EXPECTATION_FAILED);
		}
		
		//ApplicationUtil.sendMail(user.getEmail(), user.getFirstName(), user.getVerificationToken());
		return new ResponseEntity<>(new Response("200",user.getFirstName() + ", a verification link has been sent at " + user.getEmail() + "."), HttpStatus.OK);
	}	
	
	@GetMapping("/getPicture")
	public ResponseEntity<byte[]> getPicture(HttpServletRequest request) {
		//Get USER which was set from interceptor
		User user = (User) request.getAttribute("user");
		
		String uploadFolder = "C:\\Workspace\\speak-test\\server\\uploads";
		uploadFolder = this.props.getProperty("upload.folder");

		File img = new File(uploadFolder + "\\" + user.getPicture());
		String mimeType = "image/jpeg";
		try {
			mimeType = Files.probeContentType(img.toPath());
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
 	    try {
			return ResponseEntity.ok().contentType(MediaType.valueOf(mimeType)).body(Files.readAllBytes(img.toPath()));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@PostMapping("/uploadPicture")
	public ResponseEntity<Object> uploadPicture(@RequestParam("files") MultipartFile file, HttpServletRequest request) {
		//Get USER which was set from interceptor
		User user = (User) request.getAttribute("user");
		
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

		String uploadFolder = "C:\\Workspace\\speak-test\\server\\uploads";
		uploadFolder = this.props.getProperty("upload.folder");
		String fileName = "File-" + sdf.format(cal.getTime()) + "-" + file.getOriginalFilename();
		String targetLocation = uploadFolder + "\\" + fileName ;
		
		File img = new File(targetLocation);
		try {
			Files.copy(file.getInputStream(), img.toPath());
			if (userDao.updatePicture(user.getId(),fileName) == false) {
				return new ResponseEntity<>(new Response("4171","Failed to update picture."), HttpStatus.EXPECTATION_FAILED);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new Response("200","Picture uploaded successfully."), HttpStatus.OK);
	}
	
	@PutMapping("/updateProfile")
	public ResponseEntity<Object> updateProfile(@RequestBody User updatedUser, HttpServletRequest request) {
		User user = (User) request.getAttribute("user");
		updatedUser.setId(user.getId());
		if (userDao.updateProfile(updatedUser) == false) {
			return new ResponseEntity<>(new Response("4171","Failed to update profile."), HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<>(new Response("200","Profile updated successfully."), HttpStatus.OK);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<Object> getProfile(HttpServletRequest request) {
		User user = (User) request.getAttribute("user");
		return new ResponseEntity<>(new Response("200", user), HttpStatus.OK);
	}
	
	@PostMapping("/changePassword")
	public ResponseEntity<Object> changePassword(@RequestBody String body, HttpServletRequest request) {
		User user = (User) request.getAttribute("user");
		Map<String, Object> json = JSONUtil.convertToMap(body);
		
		String oldPassword = json.get("oldpassword").toString();
		String newPassword = json.get("password").toString();
		
		if (BCrypt.checkpw(oldPassword, user.getPassword()) == false) {
			return new ResponseEntity<>(new Response("4222","Old password is not valid."), HttpStatus.NOT_ACCEPTABLE);
		}
		
		if (userDao.updatePasword(user.getId(), BCrypt.hashpw(newPassword, BCrypt.gensalt(12))) == false) {
			return new ResponseEntity<>(new Response("4171","Failed to update password."), HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<>(new Response("200","Password is successfully changed."), HttpStatus.OK);
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			props.load(context.getResourceAsStream("/WEB-INF/application.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}