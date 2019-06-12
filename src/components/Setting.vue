<template>
  <!--Setting begin-->
  <modal-dialog id="setting" title="系统设置" icon="fas fa-cogs" dialogClass="modal-lg">
    <template slot="body">
      <v-card title="皮肤设置" icon="fas fa-drafting-compass">
        <ul class="list-group" slot="body">
          <li class="list-group-item l-list-item-n border-primary" :class="value" v-for="(value, key) in $store.state.themeMap" :key="key">
            <input type="radio" name="theme" :id="key" :value="key" v-model="$store.state.theme" style="vertical-align: middle">
            <span > {{key}}</span>
            <i class="fas fa-check fa-lg fa-icon--left-2x theme-check" v-if="$store.state.theme==key"></i>
          </li>
        </ul>
      </v-card>
    </template>
    <template slot="footer">
  <button type="button" class="btn btn-success" data-dismiss="modal">
    <i class="fas fa-close fa-icon--left-2x"></i>Close</button>
</template>
  </modal-dialog>
  <!--Setting end-->
</template>
<script>
import modalDialog from '@/components/ModalDialog.vue'
import vCard from '@/components/Card.vue'
export default {
  components: { modalDialog, vCard }
}
</script>
<style lang="scss" scoped>
.theme-check {
  float: right;
}
.l-list-item-n:focus,
.l-list-item-n:hover {
  font-weight: bold;
}
</style>
