<template>
    <div class="spinner-container d-flex justify-content-center align-content-center">
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppSpinnerLoad'
}
</script>

<style lang="scss" scoped>
div.spinner-border {
    width: 8em;
    height: 8em;

}

.spinner-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
}
</style>