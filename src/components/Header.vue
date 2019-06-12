<template>
  <span style="width:100%;">
    <nav class="navbar navbar-expand-lg">
      <div class="l-navbar-l">
        <transition>
          <div class="l-navbar-b" :class="{'l-navbar-b-small':!isAsideShow}">
            <a class="navbar-brand navbar-brand-font" href="#">
              <i class="fab fa-windows"></i>
              <span class="d-none d-md-inline" v-if="isAsideShow"> UI Template </span>
            </a>
          </div>
        </transition>
        <div class="l-v-line" style="height:95%;"></div>
        <div class="l-navbar-m">
          <button class="btn btn-link d-none d-md-block" @click="$store.state.isAsideShow=!isAsideShow" style="cursor:pointer;" title="显示隐藏菜单">
            <i class="fas fa-bars" :class="[{'fa-rotate-90':!isAsideShow}]"></i>
          </button>
          &nbsp;***有限公司UI Template
        </div>
      </div>
      <div class="l-navbar-r d-none d-md-flex">
        <!--职责/角色[区域]-->
        <div class="btn-group">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-tasks fa-icon--left"></i>
            {{loginAccount.currentRole ? loginAccount.currentRole.roleName:'未设置当前职责'}} [{{loginAccount.currentOrgId
            < 0 ? " " :loginAccount.currentOrgId}}] </button>
              <div class="
            dropdown-menu
            dropdown-menu-right-imp
            l-box-shadow">
                <ul class="list-group">
                  <li :class="listItemClass" v-for="role in loginAccount.accountRoleAssigns" :key="role.key">
                    <span>
                      <i class="fas fa-user fa-fw fa-icon--left-2x" :class="{'text-warning':role.isDefaultRole==1}"></i>{{role.fndPrvRole.roleName}}[{{role.orgId}}]</span>
                    <span class="badge-pill">{{role.isDefaultRole==1?'[默认]':''}}</span>
                  </li>
                  <li :class="listItemClass" class="text-danger" v-if="loginAccount.accountRoleAssigns == null">
                    <span>
                      <i class="fas fa-user fa-fw fa-icon--left-2x"></i>未分配职责,请联系管理员！</span>
                  </li>
                </ul>
              </div>
        </div>
        <div class="l-v-line align-self-center" style="height:95%;"></div>
        <!--用户-->
        <div class="btn-group">
          <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-user fa-icon--left"></i>{{loginAccount.username}}
          </button>
          <div class="dropdown-menu dropdown-menu-right-imp l-box-shadow">
            <a class="dropdown-item list-group-item l-list-item bg-light" href="#">
              <i class="fas fa-key fa-icon--left-2x"></i>修改密码</a>
            <a class="dropdown-item list-group-item l-list-item bg-light" href="#" data-toggle="modal" data-target="#setting">
              <i class="fas fa-cogs fa-icon--left-2x"></i>系统设置</a>
            <a class="dropdown-item list-group-item l-list-item bg-light" href="/logout">
              <i class="fas fa-sign-out-alt fa-icon--left-2x"></i>退出系统</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item list-group-item l-list-item bg-light" href="/views/help/" target="_blank">
              <i class="fas fa-question fa-icon--left-2x"></i>帮助</a>
            <a class="dropdown-item list-group-item l-list-item bg-light" href="#" data-toggle="modal" data-target="#about">
              <i class="fas fa-paperclip fa-icon--left-2x"></i>关于</a>
          </div>
        </div>
      </div>
    </nav>
    <v-setting ></v-setting>
    <v-about></v-about>
  </span>
</template>

<script>
import vSetting from '@/components/Setting.vue'
import vAbout from '@/components/About.vue'
import { mapState } from 'vuex'
export default {
  name: 'vHeader',
  data () {
    return {
      vMessageShow: false,
      listItemClass: 'list-group-item d-flex justify-content-between align-items-center l-list-item-l border-primary bg-light text-nowrap'
    }
  },
  computed: {
    ...mapState([
      'yesOrNo',
      'theme',
      'themeMap',
      'themeMap2',
      'statusMap',
      'isAsideShow',
      'loginAccount'
    ])
  },
  components: { vSetting, vAbout },
  mounted () {
    this.$axios.all([this.getLoginAccount()])
  },
  methods: {
    getLoginAccount: function () {
      const _self = this
      return _self.$http.get('/login/account')
        .then(function (res) {
          _self.$store.state.loginAccount = res.data
        })
        .catch(function (error) {
          _self.$message({ showClose: true, message: error.message, type: 'error' })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.dropdown-menu-right-imp {
  right: 1px;
  left: auto;
}
.navbar-brand-font {
  font-size: 1.5rem;
}
.message-show {
  display: block;
}
</style>
