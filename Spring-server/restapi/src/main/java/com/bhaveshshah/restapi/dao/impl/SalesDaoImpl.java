package com.bhaveshshah.restapi.dao.impl;

import java.util.List;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.bhaveshshah.restapi.dao.SalesDao;
import com.bhaveshshah.restapi.dao.impl.mongo.SalesDaoImplMongo;
import com.bhaveshshah.restapi.dao.impl.mysql.SalesDaoImplMySql;
import com.bhaveshshah.restapi.model.Sales;

@Service
@Qualifier("SalesDaoImpl")
public class SalesDaoImpl extends BaseDaoImpl implements SalesDao, InitializingBean {
	@Autowired
	SalesDaoImplMySql salesDaoMySql;
	@Autowired
	SalesDaoImplMongo salesDaoMongo;
	@Autowired
	@Qualifier("SalesDaoImplHibernate") SalesDao salesDaoHibernate;
	
	SalesDao salesDao;
	
	public void afterPropertiesSet() throws Exception {
		if (this.getApplicationDatabase().equals("MYSQL")) {
			salesDao = salesDaoMySql;
		} else if (this.getApplicationDatabase().equals("MONGO")) {
			salesDao = salesDaoMongo;
		} else {
			salesDao = salesDaoHibernate;
		}
	}

	@Override
	public List<Sales> getAll() {
		return salesDao.getAll();
	}

	@Override
	public Sales get(String id) {
		return salesDao.get(id);
	}

	@Override
	public Sales save(Sales model) {
		return salesDao.save(model);
	}

	@Override
	public Integer delete(Sales model) {
		return salesDao.delete(model);
	}
}
