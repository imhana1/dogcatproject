package com.example.ajax;

import jakarta.servlet.*;
import jakarta.servlet.http.*;

import java.io.*;



public class Axios extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.write("{\"status\":\"ok\",\"message\":\"응답 완료\"}");
        out.flush();
    }
}
