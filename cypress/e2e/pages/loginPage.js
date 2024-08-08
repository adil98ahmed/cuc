class Login{
    USERNAME_FIELD = ()=> cy.get('input[name = "username"]')
    PASSWORD_FIELD = ()=> cy.get('input[name = "password"]')
    constructor(){
    }
    fillUserName(userName){
        this.USERNAME_FIELD().type(userName)
    }
    fillPassword(password){
        this.PASSWORD_FIELD().type(password)
    }
    clickOnLoginButton(){
        cy.clickOnSubmitButton()
    }
}
export default new Login()