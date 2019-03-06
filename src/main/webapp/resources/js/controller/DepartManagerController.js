Ext.define('AppIndex.controller.DepartManagerController',{
    extend:'Ext.app.ViewController',
    alias:'controller.depart_manager_view',
    requires:[],
    control:{},
    routes:{},

    onClickAdd : function () {
        console.log("onClickAdd");
        var grid = this.getView().down('app_depart_manager_view_grid');
        var store = grid.getStore();
        var max = 0;
        Ext.each(store.getRange(0, store.getCount()), function(record) {
            if (max < parseInt(record.data['role_id'])) {
                max = record.data['role_id'];
            }
        });
        // new line id
        max += 1;
        var line = {
            'role_id' : max,
            'role_name' : ''
        };
        store.insert(max, line);
    },
    onClickDelete : function () {
        console.log("onClickDelete");
        var grid = this.getView().down('app_depart_manager_view_grid');
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
        var store = this.getView().down('app_depart_manager_view_grid').getStore();
        var gridData = [];
        Ext.each(store.getRange(0, store.getCount()), function(record) {
            console.log('gridData:'+ Ext.encode(record.data));
            // delete value which key is 'id'
            delete record.data['id'];
            // continue
            if (0 == record.data['depart_name'].length) {
                return true;
            }
            gridData.push(record.data);
        });
        // console.log('gridData:'+ Ext.encode(gridData));

        // send parameters
        var sendParam ={
            grid: gridData
        };

        var sendStore = Ext.create('AppIndex.store.SendStore');
        sendStore.proxy.url += 'dic/SubmitDepartManager';
        sendStore.proxy.extraParams =  sendParam;
        // console.log(sendStore.proxy.url);
        sendStore.load({
            scope:this,
            callback: function (records, operation, success) {
                console.log('load callback');

                if (!success) {
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: '数据传输异常',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else if (records.length <= 0) {
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: '数据异常',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                } else {
                    // transfer success
                    this.roleManagerCallback(records, operation);
                }
            }
        });
    },
    onClickRefresh : function () {
        console.log("onClickRefresh");

        // grid data
        var store = this.getView().down('app_depart_manager_view_grid').getStore();
        store.reload();
    },
    roleManagerCallback: function (records, operation) {
        console.log('depart manager callback');

    }
});