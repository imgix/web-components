import {
  BIG_PLAY_BUTTON_SELECTOR,
  PLAYER_WITH_CONTAINER,
} from '../../fixtures/selectors';

/**
 * TODO:
 * - Read the document w/h values and store them to compare against
 * - Add ~helper~ and conversion functions unit tests
 */

context('ix-video: styles', () => {
  before(() => {
    cy.visit('/');
  });

  const ixVideoTag = PLAYER_WITH_CONTAINER;
  const videoTag = `${ixVideoTag} video`;
  const bigPLayButton = `${ixVideoTag} ${BIG_PLAY_BUTTON_SELECTOR}`;

  it('should render', () => {
    cy.get(ixVideoTag).should('exist');
  });

  it('should have a video element', () => {
    cy.get(videoTag).should('exist');
  });

  it('should display video controls', () => {
    cy.get(bigPLayButton).should('exist');
  });


  describe('with a class attribute', () => {
    const playerContainer = `${ixVideoTag} .video-js`;
    it('should add the class name to the video element', () => {
      cy.get(ixVideoTag).should('have.class', 'my-custom-class');
      cy.get(playerContainer).should('have.class', 'my-custom-class');
    });
    it('should preserve video-js classnames', () => {
      cy.get(playerContainer).should('have.class', 'vjs-default-skin');
    });
  });
});
