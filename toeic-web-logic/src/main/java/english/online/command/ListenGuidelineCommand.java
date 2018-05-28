package english.online.command;

import english.online.core.dto.ListenGuidelineDTO;
import english.online.core.web.command.AbstractCommand;

public class ListenGuidelineCommand extends AbstractCommand<ListenGuidelineDTO> {
    public  ListenGuidelineCommand(){
        this.pojo=new ListenGuidelineDTO();
    }
}
