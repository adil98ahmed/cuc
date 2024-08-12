// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import DashboardPage from '../e2e/pages/DashboardPage'
Cypress.Commands.add('clickOnSubmitButton',()=>{
    cy.get('[type = "submit"]').click()
})

Cypress.Commands.add('assertionOfLogginSuccess',()=>{
    cy.get('[alt="profile picture"]').first().should('be.visible')
})
Cypress.Commands.add('assertionOfDisplayErrorMessageForInvalidCred',(errorMessage)=>{
    cy.get('p').contains("Invalid credentials").should('be.exist')
})
Cypress.Commands.add("loginSuccessfuly",(username,passwrd)=>{
    cy.get('input[name = "username"]').type(username)
    cy.get('input[name = "password').type(passwrd)
    cy.clickOnSubmitButton()
})
Cypress.Commands.add("visitDashBoardAndHandleUsersInterception",()=>{
    DashboardPage.clickOnAdminTab()
    cy.handleUsersListingAPI()
})
Cypress.Commands.add("handleUsersListingAPI",()=>{
    cy.intercept(
        "GET",
        "/web/index.php/api/v2/admin/users?*"
    ).as("allUsers")
    cy.wait("@allUsers",{requestTimeout:15000})
})

