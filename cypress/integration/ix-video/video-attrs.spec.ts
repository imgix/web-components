import {
  BIG_PLAY_BUTTON_SELECTOR,
  MUTE_BUTTON_SELECTOR,
  PIP_BUTTON_SELECTOR,
  PLAYER_WITH_CONTAINER_VIDEO_ATT,
  PLAY_BUTTON_SELECTOR,
} from '../../fixtures/selectors';

context('ix-video: <video> attributes', () => {
  before(() => {
    cy.visit('/video-attrs.html');
  });

  describe('with default <video> attributes', () => {
    const host = PLAYER_WITH_CONTAINER_VIDEO_ATT;
    const player = `${host} video`;
    const bigPLayButton = `${host} ${BIG_PLAY_BUTTON_SELECTOR}`;
    const playButton = `${host} ${PLAY_BUTTON_SELECTOR}`;
    const muteButton = `${host} ${MUTE_BUTTON_SELECTOR}`;
    const pipButton = `${host} ${PIP_BUTTON_SELECTOR}`;

    before(() => {
      cy.get(host).should('exist');
    });

    describe('disablePictureInPicture', () => {
      it('should not display picture in picture button', () => {
        cy.get(pipButton).should('have.attr', 'title', 'Picture-in-Picture');
        cy.get(pipButton).should('have.attr', 'aria-disabled', 'true');
      });
    });

    describe('with autoplay', () => {
      it('should autoplay', () => {
        cy.get(host).should('have.attr', 'autoplay');
        cy.get(player).should('have.attr', 'autoplay');
        cy.get(bigPLayButton).should('have.css', 'display', 'none');
        cy.get(playButton).should('have.attr', 'title', 'Pause');
      });
    });

    describe('with muted', () => {
      it('should be muted', () => {
        cy.get(muteButton).should('have.attr', 'title', 'Unmute');
      });
    });

    describe('with loop', () => {
      it('should loop', () => {
        cy.get(host).should('have.attr', 'loop');
        cy.get(player).should('have.attr', 'loop');
      });
    });
  });
});
