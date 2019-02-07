package com.bhaveshshah.restapi.dao.impl.mysql;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bhaveshshah.restapi.dao.SalesDao;
import com.bhaveshshah.restapi.dao.impl.BaseDaoImpl;
import com.bhaveshshah.restapi.dao.impl.mysql.SalesRowMapper;
import com.bhaveshshah.restapi.model.Sales;
import com.bhaveshshah.restapi.util.ApplicationUtil;

@Service
public class SalesDaoImplMySql extends BaseDaoImpl implements SalesDao {
	@Override
	public Sales get(String id) {
		List<Sales> sales = this.getJdbcTemplate().query("select * from sales where id = ?", new Object[] {id}, new SalesRowMapper());
		if (sales == null) return new Sales();
		return sales.get(0);
	}

	@Override
	public Sales save(Sales model) {
		if (model.getId() != null) {
			if (!model.getId().equals("")) {
				String sql = "update sales set salesDate = ?, customer = ?, item = ?, qty = ?, rate = ?, taxPercent = ? where id = ?" ;
				if (this.getJdbcTemplate().update(sql, new Object[] { model.getSalesDate(), model.getCustomer(), model.getItem() , model.getQty(), model.getRate(), model.getTaxPercent(), model.getId()}) >= 0 ) {
					return model;
				}
				return null;
			}
		}
		String id = ApplicationUtil.generateUUID();
		String sql = "insert into sales(id, salesDate, customer, item, qty, rate, taxPercent) values(?,?,?,?,?,?,?)" ;
		if (this.getJdbcTemplate().update(sql, new Object[] { id, model.getSalesDate(), model.getCustomer(), model.getItem() , model.getQty(), model.getRate(), model.getTaxPercent()}) >= 0 ) {
			return model;
		}
		return null;
	}

	@Override
	public Integer delete(Sales model) {
		String sql = "delete from sales where id = ?";
		return this.getJdbcTemplate().update(sql, new Object[] {model.getId()});
	}

	@Override
	public List<Sales> getAll() {
		List<Sales> users = this.getJdbcTemplate().query("select * from sales", new SalesRowMapper());
		return users;
	}
}
