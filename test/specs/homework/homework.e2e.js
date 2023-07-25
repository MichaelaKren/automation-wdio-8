// npm run wdio -- --suite homework

import { username, password, userFullName } from '../fixtures.js';

describe('Homework', async () => {

    beforeEach(async () => {    
        await browser.reloadSession();
        await browser.url('/registrace');
    });

    it('should open page and create screenshot', async () => {

        // sem vypracuj domácí úkol
        await browser.url('/registrace')
        await browser.saveScreenshot('screenshot.png')
        await browser.pause(5000);

    });

    it('should display registration form and check availability', async () => {

        const nameField = await $('#name');
        await expect(nameField).toBeDisplayed();
        await expect(nameField).toBeEnabled();

        const emailField = await $('#email');
        await expect(emailField).toBeDisplayed();
        await expect(emailField).toBeEnabled();

        const passwordField = await $('#password');
        await expect(passwordField).toBeDisplayed();
        await expect(passwordField).toBeEnabled();

        const correctPasswordSelector = await $('#password-confirm');
        await expect(correctPasswordSelector).toBeDisplayed();
        await expect(correctPasswordSelector).toBeEnabled();

        const submitButton = await $('.btn-primary');
        await expect(submitButton).toBeDisplayed();
        await expect(submitButton).toBeEnabled();

        await browser.pause(5000);

    });

    it('should process valid informations in registration form', async () => {

        const name = 'Michaela Křenková';
        const email = 'krenkova@seznam.cz';
        const password = 'Krenkova123456';

        const nameField = $('#name');
        await nameField.setValue(name);
        await expect(nameField).toHaveValue(name);

        const emailField = $('#email');
        await emailField.setValue(email);
        await expect(emailField).toHaveValue(email);

        const passwordField = $('#password');
        await passwordField.setValue(password);
        await expect(passwordField).toHaveValue(password);

        const correctPasswordField = $('#password-confirm');
        await correctPasswordField.setValue(password);
        await expect(correctPasswordField).toHaveValue(password);

        const submitButton = $('.btn-primary');
        await submitButton.isDisplayed();
        await submitButton.click();

        await browser.pause(5000);
        
    });

    it('should not process invalid password', async () => {

        const name = 'Michaela Křenková';
        const email = 'michaela@seznam.cz';
        const password = '123456';

        const nameField = $('#name');
        await nameField.setValue(name);
        await expect(nameField).toHaveValue(name);

        const emailField = $('#email');
        await emailField.setValue(email);
        await expect(emailField).toHaveValue(email);

        const passwordField = $('#password');
        await passwordField.setValue(password);
        await expect(passwordField).toHaveValue(password);

        const correctPasswordField = $('#password-confirm');
        await correctPasswordField.setValue(password);
        await expect(correctPasswordField).toHaveValue(password);

        const submitButton = $('.btn-primary');
        await submitButton.isDisplayed();
        await submitButton.click();

        const toastTitle = $('.toast-title');
        await toastTitle.waitForDisplayed();
        await expect (toastTitle).toBeDisplayed();
        await expect(toastTitle).toHaveText('Špatně zadané pole');

        const toastMessage = $('.toast-message');
        await toastMessage.waitForDisplayed();
        await expect (toastMessage).toBeDisplayed();
        await expect(toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');

        const invalidFeedback = $('.invalid-feedback');
        await invalidFeedback.waitForDisplayed();
        await expect(invalidFeedback).toBeDisplayed();
        await expect(invalidFeedback).toHaveText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');

        await browser.pause(5000);

    });

    it('should not process with existing email', async () => {

        const nameField = $('#name');
        await nameField.setValue(userFullName);
        await expect(nameField).toHaveValue(userFullName);

        const emailField = $('#email');
        await emailField.setValue(username);
        await expect(emailField).toHaveValue(username);

        const passwordField = $('#password');
        await passwordField.setValue(password);
        await expect(passwordField).toHaveValue(password);

        const correctPasswordField = $('#password-confirm');
        await correctPasswordField.setValue(password);
        await expect(correctPasswordField).toHaveValue(password);

        const submitButton = $('.btn-primary');
        await submitButton.isDisplayed();
        await submitButton.click();

        const toastTitle = await $('.toast-title');
        await toastTitle.waitForDisplayed();
        await expect (toastTitle).toBeDisplayed;
        await expect(toastTitle).toHaveText('Špatně zadané pole');

        const toastMessage = await $('.toast-message');
        await toastMessage.waitForDisplayed();
        await expect (toastMessage).toBeDisplayed;
        await expect(toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');

        const invalidFeedback = await $('.invalid-feedback');
        await invalidFeedback.waitForDisplayed();
        await expect(invalidFeedback).toBeDisplayed();
        await expect(invalidFeedback).toHaveText('Účet s tímto emailem již existuje');

        await browser.pause(5000);
        
    });
});
