package com.app.core.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@ComponentScan({"com.app.service"})
@EnableJpaRepositories(basePackages = "com.app.dao")
@EntityScan( basePackages = {"com.app.model"} )
public class AppCoreContext {

}
