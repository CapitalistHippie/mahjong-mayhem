import { TestBed, inject } from '@angular/core/testing';

import { ThemeService } from './theme.service';

import { Theme } from '../theme.model';

describe('ThemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    localStorage.removeItem("theme");
  },);

  it('should be created', inject([ThemeService], (service: ThemeService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a default theme', inject([ThemeService], (service: ThemeService) => {
    let defaultTheme = service.getDefaultTheme();

    expect(defaultTheme).toBeDefined();
    expect(defaultTheme).not.toBeNull();
  }));

  it('getActiveTheme should by default be the same as the default theme', inject([ThemeService], (service: ThemeService) => {
    let defaultTheme = service.getDefaultTheme();
    let activeTheme = service.getActiveTheme();

    expect(defaultTheme).toEqual(activeTheme);
  }));

  it('setActiveTheme should set the active theme', inject([ThemeService], (service: ThemeService) => {
    // Arrange.
    let theme: Theme = new Theme()
    theme.cssClassName = "some-css-class";
    theme.mahjongSpriteHeight = 50;
    theme.mahjongSpriteWidth = 50;
    theme.mahjongSpriteDepthIllusionOffsetX = 0.125;
    theme.mahjongSpriteDepthIllusionOffsetY = -0.085;
    theme.name = 'some name';

    // Act.
    service.setActiveTheme(theme);
    let activeTheme = service.getActiveTheme();

    // Assert.
    expect(theme).toEqual(activeTheme);
  }));

  // it('setActiveTheme should emit a themeChanged event', inject([ThemeService], (service: ThemeService, done) => {
  //   // Arrange.
  //   let theme: Theme = new Theme()

  //   spyOn(service.themeChanged, 'emit');

  //   // Act.
  //   service.setActiveTheme(theme);

  //   // Assert.
  //   expect(service.themeChanged.emit).toHaveBeenCalled();
  // }));

  // it('themeChanged event should have the new active theme as argument', inject([ThemeService], (service: ThemeService, done) => {
  //   // Arrange
  //   let theme: Theme = new Theme()
  //   theme.cssClassName = "some-css-class";
  //   theme.mahjongSpriteHeight = 50;
  //   theme.mahjongSpriteWidth = 50;
  //   theme.name = 'some name';

  //   spyOn(service.themeChanged, 'emit');

  //   // Act.
  //   service.setActiveTheme(theme);

  //   // Assert.
  //   expect(service.themeChanged.emit).toHaveBeenCalledWith(theme);
  // }));
});
