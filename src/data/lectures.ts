import type { LectureData } from "./types";

/**
 * 专家讲座数据
 *
 * 说明：
 * - 此处数据为「前台展示数据」，初始为空。
 * - 专家姓名、头像、介绍、讲座日程均由管理员在后台维护后呈现。
 * - 接入后端时，可将此文件替换为接口请求结果（如 GET /api/lectures）。
 */
export const lectureData: LectureData = {
  speakers: [],
  schedule: [],
};
