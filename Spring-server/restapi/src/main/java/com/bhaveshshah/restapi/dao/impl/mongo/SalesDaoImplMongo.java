package com.bhaveshshah.restapi.dao.impl.mongo;

import java.util.List;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.bhaveshshah.restapi.dao.SalesDao;
import com.bhaveshshah.restapi.dao.impl.BaseDaoImpl;
import com.bhaveshshah.restapi.model.Sales;
import com.bhaveshshah.restapi.model.User;
import com.bhaveshshah.restapi.util.ApplicationUtil;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

@Service
public class SalesDaoImplMongo extends BaseDaoImpl implements SalesDao  {
	@Override
	public Sales get(String id) {
		Query query = new Query(Criteria.where("_id").is(id));
		return this.mongoOps.findOne(query, Sales.class, "sales");
	}

	@Override
	public Sales save(Sales model) {
		if (model.getId() != null) {
			if (!model.getId().equals("")) {
				//Find collection
				Query query = new Query(Criteria.where("_id").is(model.getId()));
				//Update collection
				Update update = new Update();
				update.set("salesDate", model.getSalesDate());
				update.set("customer", model.getCustomer());
				update.set("item", model.getItem());
				update.set("qty", model.getQty());
				update.set("rate", model.getRate());
				update.set("taxPercent", model.getTaxPercent());
				UpdateResult result = this.mongoOps.updateFirst(query, update , Sales.class, "sales");
				return model;
			}
		}
		model.setId(ApplicationUtil.generateUUID());
		this.mongoOps.insert(model, "sales");
		return model;
	}

	@Override
	public Integer delete(Sales model) {
		Query query = new Query(Criteria.where("_id").is(model.getId()));
		DeleteResult result = this.mongoOps.remove(query, Sales.class, "sales");
		return (int) result.getDeletedCount();
	}

	@Override
	public List<Sales> getAll() {
		return this.mongoOps.findAll(Sales.class, "sales");
	}
}
