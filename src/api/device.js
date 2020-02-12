import request from "@/utils/request";

export function getType(params) {
  return request({
    url: "/device/type",
    method: "get",
    params
  });
}
export function getStatus(params) {
  return request({
    url: "/device/status",
    method: "get",
    params
  });
}
export function getCount(params) {
  return request({
    url: "/device/count",
    method: "get",
    params
  });
}
export function getList(params) {
  return request({
    url: "/device/list",
    method: "get",
    params
  });
}
export function getListAll(params) {
  return request({
    url: "/device/list-all",
    method: "get",
    params
  });
}
export function deleteData(params) {
  return request({
    url: "/device/delete",
    method: "delete",
    params
  });
}
export function addData(data) {
  return request({
    url: "/device/add",
    method: "post",
    data
  });
}
export function updateData(data) {
  return request({
    url: "/device/update",
    method: "post",
    data
  });
}
