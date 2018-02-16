import TweenMax from 'gsap';

export const gsapSongAnimation = class {

    /**
     *
     * @param elements {Object}
     */
    constructor(elements) {

        this._stars = elements.stars;
        this._songTitle = elements.songTitle;

        this.init();
    }

    // Getters

    /**
     *
     * @returns {String}
     */
    get stars() {
        return this._stars;
    }

    get songTitle() {
        return this._songTitle;
    }

    // Initialization

    init() {

        this.setElementsToStartPositions();

        this.animateStars();
    }

    // Methods

    setElementsToStartPositions() {}

    animateStars() {

        TweenMax.staggerFromTo(this.stars, .1, {
            opacity: 0,
            y: -300,
            rotation: 100
        }, {
            opacity: 1,
            y: 0,
            rotation: 0
        }, 0.1, () => {
            this.animateSongTitle();
        });

    }

    animateSongTitle() {

        TweenMax.fromTo(this.songTitle, 3, {
            opacity: 0,
            left: -200
        }, {
            opacity: 1,
            left: 0
        });

    }

};