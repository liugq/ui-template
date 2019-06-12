<template>
    <div id="app" class="l-app l-el-compack">
        <div class="l-header" :class="themeClass">
            <v-header></v-header>
        </div>
        <div class="l-main d-flex flex-row ">
            <transition name="l-slide-left">
                <div class="l-aside d-none d-md-block l-el-compack" v-if="isAsideShow" :class="themeClass">
                    <v-aside></v-aside>
                </div>
            </transition>
            <div class="l-v-line"></div>
            <div class="l-container">
                <router-view></router-view>
            </div>
        </div>
        <div class="l-footer">
            <v-footer></v-footer>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import vHeader from '@/components/Header.vue'
import vFooter from '@/components/Footer.vue'
import vAside from '@/components/Aside.vue'
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'theme',
      'themeMap2',
      'isAsideShow'
    ]),
    themeClass () {
      return this.themeMap2[this.theme].bg +
      ' ' +
      this.themeMap2[this.theme].text
    }
  },
  components: {
    vHeader,
    vFooter,
    vAside
  }
}
</script>
