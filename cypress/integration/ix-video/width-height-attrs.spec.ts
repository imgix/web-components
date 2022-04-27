import {
  PLAYER_WITHOUT_W_OR_H,
  PLAYER_WITH_CONTAINER_WITHOUT_W,
  PLAYER_WITH_WIDTH_AND_HEIGHT,
} from '../../fixtures/selectors';

context('ix-video: width and height attributes', () => {
  before(() => {
    cy.visit('/width-height-attrs.html');
  });

  describe('without width attribute', () => {
    const container = '[data-test-id=without-w-container]';
    const host = PLAYER_WITH_CONTAINER_WITHOUT_W;
    const player = `${PLAYER_WITH_CONTAINER_WITHOUT_W} video`;
    it('should set player width to 100% of container', () => {
      cy.get(container).should('have.css', 'width', '480px');
      cy.get(host).should('have.css', 'width', '480px');
      cy.get(player).should('have.css', 'width', '480px');
    });
  });

  describe('without a containing element', () => {
    describe('without width or height attributes', () => {
      const host = PLAYER_WITHOUT_W_OR_H;
      const player = `${host} video`;
      it('should set the host width to 100% of available width', () => {
        cy.get(host).should('have.css', 'width', '969px');
      });
      it('should set player width to the intrinsic video width', () => {
        cy.get(player).should('have.css', 'width', '480px');
      });
    });

    describe('with width and height attributes', () => {
      const host = PLAYER_WITH_WIDTH_AND_HEIGHT;
      const player = `${host} video`;
      it('should set player width to attribute width', () => {
        // compare the player width with the player's video element width
        cy.get(host).should('have.attr', 'width', '481');
        cy.get(player).should('have.css', 'width', '481px');
      });
      it('should set player height to attribute height', () => {
        cy.get(player).then(($el) => console.log($el));
        cy.get(host).should('have.attr', 'height', '256');
        cy.get(player).should('have.css', 'height', '256px');
      });
    });
  });
});
