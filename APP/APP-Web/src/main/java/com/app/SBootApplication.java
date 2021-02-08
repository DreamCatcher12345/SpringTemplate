package com.app;

import com.app.config.AppWebContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import com.app.core.config.AppCoreContext;

@SpringBootApplication
@Import(value = {AppWebContext.class, AppCoreContext.class})
public class SBootApplication {

	public static void main(String[] args) {
		 SpringApplication.run(SBootApplication.class, args);
	}

}
