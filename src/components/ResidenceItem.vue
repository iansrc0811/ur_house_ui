<template>
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
</template>

<script>
export default {
  props: {
    residence: {
      type: Object,
      required: true,
    },
  },
  methods: {
    imageUrl(url) {
      const baseUrl = process.env.VUE_APP_REMOTE_URL;
      return `${baseUrl}${url}`;
    },
  },
};
</script>

<style>
.resident-item {
  height: 450px;
  margin-bottom: 20px;
}
.image {
  padding: 0px 10px 5px;
  width: 100%;
  display: block;
}
</style>
