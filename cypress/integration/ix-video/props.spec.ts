import {PLAYER_WITH_CONTAINER} from '../../fixtures/selectors';

context('ix-video: props', () => {
  before(() => {
    cy.visit('/props.html');
  });

  const host = PLAYER_WITH_CONTAINER;

  describe('when source property is updated', () => {
    it('should update the video source', () => {
      cy.get(host).then(($el) => {
        const oldSrc = $el.find('video').attr('src');
        const newSrc =
          'https://assets.imgix.video/videos/girl-reading-book-in-library.mp4?fm=hls';
        $el.attr('source', newSrc);
        cy.wait(500).then(() => {
          const currentSrc = $el.find('video').attr('src');
          expect(currentSrc).to.not.equal(oldSrc);
        });
      });
    });
  });

  describe('when the fixed property is updated', () => {
    it('should set the fixed property to the new value', () => {
      cy.get(host).then(($el) => {
        $el.removeAttr('fixed');
        cy.wait(1000).then(() => {
          const fluid = $el.find('[part="video"]').hasClass('vjs-fluid');
          expect(fluid).to.equal(true);
          $el.attr('fixed', '');
        });
      });
    });
  });

  describe('when the controls property is updated', () => {
    it('should set the controls property to the new value', () => {
      cy.get(host).then(($el) => {
        $el.removeAttr('controls');
        cy.wait(1000).then(() => {
          const hasControls = $el
            .find('[part="video"]')
            .hasClass('vjs-controls-enabled');
          expect(hasControls).to.equal(false);
        });
      });
    });
  });

  describe('when width property is updated', () => {
    it('should update the video width', () => {
      cy.get(host).then(($el) => {
        const oldWidth = $el.find('video').css('width');
        const newWidth = '500';
        $el.attr('width', newWidth);
        cy.wait(500).then(() => {
          const currentWidth = $el.find('video').css('width');
          const fluid = $el.find('[part="video"]').hasClass('vjs-fluid');
          expect(currentWidth).to.not.equal(undefined);
          expect(currentWidth).to.not.equal(oldWidth);
          expect(currentWidth).to.equal(newWidth + 'px');
          expect(fluid).to.equal(false);
        });
      });
    });
  });

  describe('when height property is updated', () => {
    it('should update the video height', () => {
      cy.get(host).then(($el) => {
        const oldHeight = $el.find('video').css('height');
        const newHeight = '500';
        $el.attr('height', newHeight);
        cy.wait(500).then(() => {
          const currentHeight = $el.find('video').css('height');
          const fluid = $el.find('[part="video"]').hasClass('vjs-fluid');
          expect(currentHeight).to.not.equal(undefined);
          expect(currentHeight).to.not.equal(oldHeight);
          expect(currentHeight).to.equal(newHeight + 'px');
          expect(fluid).to.equal(false);
        });
      });
    });
  });
});
