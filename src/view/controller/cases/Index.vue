<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue'
    import { ArrowRight } from '@element-plus/icons-vue'
    import Cases from '@/api/Cases'
    import router from '@/router';

    interface dataItem{
        id: number
        title: string
        pic: string
        hits?: number
        content: string
        sort?: number
        create_time?: string
    }

    const pageTitle = ref('客户案例')
    const crumb = ref([{id:1,title:'客户案例',url:''}])
    const carouselLength = ref(0)
    const carouselData = ref()
    const currentIndex = ref(1)
    const itemData = ref()
    const itemContent = ref('')

    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
        await getCarousel()
        await getAbout()
    }

    const getCarousel = async () => {
        carouselData.value = [
            {id:1,title:'',img:'/images/about.jpg'}
        ]

        let len = 0
        Object.entries(carouselData.value).forEach((item)=>{
            len++
        })
        carouselLength.value = len
    }

    const getAbout = async () => {
        const res = await Cases.get()
        itemData.value = res.data.data

        getItemContent(currentIndex.value)
    }

    const getItemContent = async (id:number) => {
        let res = itemData.value.find((item:any)=>{
            return item.id == id
        })
        itemContent.value = res.content
    }

    const changeCrumb = async (url:string) => {
        if(url == ''){
            return false
        }
        router.push(url)
    }

    const changeMenu = async (id:number) => {
        getItemContent(id)
    }
</script>

<template>
    <el-carousel :indicator-position="carouselLength > 1 ? 'inside' : 'none'" :arrow="carouselLength > 1 ? 'always' : 'never'" trigger="click" height="600px">
        <el-carousel-item v-for="item in carouselData" :key="item.id">
            <img :src="item.img" class="w-[100%]">
        </el-carousel-item>
    </el-carousel>

    <div class="container mx-auto">
        <div class="flex items-center my-5">
            <span>您的位置：</span>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <template v-for="item in crumb" :key="item.id">
                    <el-breadcrumb-item @click="changeCrumb(item.url)">{{item.title}}</el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </div>
    </div>

    <div class="container mx-auto mt-5 mb-[100px]">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card class="box-card mt-5">
                    <template #header>
                    <div class="card-header">
                        <span class="font-bold">{{pageTitle}}</span>
                    </div>
                    </template>
                    <div v-for="item in itemData" :key="item.id" class="text item" @click="changeMenu(item.id)">{{ item.title }}</div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <div v-html="itemContent" class="leading-8"></div>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .text {
        font-size: 14px;
    }

    .item {
        padding:15px;
        cursor: pointer;
    }
    .item:hover{
        background-color: #7f9bf6;
        color: #FFFFFF;
    }

</style>