<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import router from '@/router'
    import { ConfigSystemData } from '@/util/interface'

    const currentIndex = ref(0)

    onMounted(async ()=>{
        let nav_index = localStorage.getItem('nav_index')
        if(nav_index){
            currentIndex.value = parseInt(nav_index)
        }
    })

    interface ItemList{
        id: number
        title: string
        en_title: string
        url: string
    }
    const props = withDefaults(defineProps<{
        data: ItemList[],
        configData: ConfigSystemData
    }>(),{
    })

    const changeNavigation = (index:number,route:string) => {
        localStorage.setItem('nav_index',`${index}`)
        currentIndex.value = index
        router.push(route)
    }
</script>

<template>
    <div class="container mx-auto flex justify-between">
        <div class="flex items-center">
            <img :src="configData?.logo ? configData.logo : '/images/logo.png'" class="logo" alt="Vite logo" />
        </div>
        <div class="flex items-center">
            <ul>
                <li :class="['inline-block','p-9','text-center',currentIndex == index ? 'active' : '']" v-for="(item,index) in data" :key="item.id" @click="changeNavigation(index,item.url)">
                    <h5>{{item.title}}</h5>
                    <span :class="['text-sm']">{{item.en_title}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    ul{margin:0;padding:0;}
    .active,ul > li:hover{
        cursor: pointer;
        color: #FFFFFF !important;
        background-image: linear-gradient(to bottom right, #9b5eee,#7f9bf6);
    }
</style>