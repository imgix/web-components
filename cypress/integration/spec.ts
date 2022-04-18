const BIG_PLAY_BUTTON_SELECTOR = `.vjs-big-play-button`;
const PLAY_BUTTON_SELECTOR = `.vjs-play-control`;
const MUTE_BUTTON_SELECTOR = `.vjs-mute-control `;
const PIP_BUTTON_SELECTOR = `.vjs-picture-in-picture-control`;
const PLAYBACK_RATE_BUTTON_SELECTOR = `.vjs-playback-rate`;

const PLAYER_WITH_CONTAINER = `[data-test-id=ix-video-with-container]`;
const PLAYER_WITH_CONTAINER_WITHOUT_W = `[data-test-id=ix-video-without-w]`;
const PLAYER_WITHOUT_W_OR_H = `[data-test-id=ix-video-without-w-or-h]`;
const PLAYER_WITH_WIDTH_AND_HEIGHT = `[data-test-id=ix-video-with-w-and-h]`;
const PLAYER_WITH_CONTAINER_VIDEO_ATT = `[data-test-id=ix-video-with-video-attributes]`;
const PLAYER_WITH_CONTAINER_MP4 = `[data-test-id=ix-video-mp4-player]`;
const PLAYER_WITH_DATA_SETUP = `[data-test-id=ix-video-with-data-setup]`;

/**
 * TODO:
 * - Read the document w/h values and store them to compare against
 * - Split each describe block into it's own test
 * - Move selectors into fixture files
 * - Add helper and conversion functions unit tests
 */

context('ix-video', () => {
  before(() => {
    cy.visit('/');
  });

  const host = PLAYER_WITH_CONTAINER;
  const player = `${host} video`;
  const bigPLayButton = `${host} ${BIG_PLAY_BUTTON_SELECTOR}`;
  const playButton = `${host} ${PLAY_BUTTON_SELECTOR}`;
  const muteButton = `${host} ${MUTE_BUTTON_SELECTOR}`;

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

  describe('with an MP4 source URL', () => {
    const host = PLAYER_WITH_CONTAINER_MP4;
    const player = `${host} video`;
    const bigPLayButton = `${host} ${BIG_PLAY_BUTTON_SELECTOR}`;
    const playButton = `${host} ${PLAY_BUTTON_SELECTOR}`;
    const muteButton = `${host} ${MUTE_BUTTON_SELECTOR}`;

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

  describe('with data-setup attribute', () => {
    const host = PLAYER_WITH_DATA_SETUP;
    const player = `${host} video`;
    const bigPLayButton = `${host} ${BIG_PLAY_BUTTON_SELECTOR}`;
    const playButton = `${host} ${PLAY_BUTTON_SELECTOR}`;
    const muteButton = `${host} ${MUTE_BUTTON_SELECTOR}`;
    const playbackRateButton = `${host} ${PLAYBACK_RATE_BUTTON_SELECTOR} button`;
    const playbackRateValue = `${host} ${PLAYBACK_RATE_BUTTON_SELECTOR} > .vjs-playback-rate-value`;

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
