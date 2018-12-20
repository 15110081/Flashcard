package com.adminportal.admin;

import com.adminportal.admin.entity.User;
import com.adminportal.admin.security.Role;
import com.adminportal.admin.security.UserRole;
import com.adminportal.admin.service.UserService;
import com.adminportal.admin.util.SecurityUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Executor;

@SpringBootApplication
@EnableAsync
public class AdminApplication   {
//   extends SpringBootServletInitializer implements CommandLineRunner
    @Autowired
    private UserService userService;
    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }

//    @Override
//    public void run(String... args) throws Exception {
//        User user1 = new User();
//        user1.setUsername("admin");
//        user1.setPassword(SecurityUtility.passwordEncoder().encode("admin"));
//        user1.setEmail("admin@gmail.com");
//        Set<UserRole> userRoles = new HashSet<>();
//        Role role1= new Role();
//        role1.setRoleId(0);
//        role1.setName("ROLE_ADMIN");
//        userRoles.add(new UserRole(user1, role1));
//
//        userService.createUser(user1, userRoles);
//    }
}
