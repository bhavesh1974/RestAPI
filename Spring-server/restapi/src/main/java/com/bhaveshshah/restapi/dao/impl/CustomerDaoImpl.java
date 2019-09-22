package com.bhaveshshah.restapi.dao.impl;

import java.util.List;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.bhaveshshah.restapi.dao.CustomerDao;
import com.bhaveshshah.restapi.dao.impl.mysql.CustomerDaoImplMySql;
import com.bhaveshshah.restapi.model.Customer;

@Service
@Qualifier("CustomerDaoImpl")
public class CustomerDaoImpl extends BaseDaoImpl implements CustomerDao, InitializingBean {
	@Autowired
	CustomerDaoImplMySql customerDaoMySql;
	
	CustomerDao customerDao;

	@Override
	public Customer get(String id) {
		return customerDao.get(id);
	}

	@Override
	public Customer save(Customer model) {
		return customerDao.save(model);
	}

	@Override
	public Integer delete(Customer model) {
		return customerDao.delete(model);
	}

	@Override
	public List<Customer> getAll() {
		return customerDao.getAll();
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		if (this.getApplicationDatabase().equals("MYSQL")) {
			customerDao = customerDaoMySql;
		} else if (this.getApplicationDatabase().equals("MONGO")) {
		} else {
		}
	}

}
