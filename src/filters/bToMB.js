import Vue from 'vue';

export default Vue.filter('bToMB', value => {

    let numberBytes = Number(value);
    numberBytes = (numberBytes * Math.pow(10, -6)).toFixed(2);

    return numberBytes;

});