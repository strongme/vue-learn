<route-meta>
  {
  "title": "Axios"
  }
</route-meta>

<template>
  <story-container>
    Axios
    <button @click="doGet">DO GET</button>
  </story-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'axios',
  methods: {
    doGet () {
      return axios({
        url: `http://www.google.com/search?pids=${[1, 2, 3]}`,
        method: 'get'
      })
    }
  }

}
</script>
