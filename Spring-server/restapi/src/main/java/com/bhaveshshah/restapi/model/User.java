package com.bhaveshshah.restapi.model;

import javax.validation.constraints.NotBlank;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@Component
@JsonPropertyOrder({ "id", "firstName", "lastName", "email", "phone","isVerified","isActive"})
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class User extends Base {
	@NotBlank(message = "First name cannot be blank.")
	private String firstName;
	@NotBlank(message = "Last name cannot be blank.")
	private String lastName;
	private String email;
	private String password;
	private String phone;
	@JsonIgnore
	private String picture;
	private Integer isVerified;
	private Integer isActive;
	@JsonIgnore
	private String verificationToken;
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public Integer getIsVerified() {
		return isVerified;
	}
	public void setIsVerified(Integer isVerified) {
		this.isVerified = isVerified;
	}
	public Integer getIsActive() {
		return isActive;
	}
	public void setIsActive(Integer isActive) {
		this.isActive = isActive;
	}
	public String getVerificationToken() {
		return verificationToken;
	}
	public void setVerificationToken(String token) {
		this.verificationToken = token;
	}
	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", password=" + password
				+ ", phone=" + phone + ", picture=" + picture + ", isVerified=" + isVerified + ", isActive=" + isActive + ", token=" + verificationToken
				+ "]";
	}
}
