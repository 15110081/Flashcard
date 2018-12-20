package com.adminportal.admin.respository;

import com.adminportal.admin.security.Role;
import org.springframework.data.repository.CrudRepository;


public interface RoleRepository extends CrudRepository<Role, Long> {
	Role findByname(String name);
}
