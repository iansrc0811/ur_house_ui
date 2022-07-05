<template>
  <div class="residences">
    <el-form :model="residenceForm" class="residence-form">
      <div class="form-scope">
        <el-form-item label="City" class="margin-selector">
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
          <el-select
            v-model="residenceForm.districtIds"
            multiple
            placeholder=""
          >
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
      <div class="form-scope">
        <el-form-item label="Rent from" class="margin-selector">
          <el-input v-model="residenceForm.priceMin"></el-input>
        </el-form-item>
        <el-form-item label="Rent to">
          <el-input v-model="residenceForm.priceMax"></el-input>
        </el-form-item>
      </div>

      <div class="form-scope">
        <el-form-item label="Bedroom Number" class="margin-selector">
          <el-input v-model="residenceForm.roomNumber"></el-input>
        </el-form-item>

        <el-form-item label="MRT line">
          <el-input v-model="residenceForm.mrt"></el-input>
        </el-form-item>
      </div>
      <el-button @click="filter">Filter</el-button>
    </el-form>

    <el-row :gutter="20">
      <ResidenceItem
        v-for="(item, index) in residences"
        :key="index"
        :residence="item"
      ></ResidenceItem>
    </el-row>
    <el-pagination
      layout="prev, pager, next"
      :hide-on-single-page="true"
      :page-size="perPage"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { residenceIndex } from "@/api/residence";
import ResidenceItem from "@/components/ResidenceItem";
import request from "@/utils/request";
import { isNil } from "@/utils/shareFunction";
export default {
  name: "ResidenceView",
  components: {
    ResidenceItem,
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
  watch: {
    "residenceForm.cityId": {
      handler() {
        this.residenceForm.districtIds = [];
      },
    },
  },
  data() {
    return {
      residences: [],
      total: 0,
      page: 1,
      perPage: 24,
      residenceForm: {
        cityId: null,
        districtIds: [],
        roomNumber: null,
        priceMin: null,
        priceMax: null,
        mrt: null,
      },
      request: request,
    };
  },
  async created() {
    residenceIndex({
      page: this.page,
      per_page: this.perPage,
    }).then((res) => {
      this.residences = res.data.items;
      this.total = res.data.total;
    });
    await this.getCitiesDistricts();
  },
  methods: {
    ...mapActions(["getCitiesDistricts"]),
    filter() {
      let params = {
        city_id: this.residenceForm.cityId,
        district_ids: this.residenceForm.districtIds,
        room_number: this.residenceForm.roomNumber,
        price_min: this.residenceForm.priceMin,
        price_max: this.residenceForm.priceMax,
        mrt: this.residenceForm.mrt,
        page: this.page,
        per_page: this.perPage,
      };
      params = this._.omitBy({ ...params }, isNil);
      residenceIndex({ ...params })
        .then((res) => {
          this.residences = res.data.items;
          this.total = res.data.total;
        })
        .catch((error) => {
          this.$message.error(error.response.data.error);
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.filter();
    },
  },
};
</script>
<style scoped>
@import "@/styles/form.css";
/* .residence-form {
  padding: 10px;
  width: 90%;
}
.margin-selector {
  margin-right: 20px;
}
.form-scope {
  display: flex;
  justify-content: flex-start;
}
.residence-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.residences {
  display: flex;
  flex-direction: column;
} */
</style>
