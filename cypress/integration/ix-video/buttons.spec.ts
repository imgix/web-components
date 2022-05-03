import {
  BIG_PLAY_BUTTON_SELECTOR,
  MUTE_BUTTON_SELECTOR,
  PLAYER_WITH_CONTAINER,
  PLAY_BUTTON_SELECTOR,
} from '../../fixtures/selectors';

/**
 * TODO:
 * - Read the document w/h values and store them to compare against
 * - Split each describe block into it's own test
 * - Move selectors into fixture files
 * - Add helper and conversion functions unit tests
 */

context('ix-video: buttons', () => {
  before(() => {
    cy.visit('/');
  });

  const host = PLAYER_WITH_CONTAINER;
  const bigPLayButton = `${host} ${BIG_PLAY_BUTTON_SELECTOR}`;
  const playButton = `${host} ${PLAY_BUTTON_SELECTOR}`;
  const muteButton = `${host} ${MUTE_BUTTON_SELECTOR}`;

  it('should display video controls after clicking play', () => {
    cy.get(bigPLayButton).click();
    cy.get(bigPLayButton).should('have.css', 'display', 'none');
  });

  it('should toggle play/pause on click', () => {
    cy.wait(200);
    cy.get(playButton).should('have.attr', 'title', 'Pause');
    cy.get(playButton).click();
    cy.get(playButton).should('have.attr', 'title', 'Play');
  });

  it('should toggle mute the video on click', () => {
    cy.get(muteButton).should('have.attr', 'title', 'Mute');
    cy.get(muteButton).click();
    cy.get(muteButton).should('have.attr', 'title', 'Unmute');
  });
});
