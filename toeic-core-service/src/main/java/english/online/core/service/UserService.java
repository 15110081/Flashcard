package english.online.core.service;



import english.online.core.dto.UserDTO;
import english.online.core.persistence.entity.UserEntity;

import java.util.List;
import java.util.Map;

/**
 * Created by Admin on 9/7/2017.
 */
public interface UserService {
//    Object[] findByProperty(Map<String, Object> property, String sortExpression, String sortDirection, Integer offset, Integer limit);
//    UserDTO findById(Integer userId);
//    void saveUser(UserDTO userDTO);
//    UserDTO updateUser(UserDTO userDTO);
    //CheckLogin checkLogin(String name, String password);
   // void validateImportUser(List<UserImportDTO> userImportDTOS);
    //void saveUserImport(List<UserImportDTO> userImportDTOS);
    UserDTO isUserExist(UserDTO dto);
    UserDTO findRoleByUser(UserDTO dto);
}
