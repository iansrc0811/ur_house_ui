<template>
  <div @click="editResidence" :class="{ pointer: isAdmin }">
    <el-col :span="8">
      <el-card class="resident-item" :body-style="{ padding: '0px' }">
        <img :src="imageUrl(residence.image_url)" class="image" />
        <div style="padding: 14px">
          <p>{{ residence.title }}</p>
          <p>{{ residence.address }}</p>
          <p>{{ residence.price }}</p>
          <p>Bedroom {{ residence.room_number }}</p>
          <p>MRT: {{ residence.mrt }}</p>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    residence: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isAdmin"]),
  },
  methods: {
    editResidence() {
      if (!this.isAdmin) return;
      this.$router.push({
        name: "editResidence",
        params: {
          id: this.residence.id,
        },
      });
    },
    imageUrl(url) {
      const baseUrl = process.env.VUE_APP_REMOTE_URL;
      return `${baseUrl}${url}`;
    },
  },
};
</script>

<style scoped>
.resident-item {
  height: 450px;
  margin-bottom: 20px;
}
.image {
  padding: 0px 10px 5px;
  width: 100%;
  display: block;
}
.pointer {
  cursor: pointer;
}
</style>
