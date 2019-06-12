<template>
  <div class="l-main-container">
    <div class="row">
      <div class="col-8">
        <v-role :currentRoleRow.sync="currentRoleRow"></v-role>
      </div>
      <div class="col-4">
        <v-function :currentRoleRow="currentRoleRow"></v-function>
        <v-menu :currentRoleRow="currentRoleRow"></v-menu>
      </div>
    </div>
  </div>
</template>
<script>
import vRole from './RoleMaintain.vue'
import vFunction from './RoleAccessFunction.vue'
import vMenu from './RoleAssignMenu.vue'
export default {
  name: 'role-managerment',
  data () {
    return {
      currentRoleRow: null
    }
  },
  components: {
    vRole,
    vFunction,
    vMenu
  }
}
</script>
