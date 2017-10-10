import { browser, element, by, protractor } from 'protractor';

export class MahjongMayhemPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

export class MyGamesPage {
  navigateTo() {
    return browser.get('/games/all');
  }

  createGameAndCheckCreation() {
    browser.get('/games/all');

    var length = 0;
    let gamesIHave = element(by.className('Wouter Aarts'))
    var EC = protractor.ExpectedConditions;
    var createGameButton = element(by.id("create-button"))
    browser.wait(EC.visibilityOf(createGameButton), 5000);

    browser.findElements(protractor.By.className('Wouter Aarts')).then(function(elems) {
      length = elems.length; // Amount of games now
    });
    createGameButton.click();

    element(by.name('templateName')).click();
    element(by.id('md-option-0')).click();
    element(by.id('submit')).click();

    let result = !browser.findElements(protractor.By.className('Wouter Aarts')).then(function(elems) {
      return elems.length == length + 1
    });
    return result
  }

  checkGameCreated(name: String) {
    return element(by.className('Wouter Aarts')).isPresent();
  }
}