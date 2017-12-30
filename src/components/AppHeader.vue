<template>
    <nav>
        <div class="nav-wrapper app-header">
            <a href="#">Logo</a>
            <ul class="right">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">JavaScript</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'app-header',
    }
</script>

<style lang="scss" scoped>
    .app-header {
        background-color: $black;
    }
</style>
