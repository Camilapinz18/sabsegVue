<script setup>


</script>

<template>
    <n-list class="profile-info" hoverable clickable>
        <n-list-item>
            <n-thing title="Name" content-style="margin-top: 10px;">
                <span>Jane Doe</span>
            </n-thing>
        </n-list-item>

        <n-list-item>
            <n-thing title="Email" content-style="margin-top: 10px;">
                <span>janedoe@gmail.com</span>
            </n-thing>
        </n-list-item>

        <n-list-item>
            <n-thing title="Phone" content-style="margin-top: 10px;">
                <span>+33 6 12 34 56 78</span>
            </n-thing>
        </n-list-item>

        <n-list-item>
            <n-thing title="Address" content-style="margin-top: 10px;">
                <span>32 Rue du Faubourg Saint-Antoine. 75012, Paris</span>
            </n-thing>
        </n-list-item>
        
    </n-list>
</template>

<style scoped>

.profile-info{
    width: 100%;
}
</style>
