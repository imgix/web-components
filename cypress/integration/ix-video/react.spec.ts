import {BIG_PLAY_BUTTON_SELECTOR, REACT_PLAYER} from '../../fixtures/selectors';

context('in a React application', () => {
  beforeEach(() => {
    cy.visit('/react.html');
  });

  const host = REACT_PLAYER;
  const player = `${host} video`;
  const bigPLayButton = `${host} ${BIG_PLAY_BUTTON_SELECTOR}`;

  it('should render', () => {
    cy.get(host).should('exist');
  });

  it('should have a video element', () => {
    cy.get(player).should('exist');
  });

  it('should display video controls', () => {
    cy.get(bigPLayButton).should('exist');
  });

  it('should display large play button on first render', () => {
    cy.get(bigPLayButton).should('exist');
  });

  describe('with a class attribute', () => {
    const playerContainer = `${host} .video-js`;
    it('should add the class name to the video element', () => {
      cy.get(host).should('have.class', 'my-custom-class');
      cy.get(playerContainer).should('have.class', 'my-custom-class');
    });
    it('should preserve video-js classnames', () => {
      cy.get(playerContainer).should('have.class', 'vjs-default-skin');
    });
  });
});
