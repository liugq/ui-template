<template>
  <div class="card l-card-compack" >
    <div class="card-header">
      <span class="float-left" >
        <!-- 查询功能,设置 queryWidth -->
        <span
          class="btn-group"
          v-if="queryWidth != 0"
        >
          <button
            type="button"
            class="btn btn-link l-btn border-left-0 border-top-0  border-link rounded-0 border-light"
            data-toggle="dropdown"
            title="查询"
          >
            <i
              class="fa-icon--left"
              :class="iconsWithTheme.search"
            ></i>
            <span :class="themes.icon"  class="font-weight-bold">查询</span>
          </button>
          <div
            class="dropdown-menu l-box-shadow card-query"
            :style="{width:queryWidth+'px'}"
            style="1px"
            @click.stop
          >
            <div class="card-query-title">请输入查询条件：</div>
            <slot name="query"></slot>
          </div>
        </span>
        <slot name="header-left">
          <!-- 查询功能,设置 tableColumns -->
          <template v-if="tableColumns != null">
            <span class="btn-group">
              <button
                type="button"
                class="btn btn-link l-btn border-0 rounded-0"
                data-toggle="dropdown"
                title="字段隐藏/显示"
              >
                <i
                  :class="icon?icon:iconsWithTheme.list"
                ></i>
              </button>
              <div class="dropdown-menu l-box-shadow">
                <ul class="list-group">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center l-list-item-l border-primary bg-light text-nowrap anm"
                    v-for="col in tableColumns"
                    :key="col.label"
                    @click.stop
                  >
                    <el-checkbox v-model="col.show">{{col.label}}</el-checkbox>
                  </li>
                </ul>
              </div>
            </span>
            <!--<span class="align-bottom">{{title}}：</span>-->
          </template>
          <template v-else>
            <span class="align-bottom">
              <i
                class="fa-icon--left fa-icon--right "
                :class="icon?icon:icons.list"
              ></i>
              <!--<span class="align-bottom">{{title}}：</span>-->
            </span>
          </template>
          <span class="font-weight-bold">
            <slot name="title">{{title}}</slot>
          </span>
        </slot>
      </span>
      <div class="float-right">
        <slot name="header-right"></slot>
        <button
          type="button"
          class="btn btn-link l-btn border-right-0 border-top-0 border-bottom-0 border-link rounded-0 border-light"
          @click.stop="isCardOpen=!isCardOpen"
        >
          <i
            class="fa-icon--left fa-icon--right"
            :class="isCardOpen?iconsWithTheme.up:iconsWithTheme.down"
          ></i>
        </button>
      </div>
    </div>
    <transition name="l-card">
      <div v-show="isCardOpen">
        <div
          class="card-body"
          :class="bodyClass"
          :style="bodyStyle"
        >
          <slot name="body"></slot>
        </div>
        <div
          class="card-footer"
          v-if="isDisplayFooter"
        >
          <div class="float-left">
            <slot name="footer-left"></slot>
          </div>
          <div class="float-right">
            <slot name="footer-right"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'card',
  data () {
    return {
      isCardOpen: true
    }
  },
  props: {
    title: String,
    icon: String,
    isDisplayFooter: {
      type: Boolean,
      default: true
    },
    bodyClass: String,
    bodyStyle: String,
    tableColumns: null,
    queryWidth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState(['theme', 'icons']),
    ...mapGetters(['iconsWithTheme', 'themes'])
  }
}
</script>
