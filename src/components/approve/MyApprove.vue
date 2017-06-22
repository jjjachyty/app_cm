<template>
  <div>
    <!--导航头-->
    <div>
      <mu-appbar title="审批">
        <mu-icon-button icon='keyboard_backspace' slot="left" touch @click="back()" />
      </mu-appbar>
    </div>
    <div v-for="approve in approves" class="context">
      <mu-list>
        <mu-list-item :title="approve.businessKey" :describeText="approve.id" @click="showDetail(approve.id)" disabled>
          <!--<span>{{approve.businessKey}}</span>-->
          <span>{{approve.name}}</span>
          <mu-icon-button icon="assessment" slot="left" primary @click="showDetail(approve.id)" tooltipPosition="通过" iconClass="allow" />
          <mu-icon-button icon="check_box" slot="right" primary @click="openDialog('allow',approve.id)" tooltipPosition="通过" iconClass="allow" />
          <mu-icon-button icon="indeterminate_check_box" slot="right" primary @click="openDialog('reject',approve.id)" tooltipPosition="驳回" iconClass="rejected" />
        </mu-list-item>
      </mu-list>
    </div>
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close()">
      <mu-appbar title="详情">
        <mu-flat-button slot="right" label="关闭" color="white" @click="close()" />
      </mu-appbar>
      <mu-content-block class="snapshot">
        <img :src="snapshot" class="img">
      </mu-content-block>
    </mu-popup>
  
    <mu-dialog :open="dialog" title="意见">
      <mu-text-field hintText="请输入审批意见" v-model="comment" multiLine :rows="3" :rowsMax="6" />
      <br/>
  
      <mu-flat-button label="确定" slot="actions" primary @click="closeDialog()" />
    </mu-dialog>
  
  </div>
</template>


<script>
import {
  mapGetters,
  mapActions
} from 'vuex'


export default {
  data() {
    return {
      bottomPopup: false,
      dialog: false,
      approveType: "",
      taskId: "",
      comment:""
    }
  }, methods: {
    back() {
      router.push("/")
    }, openDialog(type, id) {
      this.taskId = id
      this.approveType = type
      this.dialog = true
    },
    allow() {
      var params = { userId: this.$store.state.auth.user_id, taskId: this.taskId ,comment:this.comment}
      this.$store.dispatch("allowApprove", params)
    }, rejected() {
      var params = { userId: this.$store.state.auth.user_id, taskId: this.taskId ,comment:this.comment}
      this.$store.dispatch("rejectApprove", params)
    }, showDetail(id) {
      this.bottomPopup = true
      var params = { userId: this.$store.state.auth.user_id, taskId: id }
      this.$store.dispatch("getApprovesSanpShot", params)
    }, close() {
      this.bottomPopup = false
     

    }, closeDialog() {
 this.dialog = false
      switch (this.approveType) {
        case 'allow':
          this.allow()
          break
        case 'reject':
          this.rejected()
          break
      }
    }
  }, computed: {
    ...mapGetters({
      approves: 'checkOutApproves',
      snapshot: 'checkOutSnapShot'
    })
  }, created() {
    //var userId = this.$store.state.auth.user_id
    //console.log("approves--userID",userID)


  }
}
</script>
<style>
.rejected {
  color: #ff9800
}

.demo-popup-bottom {
  height: 500px;
}

.snapshot {
  height: 500px;
  overflow-y: scroll;
}

.snapshot .img {
  width: 100%
}

.allow {
  color: #009688
}
</style>
