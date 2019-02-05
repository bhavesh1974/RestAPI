1-> Create Maven project -> Select correct Archtype //DONE
2-> Open pom.xml and add dependencies  //DONE
	spring-core
	spring-beans
	spring-context
	spring-web-mvc
	spring-web
	spring-jdbc
	servlet
	faster-jackson
	mysql
	hibernate-validator
	faster-xml
	log4j or sfl4j
	jsonwebtoken
	
3-> set dispatcherservlet to web.xml  //DONE
4-> set contextLoaderListner in web.xml - contextConfiguration param  //DONE
5-> create spring configuration XML 	//DONE
	component-scan
	annotation-driven
	viewer
	datasource
	propertyplaceconfiguration
	cors setting
	
6-> Controller, DAO, Model //DONE
7-> Interceptor			//DONE

@Service
@Controller
@Component
@RestContoller, @GetMapping, @PostMapping
@PathVariable
@RequestParam
@ModelAttribute, @Valid - BindingResult
@RequestBody - set to method argument
@ResponseBody - set to method return 


<context-param>
  	<param-name>contextConfigLocation</param-name>
  	<param-value>
  	/WEB-INF/speak-servlet.xml 
	</param-value>  	
  </context-param>  
  

	