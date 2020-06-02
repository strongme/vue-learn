<template>
  <span>
    <van-nav-bar
      title="Vant"
    >
      <template #left>
        <van-icon name="wap-nav" />
      </template>
    </van-nav-bar>
    <overlay-scrollbars>
      <router-view/>
    </overlay-scrollbars>
  </span>
</template>

<script>
import { NavBar, Icon } from 'vant'
export default {
  name: 'layout-vant',
  components: {
    VanNavBar: NavBar,
    VanIcon: Icon
  },
  data () {
    return {
      showSidebar: false,
      activeKey: 0
    }
  },
  watch: {
    // eslint-disable-next-line no-useless-computed-key
    ['$route.name']: {
      immediate: true,
      deep: true,
      handler (newV) {
        console.log(newV)
      }
    }
  }
}
</script>

<style scoped>

</style>
