<template>
  <Button class="position-fixed t-30vh r-0 bg-red" @click="changeDrawer">
  聚合服务
</Button>
  <Drawer width="600" v-model:visible="controlDrawer" >
    <div class="p-b-8" v-for="item of unReadChatInfoArr" :key="item.talker_id">
      {{item}}
    </div>
</Drawer>
</template>

<script lang="ts" setup>
import './style/auto.css'
import 'ant-design-vue/dist/antd.css'
import { Drawer, Button } from 'ant-design-vue'
import { useToggle } from '@vueuse/core'
import apis from '@/http/apis'
import { onMounted } from 'vue'
import { IGetSessionInterFace } from './interface/getSessionInterFace'

const [controlDrawer, changeDrawer] = useToggle()
let unReadChatInfoArr:IGetSessionInterFace['session_list'] = []
async function getAllSession (end_ts:null|number = null) {
  const params = {
    session_type: 1,
    group_fold: 1,
    unfollow_fold: 0,
    sort_rule: 2,
    build: 0,
    mobi_app: 'web',
    size: 100,
    end_ts
  }
  const { session_list = [] } = await apis.getSession(params)
  unReadChatInfoArr = unReadChatInfoArr.concat(session_list?.filter(_ => _) ?? [])
  if (session_list?.some(info => info.unread_count > 0)) {
    getAllSession(session_list[session_list.length - 1].session_ts)
  }
}
onMounted(getAllSession.bind(null))
</script>

<style lang="less">

</style>
