<template>
  <div class="l-el-compack">
    <v-card :isDisplayFooter="false">
      <span slot="title" class="align-bottom">
        <template v-if="this.currentRoleRow">
         "{{this.currentRoleRow.roleName}}"的菜单列表:
        </template>
        <template v-else>
          <span class="text-warning">没有选择职责/角色</span>
        </template>
      </span>
      <button slot="header-right" type="button" class="btn btn-link l-btn" @click="handleAddPre" title="添加菜单" v-if="currentRoleRow?true:false">
        <i :class="iconsWithTheme.plus"></i>
      </button>
      <div slot="body">
        <ul class="list-group">
          <!--显示 -->
          <li class="list-group-item d-flex justify-content-between align-items-center l-list-item-l border-primary bg-light text-nowrap" v-for="(item,index) in dataList" :key="index">
            <div class="float-left">
              <i :class="[item.fndMenu.menuIcon,themes.icon]"></i>
              {{item.fndMenu.menuTitle}}
              <span class="text-muted"> {{item.fndMenu.menuDesc}}</span>
            </div>
            <div class="float-right">
              <span v-if="editRowIndex != index">{{item.orderNumber}}</span>
              <el-input v-else v-model.number="item.orderNumber" placeholder="排序" size="mini" style="width:4rem;"></el-input>
              &nbsp;&nbsp;
              <button type="button" class="btn btn-link" @click="handleEdit(index,item)" v-if="editRowIndex != index" title="编辑">
                <i :class="iconsWithTheme.edit"></i>
              </button>
              <button type="button" class="btn btn-link" data-toggle="modal" data-target="#delRoleAssignMenuModal" v-if="editRowIndex != index" title="删除" @click="singleSelection = item">
                <i :class="iconsWithTheme.delete"></i>
              </button>
              <button type="button" class="btn btn-link" @click="handleEditCancel(index,item)" v-if="editRowIndex == index" title="取消">
                <i :class="iconsWithTheme.cancel"></i>
              </button>
              <button type="button" class="btn btn-link" @click="handleEditSave(index,item,'',true)" v-if="editRowIndex == index" title="保存">
                <i :class="iconsWithTheme.save"></i>
              </button>

            </div>
          </li>
          <!-- add -->
          <li class="list-group-item d-flex justify-content-between align-items-center l-list-item-l border-primary bg-light text-nowrap" v-for="(ad,index) in appendData" :key="index">
            <div class="float-left text-danger">*{{index +1}}.
              <el-select v-model="ad.id.menuId" placeholder="请选择Url" size="mini" filterable remote :remote-method="remotMethodForMenu" :loading="loadingForMenu">
                <el-option v-for="item in menuList" :key="item.menuId" :label="item.menuTitle" :value="item.menuId">
                  <span class="float-left">
                    <i :class="[item.menuIcon,themes.icon]"></i>
                    {{item.menuTitle }}
                  </span>
                  <span class="text-muted">&nbsp;&nbsp;&nbsp;{{item.menuDesc}}</span>
                </el-option>
              </el-select>
            </div>
            <div class="float-right">
              <el-input v-model.number="ad.orderNumber" placeholder="排序" size="mini" style="width:4rem"></el-input>
              &nbsp;&nbsp;
              <button type="button" class="btn btn-link" @click="handleAddDel(index,ad)" title="删除">
                <i :class="iconsWithTheme.delete" class="text-danger"></i>
              </button>
              <button type="button" class="btn btn-link" @click="handleAddSave(index,ad,'',true)" title="保存">
                <i :class="iconsWithTheme.save" class="text-danger"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </v-card>
    <!--删除提示 begin-->
    <modal-dialog id="delRoleAssignMenuModal" title="删除提示">
      <template slot="body">
        您确定删除菜单[
        <span class="text-danger">{{singleSelection?singleSelection.fndMenu.menuTitle:''}}</span>] 吗？
      </template>
      <template slot="footer">
        <button type="button" class="btn btn-info" data-dismiss="modal">
          <i :class="icons.cancel" class="fa-icon--left-2x"></i>取消</button>
        <button type="button" class="btn btn-primary" :disabled="delDisabled" @click="handleDelete(singleSelection.id.roleId+'/'+singleSelection.id.menuId,'delRoleAssignMenuModal')">
          <i :class="icons.ok" class="fa-icon--left-2x"></i>确定</button>
      </template>
    </modal-dialog>
    <!--删除提示 end-->
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import vCard from '@/components/Card.vue'
import modalDialog from '@/components/ModalDialog.vue'
import { mixinQuery } from '@/lib/Mixin'
export default {
  name: 'role-menu-maintain',
  mixins: [mixinQuery],
  components: { vCard, modalDialog },
  props: ['currentRoleRow'],
  data () {
    return {
      keyWord: '职责/角色分配菜单',
      urlMap: { getUrl: '/role/menuassign/',
        postUrl: '/role/menuassign/',
        putUrl: '/role/menuassign/',
        deleteUrl: '/role/menuassign/'
      },
      page: {
        pageSize: null,
        currentPage: null,
        total: 0,
        pageSizes: [10, 15, 20, 30, 50, 100]
      }, /* 分页参数 */
      loadingForMenu: false,
      menuList: []
    }
  },
  computed: {
    ...mapState(['selectedLookupType', 'statusMap', 'theme', 'themeMap2', 'icons']),
    ...mapGetters(['iconsWithTheme', 'themes']),
    GET: function () {
      return this.urlMap.getUrl + this.currentRoleRow.roleId
    }
  },
  watch: {
    currentRoleRow: function (val) {
      this.getDataList(null, null)
    }
  },
  methods: {
    handleAddPre: function () {
      if (this.currentRoleRow) {
        this.appendData.push({
          'id': {
            'roleId': this.currentRoleRow.roleId,
            'menuId': ''
          },
          'orderNumber': 10
        })
      }
    },
    remotMethodForMenu: function (query) {
      const _self = this
      _self.loadingForMenu = true
      _self.$http.get('/menu/', { params: { 'menuTitle': '%' + query + '%' } })
        .then(function (res) {
          _self.menuList = res.data // 设置数据
          _self.loadingForMenu = false
        })
        .catch(function (error) {
          _self.loadingForMenu = false
          console.log(error)
        })
    }
  }
}
</script>
