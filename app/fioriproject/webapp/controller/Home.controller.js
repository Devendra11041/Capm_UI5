sap.ui.define([
    "./Basecontroller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Token",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Token,JSONModel,MessageBox) {
        "use strict";

        return Controller.extend("com.app.fioriproject.controller.Home", {
            onInit: function () {
                var oView = this.getView();

                var oMultiInput1 = oView.byId("idFNameFilterValue");
                oMultiInput1.addValidator(function (args) {
                    if (true) {
                        var text = args.text;

                        return new Token({ key: text, text: text });
                    }
                });
                var oMultiInput2 = oView.byId("idLNameFilterValue");
                oMultiInput2.addValidator(function (args) {
                    if (true) {
                        var text = args.text;

                        return new Token({ key: text, text: text });
                    }
                });
                var oMultiInput3 = oView.byId("idEmailFilterValue");
                oMultiInput3.addValidator(function (args) {
                    if (true) {
                        var text = args.text;

                        return new Token({ key: text, text: text });
                    }
                });
                var oMultiInput4 = oView.byId("iPhoneFilterValue");
                oMultiInput4.addValidator(function (args) {
                    if (true) {
                        var text = args.text;

                        return new Token({ key: text, text: text });
                    }
                });
                const oLocalModel = new JSONModel({
                    fName: "",
                    lName: "",
                    gender: "",
                    DOB: "",
                    contractStarted: "",
                    email: "",
                    phone: ""
                });
                this.getView().setModel(oLocalModel, "localModel");
                this.getRouter().attachRoutePatternMatched(this.onEmployeeListLoad, this);
            },
            onEmployeeListLoad: function () {
                this.getView().byId("idEmployeeTable").getBinding("items").refresh();

            },
            onGoPress: function () {
                const oView = this.getView(),
                    oFirstNameFilter = oView.byId("idFNameFilterValue"),
                    sFirstName = oFirstNameFilter.getTokens(),

                    oLastNameFilter = oView.byId("idLNameFilterValue"),
                    sLastName = oLastNameFilter.getTokens(),

                    oEmailFilter = oView.byId("idEmailFilterValue"),
                    semailid = oEmailFilter.getTokens(),

                    ophoneFilter = oView.byId("iPhoneFilterValue"),
                    sphonNo = ophoneFilter.getTokens(),

                    oTable = oView.byId("idEmployeeTable"),
                    aFilters = [];
                sFirstName.filter((element) => {
                    element ? aFilters.push(new Filter("fName", FilterOperator.EQ, element.getKey())) : "";
                }),
                    sLastName.filter((element1) => {
                        element1 ? aFilters.push(new Filter("lName", FilterOperator.EQ, element1.getKey())) : ""
                    }),
                    semailid.filter((element2) => {
                        element2 ? aFilters.push(new Filter("email", FilterOperator.EQ, element2.getKey())) : "";
                    }),
                    sphonNo.filter((element3) => {
                        element3 ? aFilters.push(new Filter("phone", FilterOperator.EQ, element3.getKey())) : "";
                    });
                oTable.getBinding("items").filter(aFilters);
            },
            onClearFilterPress: function () {
                const oview = this.getView(),
                    FirstName = oview.byId("idFNameFilterValue").removeAllTokens(),
                    LastName = oview.byId("idLNameFilterValue").removeAllTokens(),
                    Email = oview.byId("idEmailFilterValue").removeAllTokens(),
                    Phone = oview.byId("iPhoneFilterValue").removeAllTokens()
            },
            // // oNrefresh: function () {
            // //     location.reload();
            // },
            onSelectEmployee: function (oEvent) {
                const {ID,fName} = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetails", {
                    empId: ID,
                    empName: fName
                })
            },
            onCreateBtnPress: async function () {
                if (!this.oCreateEmployeeDialog) {
                    this.oCreateEmployeeDialog = await this.loadFragment("CreateEmployeeDialog")
                }
                this.oCreateEmployeeDialog.open();
            },

            onCloseDialog: function () {
                if (this.oCreateEmployeeDialog.isOpen()) {
                    this.oCreateEmployeeDialog.close()
                }
            },
            onCreateEmployee: async function () {
                const oPayload = this.getView().getModel("localModel").getProperty("/"),
                    oModel = this.getView().getModel("ModelV2");
                    debugger;
                try {
                    await this.createData(oModel, oPayload, "/Employee");
                    this.getView().byId("idEmployeeTable").getBinding("items").refresh();
                    this.oCreateEmployeeDialog.close();
                 }
               catch (error) {
                    this.oCreateEmployeeDialog.close();
                    MessageBox.error("Some technical Issue");
                }
            }
        });
    });
