package english.online.api.test;

import daoimpl.ListenGuidelineDaoImpl;
import english.online.core.dao.ListenGuidelineDao;
import org.testng.annotations.Test;

public class ListenGuidelineTest {
    @Test
    public  void testFindByPropertites(){
        ListenGuidelineDao listenGuidelineDao=new ListenGuidelineDaoImpl();
        Object[] result=listenGuidelineDao.findByProperty(null,null,null,null,2,2);

    }
}
