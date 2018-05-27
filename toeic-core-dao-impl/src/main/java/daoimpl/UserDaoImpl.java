package daoimpl;

import english.online.core.common.utils.HibernateUtil;
import english.online.core.dao.UserDao;
import english.online.core.data.daoimpl.AbstractDao;
import english.online.core.persistence.entity.UserEntity;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.management.Query;

public class UserDaoImpl extends AbstractDao<Integer, UserEntity> implements UserDao {
    public UserEntity isUserExist(String name, String password) {
        UserEntity entity = new UserEntity();
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        try {
            StringBuilder sql = new StringBuilder("FROM UserEntity WHERE name= :name AND password= :password");
            //sql.append(this.getPersistenceClassName());
            org.hibernate.query.Query query = session.createQuery(sql.toString());
            query.setParameter("name", name);
            query.setParameter("password", password);
            entity = (UserEntity) query.uniqueResult();
            transaction.commit();
        } catch (HibernateException e) {
            transaction.rollback();
            throw e;
        } finally {
            session.close();
        }
        return entity;
    }

    public UserEntity findRoleByUser(String name, String password) {
        UserEntity entity = new UserEntity();
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        try {
            StringBuilder sql = new StringBuilder("FROM UserEntity WHERE name= :name AND password= :password");
            //sql.append(this.getPersistenceClassName());
            org.hibernate.query.Query query = session.createQuery(sql.toString());
            query.setParameter("name", name);
            query.setParameter("password", password);
            entity = (UserEntity) query.uniqueResult();
            transaction.commit();
        } catch (HibernateException e) {
            transaction.rollback();
            throw e;
        } finally {
            session.close();
        }
        return entity;
    }
}
