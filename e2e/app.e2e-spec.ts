import { MahjongMayhemPage } from './app.po';

describe('mahjong-mayhem App', () => {
  let page: MahjongMayhemPage;

  beforeEach(() => {
    page = new MahjongMayhemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
