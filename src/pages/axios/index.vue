<route-meta>
  { "title": "Axios" }
</route-meta>

<template>
  <story-container>
    <avue-crud
      :data="data"
      :option="option"
      v-model="form"
      @search-change="loadData"
    />
  </story-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'axios',
  data () {
    return {
      form: {},
      data: [],
      option: {
        title: '表格的标题',
        page: false,
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'name',
            search: true
          },
          {
            label: '手机',
            prop: 'mobile',
            search: true
          },
          {
            label: '邮箱',
            prop: 'email',
            search: true
          }
        ]
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData (params, done) {
      this.data = []
      api.DEMO_LIST(true).then(res => {
        done && done()
        const { code, data } = res.data
        if (code === 0) {
          this.data = data
        }
      }).catch(error => {
        this.$message.error(error)
      })
    }
  }

}
</script>
