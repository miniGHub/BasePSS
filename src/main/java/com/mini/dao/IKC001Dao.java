package com.mini.dao;

import com.mini.model.KC001;

import java.util.Map;

public interface IKC001Dao {
    KC001[] selectKC001(Map param);
    void updateKC001(KC001 one);
    void insertKC001(KC001 one);
    void deleteKC001(Map param);
    void addKC001Amount(Map param);
}
