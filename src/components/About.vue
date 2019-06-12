<template>
  <!--About begin-->
  <modal-dialog id="about" title="关于" icon="fas fa-paperclip">
    <template slot="body">
      UI Template <br> created by liugq <br> Email:
      <a href="mailto:liugq@outlook.com">liugq@outlook.com.cn</a>
    </template>
    <template slot="footer">
      <button type="button" class="btn btn-success" data-dismiss="modal">
        <i class="fas fa-close fa-icon--left-2x"></i>Close</button>
    </template>
  </modal-dialog>
  <!--About end-->
</template>
<script>
import modalDialog from '@/components/ModalDialog.vue'
export default {
  components: { modalDialog }
}
</script>
