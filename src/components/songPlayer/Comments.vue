<template>
    <div class="comments row">

        <div
                class="comments__all-comments col m8 offset-m2 s12"
                ref="allComments"
        >

            <div
                    class="comments__comment"
                    v-for="(songComment, index) in songComments"
            >
                <h5
                    @mouseover="commentTitleHover($event)"
                    @mouseleave="commentTitleBlur"
                >
                    {{ index + 1 }}. {{ `${songComment.userFirstName} ${songComment.userLastName}` }}
                </h5>
                <p
                        class="comment-content"
                        ref="commentContent"
                >
                    {{ songComment.komentar }}
                </p>
            </div>

            <div class="comments__my-comment">
                <textarea
                    class="col m8 offset-m2 s12"
                    placeholder="Add your comment... [Press Enter to add]"
                    v-model="comment"
                    @keypress.enter="addYourComment"
                ></textarea>

                <button
                        class="btn col s4 offset-s1 m2 offset-m3 comments__add-comment-btn"
                        @click="addYourComment"
                >
                    Add comment
                </button>

                <button
                        class="btn col s4 offset-s2 m2 offset-m2 comments__download-btn"
                        @click="downloadSong"
                >
                    Download song
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    // Event bus
    import {EventBus} from "../../main";

    export default {
        name: 'comments',

        data() {
            return {
                comment: ''
            }
        },

        props: {
            songId: String,
            songObject: Object
        },

        computed: {

            songComments() {
                return this.$store.getters.songComments;
            }

        },

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

            },
            addYourComment($event) {

                $event.preventDefault();

                const request = {
                    songId: this.songId,
                    comment: this.comment
                };

                if (this.comment.length > 0) {

                    this.$store.dispatch('commentSong', request);
                    this.comment = '';

                }
                else {
                    console.warn('Comment is empty!');
                }

            },
            scrollCommentsContainer() {

                setTimeout(() => {
                    const commentsContainer = this.$refs.allComments;
                    commentsContainer.scrollTop = commentsContainer.scrollHeight;
                }, 100);

            },
            downloadSong() {

                let aEl = document.createElement('a');
                aEl.setAttribute('href', this.songObject.url);
                aEl.setAttribute('download', this.songObject.name);

                aEl.click();

            }

        },

        mounted() {



        },

        created() {

            EventBus.$on('newCommentAdded', () => {
                this.scrollCommentsContainer();
            });

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

                @media screen and (max-width: 1000px) {
                    font-size: .8rem;
                }

                @media screen and (max-width: 820px) {
                    font-size: .7rem;
                }

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
