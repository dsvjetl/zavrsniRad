import {TweenMax} from 'gsap';

export class gsapSongsAnimation {

    /**
     *
     * @param songsElClass
     * @param titleClass
     * @param chooseClass
     */
    constructor(songsElClass, titleClass, chooseClass) {
        this._songsElClass = songsElClass;
        this._titleClass = titleClass;
        this._chooseClass = chooseClass;
    }

    // Getters

    get songsElClass() {
        return this._songsElClass;
    }

    get titleClass() {
        return this._titleClass;
    }

    get chooseClass() {
        return this._chooseClass;
    }

    // Methods
    animateElements() {

        document.querySelectorAll(this.songsElClass).forEach(el => {
            el.style.opacity = 0;
        });

        TweenMax.staggerTo(this.songsElClass, 1, {
            opacity: 1,
            rotation: 360,
        }, 0.25);

    }

    animateTitleClass() {

        TweenMax.fromTo(this.titleClass, 2, {
            opacity: 0,
            y: -200
        }, {
            opacity: 1,
            y: 0
        });

    }

    animateChooseClass() {

        TweenMax.fromTo(this.chooseClass, 1, {
            opacity: 0,
            x: -200
        }, {
            opacity: 1,
            x: 0
        });

    }

}