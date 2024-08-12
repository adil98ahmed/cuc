class UserListingPage {
    USERNAME_SEARCH_TEXT_FIELD = () => cy.get("label").contains("Username").parent().parent().children().eq(1)
    USERNAME_CELL = () => cy.get('.oxd-table-card').children().eq(0).children().eq(1)
    USER_ROLE_DROPDOWN = () => cy.get(".oxd-input-group__label-wrapper").contains("User Role").parent().parent().children().last()
    STATUS_DROPDOWN = () => cy.get(".oxd-input-group__label-wrapper").contains("Status").parent().parent().children().last()
    USER_ROLE_VALUE = (val) => cy.get('[role = "listbox"]').children().contains(val)
    STATUS_VALUE = (val) => cy.get('[role = "listbox"]').children().contains(val)
    EMPLOYEE_NAME_VALUE = () => cy.get('[role = "listbox"]').children()
    NO_RECORDS_FOUND_MESSAGE = () => cy.get("span").contains("No Records Found")
    USER_ROLE_CELL = () => cy.get('.oxd-table-card')
    EMPLOYEE_NAME_CELL = () => cy.get('.oxd-table-card')
    SATATUS_CELL = () => cy.get('.oxd-table-card')
    EMPLOYEE_NAME_TEXT_FIELD = () => cy.get('[placeholder="Type for hints..."]')
    CONFIRM_DELETE_BUTTON = () => cy.get('.oxd-button--label-danger').contains('Delete')
    DELETE_BUTTON = () => cy.get('.bi-trash').parent()
    
    employeeName;
    constructor() { }

    searchByUserName(username) {
        this.USERNAME_SEARCH_TEXT_FIELD().type(username)
    }
   
    searchByUserRole(role) {
        this.USER_ROLE_DROPDOWN().click()
        this.USER_ROLE_VALUE(role).click()
    }
    searchByEmployeeName(empName){
        this.EMPLOYEE_NAME_TEXT_FIELD().type(empName)
    }
    chooseEmplyee(){
        this.EMPLOYEE_NAME_VALUE().then(e=>{
            this.employeeName = e.eq(0).text()
        })
        this.EMPLOYEE_NAME_VALUE().eq(0).click({force:true}) 
    }

    searchWithStatus(status){
        this.STATUS_DROPDOWN().click()
        this.STATUS_VALUE(status).click()
    }

    getNoResultFoundMessage(noRecordsMessage) {
        return this.NO_RECORDS_FOUND_MESSAGE().then(e => {
            expect(e.text()).to.eq(noRecordsMessage)
        })
    }
    
    searchForUserNameInTable(username) {
        this.USERNAME_CELL().then(e => {
            cy.log(e.text())
            expect(username).to.eq(e.text())
      
        })
    }

    searchForUserRoleInTable(role){
        this.USER_ROLE_CELL().then(elements =>{
            for(var i = 0 ; i < elements.length ; i++){
                cy.log("-------------------------")
                // cy.log(elements.children().eq(i).children().eq(2).text())
                cy.log(elements.length)
                cy.log(elements.children().eq(i).children().eq(2).text())
                expect(role).to.eq(elements.children().eq(i).children().eq(2).text())
            }
        })
    }

    searhForUserWithSelectedEmployeeName(){
        try {
            this.EMPLOYEE_NAME_CELL().then(elements=>{
                for(var i = 0 ; i< elements.length ;i++){
                    cy.log("-------------------------")
                    // cy.log(elements.children().eq(i).children().eq(2).text())
                    cy.log(elements.length)
                    cy.log(elements.children().eq(i).children().eq(3).text())
                    expect(this.employeeName.replaceAll(" ","")).to.eq(elements.children().eq(i).children().eq(3).text().replaceAll(" ",""))
                }
            })
        } catch (error) {
            cy.log("Element isn't existed")
        }
    }

    searchForUserWithStatus(status){
        try {
            this.SATATUS_CELL().then(elements=>{
                for(var i = 0 ; i< elements.length ;i++){
                    cy.log("-------------------------")
                    // cy.log(elements.children().eq(i).children().eq(2).text())
                    cy.log(elements.length)
                    cy.log(elements.children().eq(i).children().eq(4).text())
                    expect(status).to.eq(elements.children().eq(i).children().eq(4).text())
                }
            })
        } catch (error) {
            cy.log("Element isn't existed")
        }
    }
    clickOnDeleteIcon(){
            this.DELETE_BUTTON().click()
    }
    clickOnConfirmDeleteButton(){
        this.CONFIRM_DELETE_BUTTON().click()
    }

}
export default new UserListingPage()