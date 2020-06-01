<route-meta>
  {
    "title": "LowDB-LocalStorage"
  }
</route-meta>

<template>
  <story-container>
    <el-button-group>
      <el-button @click="addPost" type="primary">Add Post</el-button>
      <el-button @click="reloadPost" type="primary">Refresh</el-button>
      <el-button @click="clearPost" type="primary">Clear</el-button>
    </el-button-group>
    <overlay-scrollbars style="height: 350px;" class="os-theme-light">
      <ul>
        <li v-for="(post, i) in posts" :key="i">
          <el-tag>{{post.id}}</el-tag>
          <el-divider direction="vertical" />
          <el-tag>{{post.title}}</el-tag>
        </li>
      </ul>
    </overlay-scrollbars>
    <div slot="footer">
      <source-code>
        <el-button type="text" size="mini" icon="el-icon-link">
          Source code of this page
        </el-button>
      </source-code>
    </div>
  </story-container>
</template>

<script>

import { addPost, getPosts, clearPost } from '@/utils/DBUtils'
import dayjs from 'dayjs'

export default {
  name: 'lowdb-localStorage',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.reloadPost()
  },
  methods: {
    addPost () {
      addPost({ id: `${new Date().getTime()}`, title: dayjs().format('YYYY-MM-DD hh:mm:ss:SSS') })
      this.reloadPost()
    },
    clearPost () {
      clearPost()
      this.reloadPost()
    },
    reloadPost () {
      this.posts = [...getPosts()]
    }
  }
}
</script>

<style scoped>

</style>
