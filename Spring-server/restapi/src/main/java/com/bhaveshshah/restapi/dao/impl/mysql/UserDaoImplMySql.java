package com.bhaveshshah.restapi.dao.impl.mysql;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bhaveshshah.restapi.dao.UserDao;
import com.bhaveshshah.restapi.dao.impl.BaseDaoImpl;
import com.bhaveshshah.restapi.dao.impl.mysql.UserRowMapper;
import com.bhaveshshah.restapi.model.User;
import com.bhaveshshah.restapi.util.ApplicationUtil;

@Service
public class UserDaoImplMySql extends BaseDaoImpl implements UserDao {
	@Override
	public User get(String id) {
		List<User> users = this.getJdbcTemplate().query("select * from users where id = ?", new Object[] {id}, new UserRowMapper());
		if (users == null) return new User();
		return users.get(0);
	}

	@Override
	public User save(User model) {
		model.setId(ApplicationUtil.generateUUID());
		String sql = "insert into users(id, firstName, lastName, email, password, phone, isVerified, isActive, verificationToken) values(?,?,?,?,?,?,0,1,?)" ;
		if (this.getJdbcTemplate().update(sql, new Object[] { model.getId(), model.getFirstName(), model.getLastName(), model.getEmail() , model.getPassword(), model.getPhone(), model.getVerificationToken()}) >= 0 ) {
			return model;
		}
		return null;
	}

	@Override
	public Integer delete(User model) {
		String sql = "delete from user where id = ?";
		return this.getJdbcTemplate().update(sql, new Object[] {model.getId()});
	}

	@Override
	public List<User> getAll() {
		List<User> users = this.getJdbcTemplate().query("select * from users", new UserRowMapper());
		return users;
	}

	@Override
	public User findByEmail(String email) {
		List<User> users = this.getJdbcTemplate().query("select * from users where email = ?", new Object[] {email} , new UserRowMapper());
		if (users == null) return null;
		if (users.size() == 0) return null;
		return users.get(0);
	}

	@Override
	public boolean updatePicture(String id, String fileName) {
		String sql = "update users set picture = ? where id = ?";
		if (this.getJdbcTemplate().update(sql, new Object[] {fileName, id}) >= 0) {
			return true;
		}
		return false;
	}

	@Override
	public boolean updateProfile(User user) {
		String sql = "update users set firstName = ?, lastName = ?, phone = ? where id = ?";
		if (this.getJdbcTemplate().update(sql, new Object[] {user.getFirstName(), user.getLastName(), user.getPhone(), user.getId()}) > 0) {
			return true;
		}
		return false;
	}

	@Override
	public boolean updatePasword(String id, String password) {
		String sql = "update users set password = ? where id = ?";
		if (this.getJdbcTemplate().update(sql, new Object[] {password, id}) >= 0) {
			return true;
		}
		return false;
	}

	@Override
	public User findByToken(String token) {
		List<User> users = this.getJdbcTemplate().query("select * from users where verificationToken = ?", new Object[] {token} , new UserRowMapper());
		if (users == null) return null;
		if (users.size() == 0) return null;
		return users.get(0);
	}

	@Override
	public boolean updateVerification(String id) {
		String sql = "update users set isVerified = 1, verificationToken='' where id = ?";
		if (this.getJdbcTemplate().update(sql, new Object[] {id}) >= 0) {
			return true;
		}
		return false;
	}
}
