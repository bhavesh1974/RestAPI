package com.bhaveshshah.restapi.dao.impl;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.jdbc.core.JdbcTemplate;

public class BaseDaoImpl {
	@Autowired
	public JdbcTemplate jdbcTemplate ;
	@Autowired
	public MongoOperations mongoOps ;
	@Autowired
	SessionFactory sessionFactory;
	@Value("${application.database}")
	public String applicationDatabase;
	
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public MongoOperations getMongoOps() {
		return mongoOps ;
	}
	
	public void setMongoOps(MongoOperations mongoOps) {
		this.mongoOps = mongoOps;
	}
	public String getApplicationDatabase() {
		return applicationDatabase;
	}

	public void setApplicationDatabase(String applicationDatabase) {
		this.applicationDatabase = applicationDatabase;
	}
	
	public Session getSession() {
		return this.sessionFactory.getCurrentSession();
	}
	
	public Query getQuery(String query) {
		return this.getSession().createQuery(query);
	}
}
