import {PLAYER_WITH_CONTAINER} from '../../fixtures/selectors';

context('ix-video: poster', () => {
  before(() => {
    cy.visit('/poster.html');
  });

  const ixVideoTag = PLAYER_WITH_CONTAINER;

  describe('`<ix-video>` tag poster property', () => {
    it('should update when prop changes', () => {
      cy.get(ixVideoTag).then(($ixVideo) => {
        $ixVideo.attr('poster', 'https://sdk-test.imgix.net/amsterdam.jpg');
        const poster = $ixVideo.attr('poster');
        expect(poster).to.equal('https://sdk-test.imgix.net/amsterdam.jpg');
      });
    });
    it('should append width/height params to poster URL equal to video size', () => {
      cy.get(ixVideoTag).then(($ixVideo) => {
        const videoTag = $ixVideo.find('[part=video]');
        const videoTagWith = videoTag.css('width').split('px')[0];
        const videoTagHeight = videoTag.css('height').split('px')[0];
        cy.get('.vjs-poster').should(
          'have.css',
          'background-image',
          `url("https://sdk-test.imgix.net/amsterdam.jpg?w=${videoTagWith}&h=${videoTagHeight}")`
        );
      });
    });
    it('should not accept relative URLs', () => {
      cy.get(ixVideoTag).then(($ixVideo) => {
        const videoTag = $ixVideo.find('[part=video]');
        const videoTagWith = videoTag.css('width').split('px')[0];
        const videoTagHeight = videoTag.css('height').split('px')[0];
        $ixVideo.attr('poster', '../../fixtures/amsterdam.jpg');
        cy.get('.vjs-poster').should(
          'have.css',
          'background-image',
          `url("https://sdk-test.imgix.net/amsterdam.jpg?w=${videoTagWith}&h=${videoTagHeight}")`
        );
      });
    });
  });
});
