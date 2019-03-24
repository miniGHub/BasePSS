package com.mini.service;

import com.mini.model.ProductInfoPage;
import com.mini.model.UserCode;
import com.mini.model.UserInfoPage;
import com.mini.model.info.INFO_PRODUCT;
import com.mini.model.info.INFO_SUPPLIER;
import com.mini.model.info.INFO_USER;
import com.mini.model.UserPasswordPage;

import java.util.ArrayList;

public interface IInfoService {
    UserCode Login(String id, String password);
    INFO_USER GetUserInfo(String id);
    ArrayList<UserInfoPage> GetAllUserInfo();
    ArrayList<UserInfoPage> GetAllUserInfoPage(int page, int start, int limit);
    int GetAllUserInfoSize();
    String GetNewId();
    UserCode AddUserInfo(INFO_USER userInfo);
    UserCode UpdateUserInfo(INFO_USER userInfo);
    UserCode DeleteUserInfo(ArrayList<String> listId);
    UserCode UpdatePassword(String id, String oldPassword, String newPassword);
    ArrayList<UserPasswordPage> GetAllUserPassword();
    ArrayList<UserPasswordPage> GetAllUserPasswordPage(int page, int start, int limit);
    int GetAllUserPasswordSize();
	
    UserCode ResetPassword(ArrayList<String> listId);
    boolean SaveSupplier(ArrayList<INFO_SUPPLIER> supplier);
    INFO_SUPPLIER GetSupplier(int supplier_id);
    ArrayList<INFO_SUPPLIER> GetAllSupplier();

    INFO_PRODUCT GetProductInfo(String product_id);
    ArrayList<ProductInfoPage> GetAllProductInfo();
    ArrayList<ProductInfoPage> GetAllProductInfoPage(int page, int start, int limit);
    int GetAllProductInfoSize();
    UserCode AddProductInfo(INFO_PRODUCT productInfo);
    UserCode UpdateProductInfo(INFO_PRODUCT productInfo);
    UserCode DeleteProductInfo(ArrayList<String> listId);
}
