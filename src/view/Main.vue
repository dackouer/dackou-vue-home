<script setup lang="ts">
    import { onMounted, ref } from "vue"
    import Carousel from '@/api/Carousel'
    import Product from '@/api/Product'
    import Cases from '@/api/Cases'
    import News from '@/api/News'

    const carouselData = ref()
    const productData = ref()
    const caseData = ref()
    const newsData = ref()
    const imageHeight = ref(0)

    onMounted(async ()=>{
        await init()
    })

    const init = async () => {
        await getCarousel()
        await getProduct()
        await getCase()
        await getNews()
    }

    const getCarousel = async () => {
        const res = await Carousel.get()
        carouselData.value = res.data.data

        changeHeight(0)
    }

    const getProduct = async () => {
        const res = await Product.get()
        productData.value = res.data.data
    }

    const getCase = async () => {
        const res = await Cases.get()
        caseData.value = res.data.data
    }

    const getNews = async () => {
        const res = await News.get()
        newsData.value = res.data.data
    }   

    const scrollTo = (options: ScrollToOptions | number, yCoord?: number) => {
        console.log(options,yCoord)
    }

    const changeHeight = (e:number) => {
        const item = carouselData.value.find((item:any,index:number)=>{
            return index == e
        })
        
        let img = getImageHeight(item.url)

        console.log(img)
    }

    const getImageHeight = (url:string) => {
        return new Promise((resolve,reject)=>{
            let img = new Image()
            img.src = url+'?r='+Math.random().toString().split('.').pop()
            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height
                })
            }
            img.onerror = () => {
                reject('error')
            }
        })

        // var img = new Image()
        // img.src = url+'?r='+Math.random().toString().split('.').pop()
        // console.log('img height: '+img.height)
        // return img.height
    }
</script>

<template>
    <el-carousel indicator-position="inside" arrow="always" trigger="click" :height="imageHeight+'px'" @change="changeHeight">
        <el-carousel-item v-for="item in carouselData" :key="item.id">
            <img :src="item.img" class="w-[100%]">
        </el-carousel-item>
    </el-carousel>

    <div class="container mx-auto py-[100px]">
        <div class="text-center">
            <h5 class="text-2xl text-gray-700">科技创新 精益求精</h5>
            <h3 class="text-4xl font-bold mt-5">德立恒为客户提供满意的设备</h3>
            <el-divider class="w-[50%] mx-auto" />
            <p class="text-gray-500">DELIHENG PROVIDES CUSTOMERS WITH SATISFACTORY EQUIPMENT</p>
            <p class="mt-7 px-[130px] text-gray-500 leading-8">苏州德立恒超声科技有限公司是一家专业从事自动化焊接设备，超声波焊接设备，塑料焊接设备，超声波金属焊接设备研制、生产、销售、服务为一体的现代化高科技型企业。 
公司设计生产的系列塑料焊接设备已广泛应用于汽车、电子、新能源、医疗器械、环保、家电、无纺布/服装、包装、玩具、水处理等行业，客户已遍布全国各个省市。</p>

            <el-button type="danger" plain class="py-[25px] px-[50px] mt-7">查看详情</el-button>
        </div>

        <el-row :gutter="20" class="mt-10">
            <el-col :span="6" class="text-center bg-no-repeat bg-center py-12" style="background-image:url(/images/about01.png)">
                <h3 class="text-4xl">01</h3>
                <h5 class="text-xl mt-2">公司概况</h5>
                <p class="text-xs text-gray-500 mt-1">COMPANY ABOUT</p>
            </el-col>
            <el-col :span="6" class="text-center bg-no-repeat bg-center py-10" style="background-image:url(/images/about02.png)">
                <h3 class="text-4xl">01</h3>
                <h5 class="text-xl mt-2">公司概况</h5>
                <p class="text-xs text-gray-500 mt-1">COMPANY ABOUT</p>
            </el-col>
            <el-col :span="6" class="text-center bg-no-repeat bg-center py-10" style="background-image:url(/images/about03.png)">
                <h3 class="text-4xl">01</h3>
                <h5 class="text-xl mt-2">公司概况</h5>
                <p class="text-xs text-gray-500 mt-1">COMPANY ABOUT</p>
            </el-col>
            <el-col :span="6" class="text-center bg-no-repeat bg-center py-10" style="background-image:url(/images/about04.png)">
                <h3 class="text-4xl">01</h3>
                <h5 class="text-xl mt-2">公司概况</h5>
                <p class="text-xs text-gray-500 mt-1">COMPANY ABOUT</p>
            </el-col>
        </el-row>
    </div>

    <div class="bg-gray-50 py-[100px]">
        <div class="container mx-auto text-center mb-[50px]">
            <el-divider>
                <h5 class="text-4xl font-bold">超声焊接设备 展现核心竞争力</h5>
            </el-divider>
        </div>
        <el-carousel type="card" :autoplay="false" indicator-position="none" arrow="always" height="650px">
            <el-carousel-item v-for="item in productData" :key="item.id">
                <div class="text-center relative">
                    <img :src="item.pic" class="w-[100%]">
                    <div class="absolute bottom-[20px] w-[100%]">
                        <div class="text-center text-xl">{{item.title}}</div>
                        <div class="text-center text-sm text-gray-600 mt-3">{{item.keyword}}</div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>

    <div class="py-[100px]">
        <div class="container mx-auto text-center mb-[50px]">
            <el-divider>
                <h5 class="text-4xl font-bold">应用案例 提供优质解决方案</h5>
            </el-divider>

            <el-row :gutter="20" class="mt-5">
                <template v-for="(item,index) in caseData" :key="item.id">
                    <el-col :span="8" class="mt-5" v-if="index == 0">
                        <img :src="item.pic" class="w-[100%] h-[100%]" />
                    </el-col>
                </template>
                <el-col :span="16">
                    <el-row :gutter="20">
                        <template v-for="(item,index) in caseData" :key="item.id">
                            <el-col :span="12" class="mt-5" v-if="index > 0 && index < 5">
                                <img :src="item.pic" class="w-[100%]" />
                            </el-col>
                        </template>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>

    <div class="py-[100px]" style="background-color:#966af1;">
        <div class="container mx-auto">
            <h5 class="text-center text-4xl text-white font-bold">创造自身价值 助力客户前行</h5>
            <p class="text-center text-xl text-white mt-5">德立恒凭借精湛的技术、优质的设备和专业的服务，与全国多家公司合作，达成长期战略合作关系！</p>

            <div class="my-10 mx-[100px]">
                <el-scrollbar @scrollTo="scrollTo">
                    <div class="scrollbar-flex-content">
                    <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
                        <img src="/images/l1.jpg">
                    </p>
                    </div>
                </el-scrollbar>
            </div>

            <div class="my-10 mx-[100px]">
                <el-row :gutter="20">
                    <el-col :span="4" class="text-white text-2xl pt-1">服务承诺</el-col>
                    <el-col :span="20" class="text-right">
                        <el-button plain class="text-white px-[44px] py-[22px] rounded-3xl">多年行业经验</el-button>
                        <el-button plain class="text-white px-[44px] py-[22px] rounded-3xl">专业研发团队</el-button>
                        <el-button plain class="text-white px-[44px] py-[22px] rounded-3xl">产品严格检测</el-button>
                        <el-button plain class="text-white px-[44px] py-[22px] rounded-3xl">超声波专利技术</el-button>
                        <el-button plain class="text-white px-[44px] py-[22px] rounded-3xl">客服服务向导</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>

    <div class="py-[100px]">
        <div class="container mx-auto">
            <h5 class="text-center text-4xl font-bold">聚焦行业热点 洞察实时资讯</h5>

            <div class="my-10 mx-[100px]">
                <el-row :gutter="50">
                    <el-col :span="12" class="mt-5">
                        <img src="/images/t.png" class="inline-block mr-1" />
                        <h5 class="inline-block font-blod">热点资讯</h5>
                    </el-col>
                    <el-col :span="12" class="mt-5">
                        <img src="/images/t.png" class="inline-block mr-1" />
                        <h5 class="inline-block font-bold">产品知识</h5>
                    </el-col>
                    <el-col :span="12" class="mt-5" v-for="item in 6" :key="item">
                        <div class="flex border-gray-100 shadow-2xl p-5 rounded">
                            <img src="http://www.csbry.com/uploads/210916/1-210916160123594.jpg" class="rounded" style="width:180px;height:100px;" />
                            <div class="ml-5">
                                <h4 class="text-xl text-ellipsis font-bold">用超声波焊接，两个产品焊接不住是什么</h4>
                                <p class="text-xs leading-5 text-gray-600 mt-2">考虑超声波焊接机本身是否存在故障：1） 超声波发生器没有超声波输出，声波检测中没有电流和超声波。此时超声波机损坏，需要找技术人</p>
                                <p class="text-sm text-gray-700 mt-2">2022-11-20</p>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .scrollbar-flex-content {
    display: flex;
    }
    .scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100px;
    margin: 1px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
    }
</style>