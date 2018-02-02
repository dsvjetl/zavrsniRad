<template>
    <div class="song-player">

        <div
                class="song-player__loader"
                ref="loader"
                :style="{'width': `${loaderWidth}%`}"
        >
        </div>

        <div class="song-player__manipulation row">

            <h3
                    class="col s12 song-player__song-name"
                    v-if="songObject"
            >{{ songObject.name }}</h3>

            <button
                    class="col s2 offset-s5"
                    @click="playPauseSong"
            >
                {{ playPauseStrings.play }}
            </button>

            <p class="range-field song-player__range col s8 offset-s2">
                <input
                        type="range"
                        id="test5"
                        min="0"
                        max="100"
                        @change="rangeChangeCurrentTime"
                        v-model="loaderWidth"
                />
            </p>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'song-player',

        data() {
            return {
                playPauseStrings: {
                    play: 'Play',
                    pause: 'Pause'
                },
                song: null,
                songIsPlaying: false,
                songDuration: 0,
                loaderWidth: 0
            }
        },

        computed: {

            songObject() {
                return this.$store.getters.allSongs.filter(song => song.id === this.songId)[0];
            },
            songId() {
                return this.$route.params.songId;
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

                this.hideRangeThumb();

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
            hideRangeThumb() {

                const thumb = document.querySelectorAll('span.thumb')[0];
                thumb.style.display = 'none';

            }

        },

        watch: {

            'songObject'(newVal) {
                console.log(newVal);
                this.initSong();
            }

        },

        mounted() {

            setTimeout(() => {
                this.hideRangeThumb();
            }, 1000);

        },

        created() {

            this.$store.dispatch('getAllSongs');

        }
    }
</script>

<style lang="scss" scoped>

    .song-player {

        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        height: calc(100% - 70px);

        &__song-name {
            text-align: center;
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
            z-index: 1;
            background-color: rgba(200, 200, 200, .5);
        }

        &__range {

        }

    }

</style>