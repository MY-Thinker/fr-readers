import type { JiandaoyunTask } from "./types";

/**
 * 6 个简道云二级跳转任务窗口（预留）
 *
 * 使用说明：
 * - 每个任务的 `url` 字段为简道云表单的对外链接
 * - 当前阶段 url 为空字符串，前端会显示『待开通』状态
 * - 简道云表单搭建完成后，将对应链接填入 url 字段即可启用跳转
 * - 例：url: "https://www.jiandaoyun.com/q/xxxx"
 */
export const jiandaoyunTasks: JiandaoyunTask[] = [
  {
    id: "task-1",
    index: 1,
    taskName: "个人阅读打卡",
    description: "每日阅读 30 分钟，连续 21 天打卡，记录所读书目与摘抄。",
    url: "https://tjjacdso0j.jiandaoyun.com/f/684aa0b6557927b5fd72fed4",
    icon: "BookOpen",
    tag: "个人 · 21 天",
  },
  {
    id: "task-2",
    index: 2,
    taskName: "家庭共读时光",
    description: "以家庭为单位，每周完成 1 次共读，上传共读照片与心得。",
    url: "",
    icon: "Users",
    tag: "家庭 · 周打卡",
  },
  {
    id: "task-3",
    index: 3,
    taskName: "曹雪芹文化寻访",
    description: "走访曹雪芹公园，完成 5 处文化点打卡并撰写观感。",
    url: "",
    icon: "MapPin",
    tag: "文化 · 实地",
  },
  {
    id: "task-4",
    index: 4,
    taskName: "经典诵读视频",
    description: "选择一篇经典诗文，录制 3 分钟以内的诵读视频上传。",
    url: "",
    icon: "Mic",
    tag: "诵读 · 视频",
  },
  {
    id: "task-5",
    index: 5,
    taskName: "社区读书会",
    description: "组织或参与社区读书会，提交活动纪实与读者合影。",
    url: "",
    icon: "MessagesSquare",
    tag: "社区 · 活动",
  },
  {
    id: "task-6",
    index: 6,
    taskName: "好书推荐官",
    description: "推荐一本好书，撰写 200 字以上推荐语并提交。",
    url: "",
    icon: "Sparkles",
    tag: "推荐 · 文字",
  },
];
