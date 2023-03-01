import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router"

class News{
    table = 'news'

    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:this.table+'/'+id})
    }

    cate(cid:number = 0){
        return http.request({url:this.table+'/cate/'+cid})
    }

    show(data:Object){
        return http.request({method:'post',url:this.table+'/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: this.table+'/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: this.table+'/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: this.table+'/save',
            data: qs.stringify(data)
        })
    }

    del(id:string|number){
        return http.request({
            method:'post',
            url: this.table+'/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new News()
