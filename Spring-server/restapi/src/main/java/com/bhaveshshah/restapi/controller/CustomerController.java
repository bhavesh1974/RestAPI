package com.bhaveshshah.restapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bhaveshshah.restapi.dao.CustomerDao;
import com.bhaveshshah.restapi.model.Customer;
import com.bhaveshshah.restapi.model.Response;

@Controller
@RequestMapping("/customers")
public class CustomerController extends BaseController {
	@Autowired
	@Qualifier("customerDaoImpl") public CustomerDao customerDao;
	
	@GetMapping("/")
	public ResponseEntity<Object> getAll() {
		List<Customer> customers = customerDao.getAll();
		return new ResponseEntity<>(customers, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> get(String id) {
		Customer customer = customerDao.get(id);
		return new ResponseEntity<>(customer, HttpStatus.OK);
	}
	
	@PostMapping("/")
	public ResponseEntity<Object> save(@RequestBody Customer model) {
		if (customerDao.save(model) == null) {
			return new ResponseEntity<>(new Response("4171","Failed to save."), HttpStatus.EXPECTATION_FAILED);
		}
		
		return new ResponseEntity<>(new Response("200","Successfully saved."), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@RequestBody Customer model) {
		if (customerDao.delete(model) >= 0) {
			return new ResponseEntity<>(new Response("4171","Failed to Delete."), HttpStatus.EXPECTATION_FAILED);
		} 
		return new ResponseEntity<>(new Response("200","Successfully delted."), HttpStatus.OK);
	}
}
