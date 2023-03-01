<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import type { FormInstance, FormRules } from 'element-plus'
    import { ConfigSystemData } from '@/util/interface'

    const form = reactive({username:'',contact:'',content:''})
    const ruleFormRef = ref<FormInstance>()

    interface ItemList{
        id: number
        title: string
        en_title: string
        router: string
    }
    const props = withDefaults(defineProps<{
        data: ItemList[],
        configData: ConfigSystemData
    }>(),{
    })

    const changeNavigation = (index:number) => {
        console.log('index: '+index)
    }

    const rules = reactive<FormRules>({
        username: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ]
    })

    const submit = async (formEl: FormInstance | undefined) => {
       if(form.username == ''){
           ElMessage('请填写您的称呼！')
           return false
       }
       if(form.contact == ''){
           ElMessage('请填写您的联系方式！')
           return false
       }
       if(form.content == ''){
           ElMessage('请填写您的留言内容！')
           return false
       }

       ElMessage({message:'恭喜您，留言成功！',type: 'success'})
    }
</script>

<template>
    <div class="py-[30px] bg-gray-100">
        <div class="container mx-auto">
            <el-row :gutter="50">
                <el-col :span="4" class="text-white text-2xl pt-1">
                    <img src="http://www.csbry.com/skin/images/logo2.png" alt="" >
                </el-col>
                <el-col :span="20" class="text-right">
                    <el-button v-for="item in data" :key="item.id" link class="text-base mx-5 mt-4">{{ item.title }}</el-button>
                </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="50">
                <el-col :span="8" class="mt-5">
                    <h5 class="text-xl py-5">联系我们</h5>
                    <p class="mb-2">地址：{{configData?.address ? configData.address : '江苏省苏州市太仓市凤杨路128号'}}</p>
                    <p class="mb-2">电话：{{configData?.mobile ? configData.mobile+'('+configData.contact+')' : '13962529671（赵工）'}}</p>
                    <p class="mb-2">邮箱：{{configData?.email ? configData.email : '393623106@qq.com'}}</p>
                </el-col>
                <el-col :span="8" class="mt-5">
                    <div class="flex text-center"><img src="http://www.csbry.com/skin/images/ewm.jpg" /></div>
                </el-col>
                <el-col :span="8" class="text-right">
                    <el-form :model="form" size="large" ref="ruleFormRef" :rules="rules" label-width="120px">
                        <el-form-item label="您的称呼">
                            <el-input v-model.trim="form.username" />
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model.trim="form.contact" />
                        </el-form-item>
                        <el-form-item label="留言内容">
                            <el-input v-model.trim="form.content" type="textarea" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit(ruleFormRef)" class="bg-blue-400">确认留言</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="py-[30px]" style="background-color:#966af1;">
        <div class="container mx-auto text-center text-white">
            <p class="text-sm">Copyright © {{configData?.copy_right ? configData.copy_right : '嵘通科技'}}  All Rights Reserved 备案号：<a href="https://beian.miit.gov.cn">{{configData?.icp ? configData.icp : '苏ICP备2021046374号-1'}}</a> 技术支持：国商科技</p>
            <p class="text-sm mt-3">友情链接： 超声波焊接机 直线导轨 不锈钢吨桶 机器人上下料 激光切割加工 实验台 喷砂加工 plc控制柜 气动执行器 超声波焊接机</p>
        </div>
    </div>
</template>

<style scoped>

</style>