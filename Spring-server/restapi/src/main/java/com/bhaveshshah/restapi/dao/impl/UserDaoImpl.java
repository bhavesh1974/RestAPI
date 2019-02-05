package com.bhaveshshah.restapi.dao.impl;

import java.util.List;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.bhaveshshah.restapi.dao.UserDao;
import com.bhaveshshah.restapi.dao.impl.mongo.UserDaoImplMongo;
import com.bhaveshshah.restapi.dao.impl.mysql.UserDaoImplMySql;
import com.bhaveshshah.restapi.model.User;

@Service
@Qualifier("UserDaoImpl")
public class UserDaoImpl extends BaseDaoImpl implements UserDao, InitializingBean {
	@Autowired
	UserDaoImplMySql userDaoMysql;
	@Autowired
	UserDaoImplMongo userDaoMongo;
	private UserDao userDao;
	
	@Override
	public User get(String id) {
		return userDao.get(id);
	}

	@Override
	public User save(User model) {
		return userDao.save(model);
	}

	@Override
	public Integer delete(User model) {
		return userDao.delete(model);
	}

	@Override
	public List<User> getAll() {
		return userDao.getAll();
	}

	@Override
	public User findByEmail(String email) {
		return userDao.findByEmail(email);
	}

	@Override
	public boolean updatePicture(String id, String fileName) {
		return userDao.updatePicture(id, fileName);
	}

	@Override
	public boolean updateProfile(User user) {
		return userDao.updateProfile(user);
	}

	@Override
	public boolean updatePasword(String id, String password) {
		return userDao.updatePasword(id, password);
	}

	@Override
	public User findByToken(String token) {
		return userDao.findByToken(token);
	}

	@Override
	public boolean updateVerification(String id) {
		return userDao.updateVerification(id);
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		if (this.getApplicationDatabase().equals("MYSQL")) {
			userDao = this.userDaoMysql;
		} else {
			userDao = this.userDaoMongo;
		}
	}
}
