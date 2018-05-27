package english.online.api.test;

import daoimpl.UserDaoImpl;
import english.online.core.dao.UserDao;
import english.online.core.persistence.entity.UserEntity;
import org.apache.log4j.Logger;
import org.testng.annotations.Test;


public class LoginTest {
    private  final Logger log=Logger.getLogger(this.getClass());
    @Test
    public void checkIsUserExist(){
        UserDao userDao=new UserDaoImpl();
        String name="admin";
        String password="123456";
        UserEntity entity=userDao.isUserExist(name,password);
        if(entity!=null){
            log.error("login success");
        }else{
            log.error("login fail");
        }
    }
    @Test
    public void checkFindRoleByUser(){
        UserDao userDao=new UserDaoImpl();
        String name="abc";
        String password="123456";
        UserEntity entity=userDao.findRoleByUser(name,password);

            log.error(entity.getUserId() +"-"+entity.getRoleEntity().getName());

    }
}
