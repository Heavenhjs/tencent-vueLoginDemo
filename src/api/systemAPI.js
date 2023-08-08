import request from "@/utils/http/axios";

export default {
  async login(params) {
    return await request.post("/v1/users/login", params);
  },
};
