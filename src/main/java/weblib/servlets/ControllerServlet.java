package weblib.servlets;


import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;


public class ControllerServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        System.out.println("message: " + request.getParameter("msg"));
        List<Result> results = (List<Result>) getServletContext().getAttribute("result-row");
        if (results != null && request.getParameter("msg") != null) {
            results.clear();
            getServletContext().setAttribute("result-row", results);
            return;
        }
        if (request.getParameter("x_value") != null && request.getParameter("y_value") != null && request.getParameter("radius") != null) {
            request.getServletContext().getRequestDispatcher("/areaCheck").forward(request, response);
        } else {
            response.sendError(400);
        }
    }
}