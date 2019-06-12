<template>
  <div class="l-el-compack">
    <v-card :isDisplayFooter="false">
      <span slot="title" class="align-bottom">
        <template v-if="this.currentRoleRow">
         "{{this.currentRoleRow.roleName}}"的功能列表:
        </template>
        <template v-else>
          <span class="text-warning">没有选择职责/角色</span>
        </template>
      </span>
      <button slot="header-right" type="button" class="btn btn-link l-btn" @click="handleAddPre" title="添加功能" v-if="currentRoleRow?true:false">
        <i :class="iconsWithTheme.plus"></i>
      </button>
      <div slot="body">
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center l-list-item-l border-primary bg-light text-nowrap" v-for="(item,index) in dataList" :key="index">
            <div class="float-left">{{index+1}}.{{item.fndPrvFunction.functionCode}}</div>
            <div class="float-right">
              {{item.fndPrvFunction.functionName}}
              <button type="button" class="btn btn-link btn-sm" data-toggle="modal" data-target="#delFunctionModal" title="删除" @click="singleSelection = item">
               <i :class="iconsWithTheme.delete"></i>
              </button>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center l-list-item-l border-primary bg-light text-nowrap" v-for="(ad,index) in appendData" :key="index">
            <div class="float-left text-danger">*{{index +1}}.
              <el-select v-model="ad.id.functionCode" placeholder="请选择功能" size="mini" filterable remote :remote-method="remotMethodForFunction" :loading="loadingForFunction">
                <el-option v-for="item in functionList" :key="item.functionCode" :label="item.functionCode" :value="item.functionCode">
                  <span class="float-left">{{item.functionCode }}</span>
                  <span class="float-right text-muted">&nbsp;&nbsp;&nbsp;{{item.functionName }}</span>
                </el-option>
              </el-select>
            </div>
            <div class="float-right">
              <button type="button" class="btn btn-link btn-sm" title="删除" @click="handleAddDel(index,ad)">
                <i :class="iconsWithTheme.delete" class="text-danger"></i>
              </button>
              <button type="button" class="btn btn-link btn-sm" title="保存" @click="handleAddSave(index,ad,'',true)">
                <i :class="iconsWithTheme.save" class="text-danger"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </v-card>
    <!--删除提示 begin-->
    <modal-dialog id="delFunctionModal" title="删除提示" :icon="icons.delete">
      <template slot="body">
        您确定删除职责[
        <span class="text-danger">{{singleSelection?singleSelection.fndPrvRole.roleName:''}}</span>] 的功能[
        <span class="text-danger">{{singleSelection?singleSelection.fndPrvFunction.functionName:''}}</span>] 吗？
      </template>
      <template slot="footer">
        <button type="button" class="btn btn-info" data-dismiss="modal">
           <i :class="icons.cancel" class="fa-icon--left-2x"></i>取消</button>
        <button type="button" class="btn btn-primary" :disabled="delDisabled" @click="handleDelete(singleSelection.id.roleId+'/'+singleSelection.id.functionCode,'delFunctionModal')">
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
  name: 'role-functin-maintain',
  mixins: [mixinQuery],
  components: { vCard, modalDialog },
  props: ['currentRoleRow'],
  data () {
    return {
      keyWord: 'RoleAccecssFunction',
      urlMap: { getUrl: '/role/roleaccess/',
        postUrl: '/role/roleaccess/',
        deleteUrl: '/role/roleaccess/'
      },
      page: {
        pageSize: null,
        currentPage: null,
        total: 0,
        pageSizes: [10, 15, 20, 30, 50, 100]
      }, /* 分页参数 */
      loadingForFunction: false,
      functionList: []
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
            'functionCode': ''
          }
        })
      }
    },
    remotMethodForFunction: function (query) {
      const _self = this
      _self.loadingForFunction = true
      _self.$http.get('/function/codeorname/' + 50 + '/' + 1, { params: { 'functionCodeOrName': '%' + query + '%' } })
        .then(function (res) {
          _self.functionList = res.data.content // 设置数据
          _self.loadingForFunction = false
        })
        .catch(function (error) {
          _self.loadingForFunction = false
          console.log(error)
        })
    }
  }
}
</script>
