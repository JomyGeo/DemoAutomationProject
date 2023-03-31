/// <reference types = "Cypress" />
/// <reference types = "Cypress-iframe"/>
import 'cypress-iframe'

//import '../../../support/_commands'
import { Given, When, Then , And } from "@badeball/cypress-cucumber-preprocessor";
import { before, after , beforeEach ,afterEach } from "mocha";


import helper from '../../../support/Helper/helper'


const help = new helper



Given ('Navigate to the Demo form', function(){
        cy.visit('https://demoqa.com/automation-practice-form')
        Cypress.on('uncaught:exception', (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test
          return false
        })
})

When ('Fill details of Adam', function(){
    cy.get('[id="firstName"]').type('Adam')
    cy.get('[id="lastName"]').type('John')
    cy.get('[id="userEmail"]').type('adam.john@example.com')
})

When ('Fill details of John', function(){
  cy.get('[id="firstName"]').type('John')
  cy.get('[id="lastName"]').type('Doe')
  cy.get('[id="userEmail"]').type('john.doe@example.com')
})

When ('Fill details of Jacob', function(){
  cy.get('[id="firstName"]').type('Jacob')
  cy.get('[id="lastName"]').type('Doe')
  cy.get('[id="userEmail"]').type('Jacob.doe@example.com')
})

Given ('Navigate to saucedemo login page', function(){
  cy.visit('https://www.saucedemo.com/')
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
})


Given ('Enter invalid credentials', function(){
  
  cy.get('[id="user-name"]').type('abc')
  cy.get('[id="password"]').type('abc')
  cy.get('[id="login-button"]').click()
})

Given ('Enter locked user credentials', function(){
  
  cy.get('[id="user-name"]').type('locked_out_user')
  cy.get('[id="password"]').type('secret_sauce')
  cy.get('[id="login-button"]').click()
})

Given ('Enter valid credentials and login into the application', function(){
  
  cy.get('[id="user-name"]').type('standard_user')
  cy.get('[id="password"]').type('secret_sauce')
  cy.get('[id="login-button"]').click()
})



Given ('Navigate to OrangeHRM login page', function(){
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
})

Given ('Enter invalid HRM credentials', function(){
  
  cy.get('[name="username"]').type('abc')
  cy.get('[name="password"]').type('abc')
  cy.get('[type="submit"]').click()
})

Given ('Enter valid HRM credentials and login into the application', function(){
  
  cy.get('[name="username"]').type('Admin')
  cy.get('[name="password"]').type('admin123')
  cy.get('[type="submit"]').click()
})