package english.online.core.service;

import daoimpl.ListenGuidelineDaoImpl;
import english.online.core.dao.ListenGuidelineDao;
import english.online.core.dto.ListenGuidelineDTO;
import english.online.core.persistence.entity.ListenGuidelineEntity;
import english.online.core.utils.ListenGuidelineBeanUtil;

import java.util.ArrayList;
import java.util.List;

public class ListenGuidelineServiceImpl implements ListenGuidelineService {
    private ListenGuidelineDao listenGuidelineDao=new ListenGuidelineDaoImpl();
    public Object[] findListenGuidelineByProperties(String property, Object value, String sortExpression, String sortDirection, Integer offset, Integer limit) {
        List<ListenGuidelineDTO> result=new ArrayList<ListenGuidelineDTO>();
        Object[] objects=listenGuidelineDao.findByProperty(property,value,sortExpression,sortDirection,offset,limit);
        for (ListenGuidelineEntity item: (List<ListenGuidelineEntity>)objects[1]) {
            ListenGuidelineDTO dto = ListenGuidelineBeanUtil.entity2Dto(item);
            result.add(dto);
        }
        objects[1] = result;
        return objects;
    }

}
