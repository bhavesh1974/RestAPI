package com.bhaveshshah.restapi.dao.impl.mysql;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.bhaveshshah.restapi.model.User;

public class UserRowMapper implements RowMapper<User>  {

	@Override
	public User mapRow(ResultSet rs, int record) throws SQLException {
		User user = new User();
		user.setId(rs.getString("id"));
		user.setFirstName(rs.getString("firstName"));
		user.setLastName(rs.getString("lastName"));
		user.setEmail(rs.getString("email"));
		user.setPhone(rs.getString("phone"));
		user.setPicture(rs.getString("picture"));
		user.setIsActive(rs.getInt("isActive"));
		user.setIsVerified(rs.getInt("isVerified"));
		user.setPassword(rs.getString("password"));
		return user; 
	}

}
