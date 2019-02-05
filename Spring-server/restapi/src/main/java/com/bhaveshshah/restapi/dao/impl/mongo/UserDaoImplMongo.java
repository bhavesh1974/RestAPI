package com.bhaveshshah.restapi.dao.impl.mongo;

import java.util.List;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.bhaveshshah.restapi.dao.UserDao;
import com.bhaveshshah.restapi.dao.impl.BaseDaoImpl;
import com.bhaveshshah.restapi.model.User;
import com.bhaveshshah.restapi.util.ApplicationUtil;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

@Service
public class UserDaoImplMongo extends BaseDaoImpl implements UserDao  {
	@Override
	public User get(String id) {
		Query query = new Query(Criteria.where("_id").is(id));
		return this.mongoOps.findOne(query, User.class, "users");
	}

	@Override
	public User save(User model) {
		model.setId(ApplicationUtil.generateUUID());
		model.setIsVerified(0);
		model.setIsActive(1);
		this.mongoOps.insert(model, "users");
		return model;
	}

	@Override
	public Integer delete(User model) {
		Query query = new Query(Criteria.where("_id").is(model.getId()));
		DeleteResult result = this.mongoOps.remove(query, User.class, "users");
		return (int) result.getDeletedCount();
	}

	@Override
	public List<User> getAll() {
		return this.mongoOps.findAll(User.class, "users");
	}

	@Override
	public User findByEmail(String email) {
		Query query = new Query(Criteria.where("email").is(email));
		return this.mongoOps.findOne(query, User.class, "users");
	}

	@Override
	public boolean updatePicture(String id, String fileName) {
		//Find collection
		Query query = new Query(Criteria.where("_id").is(id));
		//Update collection
		Update update = new Update();
		update.set("picture", fileName);
		
		UpdateResult result = this.mongoOps.updateFirst(query, update , User.class, "users");
		return (result.getModifiedCount() > 0);
	}

	@Override
	public boolean updateProfile(User user) {
		//Find collection
		Query query = new Query(Criteria.where("_id").is(user.getId()));
		//Update collection
		Update update = new Update();
		update.set("firstName", user.getFirstName());
		update.set("lastName", user.getLastName());
		update.set("phone", user.getPhone());
		
		UpdateResult result = this.mongoOps.updateFirst(query, update , User.class, "users");
		return (result.getModifiedCount() > 0);

	}

	@Override
	public boolean updatePasword(String id, String password) {
		//Find collection
		Query query = new Query(Criteria.where("_id").is(id));
		//Update collection
		Update update = new Update();
		update.set("password", password);
		
		UpdateResult result = this.mongoOps.updateFirst(query, update , User.class, "users");
		return (result.getModifiedCount() > 0);
	}

	@Override
	public User findByToken(String token) {
		Query query = new Query(Criteria.where("verificationToken").is(token));
		return this.mongoOps.findOne(query, User.class, "users");
	}

	@Override
	public boolean updateVerification(String id) {
		//Find collection
		Query query = new Query(Criteria.where("_id").is(id));
		//Update collection
		Update update = new Update();
		update.set("isVerified", 1);
		
		UpdateResult result = this.mongoOps.updateFirst(query, update , User.class, "users");
		return (result.getModifiedCount() > 0);
	}
}
