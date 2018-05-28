package english.online.core.dao;

import english.online.core.data.dao.GenericDao;
import english.online.core.persistence.entity.UserEntity;

public interface UserDao  extends GenericDao<Integer,UserEntity> {
    UserEntity findUserByUsernameAndPassword(String name, String password);
}
