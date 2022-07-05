import request from "@/utils/request";
const residenceIndex = ({
  city_id,
  district_ids,
  room_number,
  price_min,
  price_max,
  mrt,
  page,
  per_page,
}) => {
  const params = {
    city_id: city_id,
    district_ids: district_ids,
    room_number: room_number,
    price_min: price_min,
    price_max: price_max,
    mrt: mrt,
    page: page,
    per_page: per_page,
  };
  return request.get("/api/v1/residences", { params });
};

export { getResidences };
