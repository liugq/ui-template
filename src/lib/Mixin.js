/* eslint-disable eqeqeq */
/* eslint-disable handle-callback-err */
import {
  mapState
} from 'vuex'
import {
  handleErrors
} from './util'
export const mixinQuery = {
  data () {
    return {
      /* --业务关键词 */
      keyWord: '',
      /* --查询参数,具体实例要实现 */
      queryForm: null,
      /* 查询按钮是否可用控制 */
      queryDisabled: false,
      /* 查询结果 */
      dataList: null,
      /* 多选列表行 */
      multipleSelection: [],
      /* 单选行 */
      singleSelection: null,
      /* 分页参数 */
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
        pageSizes: [10, 15, 20, 30, 50, 100]
      },
      /* 数据加载中是否显示 */
      loading: false,
      /* 数据加载中显示文本内容 */
      loadingMsg: '拼命加载中...',
      /* 增加行数据列表,通过handleAddPre实现 */
      appendData: [],
      /* 编辑行号 */
      editRowIndex: -1,
      /* 编辑备份 */
      editRowBak: {},
      /* --数据验证规则,具体实例要实现 */
      rules: {},
      /* --Crud需要用到的 Url,具体实例要实现 */
      urlMap: {
        getUrl: '/get-url/',
        postUrl: '/post-url/',
        putUrl: '/put-url/',
        deleteUrl: '/delete-url/'
      }
    }
  },
  computed: {
    ...mapState([
      'yesOrNo', 'theme', 'themeMap', 'themeMap2', 'statusMap'
    ]),
    btnThemeClass: function () {
      return this.themeMap2[this.theme].btn // "btn-"+this.theme
    },
    /* iconThemeClass:function(){
                               return "text-"+ ((this.theme == 'light' || this.theme == 'white')? 'primary':this.theme)
                               }, */
    delDisabled: function () {
      return this.singleSelection == null
    },
    GET: function () {
      return this.urlMap.getUrl
    },
    POST: function () {
      return this.urlMap.postUrl
    },
    PUT: function () {
      return this.urlMap.putUrl
    },
    DELETE: function () {
      return this.urlMap.deleteUrl
    }
  },
  methods: {
    /* 取消编辑行，若有未取消的编辑行，对该行数据恢复；并把编辑行设置为-1 */
    editRowCancelHelper: function () {
      if (this.editRowIndex != -1) {
        this.dataList[this.editRowIndex] = this.editRowBak
        this.editRowIndex = -1
      }
    },
    /* 得到数据列表 */
    getDataList: function (pageSize, pageNumber) {
      const _self = this
      _self.loading = true
      /* 是否分页 */
      let pagerable = !!((pageSize && pageNumber))

      let _url = pagerable ? _self.GET + pageSize + '/' + pageNumber : _self.GET
      try {
        _self.$http.get(_url, {
          params: _self.queryForm
        })
          .then(function (res) {
            if (pagerable) {
              _self.dataList = res.data.content // 设置数据
              _self.page.total = res.data.totalElements // 设置数据总数
            } else {
              _self.dataList = res.data // 设置数据
            }
            _self.loading = false
          })
          .catch(function (error) {
            _self.loading = false
          })
      } catch (exception) {
        _self.$message({
          showClose: true,
          message: exception,
          type: 'error'
        })
      } finally {
        _self.loading = false
      }
    },
    /* 查询按钮处理方法 */
    handleQuery: function (queryForm) {
      this.getDataList(this.page.pageSize, this.page.currentPage)
    },
    /* 分页改变 */
    handleCurrentChange (val) {
      this.editRowCancelHelper() /* 取消编辑行 */
      this.page.currentPage = val
      this.getDataList(this.page.pageSize, this.page.currentPage)
    },
    /* 每页记录数改变 */
    handleSizeChange (val) {
      this.editRowCancelHelper() /* 取消编辑行 */
      this.page.pageSize = val
      this.getDataList(this.page.pageSize, this.page.currentPage)
    },
    /* 编辑行处理方法，设置当前行处于编辑状态 */
    handleEdit: function (index, row) {
      this.editRowCancelHelper()
      // 编辑前先备份要编辑的数据，供取消使用
      this.editRowBak = JSON.parse(JSON.stringify(row))
      this.editRowIndex = index /* 设置后当前行将处于编辑状态 */
    },
    /* 编辑行取消处理方法，取消当前可编辑行的编辑状态：要把数据恢复；把编辑行设置为-1 */
    handleEditCancel: function (index, row) {
      this.editRowCancelHelper()
    },
    /* 编辑行数据更新处理方法
         *index 更新的行号,
         *row 更新的行数据,
         *msg 附件的当前行的信息，比如当前的ID，用于更新成功或失败的说明,
         *isJson 是否以JSON格式传输数据，即："Content-Type": "application/json"，数据接收端如果数springboot 接受参数需要加@RequestBody标注
         */
    handleEditSave: function (index, row, msg, isJson) {
      const _self = this
      let validator = new _self.$schema(_self.rules)
      validator.validate(row, (errors, fields) => {
        let _msg = (msg && msg.trim().length > 0) ? ' [ ' + msg + ' ] ' : ''
        if (errors) {
          return handleErrors(errors, fields, '编辑 ' + _self.keyWord + ' 信息错误!' + _msg, _self)
        }
        // validation passed
        if (isJson) {
          _self.$http.put(_self.PUT, JSON.stringify(row), {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function (res) {
            _self.editRowIndex = -1
            _self.getDataList(_self.page.pageSize, _self.page.currentPage) /* 重新加载数据 */
            _self.$message({
              showClose: true,
              message: '编辑 ' + _self.keyWord + ' 信息成功!' + _msg,
              type: 'success'
            })
          })
        } else {
          _self.$http.put(_self.PUT, _self.$qs.stringify(row)).then(function (res) {
            _self.editRowIndex = -1
            _self.getDataList(_self.page.pageSize, _self.page.currentPage) /* 重新加载数据 */
            _self.$message({
              showClose: true,
              message: '编辑 ' + _self.keyWord + ' 信息成功!' + _msg,
              type: 'success'
            })
          })
        }
      })
    },
    /* $$增加行处理方法，在行末出现添加行，需要向appendData数组添加数据，如：this.appendData.push({}) */
    handleAddPre: function () {},
    /* 删除当前添加行 处理方法 */
    handleAddDel: function (index, row) {
      // 清理掉当前行对应的数据
      this.appendData.splice(index, 1)
    },
    /* 添加数据处理方法
         *index 添加行的行号,
         *row 添加行的行数据,
         *msg 附件的当前行的信息，比如当前的ID，用于更新成功或失败的说明,
         *isJson 是否以JSON格式传输数据，即："Content-Type": "application/json"，数据接收端如果数springboot 接受参数需要加@RequestBody标注
         */
    handleAddSave: function (index, row, msg, isJson) {
      const _self = this
      let validator = new _self.$schema(_self.rules)
      validator.validate(row, (errors, fields) => {
        let _msg = (msg && msg.trim().length() > 0) ? ' ' + msg : ''
        if (errors) {
          return handleErrors(errors, fields, '新增' + _self.keyWord + '信息错误! [ #: *' + (index + 1) + _msg + ' ]', _self)
        }
        // validation passed
        if (isJson) {
          _self.$http.post(_self.POST, JSON.stringify(row), {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function (res) {
            _self.handleAddDel(index, row)
            _self.getDataList(_self.page.pageSize, _self.page.currentPage)
            _self.$message({
              showClose: true,
              message: '新增' + _self.keyWord + '信息成功! [ #: *' + (index + 1) + _msg + ' ]',
              type: 'success'
            })
          })
        } else {
          _self.$http.post(_self.POST, _self.$qs.stringify(row)).then(function (res) {
            _self.handleAddDel(index, row)
            _self.getDataList(_self.page.pageSize, _self.page.currentPage)
            _self.$message({
              showClose: true,
              message: '新增' + _self.keyWord + '信息成功! [ #: *' + (index + 1) + _msg + ' ]',
              type: 'success'
            })
          })
        }
      })
    },
    /* 全数据索引 */
    indexGlobal: function (index) {
      return (this.page.currentPage - 1) * this.page.pageSize + index + 1
    },
    /* 单选处理方法 */
    handleCurrentRowChange: function (currentRow, oldRow) {
      this.singleSelection = currentRow
    },
    /* 多选处理方法 */
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    /* 打开删除确认对话框 */
    openModalDialog: function (delModalId, currentRow) {
      this.singleSelection = currentRow
      // eslint-disable-next-line no-undef
      $('#' + delModalId).modal()
    },
    /* 删除数据处理方法 */
    handleDelete: function (id, delModalId) {
      const _self = this
      _self.$http.delete(_self.DELETE + id)
        .then(function (res) {
          _self.$message({
            showClose: true,
            message: '删除 1 条' + _self.keyWord + ' 数据成功!',
            type: 'success'
          })
          // eslint-disable-next-line no-undef
          $('#' + delModalId).modal('hide')
          _self.singleSelection = null
          _self.getDataList(_self.page.pageSize, _self.page.currentPage)
        })
    }
  }
}
