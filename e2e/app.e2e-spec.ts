import { MahjongMayhemPage, MyGamesPage } from './app.po';

describe('mahjong-mayhem App', () => {
  let page: MahjongMayhemPage;
  let myGamesPage: MyGamesPage;

  beforeEach(() => {
    page = new MahjongMayhemPage();
    myGamesPage = new MyGamesPage();
  });

  it('should display message saying Mahjong Mayhem', () => {
    page.navigateTo();
    expect<any>(page.getParagraphText()).toEqual("Mahjong Mayhem");
  });

  it('should be able to create a game', () => {
    myGamesPage.navigateTo();
    myGamesPage.createGameAndCheckCreation();
    expect<any>(myGamesPage.createGameAndCheckCreation()).toEqual(true);
  })
});
