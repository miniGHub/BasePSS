package com.mini.service;

import com.mini.model.cg.CG002;

import java.util.List;

public interface ICG002Service {

    CG002[] selectCG002(String purchase_note_id);
    int deleteCG002(String purchase_note_id);
    int insertCG002(List<CG002> cg002list);
    int updateCG002(CG002 one);
}
