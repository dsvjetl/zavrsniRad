<template>
    <div class="sign-up">
        <div>
            <div class="input-field">
                <input
                        id="dava-app-username"
                        type="text"
                        autocomplete="off"
                        v-model="username"
                >
                <label for="dava-app-username">Username</label>
            </div>
            <div class="input-field">
                <input
                        id="dava-app-password"
                        type="password"
                        autocomplete="off"
                        v-model="password"
                >
                <label for="dava-app-password">Password</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sign-up',
        data() {
            return {
                username: '',
                password: ''
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>