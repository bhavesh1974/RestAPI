package com.bhaveshshah.restapi.dao.impl.hibernate;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bhaveshshah.restapi.dao.UserDao;
import com.bhaveshshah.restapi.dao.impl.BaseDaoImpl;
import com.bhaveshshah.restapi.model.User;
import com.bhaveshshah.restapi.util.ApplicationUtil;

@Repository
@Transactional
@Qualifier("UserDaoImplHibernate")
public class UserDaoImplHibernate extends BaseDaoImpl implements UserDao {
	@Override
	public User get(String id) {
		Session session = this.getSession();
		User user = session.load(User.class, new String(id));
		return user;
	}

	@Override
	public User save(User model) {
		Session session = this.getSession();
		model.setId(ApplicationUtil.generateUUID());
		model.setIsActive(1);
		model.setIsVerified(1);
		session.saveOrUpdate(model);
		return model;
	}

	@Override
	public Integer delete(User model) {
		Session session = this.getSession();
		session.delete(model);
		return 1;
	}

	@Override
	public List<User> getAll() {
		DetachedCriteria criteria = DetachedCriteria.forClass(User.class);
		criteria.addOrder(Order.asc("firstName"));
		Criteria query = criteria.getExecutableCriteria(this.getSession());
		return query.list();
	}

	@Override
	public User findByEmail(String email) {
		Query query = this.getQuery("from User where email = :email");
		query.setString("email", email);
		User user = (User) query.uniqueResult();
		return user;
		
	}

	@Override
	public User findByToken(String token) {
		Query query = this.getQuery("from User where token = :token");
		query.setString("token", token);
		User user = (User) query.uniqueResult();
		return user;
	}

	@Override
	public boolean updatePicture(String id, String fileName) {
		Query query = this.getQuery("update User set picture = :picture where id = :id");
		query.setString("picture", fileName);
		query.setString("id", id);
		int result = query.executeUpdate();
		return (result > 0);
	}

	@Override
	public boolean updateProfile(User user) {
		Query query = this.getQuery("update User set firstName = :firstName, lastName = :lastName, phone = :phone where id = :id");
		query.setString("firstName", user.getFirstName());
		query.setString("lastName", user.getLastName());
		query.setString("phone", user.getPhone());
		query.setString("id", user.getId());
		int result = query.executeUpdate();
		return (result > 0);		
	}

	@Override
	public boolean updatePasword(String id, String password) {
		Query query = this.getQuery("update User set password = :password where id = :id");
		query.setString("password", password);
		query.setString("id", id);
		int result = query.executeUpdate();
		return (result > 0);		
	}

	@Override
	public boolean updateVerification(String id) {
		Query query = this.getQuery("update User set isVerified = 1, verificationToken = '' where id = :id");
		query.setString("id", id);
		int result = query.executeUpdate();
		return (result > 0);
	}
}
