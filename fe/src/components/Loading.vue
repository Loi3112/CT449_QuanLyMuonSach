<template>
    <div class="loading">
        <span class="loader"></span>
    </div>
</template>

<style scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: animloader 1s linear infinite;
}

@keyframes animloader {
    0% {
        box-shadow: -72px 0 #FFF inset;
    }

    100% {
        box-shadow: 48px 0 #FFF inset;
    }
}
</style>