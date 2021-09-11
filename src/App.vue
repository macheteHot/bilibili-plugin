<template>
  <Button class="position-fixed t-30vh r-0 bg-red z-index-999" @click="changeDrawer">
  聚合服务
</Button>
  <Drawer v-model:visible="controlDrawer" >
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum perspiciatis error unde dolorem, tempore nemo quas dicta eaque possimus, maiores voluptate repellendus, adipisci officia hic rem tenetur mollitia molestias? In.</p>
  </Drawer>
</template>

<script lang="ts" setup>
import './style/auto.css'
import 'ant-design-vue/dist/antd.css'
import { Drawer, Button } from 'ant-design-vue'
import { useToggle } from '@vueuse/core'
import apis from '@/http/apis'
import { onMounted } from 'vue'

const [controlDrawer, changeDrawer] = useToggle()
// const sessionList = []
async function getAllSession (end_ts = '') {
  console.log('hahahah')
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
  const { session_list } = await apis.getSession(params)
  console.log(session_list)
}
onMounted(getAllSession.bind(null))
</script>

<style lang="less">

</style>
