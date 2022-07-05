<template>
  <div class="residences">
    <el-form :model="filterForm" class="filter-form">
      <div class="form-scope">
        <el-form-item label="City" class="margin-selector">
          <el-select v-model="filterForm.cityId" placeholder="">
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
          <el-select v-model="filterForm.districtIds" multiple placeholder="">
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
          <el-input v-model="filterForm.priceMin"></el-input>
        </el-form-item>
        <el-form-item label="Rent to">
          <el-input v-model="filterForm.priceMax"></el-input>
        </el-form-item>
      </div>

      <div class="form-scope">
        <el-form-item label="Bedroom Number" class="margin-selector">
          <el-input v-model="filterForm.roomNumber"></el-input>
        </el-form-item>

        <el-form-item label="MRT line">
          <el-input v-model="filterForm.mrt"></el-input>
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
import { getResidences } from "@/api/residence";
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
    watch: {
      "filterForm.cityId": {
        handler() {
          this.filterForm.districtIds = [];
        },
      },
    },
    districtOptions() {
      if (this.filterForm.cityId) {
        return this.districts.filter(
          (item) => item.city_id === this.filterForm.cityId
        );
      }
      return this.districts;
    },
  },
  data() {
    return {
      residences: [],
      total: 0,
      page: 1,
      perPage: 24,
      filterForm: {
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
    getResidences({
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
        city_id: this.filterForm.cityId,
        district_ids: this.filterForm.districtIds,
        room_number: this.filterForm.roomNumber,
        price_min: this.filterForm.priceMin,
        price_max: this.filterForm.priceMax,
        mrt: this.filterForm.mrt,
        page: this.page,
        per_page: this.perPage,
      };
      params = this._.omitBy({ ...params }, isNil);
      getResidences({ ...params })
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
.filter-form {
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
.filter-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.residences {
  display: flex;
  flex-direction: column;
}
</style>
