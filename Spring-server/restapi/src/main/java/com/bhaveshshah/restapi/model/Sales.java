package com.bhaveshshah.restapi.model;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@Component
@JsonPropertyOrder({ "id", "salesDate", "customer", "item", "qty","rate","taxPercent"})
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class Sales {
	public String id;
	public Date salesDate;
	public String customer;
	public String item;
	public Double qty;
	public Double rate;
	public Double taxPercent;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getSalesDate() {
		return salesDate;
	}
	public void setSalesDate(Date salesDate) {
		this.salesDate = salesDate;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public Double getQty() {
		return qty;
	}
	public void setQty(Double qty) {
		this.qty = qty;
	}
	public Double getRate() {
		return rate;
	}
	public void setRate(Double rate) {
		this.rate = rate;
	}
	public Double getTaxPercent() {
		return taxPercent;
	}
	public void setTaxPercent(Double taxPercent) {
		this.taxPercent = taxPercent;
	}
}
