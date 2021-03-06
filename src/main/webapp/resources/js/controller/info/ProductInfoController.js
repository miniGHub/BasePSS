var mWinProductInfoManager = null;
var mGridProductInfoManager = null;
Ext.define('AppIndex.controller.info.ProductInfoController',{
    extend:'Ext.app.ViewController',
    alias:'controller.product_info_view',
    requires:[
        'AppIndex.view.info.ProductInfoViewWindowAdd',
        'AppIndex.view.info.ProductInfoViewWindowEdit'
    ],
    control:{},
    routes:{},

    // private methods
    loadGrid:function(){
        mGridProductInfoManager = this.getView().down('app_product_info_view_grid');
    },
    closeWin: function (){
        if (mWinProductInfoManager) {
            mWinProductInfoManager.close();
            mWinProductInfoManager = null;
        }
    },
    refreshGridData: function(page) {
        if (mGridProductInfoManager == null) {
            return;
        }

        // refresh grid data
        var store = mGridProductInfoManager.getStore();
        store.proxy.extraParams.isReqDB = true;
        store.currentPage = page;
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                // reset param isReqDB
                store.proxy.extraParams.isReqDB = false;
            }
        });
    },
    // event methods
    onClickAdd : function () {
        console.log("info product onClickAdd");

        this.loadGrid();
        Ext.create('AppIndex.store.info.GetProductInfoNewIdStore').load({
            scope:this,
            callback: function (records, operation, success) {
                console.log('load callback');

                var ret = COMMON_FUNC.StoreCallbackDialog(records, success);
                if (ret) {
                    // transfer success
                    var newId = records[0].data.product_id;
                    this.closeWin();
                    mWinProductInfoManager = Ext.create({
                        xtype: 'app_product_info_view_window_add'
                    });
                    var winForm = mWinProductInfoManager.down('form').getForm();
                    winForm.findField('product_id').setValue(newId);
                    mWinProductInfoManager.show();
                } else {
                    console.log("StoreCallbackDialog error!");
                }
            }
        });
    },
    onClickEdit : function () {
        console.log("onClickEdit");

        this.loadGrid();
        var record = mGridProductInfoManager.getSelectionModel().getSelection();

        if (0 == record.length) {
            Ext.MessageBox.show({
                title: 'INFO',
                msg: '请选择一行数据进行编辑',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }

        if (record.length >  1) {
            Ext.MessageBox.show({
                title: 'INFO',
                msg: '只能选择一行数据进行编辑',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }

        this.closeWin();
        mWinProductInfoManager = Ext.create({
            xtype: 'app_product_info_view_window_edit'
        });

        var winForm = mWinProductInfoManager.down('form').getForm();
        winForm.findField('product_id').setValue(record[0].data['product_id']);
        winForm.findField('product_type_name').setValue(record[0].data['product_type']);
        winForm.findField('product_name').setValue(record[0].data['product_name']);
        winForm.findField('barcode').setValue(record[0].data['barcode']);
        winForm.findField('state').setValue(record[0].data['state']);
        mWinProductInfoManager.show();
    },
    onClickDelete : function () {
        console.log("onClickDelete");

        this.loadGrid();
        var record = mGridProductInfoManager.getSelectionModel().getSelection();

        if (0 == record.length) {
            Ext.MessageBox.show({
                title: 'INFO',
                msg: '请选择数据进行删除',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }

        Ext.Msg.confirm('系统提示','确定要删除？', this.onClickConfirmDelete, this);
    },
    onClickRefresh : function () {
        console.log("onClickRefresh");
        this.loadGrid();
        this.refreshGridData(1);
    },
    onClickAddSave : function () {
        console.log("onClickAddSave");

        var winForm = mWinProductInfoManager.down('form').getForm();
        var winFormData = winForm.getValues();
        // console.log('winFormData:' + Ext.encode(winFormData));

        var sendParam= {
            product_id: winFormData['product_id'],
            product_type: winFormData['product_type_name'],
            product_name: winFormData['product_name'],
            barcode: winFormData['barcode'],
            state: winFormData['state']
        };

        console.log('sendParam:' + Ext.encode(sendParam));

        var sendStore = Ext.create('AppIndex.store.common.SendStore');
        sendStore.proxy.url += 'info/AddProductInfo';
        sendStore.proxy.extraParams = sendParam;

        sendStore.load({
            scope: this,
            callback: function (records, operation, success) {
                console.log('load callback');

                var ret = COMMON_FUNC.StoreCallbackDialog(records, success);
                if (ret) {
                    // transfer success
                    this.addSaveCallback(records, operation);
                } else {
                    console.log("StoreCallbackDialog error!");
                }
            }
        });

        this.closeWin();
    },
    onClickAddCancel : function () {
        console.log("onClickAddCancel");
        this.closeWin();
    },
    onClickEditSave : function () {
        console.log("onClickEditSave");

        var winForm = mWinProductInfoManager.down('form').getForm();
        var winFormData = winForm.getValues();
        // console.log('winFormData:' + Ext.encode(winFormData));

        var sendParam= {
            product_id: winFormData['product_id'],
            product_type: winFormData['product_type_name'],
            product_name: winFormData['product_name'],
            barcode: winFormData['barcode'],
            state: winFormData['state']
        };

        console.log('sendParam:' + Ext.encode(sendParam));

        var sendStore = Ext.create('AppIndex.store.common.SendStore');
        sendStore.proxy.url += 'info/UpdateProductInfo';
        sendStore.proxy.extraParams = sendParam;

        sendStore.load({
            scope: this,
            callback: function (records, operation, success) {
                console.log('load callback');

                var ret = COMMON_FUNC.StoreCallbackDialog(records, success);
                if (ret) {
                    // transfer success
                    this.editSaveCallback(records, operation);
                } else {
                    console.log("StoreCallbackDialog error!");
                }
            }
        });
        this.closeWin();
    },
    onClickEditCancel : function () {
        console.log("onClickEditCancel");
        this.closeWin();
    },
    onClickConfirmDelete : function (btn) {
        console.log('onClickConfirmDelete');

        if(btn=='yes'){
            var record = mGridProductInfoManager.getSelectionModel().getSelection();
            var listId = [];

            for (var i = 0; i < record.length; i++) {
                var data = {
                    product_id: record[i].data['product_id']
                };
                listId.push(data);
            }

            var sendParam = {
                grid: listId
            };
            console.log('sendParam:' + Ext.encode(sendParam));

            var sendStore = Ext.create('AppIndex.store.common.SendStore');
            sendStore.proxy.url += 'info/DeleteProductInfo';
            sendStore.proxy.extraParams = sendParam;

            sendStore.load({
                scope: this,
                callback: function (records, operation, success) {
                    console.log('load callback');

                    var ret = COMMON_FUNC.StoreCallbackDialog(records, success);
                    if (ret) {
                        // transfer success
                        this.deleteSaveCallback(records, operation);
                    } else {
                        console.log("StoreCallbackDialog error!");
                    }
                }
            });
        }
    },
    // callback
    addSaveCallback: function (records, operation) {
        console.log('add save callback');

        var code = records[0].data.code;
        switch (code) {
            case -1:
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: '数据异常',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
                break;
            case 0:
                Ext.MessageBox.show({
                    title: 'Warning',
                    msg: '新郑商品信息失败,商品信息已经存在!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                break;
            case 3:
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: '新增商品信息成功!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                this.refreshGridData(mGridProductInfoManager.getStore().currentPage);
                break;
            case 4:
                Ext.MessageBox.show({
                    title: 'Warning',
                    msg: '新增商品信息失败,数据异常!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                break;
        }
    },
    editSaveCallback: function (records, operation) {
        console.log('edit save callback');

        var code = records[0].data.code;
        switch (code) {
            case -1:
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: '数据异常',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
                break;
            case 1:
                Ext.MessageBox.show({
                    title: 'Warning',
                    msg: '编辑商品信息失败,商品信息不存在!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                break;
            case 5:
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: '编辑商品信息成功!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                this.refreshGridData(mGridProductInfoManager.getStore().currentPage);
                break;
            case 6:
                Ext.MessageBox.show({
                    title: 'Warning',
                    msg: '编辑商品信息失败,数据异常!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                break;
        }
    },
    deleteSaveCallback: function (records, operation) {
        console.log('delete save callback');

        var code = records[0].data.code;
        switch (code) {
            case -1:
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: '数据异常',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
                break;
            case 7:
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: '删除商品信息成功!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                this.refreshGridData(mGridProductInfoManager.getStore().currentPage);
                break;
            case 8:
                Ext.MessageBox.show({
                    title: 'Warning',
                    msg: '删除商品信息失败,数据异常!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                break;
        }
    }
});