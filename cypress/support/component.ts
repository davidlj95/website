import './cypress.d'
import './commands'

// Cypress code coverage
import '@cypress/code-coverage/support'

// Mount alias
import { mount } from 'cypress/angular'
// https://youtrack.jetbrains.com/issue/AQUA-3130/
// noinspection CypressCommandWithoutDeclaration
Cypress.Commands.add('mount', mount)
