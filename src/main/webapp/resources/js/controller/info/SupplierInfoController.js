Ext.define('AppIndex.controller.info.SupplierInfoController',{
    extend:'Ext.app.ViewController',
    alias:'controller.supplier_info_view',
    requires:[],
    control:{},
    routes:{},

    onClickAdd : function () {
        console.log("onClickAdd");
        var grid = this.getView().down('app_supplier_info_view_grid');
        var store = grid.getStore();
        var max = 0;
        Ext.each(store.getRange(0, store.getCount()), function(record) {
            if (max < parseInt(record.data['supplier_id'])) {
                max = record.data['supplier_id'];
            }
        });
        // new line id
        max += 1;
        var line = {
            'supplier_id' : max,
            'supplier_name' : '',
            'manager' : '',
            'phone' : ''
        };
        store.insert(max, line);
    },
    onClickDelete : function () {
        console.log("onClickDelete");
        var grid = this.getView().down('app_supplier_info_view_grid');
        var store = grid.getStore();

        Ext.Msg.confirm('系统提示','确定要删除？',function(btn){
            if(btn=='yes'){
                var record = grid.getSelectionModel().getSelection()[0];
                store.remove(record);
            }
        });
    },
    onClickSave : function () {
        console.log("onClickSave");

        // grid data
        var store = this.getView().down('app_supplier_info_view_grid').getStore();
        var gridData = [];
        Ext.each(store.getRange(0, store.getCount()), function(record) {
            console.log('gridData:'+ Ext.encode(record.data));
            // delete value which key is 'id'
            delete record.data['id'];
            // continue
            if (0 == record.data['supplier_name'].length &&
                0 == record.data['manager'].length &&
                0 == record.data['phone'].length) {
                return true;
            }
            gridData.push(record.data);
        });
        // console.log('gridData:'+ Ext.encode(gridData));

        // send parameters
        var sendParam ={
            grid: gridData
        };

        var sendStore = Ext.create('AppIndex.store.common.SendStore');
        sendStore.proxy.url += 'info/SubmitSupplierManager';
        sendStore.proxy.extraParams =  sendParam;
        // console.log(sendStore.proxy.url);
        sendStore.load({
            scope:this,
            callback: function (records, operation, success) {
                console.log('load callback');

                var ret = COMMON_FUNC.StoreCallbackDialog(records, success);
                if (ret) {
                    // transfer success
                    this.supplierManagerCallback(records, operation);
                } else {
                    console.log("StoreCallbackDialog error!");
                }
            }
        });
    },
    onClickRefresh : function () {
        console.log("onClickRefresh");

        // refresh grid data
        var store = this.getView().down('app_supplier_info_view_grid').getStore();

        store.reload();

    },
    supplierManagerCallback: function (records, operation) {
        console.log('supplier manager callback');

        var code = records[0].data.code;
        switch (code) {
            case -1:
                Ext.MessageBox.show({
                    title: 'Warn',
                    msg: '保存失败',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                break;
            case 0:
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: '保存成功',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                break;
            default:
                console.log('code undefined['+ code + ']');
                break;
        }
    }
});