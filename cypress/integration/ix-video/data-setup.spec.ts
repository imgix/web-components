import {
  BIG_PLAY_BUTTON_SELECTOR,
  MUTE_BUTTON_SELECTOR,
  PLAYBACK_RATE_BUTTON_SELECTOR,
  PLAYER_WITH_DATA_SETUP,
  PLAY_BUTTON_SELECTOR,
} from '../../fixtures/selectors';

context('ix-video: data-setup attribute', () => {
  before(() => {
    cy.visit('/data-setup.html');
  });

  describe('with data-setup attribute', () => {
    const ixVideoTag = PLAYER_WITH_DATA_SETUP;
    const videoTag = `${ixVideoTag} video`;
    const bigPLayButton = `${ixVideoTag} ${BIG_PLAY_BUTTON_SELECTOR}`;
    const playButton = `${ixVideoTag} ${PLAY_BUTTON_SELECTOR}`;
    const muteButton = `${ixVideoTag} ${MUTE_BUTTON_SELECTOR}`;
    const playbackRateButton = `${ixVideoTag} ${PLAYBACK_RATE_BUTTON_SELECTOR} button`;
    const playbackRateValue = `${ixVideoTag} ${PLAYBACK_RATE_BUTTON_SELECTOR} > .vjs-playback-rate-value`;

    it('should render', () => {
      cy.get(ixVideoTag).should('exist');
    });

    it('should have a video element', () => {
      cy.get(videoTag).should('exist');
    });

    it('should display video controls', () => {
      cy.get(bigPLayButton).should('exist');
    });

    it('should display large play button on first render', () => {
      cy.get(bigPLayButton).should('exist');
    });

    it('should display video controls after clicking play', () => {
      cy.get(bigPLayButton).click();
      cy.get(bigPLayButton).should('have.css', 'display', 'none');
    });

    it('should toggle play/pause on click', () => {
      cy.get(playButton).should('have.attr', 'title', 'Pause');
      cy.get(playButton).click();
      cy.get(playButton).should('have.attr', 'title', 'Play');
    });

    it('should toggle mute the video on click', () => {
      cy.get(muteButton).should('have.attr', 'title', 'Mute');
      cy.get(muteButton).click();
      cy.get(muteButton).should('have.attr', 'title', 'Unmute');
    });

    it('should select playback rate on click', () => {
      cy.get(playbackRateButton).should('have.attr', 'title', 'Playback Rate');
      cy.get(playbackRateButton).click();
      cy.get(playbackRateValue).should('have.text', '1.5x');
    });
  });
});
