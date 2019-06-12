<template>
  <div class="l-main-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>值列表管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="row">
      <div class="col-6">
        <v-lookuptype></v-lookuptype>
      </div>
      <div class="col-6">
        <v-lookupvalue></v-lookupvalue>
      </div>
    </div>
  </div>
</template>
<script>
import vLookuptype from './LookupTypeQuery.vue'
import vLookupvalue from './LookupValueQuery.vue'
export default {
  name: 'lookup-maintain',
  data () {
    return {
    }
  },
  components: {
    vLookuptype,
    vLookupvalue
  }
}
</script>
