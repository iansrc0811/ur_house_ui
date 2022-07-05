import request from "@/utils/request";

const getCities = () => {
  return request.get("/api/v1/cities");
};
const getDistricts = () => {
  return request.get("/api/v1/districts");
};
export { getCities, getDistricts };
