package english.online.controller.admin;

import english.online.command.ListenGuidelineCommand;
import english.online.core.dto.ListenGuidelineDTO;
import english.online.core.web.common.WebConstant;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/admin-guideline-listen-list.html")
public class ListenGuidelineController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ListenGuidelineCommand command=new ListenGuidelineCommand();
        List<ListenGuidelineDTO> listenGuidelineDTOS=new ArrayList<ListenGuidelineDTO>();
        ListenGuidelineDTO dto1=new ListenGuidelineDTO();
        dto1.setTitle("Bai hd nghe 1");
        dto1.setContent("Noi dung bai hd nghe 1");
        ListenGuidelineDTO dto2=new ListenGuidelineDTO();
        dto2.setTitle("Bai hd nghe 2");
        dto2.setContent("Noi dung bai hd nghe 2");
        listenGuidelineDTOS.add(dto1);
        listenGuidelineDTOS.add(dto2);
        command.setListResult(listenGuidelineDTOS);
        command.setMaxPageItems(1);
        command.setTotalItems(listenGuidelineDTOS.size());
        req.setAttribute(WebConstant.LIST_ITEMS,command);
        RequestDispatcher rd=req.getRequestDispatcher("/views/admin/listenguideline/list.jsp");
        rd.forward(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
