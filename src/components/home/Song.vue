<template>
    <div class="song js-song col s3">
        <div class="song__song-container">
            <h5 class="song__name">
                {{ songName }}
            </h5>
            <p class="song__description">
                <span>Genre: </span>Rock
            </p>
            <p class="song__description">
                <span>Duration: </span>03:46
            </p>
            <p class="song__description">
                <span>Size: </span>8.3 MB
            </p>
            <i class="tiny material-icons song__icon">queue_music</i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'song',
        props: {
            songName: String,
            songId: String
        }
    }
</script>

<style lang="scss" scoped>

    .song {

        color: $white-almost;
        padding: 0 3px;
        text-align: center;
        margin: 4px 0;
        opacity: 0;

        &__song-container {

            background-color: transparentize($black, .5);
            border-radius: 5px;
            padding: 5px 0 10px;
            transition: all .3s ease-in-out;
            height: 150px;
            position: relative;

            &:hover {
                color: $black;
                background-color: transparentize($white-almost, .5);
                cursor: pointer;
                transform: scale(1.02);
            }
        }

        &__name {
            font-size: 15px;
            padding-bottom: 10px;
        }

        &__description {

            text-align: left;
            padding-left: 10px;
            font-size: 12px;
            margin: 5px 0;
            font-weight: 100;

            span {
                font-weight: 400;
            }
        }

        &__icon {
            position: absolute;
            bottom: 5px;
            right: 5px;
        }

    }

</style>
