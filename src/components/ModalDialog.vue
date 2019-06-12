<template>
  <div class="modal fade l-modal-compack text-dark" tabindex="-1">
    <div class="modal-dialog" :class="dialogClass">
      <div class="modal-content" >
        <div class="modal-header" :class="[themeMap2[theme].bg,themeMap2[theme].text]">
          <b class="modal-title" id="exampleModalLabel">
            <i class="fa-icon--left-2x" :class="icon"></i>
            {{title}}
          </b>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'modal-dialog',
  data () {
    return {}
  },
  props: {
    title: String,
    dialogClass: null,
    icon: {
      type: String,
      default: 'fas-info'
    }
  },
  computed: {
    ...mapState(['theme', 'themeMap2'])
  }
}
</script>
