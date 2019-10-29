
import User from '@/components/user.vue'

const obj = {
    install:function(val){
        val.component('user',User)
    }
}


export default obj;