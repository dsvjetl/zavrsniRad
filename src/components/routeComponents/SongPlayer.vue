<template>
    <div class="song-player">

        <div
                class="song-player__loader"
                ref="loader"
                :style="{'width': `${loaderWidth}%`}"
        >
        </div>

        <div class="song-player__manipulation row">

            <div
                    class="song-player__stars-wrapper col-s12"
            >

                <i
                        class="material-icons song-player__star-icon gsap-star"
                        v-for="count in 10"
                        :key="count"
                        ref="star"
                        @mouseover="starHover(count)"
                        @mouseleave="starBlur"
                        @click="gradeSong(count)"
                >
                    star_border
                </i>

                <span>{{ averageGrade }} / 10</span>
            </div>

            <h3
                    class="col s12 song-player__song-name gsap-title"
                    v-if="songObject"
                    ref="songTitle"
            >{{ songObject.name | songName}}</h3>

            <i
                    class="material-icons col s2 offset-s5 song-player__play-pause-icon"
                    @click="playPauseSong"
            >
                {{ songIsPlaying ? playPauseStrings.pause : playPauseStrings.play }}
            </i>

            <p class="range-field song-player__range col s8 offset-s2">
                <input
                        type="range"
                        id="test5"
                        min="0"
                        max="100"
                        @change="rangeChangeCurrentTime"
                        v-model="loaderWidth"
                        @mousedown="removeRangePopup"
                />
            </p>

            <div
                    class="song-player__song-time col s12"
                    v-if="songObject"
            >
                {{ `${currentTime} / ${songObject.duration}` }}
            </div>

        </div>

        <comments
            :songId="songId"
        ></comments>

    </div>
</template>

<script>
    // Helpers
    import {gsapSongAnimation} from "../../helpers/gsapSongAnimation";

    // Components
    import Comments from '@/components/songPlayer/Comments';

    // Filters
    import songName from '@/filters/songName';

    export default {
        name: 'song-player',

        data() {
            return {
                playPauseStrings: {
                    play: 'play_circle_outline',
                    pause: 'pause_circle_outline'
                },
                song: null,
                songIsPlaying: false,
                songDuration: 0,
                loaderWidth: 0,
                currentTime: '00:00',
                songGraded: false
            }
        },

        computed: {

            songObject() {
                return this.$store.getters.allSongs.filter(song => song.id === this.songId)[0];
            },
            songId() {
                return this.$route.params.songId;
            },
            currentUserGrade() {
                return this.$store.getters.currentUserGrade;
            },
            averageGrade() {
                return this.$store.getters.averageGrade;
            }

        },

        methods: {

            initSong() {

                this.song = new Audio(this.songObject.url);
                this.song.load();

                this.song.addEventListener('loadedmetadata', () => {
                    this.songDuration = this.song.duration;
                    console.log('songDuration: ', this.songDuration);
                });

            },
            playPauseSong() {

                if (this.songIsPlaying) {
                    this.pauseSong();
                }
                else {
                    this.playSong();
                }

            },
            playSong() {

                this.song.play();
                this.songIsPlaying = true;

                this.song.addEventListener('timeupdate', () => {

                    this.changeLoaderWidth();
                    this.showCurrentTime();

                });

            },
            pauseSong() {

                this.song.pause();
                this.songIsPlaying = false;

            },
            songPercentage(currentTime) {
                return Math.round((currentTime / this.songDuration) * 100);
            },
            changeLoaderWidth() {

                if (this.loaderWidth < 100) {
                    this.loaderWidth = this.songPercentage(this.song.currentTime);
                }
                else {
                    this.loaderWidth = 0;
                    this.song.currentTime = 0;
                    this.pauseSong();
                }

            },
            rangeChangeCurrentTime($event) {
                this.song.currentTime = ($event.srcElement.value / 100) * this.songDuration;
            },
            removeRangePopup() {
                document.querySelector('.thumb').style.display = 'none';
            },
            showCurrentTime() {

                let seconds = this.song.currentTime;

                let minutes = Math.floor(seconds / 60);
                minutes = (minutes >= 10) ? minutes : "0" + minutes;
                seconds = Math.floor(seconds % 60);
                seconds = (seconds >= 10) ? seconds : "0" + seconds;

                this.currentTime = minutes + ":" + seconds;

            },
            starHover(count) {

                const stars = this.$refs.star;

                stars.forEach((star, index) => {

                    if (index < count) {
                        star.style.color = '#FEFFFE';
                    }

                });

            },
            starBlur() {

                if (this.songGraded === false) {
                    const stars = this.$refs.star;

                    stars.forEach(star => {
                        star.style.color = '#000';
                    });
                }
                else {
                    return;
                }

            },
            gradeSong(count) {

                this.$store.dispatch('gradeSong', {
                    count,
                    songId: this.songId
                });

                this.updateStars(count);

            },
            updateStars(count) {

                const stars = this.$refs.star;

                stars.forEach((star, index) => {

                    if (index < count) {
                        star.style.color = 'gold';
                    }

                    star.style.pointerEvents = 'none';

                });

                this.songGraded = true;

            },
            checkGradesOnStart() {

                if (this.currentUserGrade > 0) {
                    this.updateStars(Number(this.currentUserGrade));
                }

            }

        },

        watch: {

            'songObject'(newVal) {
                console.log(newVal);
                this.initSong();
            },
            currentUserGrade(newVal) {
                this.updateStars(Number(this.currentUserGrade));
            }

        },

        mounted() {

            this.$store.dispatch('getAllSongs');

            const gsapSongAnimationLocal = new gsapSongAnimation({
                stars: '.gsap-star',
                songTitle: '.gsap-title'
            });

            this.checkGradesOnStart();

        },

        created() {

            this.$store.dispatch('updateSongComments', {
                songId: this.songId
            });

            this.$store.dispatch('getSongGrades', {
                songId: this.songId
            });

        },

        beforeDestroy() {

            this.pauseSong();
            this.song.currentTime = 0;
            this.currentTime = 0;

        },

        components: {
            Comments
        }
    }
</script>

<style lang="scss" scoped>

    .song-player {

        position: absolute;
        top: 70px;
        left: 0;
        width: 100vw !important;
        height: calc(100% - 70px);

        &__play-pause-icon {

            text-align: center;
            font-size: 40px;
            transition: all .3s ease-in-out;
            color: $black;

            &:hover {
                transform: scale(1.2);
                cursor: pointer;
                color: $white-almost;
                transform: rotate(360deg);
            }
        }

        &__song-name {
            text-align: center;
            font-size: 30px;
            color: $white-almost;
            padding-bottom: 10px;
            opacity: 0; // GSAP
        }

        &__loader {
            background-color: transparentize(black, .5);
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transition: width 2s linear;
            z-index: 0;
        }

        &__manipulation {
            padding-top: 20px;
            position: absolute;
            top: 0;
            width: 100vw;
            z-index: 1;
            background-color: rgba(200, 200, 200, .5);
            margin: 0;
            height: 260px;

            background: rgba(76, 76, 76, 1);
            background: -moz-linear-gradient(top, rgba(76, 76, 76, 1) 0%, rgba(89, 89, 89, 0.86) 39%, rgba(71, 71, 71, 0.79) 60%, rgba(19, 19, 19, 0.65) 100%);
            background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(76, 76, 76, 1)), color-stop(39%, rgba(89, 89, 89, 0.86)), color-stop(60%, rgba(71, 71, 71, 0.79)), color-stop(100%, rgba(19, 19, 19, 0.65)));
            background: -webkit-linear-gradient(top, rgba(76, 76, 76, 1) 0%, rgba(89, 89, 89, 0.86) 39%, rgba(71, 71, 71, 0.79) 60%, rgba(19, 19, 19, 0.65) 100%);
            background: -o-linear-gradient(top, rgba(76, 76, 76, 1) 0%, rgba(89, 89, 89, 0.86) 39%, rgba(71, 71, 71, 0.79) 60%, rgba(19, 19, 19, 0.65) 100%);
            background: -ms-linear-gradient(top, rgba(76, 76, 76, 1) 0%, rgba(89, 89, 89, 0.86) 39%, rgba(71, 71, 71, 0.79) 60%, rgba(19, 19, 19, 0.65) 100%);
            background: linear-gradient(to bottom, rgba(76, 76, 76, 1) 0%, rgba(89, 89, 89, 0.86) 39%, rgba(71, 71, 71, 0.79) 60%, rgba(19, 19, 19, 0.65) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#4c4c4c', endColorstr='#131313', GradientType=0);

        }

        &__range {
            margin: 0;
        }

        &__song-time {
            text-align: center;
            font-size: 20px;
            color: $white-almost;
            padding-bottom: 20px;
        }

        &__stars-wrapper {
            text-align: center;

            span {
                position: relative;
                bottom: 6px;
                margin-left: 10px;
                color: gold;
            }
        }

        &__star-icon {

            transition: all .3s ease-in-out;
            opacity: 0; // GSAP

            &:hover {
                color: $white-almost;
                transform: scale(1.2);
                cursor: pointer;
            }
        }

    }

    // Materialize hax
    input[type=range]::-webkit-slider-thumb {

        background-color: $black;
        border: 1px solid $white-almost;
        transition: all .3s ease-in-out;

        &:hover {

            transform: scale(1.2);
            background-color: $white-almost;
            border: 1px solid $black;

        }
    }

</style>