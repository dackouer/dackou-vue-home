<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue'
    import { ArrowRight } from '@element-plus/icons-vue'
    import { useRouter, useRoute } from 'vue-router';
    import News from '@/api/News'
    import NewsCate from '@/api/NewsCate'

    interface dataItem{
        id: number
        title: string
        pic: string
        hits?: number
        content: string
        sort?: number
        create_time?: string
    }

    const id = ref(0)
    const cid = ref(0)
    const router = useRouter(), route = useRoute()
    const pageTitle = ref('新闻类别')
    const crumb = ref([{id:1,title:'新闻中心',url:''}])
    const carouselLength = ref(0)
    const carouselData = ref()
    const currentIndex = ref(1)
    const itemData = ref()
    const cateData = ref()
    const itemContent = ref()

    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
        const param_id = route.params.id ? route.params.id! : route.query.id!
        const param_cid = route.params.cid ? route.params.cid! : route.query.cid!
        if(param_id){
            id.value = param_id as unknown as number
            await getItemContent(id.value)
        }
        if(param_cid){
            cid.value = param_cid as unknown as number
        }
        console.log('id: '+id.value)
        await getCarousel()
        await getAbout()
        await getCateData()
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
        const res = await News.get()
        itemData.value = res.data.data
    }

    const getCateData = async () => {
        const res = await NewsCate.get()
        cateData.value = res.data.data
    }

    const getItemContent = async (id:number) => {
        let res = itemData.value.find((item:any)=>{
            return item.id == id
        })
        itemContent.value = res
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

    const toCate = async (news_cid:number) => {
        id.value = 0
        itemContent.value = {}
        cid.value = news_cid
        if(news_cid){
            router.push('../news?cid='+news_cid)
        }else{
            router.push('../news')
        }
    }

    const toDetail = async (news_id:number) => {
        id.value = news_id
        await getItemContent(id.value)
        router.push('../news?id='+news_id)
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
                    <div class="text item" @click="toCate(0)">全部</div>
                    <div v-for="item in cateData" :key="item.id" class="text item" @click="toCate(item.id)">{{ item.title }}</div>
                </el-card>
                <el-card class="box-card mt-5">
                    <template #header>
                    <div class="card-header">
                        <span class="font-bold">新闻资讯</span>
                    </div>
                    </template>
                    <div v-for="item in itemData" :key="item.id" class="text item" @click="toDetail(item.id)">{{ item.title }}</div>
                </el-card>
                <el-card class="box-card mt-5">
                    <template #header>
                    <div class="card-header">
                        <span class="font-bold">联系我们</span>
                    </div>
                    </template>
                    <ul>
                        <li class="font-bold mb-3 text-center">湖南省中湘集团</li>
                        <li class="text-list">联系人：赵冰</li>
                        <li class="text-list">电话：13962529671</li>
                        <li class="text-list">座机：13962529671</li>
                        <li class="text-list">邮箱：393623106@qq.com</li>
                        <li class="text-list">地址：江苏省苏州市太仓市凤杨路128号</li>
                    </ul>
                </el-card>
            </el-col>
            <el-col :span="18">
                <template v-if="id">
                    <div class="mt-5">
                        <h4 class="font-bold">{{itemContent.title}}</h4>
                        <p class="text-xs text-gray-500 mt-3">{{itemContent.create_time}}</p>
                        <el-divider border-style="dashed" />
                        <div v-html="itemContent.content" class="leading-10 text-gray-700"></div>
                    </div>
                </template>
                <template v-for="item in itemData" :key="item.id" v-else>
                    <div class="mt-5 news-list" v-if="cid ? item.cate_id == cid : 1 == 1">
                        <el-card shadow="never" class="news-card border-0">
                            <template #header>
                            <div class="card-header">
                                <span>{{item.title}}</span>
                                <el-button class="button" text>{{item.create_time}}</el-button>
                            </div>
                            </template>
                            <div>
                                <p class="text-gray-500 text-sm leading-7">{{item.desc}}</p>
                                <el-button type="primary" plain class="px-[40px] py-[20px] mt-4" @click="toDetail(item.id)">了解详情</el-button>
                            </div>
                        </el-card>
                    </div>
                </template>
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

    .text-list{
        padding:15px;
        font-size: 14px;
        border-bottom: 1px solid #EEE;
    }

    .news-list{
        border: 1px solid #EEE;
        padding: 20px;
    }

    .news-card{
        border: unset !important;
    }
</style>