import Vue from 'vue';

export default Vue.filter('songName', value => {

    return value.split('.mp3')[0];

});