package com.bhaveshshah.restapi.dao;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bhaveshshah.restapi.model.Base;

public interface BaseDao<T> {
	public T get(String id);
	public T save(T model);
	public Integer delete(T model);
	public List<T> getAll();
}
