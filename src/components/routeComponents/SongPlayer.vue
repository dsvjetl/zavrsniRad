<template>
    <div class="song-player">

        <div
                class="song-player__loader"
                ref="loader"
                :style="{'width': `${loaderWidth}%`}"
        >
        </div>

        <div class="song-player__manipulation">

            <h3
                    v-if="song"
            >{{ song.name }}</h3>

            <button
                    @click="playPauseSound"
            >Play
            </button>

            <p class="range-field song-player__range">
                <input
                        type="range"
                        id="test5"
                        min="0"
                        max="100"
                        v-model="range"
                        @change="changeRange"
                />
            </p>

        </div>

    </div>
</template>

<script>
    import {Howl, Howler} from 'howler';

    export default {
        name: 'song-player',

        data() {
            return {
                sound: null,
                soundInterval: null,
                loader: null,
                soundDuration: 0,
                loaderWidth: 0,
                range: 0
            }
        },

        computed: {

            song() {
                return this.$store.getters.allSongs.filter(song => song.id === this.songId)[0];
            },
            songId() {
                return this.$route.params.songId;
            }

        },

        methods: {

            playPauseSound() {

                if (this.sound.playing()) {
                    this.sound.pause();
                    clearInterval(this.soundInterval);
                }
                else if (this.sound.playing() === false) {
                    this.sound.play();
                }

            },
            audioStop() {

                this.loaderWidth = 0;

            },
            audioListener() {

                this.soundInterval = setInterval(() => {

                    let percentage = (Math.round(this.sound.seek()) / this.soundDuration) * 100;
                    percentage = Math.round(percentage);

                    console.log(percentage);
                    this.loaderWidth = percentage;
                    this.range = percentage;

                    if (percentage === 100) {
                        clearInterval(this.soundInterval);
                    }

                }, 100);

            },
            howlSong() {

                this.sound = new Howl({
                    src: [this.song.url],
                    html5: true,
                    preload: true,
                    onplay: this.audioListener,
                    onload: () => {
                        this.soundDuration = this.sound.duration();
                    },
                    onstop: this.audioStop
                });

                this.loader = this.$refs.loader;
                this.loader.style.width = 0;

            },
            changeRange() {

                console.log(this.range);
                this.sound.seek(this.range);

            }

        },

        watch: {

            'song'(newVal) {
                console.log(newVal);
                this.howlSong();
            }

        },

        mounted() {


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
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transition: width .4s linear;
            z-index: 1;
        }

        &__range {
            width: 70%;
            position: absolute;
            bottom: 20%;
            left: 0;
            right: 0;
            margin: 0 auto;
        }

    }

</style>