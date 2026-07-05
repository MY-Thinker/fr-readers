import type { CaoXueqinCulture } from "./types";

const parkImage = (prompt: string) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=landscape_16_9`;

export const caoXueqinCulture: CaoXueqinCulture = {
  brief:
    "丰润，是曹雪芹祖籍故里，亦是其家族文脉延续之地。曹雪芹公园以《红楼梦》为意境蓝本，融江南园林之秀与北方园林之雄，是本届阅读活动的精神原乡。读者漫步园中，可观红楼旧梦，可诵雪芹诗文，可承一城书香。",
  park: {
    name: "曹雪芹公园",
    location: "河北省唐山市丰润区 · 曹雪芹大道",
    image: parkImage(
      "Traditional Chinese ink wash painting of Cao Xueqin Memorial Park in Fengrun, classical Chinese garden with red lacquered pavilions, white walls and grey tiles, lotus pond reflecting summer sky, weeping willows, stone bridge, distant misty hills, warm afternoon light, Dream of Red Chamber aesthetic, red seal accent in corner, no text",
    ),
    description:
      "园内设有曹雪芹纪念馆、红楼文化长廊、芹溪书院等景观，是丰润最具代表性的文化地标。今夏，这里将化作全域阅读活动的主讲堂。",
    highlights: [
      "曹雪芹纪念馆 · 红楼旧梦",
      "芹溪书院 · 名家开讲",
      "红楼文化长廊 · 诗文展卷",
      "沁芳桥 · 阅读打卡",
    ],
  },
  poetry: [
    {
      title: "题芹溪居士",
      author: "张宜泉",
      content: "爱将笔墨逞风流，庐结西郊别样幽。\n门外山川供绘画，堂前花鸟入吟讴。",
      annotation:
        "此诗记述曹雪芹隐居西郊、笔墨自适之态。本届活动以『芹溪』为名，立讲堂于曹雪芹公园，致敬先贤风骨。",
    },
    {
      title: "红楼梦 · 自题诗",
      author: "曹雪芹",
      content: "满纸荒唐言，一把辛酸泪。\n都云作者痴，谁解其中味？",
      annotation:
        "曹公自题，道尽《红楼梦》百年孤寂。今日重读，仍能在字里行间触摸到那一份痴心与赤诚。",
    },
    {
      title: "咏白海棠",
      author: "曹雪芹（红楼梦）",
      content: "半卷湘帘半掩门，碾冰为土玉为盆。\n偷来梨蕊三分白，借得梅花一缕魂。",
      annotation:
        "出《红楼梦》海棠诗社。借海棠之洁，写书韵之清，恰应『书香沁夏』之题。",
    },
  ],
};
