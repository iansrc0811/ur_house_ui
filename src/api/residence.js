import request from "@/utils/request";
const getResidences = ({
  city_id,
  district_id,
  room_number,
  price_min,
  price_max,
  mrt,
  page,
  per_page,
}) => {
  return request.get("/api/v1/residences", {
    city_id: city_id,
    district_id: district_id,
    room_number: room_number,
    price_min: price_min,
    price_max: price_max,
    mrt: mrt,
    page: page,
    per_page: per_page,
  });
};

export { getResidences };
