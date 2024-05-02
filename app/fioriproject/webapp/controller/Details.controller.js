sap.ui.define(
    [
        "./Basecontroller",
        "sap/m/MessageBox",
        "sap/ui/model/odata/v2/ODataModel"
    ],
    function(BaseController,MessageBox,ODataMode) {
      "use strict";
  
      return BaseController.extend("com.app.fioriproject.controller.Details", {
        onInit: function()  {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onEmployeeDetailLoad, this); 
        },
        onEmployeeDetailLoad: function(oEvent ){

            const {empId} = oEvent.getParameter("arguments");
            this.ID=empId;
            const sRouterName = oEvent.getParameter("name");
            const oObjectPage = this.getView().byId("idEmployeeDetailsobjectpage");

            oObjectPage.bindElement(`/Employee(${empId})`, {
                expand: 'salary,address,department,designation'
            });
        },
        onDeleteEmployee: async function(){
          const oModel = this.getView().getModel("ModelV2");
         debugger;
          try {
            await this.deleteData(oModel,"/Employee",this.ID);
            this.getRouter().navTo("RouteHome");
          } catch (error) {
            MessageBox.error("Some Technical Issue");
          }
      }
      });
    }
  );
  