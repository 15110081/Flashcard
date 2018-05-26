package english.online.command;

import english.online.core.dto.UserDTO;
import english.online.core.web.command.AbstractCommand;

public class UserCommand extends AbstractCommand<UserDTO> {
    public UserCommand(){
        this.pojo=new UserDTO();
    }
}
