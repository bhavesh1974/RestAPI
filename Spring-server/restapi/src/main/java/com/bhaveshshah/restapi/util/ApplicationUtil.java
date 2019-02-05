package com.bhaveshshah.restapi.util;

import java.util.UUID;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class ApplicationUtil {
	private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
	public static String generateUUID() {
		return UUID.randomUUID().toString();
	}
	
	public static String generateToken(int count) {
		StringBuilder builder = new StringBuilder();
		while (count-- != 0) {
			int character = (int)(Math.random()*ALPHA_NUMERIC_STRING.length());
			builder.append(ALPHA_NUMERIC_STRING.charAt(character));
		}
		return builder.toString();
	}
	
    public static void sendMail(String toRecepient, String firstName, String token) {
        //Setting up configurations for the email connection to the Google SMTP server using TLS
        Properties props = new Properties();

        props.put("mail.smtp.host", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");

        //Establishing a session with required user details
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("your@gmail.com", "yourpassword");
            }
        });

        try {
            //Creating a Message object to set the email content
            MimeMessage msg = new MimeMessage(session);

            //Storing the comma seperated values to email addresses
            String to = toRecepient;

            /*Parsing the String with defualt delimiter as a comma by marking the boolean as true and storing the email
            addresses in an array of InternetAddress objects*/
            InternetAddress[] address = InternetAddress.parse(to, true);

            //Setting the recepients from the address variable
            msg.setRecipients(Message.RecipientType.TO, address);
            String timeStamp = new SimpleDateFormat("yyyymmdd_hh-mm-ss").format(new Date());
            msg.setSubject("Verify your account");
            msg.setSentDate(new Date());
            msg.setText("Hello " + firstName + ",\n\nPlease verify your account by clicking the http://localhost:8080/speak/auth/confirmation/" + token) ;
            msg.setHeader("XPriority", "1");

            Transport.send(msg);
            System.out.println("Mail has been sent successfully");
        } catch (MessagingException mex) {
            System.out.println("Unable to send an email" + mex);
        }
    }	
}
