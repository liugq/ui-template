<!--值列表类型维护，将作为LookupMaintain.vue的组件-->
<template>
  <div>
    <v-card title="值列表类型列表：" bodyStyle="min-height:36rem">
      <button slot="header-right" type="button" class="btn btn-link l-btn "  @click="handleAddPre" title="新增值列表类型">
        <i :class="iconsWithTheme.plus"></i>
      </button>

      <el-table slot="body" :data="dataList" stripe highlight-current-row @current-change="handleCurrentRowChange" class="l-el-table-compack" header-cell-class-name="l-cell-compack border-link" cell-class-name="l-cell-compack" v-loading="loading" :element-loading-text="loadingMsg">
        <el-table-column type="index" width="40" :index="indexGlobal">
        </el-table-column>
        <el-table-column class-name="cell-input l-cell-compack" :prop="col.prop" :label="col.label" :width="col.width" v-if="col.show" v-for="col in cols" :key="col.prop">
          <template slot-scope="scope">
            <template v-if="col.prop == 'lookupTypeId'">
              <span>{{scope.row.lookupTypeId}}</span>
            </template>
            <template v-if="col.prop == 'lookupTypeName'">
              <el-input v-model="scope.row.lookupTypeName" :placeholder="col.placeholder" size="mini" v-if="editRowIndex == scope.$index"></el-input>
              <span v-if="editRowIndex != scope.$index">{{scope.row.lookupTypeName}}</span>
            </template>
            <template v-if="col.prop == 'status'">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="-1" size="mini" v-if="editRowIndex == scope.$index"></el-switch>
              <span v-if="editRowIndex != scope.$index">{{statusMap[scope.row.status]}}</span>
            </template>
            <template v-if="col.prop == 'description'">
              <el-input v-model="scope.row.description" :placeholder="col.placeholder" size="mini" v-if="editRowIndex == scope.$index"></el-input>
              <span v-if="editRowIndex != scope.$index">{{scope.row.description}}</span>
            </template>
            <template v-if="col.prop == ''">
              <button type="button" class="btn btn-link" @click.stop="handleEdit(scope.$index,scope.row)" v-if="editRowIndex != scope.$index" title="编辑">
                <i :class="iconsWithTheme.edit"></i>
              </button>
              <button type="button" class="btn btn-link" data-toggle="modal" @click.stop="openModalDialog('delModal',scope.row)" v-if="editRowIndex != scope.$index" title="删除">
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
          <el-table :data="appendData" :show-header="false" class="l-el-table-compack no-empty" header-cell-class-name="l-cell-compack border-link" cell-class-name="l-cell-compack text-danger">
            <el-table-column type="index" width="40">
              <template slot-scope="scope">*{{scope.$index +1}}</template>
            </el-table-column>
            <el-table-column class-name="cell-input" :prop="col.prop" :label="col.label" :width="col.width" v-if="col.show" v-for="col in cols" :key="col.prop">
              <template slot-scope="scope">
                <template v-if="col.prop == 'lookupTypeId'">
                  *新增{{scope.$index+1}}
                </template>
                <template v-if="col.prop == 'lookupTypeName'">
                  <el-input v-model="scope.row.lookupTypeName" :placeholder="col.placeholder" size="mini"></el-input>
                </template>
                <template v-if="col.prop == 'status'">
                  <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="-1" size="mini"></el-switch>
                </template>
                <template v-if="col.prop == 'description'">
                  <el-input v-model="scope.row.description" :placeholder="col.placeholder" size="mini"></el-input>
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
      <el-pagination slot="footer-right" small background layout="total, sizes, prev, pager, next, jumper" :total="page.total" :page-size="page.pageSize" :current-page="page.currentPage" :page-sizes="page.pageSizes" @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </v-card>
    <modal-dialog id="delModal" title="删除提示" :icon="icons.delete">
      <template slot="body">
        您确定删除该{{keyWord}}吗？
        <ul class="text-danger" v-if="singleSelection != null">
          <li>功能编码:{{singleSelection.lookupTypeId}}</li>
          <li>功能名称:{{singleSelection.lookupTypeName}}</li>
          <li>描述:{{singleSelection.description}}</li>
        </ul>
      </template>
      <template slot="footer">
        <button type="button" class="btn btn-info" data-dismiss="modal">
          <i :class="icons.cancel" class="fa-icon--left-2x"></i>取消</button>
        <button type="button" class="btn btn-primary" :disabled="delDisabled" @click="handleDelete(singleSelection.lookupTypeId,'delModal')">
          <i :class="icons.ok" class="fa-icon--left-2x"></i>确定</button>
      </template>
    </modal-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
// import { handleErrors } from '../../lib/util'
import modalDialog from '@/components/ModalDialog.vue'
import vCard from '@/components/Card.vue'
import { mixinQuery } from '@/lib/Mixin'
export default {
  name: 'lookup-type-query',
  mixins: [mixinQuery],
  data () {
    return {
      keyWord: '值列表类型',
      urlMap: { getUrl: '/lookup/lookuptype/',
        postUrl: '/lookup/lookuptype/',
        putUrl: '/lookup/lookuptype/',
        deleteUrl: '/lookup/lookuptype/'
      }, /* --Crud需要用到的 Url,具体实例要实现 */
      rules: {
        lookupTypeName: [{ required: true, message: '值列表类型名不能为空', trigger: 'blur' }]
      },
      cols: [
        { 'prop': 'lookupTypeId', 'label': 'ID', 'show': true, 'width': '80', 'placeholder': '' },
        { 'prop': 'lookupTypeName', 'label': '类型名', 'show': true, 'width': '', 'placeholder': '值列表类型名' },
        { 'prop': 'status', 'label': '状态', 'show': true, 'width': '66', 'placeholder': '' },
        { 'prop': 'description', 'label': '描述', 'show': true, 'width': '', 'placeholder': '值列表描述' },
        { 'prop': '', 'label': '操作', 'show': true, 'width': '66', 'placeholder': '操作' }
      ]
    }
  },
  components: { vCard, modalDialog },
  mounted: function () {
    this.getDataList(this.page.pageSize, this.page.currentPage)
  },
  computed: {
    ...mapState(['theme', 'icons']),
    ...mapGetters(['iconsWithTheme', 'themes'])
  },
  methods: {
    ...mapActions([
      'changeSelectedLookupType'
    ]),
    /* 单选处理方法 */
    handleCurrentRowChange: function (currentRow, oldRow) {
      this.singleSelection = currentRow
      // this.$emit('update:currentRoleRow', this.singleSelection)
      this.$store.dispatch('changeSelectedLookupType', currentRow)
    },
    // handleCurrentRowChange: function (currentRow, oldCurrentRow) {
    //   if (currentRow) { this.$store.dispatch('changeSelectedLookupType', currentRow) }
    // },
    handleAddPre: function () {
      this.appendData.push({
        'lookupTypeId': 0,
        'description': '',
        'lookupTypeName': '',
        'status': 1
      })
    }
  }
}
</script>
