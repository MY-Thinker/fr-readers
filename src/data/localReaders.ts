import type { LocalReader } from "./types";

const avatar = (prompt: string) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=square_hd`;

export const localReaders: LocalReader[] = [
  {
    id: "reader-1",
    name: "李文渊",
    title: "丰润一中语文教师 · 区域阅读推广人",
    avatar: avatar(
      "Traditional Chinese ink wash portrait of a middle-aged male Chinese literature teacher, warm smile, glasses, holding a thread-bound book, soft cream background with subtle bamboo shadow, red seal accent, dignified and kind, no text",
    ),
    bio: "从教二十余载，发起『晨读一刻』校园读书会，带动千余名学生养成每日阅读习惯。",
    recommendedBooks: [
      { title: "红楼梦", author: "曹雪芹" },
      { title: "乡土中国", author: "费孝通" },
    ],
    quote: "读书不觉夏已深，一卷在手，便是一城清凉。",
  },
  {
    id: "reader-2",
    name: "陈雪芹",
    title: "社区阅读志愿者 · 红楼文化爱好者",
    avatar: avatar(
      "Traditional Chinese ink wash portrait of a young Chinese woman with hair in a low bun, wearing modern cheongsam with subtle red pattern, holding a calligraphy scroll, warm paper background, lotus motif, red seal accent, gentle and literary, no text",
    ),
    bio: "丰润曹雪芹公园志愿讲解员，连续三年组织社区『红楼夜读』活动，让古典文学走入寻常巷陌。",
    recommendedBooks: [
      { title: "红楼梦诗词赏析", author: "蔡义江" },
      { title: "唐宋词十七讲", author: "叶嘉莹" },
    ],
    quote: "雪芹故里读雪芹，一卷红楼一城心。",
  },
  {
    id: "reader-3",
    name: "王砚之",
    title: "丰润区图书馆馆员 · 亲子阅读推广人",
    avatar: avatar(
      "Traditional Chinese ink wash portrait of a young female librarian with a low ponytail, gentle smile, holding a children's picture book, soft cream background, scattered books and ink brush, red seal accent, warm and approachable, no text",
    ),
    bio: "策划『周末故事妈妈』亲子阅读品牌项目，让阅读成为丰润家庭最美的周末时光。",
    recommendedBooks: [
      { title: "猜猜我有多爱你", author: "山姆·麦克布雷尼" },
      { title: "中国神话故事集", author: "袁珂" },
    ],
    quote: "一盏灯、一本书，便是孩子心中最亮的星辰。",
  },
];
