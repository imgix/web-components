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
    const widthRatio = 16;
    const heightRatio = 9;
    it('should set player width to 100% of container without changing aspect ratio', () => {
      cy.get(container).should('have.css', 'width', '300px');
      cy.get(container).then(($el) => {
        cy.get(host).should('have.css', 'width', `${$el.width()}px`);
      });
      cy.get(host).then(($el) => {
        cy.get(player).should('have.css', 'width', `${$el.width()}px`);
        cy.get(player).should(
          'have.css',
          'height',
          `${($el.width() / widthRatio) * heightRatio}px`
        );
      });
    });
  });

  describe('without a containing element', () => {
    describe('without width or height attributes', () => {
      const host = PLAYER_WITHOUT_W_OR_H;
      const player = `${host} video`;
      it('should set the host width to 100% of available width', () => {
        cy.get('body').then(($el) => {
          cy.get(host).should('have.css', 'width', `${$el.width()}px`);
        });
      });
      it('should set player width to the 100% available width', () => {
        cy.get(host).then(($el) => {
          cy.get(player).should('have.css', 'width', `${$el.width()}px`);
        });
      });
    });

    describe('with width and height attributes', () => {
      const host = PLAYER_WITH_WIDTH_AND_HEIGHT;
      const player = `${host} video`;
      it('should set player width to attribute width', () => {
        // compare the player width with the player's video element width
        cy.get(host).should('have.attr', 'width', '200');
        cy.get(host).then(($el) => {
          cy.get(player).should('have.css', 'width', `${$el.attr('width')}px`);
        });
      });
      it('should not set player height to attribute height', () => {
        // the player should always maintain aspect ratio regardless of height
        // attribute value, unless the `fixed` attribute is set to `true`.
        cy.get(host).should('have.attr', 'height', '200');
        cy.get(host).then(($el) => {
          cy.get(player).should(
            'not.have.css',
            'height',
            `${$el.attr('height')}px`
          );
        });
      });
    });

    describe('with width, height, and fixed attributes', () => {
      const host = PLAYER_WITH_WIDTH_AND_HEIGHT;
      const player = `${host} video`;
      it('should set player width to attribute width', () => {
        // compare the player width with the player's video element width
        cy.get(host).should('have.attr', 'width', '200');
        cy.get(host).then(($el) => {
          cy.get(player).should('have.css', 'width', `${$el.attr('width')}px`);
        });
      });
      it('should set player height to attribute height', async () => {
        cy.get(player).then(($el) => {
          // set the fixed attribute to true
          $el.attr('fixed', 'true');
        });
        cy.get(host).should('have.attr', 'height', '200');
        cy.get(host).then(($el) => {
          cy.get(player).should(
            'have.css',
            'height',
            `${$el.attr('height')}px`
          );
        });
      });
    });
  });
});
