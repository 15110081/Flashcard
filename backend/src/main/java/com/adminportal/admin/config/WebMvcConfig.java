package com.adminportal.admin.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

//@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.adminportal.admin")
public class WebMvcConfig extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
        registry.addResourceHandler("file:/images/**").addResourceLocations(
                "/resources/static/uploads/");
        registry.addResourceHandler("/css/**").addResourceLocations(
                "/resources/css/");
        registry.addResourceHandler("/js/**").addResourceLocations(
                "/resources/js/");
    }
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer)
    {
        configurer.enable();
    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/swagger-ui.html");
    }
}
