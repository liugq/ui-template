<!--值列表值维护，将作为LookupMaintain.vue的组件-->
<template>
<div>
  <v-card bodyStyle="min-height:36rem">
    <span slot="title">"{{selectedLookupTypeInfo}}"的值列表：</span>
    <button slot="header-right" type="button" class="btn btn-link l-btn " @click="handleAddPre" title="新增值列表" v-if="selectedLookupType.lookupTypeId !== -1">
      <i :class="iconsWithTheme.plus"></i>
    </button>
    <el-table slot="body" :data="dataList" stripe highlight-current-row @current-change="handleCurrentRowChange" class="l-el-table-compack" header-cell-class-name="l-cell-compack border-link" cell-class-name="l-cell-compack" v-loading="loading" :element-loading-text="loadingMsg">
      <el-table-column type="index" width="40" :index="indexGlobal">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="fndLookupType.lookupTypeId" label="值列表类型ID" width="120" v-if="false">
      </el-table-column>
      <el-table-column prop="fndLookupType.lookupTypeName" label="值列表类型" v-if="false">
      </el-table-column>
      <el-table-column class-name="cell-input l-cell-compack" :prop="col.prop" :label="col.label" :width="col.width" v-if="col.show" v-for="col in cols" :key="col.prop">
        <template slot-scope="scope">
          <template v-if="col.prop == 'lookupId'">
            <span>{{scope.row.lookupId}}</span>
          </template>
          <template  v-if="col.prop == 'lookupName'">
            <el-input v-model="scope.row.lookupName" :placeholder="col.placeholder" size="mini" v-if="editRowIndex == scope.$index"></el-input>
            <span class="font-weight-bold text-primary" v-else>{{scope.row.lookupName}}</span>
          </template>
          <template  v-if="col.prop == 'lookupCode'">
            <el-input v-model="scope.row.lookupCode" placeholder="值列表值" size="mini" v-if="editRowIndex == scope.$index"></el-input>
            <span class="font-weight-bold text-primary" v-else>{{scope.row.lookupCode}}</span>
          </template>
          <template v-if="col.prop == 'orderNumber'">
            <el-input v-model.number="scope.row.orderNumber" :placeholder="col.placeholder" size="mini" v-if="editRowIndex == scope.$index"></el-input>
            <span v-else>{{scope.row.orderNumber}}</span>
          </template>
          <template  v-if="col.prop == 'status'">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="-1" size="mini" v-if="editRowIndex == scope.$index"></el-switch>
            <span v-else>{{statusMap[scope.row.status]}}</span>
          </template>
          <template v-if="col.prop == 'description'">
           <el-input v-model="scope.row.description" :placeholder="col.placeholder" size="mini" v-if="editRowIndex == scope.$index"></el-input>
           <span v-else>{{scope.row.description}}</span>
         </template>
         <template v-if="col.prop == ''">
              <button type="button" class="btn btn-link" @click.stop="handleEdit(scope.$index,scope.row)" v-if="editRowIndex != scope.$index" title="编辑">
                <i :class="iconsWithTheme.edit"></i>
              </button>
              <button type="button" class="btn btn-link" data-toggle="modal" @click.stop="openModalDialog('delModalLookupValue',scope.row)" v-if="editRowIndex != scope.$index" title="删除">
                <i :class="iconsWithTheme.delete"></i>
              </button>
              <button type="button" class="btn btn-link" @click.stop="handleEditCancel(scope.$index,scope.row)" v-if="editRowIndex == scope.$index" title="取消">
                <i :class="iconsWithTheme.cancel"></i>
              </button>
              <button type="button" class="btn btn-link" @click.stop="handleEditSave(scope.$index,scope.row,'',false)" v-if="editRowIndex == scope.$index" title="保存">
                <i :class="iconsWithTheme.save"></i>
              </button>
          </template>
        </template>
      </el-table-column>
      <!--增加新行 begin-->
      <template slot="append">
        <el-table :data="appendData" :show-header="false" class="l-el-table-compack no-empty" header-cell-class-name="l-cell-compack border-success" cell-class-name="l-cell-compack text-danger">
          <el-table-column type="index" width="40">
              <template slot-scope="scope">*{{scope.$index +1}}</template>
          </el-table-column>
           <el-table-column class-name="cell-input" :prop="col.prop" :label="col.label" :width="col.width" v-if="col.show" v-for="col in cols" :key="col.prop">
             <template slot-scope="scope">
               <template v-if="col.prop == 'lookupId'">
                  *新增{{scope.$index+1}}
                </template>
                <template v-if="col.prop == 'lookupName'">
                  <el-input v-model="scope.row.lookupName" :placeholder="col.placeholder" size="mini"></el-input>
                </template>
                <template v-if="col.prop == 'lookupCode'">
                  <el-input v-model="scope.row.lookupCode" :placeholder="col.placeholder" size="mini"></el-input>
                </template>
                <template v-if="col.prop == 'orderNumber'">
                  <el-input v-model.number="scope.row.orderNumber" :placeholder="col.placeholder" size="mini"></el-input>
                </template>
                <template v-if="col.prop == 'status'">
                  <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="-1" size="mini" ref="status"></el-switch>
                </template>
                <template v-if="col.prop == 'description'">
                  <el-input v-model="scope.row.description" :placeholder="col.placeholder" ></el-input>
                </template>
                <template v-if="col.prop == ''">
                  <button type="button" class="btn btn-link" @click="handleAddDel(scope.$index,scope.row)" title="删除">
                    <i :class="iconsWithTheme.delete" class="text-danger"></i>
                  </button>
                  <button type="button" class="btn btn-link" @click="handleAddSave(scope.$index,scope.row)" title="保存">
                    <i :class="iconsWithTheme.save" class="text-danger"></i>
                  </button>
                </template>
             </template>
           </el-table-column>
        </el-table>
      </template>
      <!--增加新行 end-->
    </el-table>
    <el-pagination slot="footer-right" small background layout="total, sizes, prev, pager, next" :total="page.total" :page-size="page.pageSize" :current-page="page.currentPage" :page-sizes="page.pageSizes" @current-change="handleCurrentChange" @size-change="handleSizeChange" hide-on-single-page>
    </el-pagination>
  </v-card>
  <modal-dialog id="delModalLookupValue" title="删除提示" :icon="icons.delete">
      <template slot="body">
        您确定删除 "{{selectedLookupTypeInfo}}" 的该 {{keyWord}} 吗？
        <ul class="text-danger" v-if="singleSelection != null">
          <li>值列表名: {{singleSelection.lookupName}}</li>
          <li>值列表值: {{singleSelection.lookupCode}}</li>
          <li>描述: {{singleSelection.description}}</li>
        </ul>
      </template>
      <template slot="footer">
        <button type="button" class="btn btn-info" data-dismiss="modal">
          <i :class="icons.cancel" class="fa-icon--left-2x"></i>取消</button>
        <button type="button" class="btn btn-primary" :disabled="delDisabled" @click="handleDelete(singleSelection.lookupId,'delModalLookupValue')">
          <i :class="icons.ok" class="fa-icon--left-2x"></i>确定</button>
      </template>
    </modal-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
// import { handleErrors } from '@/lib/util'
// import qs from 'qs'
import modalDialog from '@/components/ModalDialog.vue'
import { mixinQuery } from '@/lib/Mixin'
import vCard from '@/components/Card.vue'
export default {
  name: 'lookup-value-query',
  mixins: [mixinQuery],
  data () {
    return {
      keyWord: '值列表',
      urlMapOriginal: { getUrl: '/lookup/lookupvalue/',
        postUrl: '/lookup/lookupvalue/',
        putUrl: '/lookup/lookupvalue/',
        deleteUrl: '/lookup/lookupvalue/'
      },
      urlMap: { getUrl: '/lookup/lookupvalue/',
        postUrl: '/lookup/lookupvalue/',
        putUrl: '/lookup/lookupvalue/',
        deleteUrl: '/lookup/lookupvalue/'
      }, /* --Crud需要用到的 Url,具体实例要实现 */
      rules: {
        lookupName: [{ required: true, message: '值列表名不能为空', trigger: 'blur' }],
        lookupCode: [{ required: true, message: '值列表值不能为空', trigger: 'blur' }],
        orderNumber: [{ type: 'number', required: true, message: '值列表顺序不能为空,且必须为数字', trigger: 'blur' }],
        status: [{ type: 'number', required: true, message: '值列表状态不能为空,且必须为数字', trigger: 'blur' }]
      },
      cols: [
        { 'prop': 'lookupId', 'label': 'ID', 'show': true, 'width': '80', 'placeholder': '' },
        { 'prop': 'lookupName', 'label': '值列表名', 'show': true, 'width': '', 'placeholder': '值列表名' },
        { 'prop': 'lookupCode', 'label': '值列表值', 'show': true, 'width': '', 'placeholder': '值列表值' },
        { 'prop': 'orderNumber', 'label': '顺序', 'show': true, 'width': '60', 'placeholder': '顺序' },
        { 'prop': 'status', 'label': '状态', 'show': true, 'width': '66', 'placeholder': '' },
        { 'prop': 'description', 'label': '描述', 'show': true, 'width': '', 'placeholder': '值列表描述' },
        { 'prop': '', 'label': '操作', 'show': true, 'width': '66', 'placeholder': '操作' }
      ]
    }
  },
  components: { vCard, modalDialog },
  mounted: function () {
    let lookupTypeId = this.selectedLookupType.lookupTypeId
    if (lookupTypeId !== -1) {
      this.getDataList(this.page.pageSize, this.page.currentPage)
    }
  },
  computed: {
    ...mapState(['selectedLookupType', 'statusMap', 'theme', 'themeMap2', 'icons']),
    ...mapGetters(['iconsWithTheme', 'themes']),
    selectedLookupTypeInfo () {
      let info = ''
      if (this.selectedLookupType.lookupTypeId !== -1) { info = this.selectedLookupType.lookupTypeName + '[ID:' + this.selectedLookupType.lookupTypeId + ']' }
      return info
    }
  },
  watch: {
    selectedLookupType: function (val) {
      this.urlMap.getUrl = this.urlMapOriginal.getUrl
      let lookupTypeId = this.selectedLookupType.lookupTypeId
      if (lookupTypeId !== -1) {
        this.urlMap.getUrl += lookupTypeId + '/'
        this.dataList = null
        this.getDataList(this.page.pageSize, this.page.currentPage)
      }
    }
  },
  methods: {
    handleAddPre: function () {
      this.appendData.push(
        {
          /* "lookupId": 0, */
          'description': '',
          'lookupCode': '',
          'lookupName': '',
          'orderNumber': 10,
          'status': 1,
          'fndLookupType': this.selectedLookupType
        }
      )
    }
  }
}
</script>
