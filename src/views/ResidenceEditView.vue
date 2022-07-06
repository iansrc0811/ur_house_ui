<template>
  <div class="residence">
    <p>Edit Residence</p>
    <el-form class="residence-form" :model="residenceForm">
      <div class="form-scope">
        <el-form-item label="City" class="margin-right-20">
          <el-select v-model="residenceForm.cityId" placeholder="">
            <el-option
              v-for="item in cities"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="District">
          <el-select v-model="residenceForm.districtId" placeholder="">
            <el-option
              v-for="item in districtOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="address">
        <el-input v-model="residenceForm.address"></el-input>
      </el-form-item>
      <el-form-item label="title">
        <el-input v-model="residenceForm.title"></el-input>
      </el-form-item>
      <div class="form-scope">
        <el-form-item label="price" class="margin-right-20">
          <el-input v-model="residenceForm.price"></el-input>
        </el-form-item>
        <el-form-item label="room_number">
          <el-input
            type="number"
            min="0"
            step="1"
            v-model="residenceForm.room_number"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item label="mrt">
        <el-input v-model="residenceForm.mrt"></el-input>
      </el-form-item>
      <el-button type="primary" @click="editResidence">Edit</el-button>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { residenceShow, residenceEdit } from "@/api/residence";

export default {
  mounted() {
    residenceShow(this.$route.params.id).then((res) => {
      const params = {
        cityId: res.data.city.id,
        districtId: res.data.district.id,
        address: res.data.address,
        price: res.data.price,
        title: res.data.title,
        room_number: res.data.room_number,
        mrt: res.data.mrt,
      };

      this.residenceForm = { ...params };
    });
  },
  computed: {
    ...mapState(["cities", "districts"]),
    districtOptions() {
      if (this.residenceForm.cityId) {
        return this.districts.filter(
          (item) => item.city_id === this.residenceForm.cityId
        );
      }
      return this.districts;
    },
  },
  data() {
    return {
      residenceForm: {
        cityId: null,
        districtId: null,
        title: "",
        address: "",
        price: "",
        room_number: "",
        mrt: "",
      },
    };
  },
  async created() {
    await this.getCitiesDistricts();
  },
  methods: {
    ...mapActions(["getCitiesDistricts"]),
    editResidence() {
      residenceEdit({
        id: this.$route.params.id,
        city_id: this.residenceForm.cityId,
        district_id: this.residenceForm.districtId,
        title: this.residenceForm.title,
        address: this.residenceForm.address,
        price: this.residenceForm.price,
        room_number: this.residenceForm.room_number,
        mrt: this.residenceForm.mrt,
      })
        .then(() => {
          this.$message.success("Residence updated!");
        })
        .catch((error) => {
          this.$message.error(error.response.data.message);
        });
    },
  },
};
</script>

<style scoped>
@import "@/styles/form.css";
</style>
