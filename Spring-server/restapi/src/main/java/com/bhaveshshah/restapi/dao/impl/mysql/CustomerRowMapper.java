package com.bhaveshshah.restapi.dao.impl.mysql;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.bhaveshshah.restapi.model.Customer;

public class CustomerRowMapper implements RowMapper<Customer>  {

	@Override
	public Customer mapRow(ResultSet rs, int record) throws SQLException {
		Customer customer = new Customer();
		customer.setId(rs.getString("id"));
		customer.setCustomerCode(rs.getString("customerCode"));
		customer.setCustomerName(rs.getString("customerName"));
		customer.setAddress(rs.getString("address"));
		customer.setCity(rs.getString("city"));
		customer.setState(rs.getString("state"));
		customer.setPhone(rs.getString("phone"));
		return customer;
	}

}
