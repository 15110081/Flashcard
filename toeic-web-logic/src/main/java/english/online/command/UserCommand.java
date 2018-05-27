package english.online.command;

import english.online.core.dto.UserDTO;
import english.online.core.web.command.AbstractCommand;

public class UserCommand extends AbstractCommand<UserDTO> {
    private String confirmPassword;

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public UserCommand(){
        this.pojo=new UserDTO();
    }
}
