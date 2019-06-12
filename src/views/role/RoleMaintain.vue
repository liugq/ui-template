<template>
  <div class="l-el-compack">
    <v-card title="职责/角色列表" bodyStyle="min-height:36rem">
      <button slot="header-right" type="button" class="btn btn-link l-btn" @click="handleAddPre" title="新增职责">
        <i :class="iconsWithTheme.plus"></i>
      </button>
      <el-table slot="body" :data="dataList" ref="urlTable" stripe highlight-current-row @current-change="handleCurrentRowChange" class="l-el-table-compack" :cell-class-name="handleCellClassName" header-cell-class-name="l-cell-compack border-link" v-loading="loading" :element-loading-text="loadingMsg">
        <el-table-column type="index" width="40" :index="indexGlobal">
        </el-table-column>
        <el-table-column class-name="cell-input l-cell-compack" :prop="col.prop" :label="col.label" :width="col.width" v-if="col.show" v-for="col in cols" :key="col.prop">
          <template slot-scope="scope">
            <template v-if="col.prop == 'roleName'">
              <el-input v-model="scope.row.roleName" :placeholder="col.placeholder" size="mini" v-if="editRowIndex == scope.$index"></el-input>
              <span v-else>{{scope.row.roleName}}</span>
            </template>
            <template v-if="col.prop == 'status'">
              <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="-1" size="mini" v-if="editRowIndex == scope.$index"></el-switch>
              <span v-else>{{statusMap[scope.row.status]}}</span>
            </template>
            <template v-if="col.prop == 'dateFrom'">
              <el-date-picker v-model="scope.row.dateFrom" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="col.placeholder" :editable="false" size="mini" v-if="editRowIndex == scope.$index"></el-date-picker>
              <span v-else>{{scope.row.dateFrom}}</span>
            </template>
            <template v-if="col.prop == 'dateTo'">
              <el-date-picker v-model="scope.row.dateTo" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="col.placeholder" :editable="false" size="mini" v-if="editRowIndex == scope.$index"></el-date-picker>
              <span v-else>{{scope.row.dateTo}}</span>
            </template>
            <template v-if="col.prop == 'roleDesc'">
              <el-input v-model="scope.row.roleDesc" :placeholder="col.placeholder" size="mini" v-if="editRowIndex == scope.$index"></el-input>
              <span v-else>{{scope.row.roleDesc}}</span>
            </template>
            <template v-if="col.prop == ''">
              <button type="button" class="btn btn-link" @click.stop="handleEdit(scope.$index,scope.row)" v-if="editRowIndex != scope.$index" title="编辑">
                <i :class="iconsWithTheme.edit"></i>
              </button>
              <button type="button" class="btn btn-link" data-toggle="modal" @click.stop="openModalDialog('delModalRole',scope.row)" v-if="editRowIndex != scope.$index" title="删除">
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
                <template v-if="col.prop == 'roleName'">
                  <el-input v-model="scope.row.roleName" :placeholder="col.placeholder" size="mini"></el-input>
                </template>
                <template v-if="col.prop == 'status'">
                  <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="-1" size="mini"></el-switch>
                </template>
                <template v-if="col.prop == 'dateFrom'">
                  <el-date-picker v-model="scope.row.dateFrom" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="col.placeholder" :editable="false" size="mini"></el-date-picker>
                </template>
                <template v-if="col.prop == 'dateTo'">
                  <el-date-picker v-model="scope.row.dateTo" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :placeholder="col.placeholder" :editable="false" size="mini"></el-date-picker>
                </template>
                <template v-if="col.prop == 'roleDesc'">
                  <el-input v-model="scope.row.roleDesc" :placeholder="col.placeholder" size="mini"></el-input>
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
      </el-table>
      <!-- 分页 -->
      <el-pagination slot="footer-right" small background layout="total, prev, pager, next, jumper" :total="page.total" :page-size="page.pageSize" :current-page="page.currentPage" :page-sizes="page.pageSizes" @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </v-card>

    <!--删除提示 begin-->
    <modal-dialog id="delModalRole" title="删除提示" :icon="icons.delete">
      <template slot="body">
        您确定删除该{{keyWord}}吗？
        <ul class="text-danger" v-if="singleSelection != null">
          <li>职责名称: {{singleSelection.roleName}}</li>
          <li>描述: {{singleSelection.roleDesc}}</li>
        </ul>
      </template>
      <template slot="footer">
        <button type="button" class="btn btn-info" data-dismiss="modal">
          <i :class="icons.cancel" class="fa-icon--left-2x"></i>取消</button>
        <button type="button" class="btn btn-primary" :disabled="delDisabled" @click="handleDelete(singleSelection.roleId,'delModalRole')">
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
  name: 'role-maintain',
  mixins: [mixinQuery],
  components: { vCard, modalDialog },
  props: ['currentRoleRow'],
  data () {
    return {
      keyWord: '职责/角色',
      rules: {
        roleName: [{ required: true, message: '职责名称不能为空', trigger: 'blur' }],
        dateFrom: [{ required: true, message: '有效开始日期不能为空', trigger: 'blur' }],
        dateTo: [{ required: true, message: '有效结束日期不能为空', trigger: 'blur' }]
      },
      urlMap: { getUrl: '/role/',
        postUrl: '/role/',
        putUrl: '/role/',
        deleteUrl: '/role/'
      },
      cols: [
        { 'prop': 'roleName', 'label': '职责名称', 'show': true, 'width': '120', 'placeholder': '请输入职责名称' },
        { 'prop': 'status', 'label': '状态', 'show': true, 'width': '60', 'placeholder': '状态' },
        { 'prop': 'dateFrom', 'label': '有效开始日期', 'show': true, 'width': '', 'placeholder': '请输入有效开始日期' },
        { 'prop': 'dateTo', 'label': '有效结束日期', 'show': true, 'width': '', 'placeholder': '请输入有效结束日期' },
        { 'prop': 'roleDesc', 'label': '描述', 'show': true, 'width': '', 'placeholder': '请输入描述信息' },
        { 'prop': '', 'label': '操作', 'show': true, 'width': '66', 'placeholder': '操作' }
      ]
    }
  },
  mounted: function () {
    this.getDataList(this.page.pageSize, this.page.currentPage)
  },
  methods: {
    handleAddPre: function () {
      var now = new Date()
      var df = now.getFullYear() + '-' +
        (now.getMonth() + 1) + '-' +
        now.getDate() + ' ' +
        now.getHours() + ':' +
        now.getMinutes() + ':' +
        now.getSeconds()
      this.appendData.push({
        'dateFrom': df,
        'dateTo': '5000-01-01 00:00:00',
        'roleDesc': '',
        'roleName': '',
        'roleType': 0,
        'status': 1
      })
    },
    /* 单选处理方法 */
    handleCurrentRowChange: function (currentRow, oldRow) {
      this.singleSelection = currentRow
      this.$emit('update:currentRoleRow', this.singleSelection)
    },
    handleCellClassName: function ({ row, column, rowIndex, columnIndex }) {
      if ((row.dateStatus !== 1 && (column.property === 'dateFrom' || column.property === 'dateTo')) || (row.status !== 1 && column.property === 'status')) {
        return 'bg-danger text-white'
      }
    }
  },
  computed: {
    ...mapState(['selectedLookupType', 'statusMap', 'theme', 'themeMap2', 'icons']),
    ...mapGetters(['iconsWithTheme', 'themes'])
    // selectedLookupTypeInfo () {
    //   let info = ''
    //   if (this.selectedLookupType.lookupTypeId !== -1) { info = this.selectedLookupType.lookupTypeName + '[ID:' + this.selectedLookupType.lookupTypeId + ']' }
    //   return info
    // }
  }
}
</script>
