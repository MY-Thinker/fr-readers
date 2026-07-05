import type { CarouselItem } from "./types";

// text_to_image 生成的主视觉图
const heroImage = (prompt: string) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=landscape_16_9`;

export const carouselItems: CarouselItem[] = [
  {
    id: "carousel-lectures",
    title: "专家阅读指导讲座",
    subtitle: "名家开卷 · 启智润心",
    description: "曹雪芹文化讲堂，特邀阅读名家莅临指导，与读者共赴一场夏日书香之约。",
    route: "/lectures",
    cta: "查看讲座",
    image: heroImage(
      "Traditional Chinese ink wash painting, a classical scholar in Hanfu giving a lecture in a wooden pavilion, audience sitting on woven mats, lotus pond and red pillars in background, warm summer golden hour light, red seal accents, Dream of Red Chamber aesthetic, paper texture, elegant and serene, no text",
    ),
    accent: "rouge",
    sealChar: "講",
  },
  {
    id: "carousel-tasks",
    title: "活动任务",
    subtitle: "六题共读 · 卷卷生香",
    description: "六大阅读任务已就绪，与全区读者一同打卡书香夏日。",
    route: "/tasks",
    cta: "前往任务",
    image: heroImage(
      "Traditional Chinese ink wash painting, a stack of ancient thread-bound books with bamboo slips, a partially unfurled scroll with calligraphy, red ink seal stamps, summer cicada and lotus motifs, warm cream paper background, subtle gold accents, no text, elegant still life composition",
    ),
    accent: "jade",
    sealChar: "读",
  },
  {
    id: "carousel-insights",
    title: "心得展示",
    subtitle: "千言万卷 · 一城回响",
    description: "读者阅读心得汇聚于此，记录每一份阅读的温度。",
    route: "/insights",
    cta: "查看心得",
    image: heroImage(
      "Traditional Chinese ink wash painting, a long calligraphy wall with hanging scrolls of poetry, soft brush strokes, red seal marks scattered, warm paper texture, subtle bamboo shadow, serene summer reading atmosphere, no readable text, elegant minimal composition",
    ),
    accent: "ink",
    sealChar: "心",
  },
];
