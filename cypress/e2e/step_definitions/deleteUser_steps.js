import '../../support/commands'
import DashboardPage from '../pages/DashboardPage';
import usersListingPage from '../pages/usersListingPage';
var cheaders;
var createdUsername;
Then('I create temp user with data from {string}', (jsonFile) => {
    cy.fixture("commonHedaers.json").then((header) => {
        cheaders = header.headers
    }).then(() => {
        cy.fixture("DeleteUser/" + jsonFile).then((user) => {
            cy.log(user)
            const seconds = new Date().getSeconds().toString()
            user.addUser.username = user.addUser.username+seconds
            cy.log("---------------")
            cy.log(user.addUser.username)
            cy.request(
                {
                    url: "web/index.php/api/v2/admin/users",
                    method: "POST",
                    body: user.addUser,
                    headers: cheaders
                }
            ).then((response)=>{
                createdUsername = response.body.data.userName
            })
        })
    })

})

Then("I seacrh for username with created username",()=>{
    cy.visitDashBoardAndHandleUsersInterception()
    usersListingPage.searchByUserName(createdUsername)
    cy.clickOnSubmitButton()
})

Then("I delete created user",()=>{
    usersListingPage.clickOnDeleteIcon()
    usersListingPage.clickOnConfirmDeleteButton()
    cy.handleUsersListingAPI()

})
Then("I verify that the user is deleted",()=>{
    usersListingPage.searchByUserName(createdUsername)
    cy.clickOnSubmitButton()
    usersListingPage.getNoResultFoundMessage("No Records Found")
})