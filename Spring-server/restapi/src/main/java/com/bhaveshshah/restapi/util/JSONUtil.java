package com.bhaveshshah.restapi.util;

import java.io.IOException;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSONUtil {
	public static Map<String, Object> convertToMap(String request) {
		Map<String, Object> map = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			map = mapper.readValue(request, Map.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return map;
	}
}
