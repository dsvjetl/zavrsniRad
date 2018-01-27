<template>
    <div class="song-player">
        <h3>{{ song.name }}</h3>

        <audio controls>
            <source :src="song.url" type="audio/ogg">
            <source :src="song.url" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
</template>

<script>
    export default {
        name: 'song-player',

        computed: {

            songId() {
                return this.$route.params.songId
            },
            song() {
                return this.$store.getters.allSongs.filter(song => song.id === this.songId)[0];
            }

        },

        mounted() {

            console.log(this.song);

        }
    }
</script>

<style lang="scss" scoped>

</style>