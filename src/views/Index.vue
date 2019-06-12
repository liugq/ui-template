<template>
  <div class="l-main-container">
    <h1>Index</h1>
    <h1>主页</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'iconsWithTheme'
    ]
    )
  }
}
</script>
<style lang="scss" scoped>
.header{
  background-image: url('/img/bg.png');
  background-repeat: no-repeat;
  background-position:top right;
  background-size: contain;
}
.list-group-item:first-child1 {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.list-group-item:last-child1 {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
