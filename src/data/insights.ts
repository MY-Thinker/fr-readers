import type { InsightItem, InsightTag } from "./types";

/**
 * 心得展示 - 与简道云表单字段适配（预留）
 *
 * 字段映射（简道云表单 → InsightItem）：
 * - 读者姓名 → readerName
 * - 推荐书目 → bookTitle
 * - 书目作者 → bookAuthor
 * - 阅读心得 → content
 * - 提交时间 → submittedAt
 * - 主题标签 → tagIds
 *
 * 当前阶段：空数组占位。
 * 简道云表单数据接入后，将通过简道云开放接口拉取数据并填入此处。
 * 前端心得墙组件已按上述字段结构搭建骨架，等待数据源接入。
 */
export const insightTags: InsightTag[] = [
  { id: "tag-caoxueqin", name: "曹雪芹文化" },
  { id: "tag-classic", name: "古典文学" },
  { id: "tag-family", name: "亲子共读" },
  { id: "tag-modern", name: "现当代文学" },
  { id: "tag-poetry", name: "诗词诵读" },
];

export const insightItems: InsightItem[] = [];
