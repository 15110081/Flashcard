package com.adminportal.admin.service;

import com.adminportal.admin.entity.User;
import com.adminportal.admin.security.UserRole;

import java.util.Set;


public interface UserService {
	User createUser(User user, Set<UserRole> userRoles) throws Exception;
	
	User save(User user);
}
