package com.mini.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mini.model.CG002;
import com.mini.service.ICG002Service;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/cg002")
public class CG002Controller {

    @Resource
    private ICG002Service CG002Service;

    @RequestMapping("/showCG002.do")
    public void selectCG002(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        String purchase_note_id = request.getParameter("purchase_note_id");
        CG002[] cg002 = this.CG002Service.selectCG002(purchase_note_id);
        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(cg002));
        response.getWriter().close();
    }

    @RequestMapping("/deleteCG002.do")
    public void deleteCG002(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        String purchase_note_id = request.getParameter("purchase_note_id");
        this.CG002Service.deleteCG002(purchase_note_id);
//        ObjectMapper mapper = new ObjectMapper();
//        response.getWriter().write(mapper.writeValueAsString(cg001));
        response.getWriter().close();
    }

    @RequestMapping("/updateCG002.do")
    public void updateCG002(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        CG002 one = new CG002();
        one.setPurchase_note_id(request.getParameter("purchase_note_id"));
        this.CG002Service.updateCG002(one);
//        ...
//        ObjectMapper mapper = new ObjectMapper();
//        response.getWriter().write(mapper.writeValueAsString(cg001));
        response.getWriter().close();
    }

    @RequestMapping("/insertCG002.do")
    public void insertCG002(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        int amount = 3;
        CG002[] ones = new CG002[amount];
        for (CG002 item:ones) {
            // TODO: fix here
            item.setPurchase_note_id(request.getParameter("purchase_note_id"));
        }
        this.CG002Service.insertCG002(ones);
//        ObjectMapper mapper = new ObjectMapper();
//        response.getWriter().write(mapper.writeValueAsString(cg001));
        response.getWriter().close();
    }
}