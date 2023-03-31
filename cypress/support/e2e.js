// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './_commands'
require('cypress-mailosaur');


//require('cypress-failed-log')

/* module.exports = (on, config) => {
  require('cypress-mochawesome-reporter/plugin')(on);
}; */

// Reduce time delay for typing the words
Cypress.Keyboard.defaults({
  keystrokeDelay: 0,
})

// Alternatively you can use CommonJS syntax:
// require('./commands')

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })  

  Cypress.on('uncaught:exception', (err, runnable, promise) => {

    // if (err.message.includes("TypeError")) {
    //     return false
    // }
  
    if (err.name === 'TypeError') {
        return false
    }
  })
  
 

  afterEach(() => {
    //Code to Handle the Sesssions in cypress.
    //Keep the Session alive when you jump to another test
     let str = [];
    cy.getCookies().then((cook) => {
        cy.log(cook);
        for (let l = 0; l < cook.length; l++) {
            if (cook.length > 0 && l == 0) {
        str[l] = cook[l].name;
                Cypress.Cookies.preserveOnce(str[l]);
            } else if (cook.length > 1 && l > 1) {
                str[l] = cook[l].name;
                Cypress.Cookies.preserveOnce(str[l]);
            }
        }
   }) 
   cy.window().then(win => {
		// window.gc is enabled with --js-flags=--expose-gc chrome flag
		if (typeof win.gc === 'function') {
			// run gc multiple times in an attempt to force a major GC between tests
			win.gc();
			win.gc();
			win.gc();
			win.gc();
			win.gc();
		}
	});
})



