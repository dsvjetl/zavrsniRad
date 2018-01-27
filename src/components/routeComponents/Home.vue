<template>
    <div class="home">

        <h3 class="home__title js-title">
            Welcome to my album!
        </h3>

        <p class="home__choose js-choose">
            Choose a song!
        </p>

        <div class="home__songs-container row">
            <song
                v-for="song in allSongs"
                :key="song.id"
                :songId="song.id"
                :songName="song.name"
                :songGenre="song.genre"
                :songSize="song.size"
                :songUrl="song.url"
                :songDuration="song.duration"
                @click.native="songClicked(song.id)"
            >

            </song>
        </div>

    </div>
</template>

<script>
    // Components
    import Song from '@/components/home/Song';

    // Helpers
    import {gsapSongsAnimation} from "../../helpers/gsapSongsAnimation";

    export default {
        name: 'home',

        computed: {
            currentUser() {
                return this.$store.getters.currentUser.firstName;
            },
            allSongs() {
                return this.$store.getters.allSongs;
            }
        },

        methods: {

            songClicked(songId) {

                this.$router.push({name: 'songPlayer', params: {songId}});

            }

        },

        mounted() {

            const songAnimation = new gsapSongsAnimation('.js-song', '.js-title', '.js-choose');
            songAnimation.animateTitleClass();
            songAnimation.animateChooseClass();

            setTimeout(() => {
                songAnimation.animateElements();
            }, 500);

            console.log(this.$store.getters.allSongs);

        },

        created() {
            this.$store.dispatch('getAllSongs');
        },

        components: {
            Song
        }
    }
</script>

<style lang="scss" scoped>

    .home {

        color: #fff;

        &__title {
            font-size: 35px;
            text-align: center;
        }

        &__songs-container {
            margin-top: 0;
            // border: 1px solid $brown-light;
            background-color: transparentize($brown-dark, .7);
            border-radius: 5px;
            height: 400px;
            overflow: hidden;
            overflow-y: auto;
            padding: 3px;
            margin-bottom: 0;
        }

    }

</style>
