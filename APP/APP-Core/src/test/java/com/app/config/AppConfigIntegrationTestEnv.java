package com.app.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@ComponentScan({"com.app.service"})
@EnableJpaRepositories(basePackages = "com.app.dao")
@EntityScan( basePackages = {"com.app.model"} )
@PropertySource("classpath:database-int-test.properties")
@EnableAutoConfiguration
public class AppConfigIntegrationTestEnv {
}
