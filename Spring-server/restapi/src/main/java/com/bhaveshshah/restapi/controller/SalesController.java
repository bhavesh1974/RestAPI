package com.bhaveshshah.restapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bhaveshshah.restapi.dao.SalesDao;
import com.bhaveshshah.restapi.model.Response;
import com.bhaveshshah.restapi.model.Sales;

@RestController
@RequestMapping("/sales")
public class SalesController {
	@Autowired
	@Qualifier("SalesDaoImpl") SalesDao salesDao;
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll() {
		return new ResponseEntity<>(salesDao.getAll(),HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<Object> save(@RequestBody Sales model) {
		if (salesDao.save(model) == null) {
			return new ResponseEntity<>(new Response("4171","Failed to save."), HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<>(new Response("200","Successfully saved."), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> delete(@PathVariable("id") String id) {
		Sales sales = new Sales();
		sales.setId(id);
		if (salesDao.delete(sales) <= 0) {
			return new ResponseEntity<>(new Response("4171","Failed to deleted."), HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<>(new Response("200","Successfully deleted."), HttpStatus.OK);		
	}
}
