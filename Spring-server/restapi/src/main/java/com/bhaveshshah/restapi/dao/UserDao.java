package com.bhaveshshah.restapi.dao;

import com.bhaveshshah.restapi.model.User;

public interface UserDao extends BaseDao<User> {
	public User findByEmail(String email);
	public User findByToken(String token);
	public boolean updatePicture(String id, String fileName);
	public boolean updateProfile(User user);
	public boolean updatePasword(String id, String password);
	public boolean updateVerification(String id);
}
