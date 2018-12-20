package com.adminportal.admin.respository;

import com.adminportal.admin.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
	User findByUsername(String username);

}
