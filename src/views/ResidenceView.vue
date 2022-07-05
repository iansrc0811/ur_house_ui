<template>
  <div class="residences">
    <img alt="Vue logo" src="../assets/logo.png" />

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
export default {
  name: "ResidenceView",
  components: {},

  data() {
    return {
      residences: [],
      total: 0,
      page: 1,
      perPage: 25,
      filterForm: {
        cityId: null,
        districtId: null,
        roomNumber: null,
        priceMin: null,
        priceMax: null,
        mrt: null,
      },
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
    handleCurrentChange(val) {
      this.page = val;
      // ignore null, undefined values, using lodash
      const params = this.lodash.omitBY(
        {
          city_id: this.filterForm.cityId,
          district_id: this.filterForm.districtId,
          room_number: this.filterForm.roomNumber,
          price_min: this.filterForm.priceMin,
          price_max: this.filterForm.priceMax,
          mrt: this.filterForm.mrt,
          page: this.page,
          per_page: this.perPage,
        },
        this.lodash.isNil
      );
      getResidences(params).then((res) => {
        this.residences = res.data.items;
        this.total = res.data.total;
      });
    },
  },
};
</script>
