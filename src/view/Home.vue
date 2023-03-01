<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import Config from '@/api/Config'
    import Navigation from '@/api/Navigation'

    const configData = ref()
    const navigationData = ref()

    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
        await getConfig()
        await getNavigation()
    }

    const getConfig = async () => {
        const res = await Config.value('system')
        configData.value = res.data.data
    }

    const getNavigation = async () => {
        const res = await Navigation.get()
        navigationData.value = res.data.data
    }
</script>

<template>
    <el-container class="h-screen">
        <el-header height="120px">
            <template-header :data="navigationData" :configData="configData" />
        </el-header>
        <el-main class="p-0">
            <router-view />
            <div class="p-0">
                <template-footer :data="navigationData" :configData="configData" />
            </div>
        </el-main>
    </el-container>
</template>

<style scoped>

</style>