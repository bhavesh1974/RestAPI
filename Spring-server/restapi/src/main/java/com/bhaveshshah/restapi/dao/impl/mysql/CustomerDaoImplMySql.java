package com.bhaveshshah.restapi.dao.impl.mysql;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bhaveshshah.restapi.dao.CustomerDao;
import com.bhaveshshah.restapi.dao.impl.BaseDaoImpl;
import com.bhaveshshah.restapi.model.Customer;
import com.bhaveshshah.restapi.util.ApplicationUtil;

@Service
public class CustomerDaoImplMySql extends BaseDaoImpl implements CustomerDao {

	@Override
	public Customer get(String id) {
		List<Customer> customers = this.getJdbcTemplate().query("select * from customers where id = ?", new Object[] {id}, new CustomerRowMapper());
		if (customers == null) return new Customer();
		return customers.get(0);
	}

	@Override
	public Customer save(Customer model) {
		if (model.getId() != null) {
			String sql = "update customers set customerCode = ?, customerName = ?, address = ?, city = ?, state = ?, phone = ? where id = ?";
			if (this.getJdbcTemplate().update(sql, new Object[] {model.getCustomerCode(), model.getCustomerName(), model.getAddress(), model.getCity(), model.getState(), model.getPhone(), model.getId()}) > 0) {
				return model;
			}
			return null;
		} 
		String id = ApplicationUtil.generateUUID();
		String sql = "insert into customers(id, customerCode, customerName, address, city, state, phone) values (?,?,?,?,?,?)";
		
		if (this.getJdbcTemplate().update(sql, new Object[] {id, model.getCustomerCode(), model.getCustomerName(), model.getAddress(), model.getCity(), model.getState(), model.getPhone()}) > 0) {
			return model;
		}
		return null;
	}

	@Override
	public Integer delete(Customer model) {
		String sql = "delete from customers where id = ?";
		return this.getJdbcTemplate().update(sql, new Object[] {model.getId()});
	}

	@Override
	public List<Customer> getAll() {
		List<Customer> customers = this.getJdbcTemplate().query("select * from customers", new CustomerRowMapper());
		return customers ;
	}

}
