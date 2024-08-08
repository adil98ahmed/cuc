import Login from '../pages/loginPage'
import '../../support/commands'


Given("I login to website with {string} and {string}",function (username, password){
    cy.visit("/");
    Login.fillUserName(username)
    Login.fillPassword(password)
    Login.clickOnLoginButton()
})

Given("I login with invalid cred {string} and {string}", function (username, password) {
    cy.visit("/")
    Login.fillUserName(username)
    Login.fillPassword(password)
    Login.clickOnLoginButton()
})

Then("I verify that user is redirected to home screen", () => {
    cy.assertionOfLogginSuccess()
})

Then("I verify that Error message {string} is displayed {int}", (errorMessage) => {
    cy.assertionOfDisplayErrorMessageForInvalidCred(errorMessage)
})
