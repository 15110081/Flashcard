package english.online.core.utils;

import english.online.core.dto.RoleDTO;
import english.online.core.persistence.entity.RoleEntity;

public class RoleBeanUtils {
    public static RoleDTO entity2DTO(RoleEntity entity) {
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setRoleId(entity.getRoleId());
        roleDTO.setName(entity.getName());
        return roleDTO;
    }

    public static RoleEntity dto2Entity(RoleDTO dto) {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setRoleId(dto.getRoleId());
        roleEntity.setName(dto.getName());
        return roleEntity;
    }
}
