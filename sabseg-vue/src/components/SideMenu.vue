<template>
    <div class="menu-cont">
        <img class="logo-img" src="../assets/images/logoB.png" />
        <div class="menu-options">
            <n-tag v-model:checked="checked" checkable>
                My profile
            </n-tag>
            <n-tag v-model:checked="checked" checkable>
                My membership
            </n-tag>
            <n-tag v-model:checked="checked" checkable>
                Membership administration
            </n-tag>
        </div>


    </div>
</template>
  
<script>

</script>


<style scoped>
.menu-cont {
    display: flex;
    flex-direction: column;
    width: 30%;
   align-items: center;
}

.menu-cont .n-tag {
    margin: 10px;
    font-size: 20px;
}

.logo-img {
    width: 90%;
    padding-top: 5%;
}

.menu-options {
    margin-top: 10%;
}
</style>