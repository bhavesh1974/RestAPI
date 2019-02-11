package com.bhaveshshah.restapi.dao.impl.hibernate;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bhaveshshah.restapi.dao.SalesDao;
import com.bhaveshshah.restapi.dao.impl.BaseDaoImpl;
import com.bhaveshshah.restapi.model.Sales;
import com.bhaveshshah.restapi.util.ApplicationUtil;

@Repository
@Transactional
@Qualifier("SalesDaoImplHibernate")
public class SalesDaoImplHibernate extends BaseDaoImpl implements SalesDao {

	@Override
	public Sales get(String id) {
		Sales sales = this.getSession().load(Sales.class, id);
		return sales;
	}

	@Override
	public Sales save(Sales model) {
		Session session = this.getSession();
		model.setId(ApplicationUtil.generateUUID());
		session.saveOrUpdate(model);
		return model;
	}

	@Override
	public Integer delete(Sales model) {
		Query query = this.getQuery("delete from Sales where id = :id");
		query.setString("id", model.getId());
		int result = query.executeUpdate();
		return result;
	}

	@Override
	public List<Sales> getAll() {
		Query query = this.getQuery("from Sales");
		return query.list();
	}

}
