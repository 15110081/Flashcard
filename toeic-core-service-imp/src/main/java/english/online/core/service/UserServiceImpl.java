package english.online.core.service;

import daoimpl.UserDaoImpl;
import english.online.core.dao.UserDao;
import english.online.core.dto.UserDTO;
import english.online.core.persistence.entity.UserEntity;
import english.online.core.utils.UserBeanUtils;

public class UserServiceImpl implements UserService {

    public UserDTO isUserExist(UserDTO dto) {
        UserDao userDao=new UserDaoImpl();
        UserEntity entity=userDao.isUserExist(dto.getName(),dto.getPassword());
        return UserBeanUtils.entity2Dto(entity);
    }

    public UserDTO findRoleByUser(UserDTO dto) {
        UserDao userDao=new UserDaoImpl();
        UserEntity entity=userDao.findRoleByUser(dto.getName(),dto.getPassword());
        return UserBeanUtils.entity2Dto(entity);
    }
}
