<template>
  <div class="residences">
    <img alt="Vue logo" src="../assets/logo.png" />
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
import { getResidences } from "@/api/residence";
import ResidenceItem from "@/components/ResidenceItem";
import request from "@/utils/request";
export default {
  name: "ResidenceView",
  components: {
    ResidenceItem,
  },

  data() {
    return {
      residences: [],
      total: 0,
      page: 1,
      perPage: 24,
      filterForm: {
        cityId: null,
        districtId: null,
        roomNumber: null,
        priceMin: null,
        priceMax: null,
        mrt: null,
      },
      request: request,
    };
  },
  created() {
    getResidences({
      page: this.page,
      per_page: this.perPage,
    }).then((res) => {
      this.residences = res.data.items;
      this.total = res.data.total;
    });
  },
  methods: {
    test() {
      this.request;
      console.log(process.env.VUE_APP_REMOTE_URL);
    },
    handleCurrentChange(val) {
      this.page = val;
      // ignore null, undefined values, using lodash
      const params = {
        city_id: this.filterForm.cityId,
        district_id: this.filterForm.districtId,
        room_number: this.filterForm.roomNumber,
        price_min: this.filterForm.priceMin,
        price_max: this.filterForm.priceMax,
        mrt: this.filterForm.mrt,
        page: this.page,
        per_page: this.perPage,
      };
      console.log("ResidenceView");
      console.log(params);
      getResidences({ ...params }).then((res) => {
        this.residences = res.data.items;
        this.total = res.data.total;
      });
    },
  },
};
</script>
