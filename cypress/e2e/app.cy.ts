describe('Navigation', () => {
  
  it('Login Test', () => {
    cy.visit('http://localhost:3000/')

    cy.intercept('POST', '*')
    .as('getLoginInfo');  
    cy.get('input[name="username"]').eq(0).type('demo')
    cy.get('input[name="password"]').eq(0).type('mydem0')
    cy.get('input[name="btn_login"]').click()
    .wait('@getLoginInfo', { timeout: 20000 })
    .then((xhr) => {
      cy.log(JSON.stringify(xhr.response.body))
    })

    cy.intercept('GET', '*')
      .as('getResetPass');  
    cy.get('a[id="btn_forgot"]').click()
    cy.get('button[id="btn_reset"]').click()
    .wait('@getResetPass', { timeout: 20000 })
    .then((xhr) => {
      cy.log(JSON.stringify(xhr.response.body))
    })
  })
})


