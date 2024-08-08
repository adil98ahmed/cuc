import {And} from 'cypress-cucumber-preprocessor/steps'
import DashboardPage from '../pages/DashboardPage'
import'../step_definitions/login_steps'
import '../../support/commands'
import UserListingPage from '../pages/usersListingPage'

let username;
function visitDashBoardAndHandleUsersInterception(){
    DashboardPage.clickOnAdminTab()
    cy.intercept(
        "GET",
        "/web/index.php/api/v2/admin/users?*"
    ).as("allUsers")
    cy.wait("@allUsers",{requestTimeout:15000})
}



Then("I seacrh for username {string}",(usernameSearch)=>{
    visitDashBoardAndHandleUsersInterception()
    UserListingPage.searchByUserName(usernameSearch)
    cy.clickOnSubmitButton()
})

Then("I seacrh for user with role {string}",function(role){
    visitDashBoardAndHandleUsersInterception()
    UserListingPage.searchByUserRole(role)
    cy.clickOnSubmitButton()
})

Then('I search for user with employee name {string}', (empName) => {
    visitDashBoardAndHandleUsersInterception()
    cy.intercept(
        "GET",
        "web/index.php/api/v2/pim/employees?*",
    ).as("searchForEmployee")
    UserListingPage.searchByEmployeeName(empName)
    cy.wait("@searchForEmployee",{requestTimeout:15000})
    UserListingPage.chooseEmplyee()
    cy.clickOnSubmitButton()
})

Then("I search for user with status {string}",(statu)=>{
    visitDashBoardAndHandleUsersInterception()
    UserListingPage.searchWithStatus(statu)
    cy.clickOnSubmitButton()
})

Then("I verify That table of users have {string}",(usernameSearch)=>{
    username = usernameSearch;
    cy.wait("@allUsers",{requestTimeout:15000})
    UserListingPage.searchForUserNameInTable(usernameSearch)
})

 Then("I verify That {string} message is displayed",function(noRecordsMessage){
    cy.wait("@allUsers",{requestTimeout:15000})
    UserListingPage.getNoResultFoundMessage(noRecordsMessage)
 })
Then("I verify That role section in users table have role {string}", function(role){
    cy.wait("@allUsers",{requestTimeout:15000})
    UserListingPage.searchForUserRoleInTable(role)
})

Then('I verify that employee name is displayed in table', () => {
  cy.wait("@allUsers")
  UserListingPage.searhForUserWithSelectedEmployeeName()
})

Then("I verify that {string} is displayed in table",(statu)=>{
    cy.wait("@allUsers")
    UserListingPage.searchForUserWithStatus(statu)
})



