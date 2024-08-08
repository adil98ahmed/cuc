class DashboardPage{
    ADMIN_TAB = ()=> cy.get('.oxd-main-menu-item').contains("Admin")
    constructor(){} 
    clickOnAdminTab(){
        this.ADMIN_TAB().click()
    }
    

}
export default new DashboardPage()