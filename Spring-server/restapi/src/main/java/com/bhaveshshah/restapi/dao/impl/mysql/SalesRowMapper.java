package com.bhaveshshah.restapi.dao.impl.mysql;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.bhaveshshah.restapi.model.Sales;

public class SalesRowMapper implements RowMapper<Sales> {

	@Override
	public Sales mapRow(ResultSet rs, int record) throws SQLException {
		Sales sales = new Sales();
		sales.setId(rs.getString("id"));
		sales.setSalesDate(rs.getDate("salesDate"));
		sales.setCustomer(rs.getString("customer"));
		sales.setItem(rs.getString("item"));
		sales.setQty(rs.getDouble("qty"));
		sales.setRate(rs.getDouble("rate"));
		sales.setTaxPercent(rs.getDouble("taxPercent"));
		return sales;
	}

}
