import {
  BIG_PLAY_BUTTON_SELECTOR,
  MUTE_BUTTON_SELECTOR,
  PLAYER_WITH_CONTAINER_MP4,
  PLAY_BUTTON_SELECTOR,
} from '../../fixtures/selectors';

context('ix-video: MP4 source URL', () => {
  before(() => {
    cy.visit('/mp4-source.html');
  });

  describe('with an MP4 source URL', () => {
    const ixVideoTag = PLAYER_WITH_CONTAINER_MP4;
    const videoTag = `${ixVideoTag} video`;
    const bigPLayButton = `${ixVideoTag} ${BIG_PLAY_BUTTON_SELECTOR}`;
    const playButton = `${ixVideoTag} ${PLAY_BUTTON_SELECTOR}`;
    const muteButton = `${ixVideoTag} ${MUTE_BUTTON_SELECTOR}`;

    it('should render', () => {
      cy.get(ixVideoTag).should('exist');
    });

    it('should have a video element', () => {
      cy.get(videoTag).should('exist');
    });

    it('should display video controls', () => {
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
  });
});
