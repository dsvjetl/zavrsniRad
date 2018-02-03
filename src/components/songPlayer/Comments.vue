<template>
    <div class="comments row">

        <div class="comments__all-comments col s8 offset-s2">

            <div
                    class="comments__comment"
                    v-for="count in 10"
            >
                <h5
                    @mouseover="commentTitleHover($event)"
                    @mouseleave="commentTitleBlur"
                >
                    {{count}}. Domagoj Svjetličić
                </h5>
                <p
                        class="comment-content"
                        ref="commentContent"
                >
                    It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking at its layout. The point of usin
                    g Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                    as opposed to using 'Content here
                </p>
            </div>

            <div class="comments__my-comment">
                <textarea
                    class="col s8 offset-s2"
                    placeholder="Add your comment..."
                ></textarea>

                <button class="btn col s4 offset-s1 m2 offset-m3 comments__add-comment-btn">
                    Add comment
                </button>

                <button class="btn col s4 offset-s2 m2 offset-m2 comments__download-btn">
                    Download song
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'comments',

        methods: {

            commentTitleHover($event) {

                const titleEl = $event.srcElement;
                const commentEl = titleEl.nextSibling.nextSibling;

                commentEl.style.color = '#FEFFFE';

            },
            commentTitleBlur() {

                this.$refs.commentContent.forEach(commentContent => {
                    commentContent.style.color = 'rgba(254, 255, 254, 0.5)';
                });

            }

        }
    }
</script>

<style lang="scss" scoped>

    .comments {

        position: absolute;
        top: 260px;
        left: 0;
        width: 100vw;
        height: calc(100% - 260px);
        /*background-color: green;*/
        z-index: 1;
        margin: 0;

        &__all-comments {

            height: 70%;
            overflow: hidden;
            overflow-y: auto;
            color: $white-almost;
            padding: 0 20px;
            transition: background-color .3s ease-in-out;

            &:hover {
                background-color: transparentize($black, .2);
            }
        }

        &__comment {

            h5 {
                font-size: 20px;
                transition: all .3s ease-in-out;
                transform-origin: left top;

                &:hover {
                    transform: scale(1.2);
                }
            }

            p {
                font-size: 13px;
                color: transparentize($white-almost, .5);
                transition: all .5s;
            }

        }

        &__my-comment {

            position: absolute;
            left: 0;
            bottom: 0;
            height: 30%;
            width: 100vw;

            textarea {
                padding: 5px 7px;
                width: 100%;
                resize: none;
                height: 40%;
                color: $white-almost;
                border-radius: 5px;
            }

            button {
                margin-top: 10px;
            }
        }

        &__add-comment-btn {
            background-color: $white-almost;
            color: $black;
        }

        &__download-btn {
            background-color: gold;
            color: $black;
        }

    }

</style>
