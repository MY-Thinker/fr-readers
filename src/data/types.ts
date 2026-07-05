// 全部数据模型的 TypeScript 类型定义

// 顶部通栏轮播
export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** 跳转路由 */
  route: string;
  /** 跳转标签文字 */
  cta: string;
  /** 主视觉图片 URL（text_to_image 生成） */
  image: string;
  /** 主题色调（用于卡片叠层） */
  accent: "rouge" | "jade" | "ink";
  /** 印章字（用于左上角方印） */
  sealChar: string;
}

// 活动总览
export interface ActivityInfo {
  edition: string;
  year: string;
  title: string;
  subtitle: string;
  period: string;
  host: string;
  organizers: string[];
  intro: string;
  /** 活动主旨印章文字 */
  motto: string;
}

// 曹雪芹文化
export interface ParkInfo {
  name: string;
  location: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface PoetryItem {
  title: string;
  author: string;
  /** 诗文正文（含换行） */
  content: string;
  /** 释文 / 赏析 */
  annotation: string;
}

export interface CaoXueqinCulture {
  brief: string;
  park: ParkInfo;
  poetry: PoetryItem[];
}

// 本土读书名人
export interface RecommendedBook {
  title: string;
  author: string;
}

export interface LocalReader {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  recommendedBooks: RecommendedBook[];
  /** 推荐语 */
  quote: string;
}

// 专家讲座
export interface Speaker {
  id: string;
  name: string;
  title: string;
  field: string;
  avatar: string;
  intro: string;
}

export interface ScheduleItem {
  id: string;
  date: string;
  weekday: string;
  time: string;
  topic: string;
  speakerId: string;
  location: string;
}

export interface LectureData {
  speakers: Speaker[];
  schedule: ScheduleItem[];
}

// 专家视频（预留上传）
export interface ExpertVideo {
  id: string;
  title: string;
  speaker: string;
  /** 视频源 URL（上传后写入） */
  src: string;
  /** 封面图 */
  cover: string;
  duration: string;
  uploadedAt: string;
}

// 简道云跳转链接
export interface JiandaoyunTask {
  id: string;
  index: number;
  taskName: string;
  description: string;
  /** 预留：简道云表单链接 */
  url: string;
  /** 任务图标 emoji 或 lucide 名称 */
  icon: string;
  /** 难度/类别标签 */
  tag: string;
}

// 心得展示（简道云适配）
export interface InsightTag {
  id: string;
  name: string;
}

export interface InsightItem {
  id: string;
  /** 读者姓名（简道云字段：读者姓名） */
  readerName: string;
  /** 推荐书目（简道云字段：推荐书目） */
  bookTitle: string;
  /** 书目作者 */
  bookAuthor: string;
  /** 心得正文（简道云字段：阅读心得） */
  content: string;
  /** 提交时间（简道云字段：提交时间） */
  submittedAt: string;
  /** 标签 ID */
  tagIds: string[];
}
