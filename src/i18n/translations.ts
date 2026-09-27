export type Lang = "en" | "vi" | "zh";

export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: "en", label: "English", short: "EN" },
  { id: "vi", label: "Tiếng Việt", short: "VI" },
  { id: "zh", label: "中文", short: "中文" },
];

export const htmlLang: Record<Lang, string> = {
  en: "en",
  vi: "vi",
  zh: "zh-Hans",
};

type Dictionary = {
  hero: {
    eyebrow: string;
    scroll: string;
  };
  invitation: {
    mrMrs: string;
    inviteSon: string;
    daughterOf: string;
  };
  countdown: {
    eyebrow: string;
    eyebrowPassed: string;
    title: string;
    titlePassed: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    until: string;
  };
  details: {
    eyebrow: string;
    title: string;
    venueLabel: string;
    timeLabel: string;
    dressLabel: string;
    timeValue: string;
    timeSub: string;
    dressValue: string;
    dressSub: string;
    map: string;
  };
  rsvp: {
    eyebrow: string;
    title: string;
    thankYou: string;
    thankYouBody: string;
    name: string;
    namePlaceholder: string;
    contact: string;
    contactPlaceholder: string;
    attend: string;
    accept: string;
    decline: string;
    guests: string;
    fewerGuests: string;
    moreGuests: string;
    note: string;
    notePlaceholder: string;
    send: string;
    sending: string;
    error: string;
  };
  music: {
    play: string;
    playing: string;
    failed: string;
    playAria: string;
    pauseAria: string;
    credit: string;
  };
  language: {
    label: string;
  };
  photos: {
    pavilion: string;
    selfie: string;
    flowerField: string;
    handKiss: string;
    sunflowers: string;
    lanterns: string;
    courtyard: string;
  };
};

export const translations: Record<Lang, Dictionary> = {
  en: {
    hero: {
      eyebrow: "The Wedding Of",
      scroll: "Scroll",
    },
    invitation: {
      mrMrs: "Mr & Mrs",
      inviteSon: "Joyfully invite you to celebrate the marriage of their Son",
      daughterOf: "Daughter of",
    },
    countdown: {
      eyebrow: "Counting down to our big day",
      eyebrowPassed: "We are married",
      title: "Counting Down",
      titlePassed: "Just Married",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      until: 'until we say “I do” — 7:00 PM, Christmas Eve 2026',
    },
    details: {
      eyebrow: "Details",
      title: "When & Where",
      venueLabel: "The wedding ceremony will be held at",
      timeLabel: "Time",
      dressLabel: "Dress code",
      timeValue: "7:00 PM — Thursday, 24.12.2026",
      timeSub: "Christmas Eve",
      dressValue: "Formal & Good Vibes",
      dressSub: "Soft tones are welcome — pastel, blush, sage",
      map: "View on map ↗",
    },
    rsvp: {
      eyebrow: "Kindly RSVP by 24.10.2026",
      title: "Will You Join Us?",
      thankYou: "Thank you",
      thankYouBody: "Your reply has been received — we can't wait to celebrate with you.",
      name: "Your name *",
      namePlaceholder: "e.g. Nguyen Van An",
      contact: "Phone / Email (optional)",
      contactPlaceholder: "So we can reach you",
      attend: "Will you attend? *",
      accept: "Joyfully Accepts",
      decline: "Regretfully Declines",
      guests: "Number of seats (including you)",
      fewerGuests: "Fewer guests",
      moreGuests: "More guests",
      note: "A note for the couple (optional)",
      notePlaceholder: "Your wishes, dietary needs, song requests…",
      send: "Send RSVP",
      sending: "Sending…",
      error: "Something went wrong — please try again.",
    },
    music: {
      play: "Play Music",
      playing: "Playing",
      failed: "Tap again",
      playAria: "Play music",
      pauseAria: "Pause music",
      credit: "",
    },
    language: {
      label: "Language",
    },
    photos: {
      pavilion: "Anders and Uyen in traditional wedding attire under a pavilion",
      selfie: "Anders and Uyen smiling together",
      flowerField: "Anders and Uyen in a field of yellow flowers",
      handKiss: "Anders kissing Uyen's hand in traditional wedding attire",
      sunflowers: "Anders and Uyen posing among sunflowers in wedding attire",
      lanterns: "Anders and Uyen holding hands under glowing lanterns",
      courtyard: "Anders and Uyen standing in a lantern-filled courtyard",
    },
  },
  vi: {
    hero: {
      eyebrow: "Lễ Thành Hôn",
      scroll: "Cuộn xuống",
    },
    invitation: {
      mrMrs: "Ông Bà",
      inviteSon: "Trân trọng kính mời đến dự Lễ thành hôn của Trưởng Nam",
      daughterOf: "Trưởng Nữ của",
    },
    countdown: {
      eyebrow: "Đếm ngược đến ngày trọng đại",
      eyebrowPassed: "Chúng tôi đã về chung một nhà",
      title: "Đếm Ngược",
      titlePassed: "Vừa Thành Hôn",
      days: "Ngày",
      hours: "Giờ",
      minutes: "Phút",
      seconds: "Giây",
      until: "đến khi chúng tôi nói “I do” — 19:00, Đêm Giáng Sinh 2026",
    },
    details: {
      eyebrow: "Chi tiết",
      title: "Thời Gian & Địa Điểm",
      venueLabel: "Hôn lễ sẽ được cử hành tại",
      timeLabel: "Thời gian",
      dressLabel: "Trang phục — Lịch sự & Tinh tế",
      timeValue: "19:00 — Thứ Năm, 24.12.2026",
      timeSub: "Đêm Giáng Sinh",
      dressValue: "Lịch sự & Vui vẻ",
      dressSub: "Sắc pastel, hồng nhạt, xanh sage rất được chào đón",
      map: "Xem bản đồ ↗",
    },
    rsvp: {
      eyebrow: "Kính mong xác nhận tham dự trước 24.10.2026",
      title: "Bạn Sẽ Đến Chứ?",
      thankYou: "Cảm ơn",
      thankYouBody: "Cảm ơn bạn đã xác nhận — chúng tôi rất mong được chung vui cùng bạn.",
      name: "Họ tên *",
      namePlaceholder: "vd. Nguyễn Văn An",
      contact: "Điện thoại / Email (tuỳ chọn)",
      contactPlaceholder: "Để chúng tôi liên lạc với bạn",
      attend: "Bạn sẽ tham dự chứ? *",
      accept: "Vui vẻ tham dự",
      decline: "Rất tiếc không thể đến",
      guests: "Số ghế (bao gồm bạn)",
      fewerGuests: "Giảm số khách",
      moreGuests: "Tăng số khách",
      note: "Lời nhắn cho cô dâu chú rể (tuỳ chọn)",
      notePlaceholder: "Lời chúc, nhu cầu ăn uống, bài hát yêu cầu…",
      send: "Gửi xác nhận",
      sending: "Đang gửi…",
      error: "Có lỗi xảy ra — vui lòng thử lại.",
    },
    music: {
      play: "Bật nhạc",
      playing: "Đang phát",
      failed: "Chạm lại",
      playAria: "Bật nhạc",
      pauseAria: "Tắt nhạc",
      credit: "",
    },
    language: {
      label: "Ngôn ngữ",
    },
    photos: {
      pavilion: "Anders và Uyen trong trang phục cưới truyền thống dưới mái đình",
      selfie: "Anders và Uyen mỉm cười bên nhau",
      flowerField: "Anders và Uyen giữa cánh đồng hoa vàng",
      handKiss: "Anders hôn tay Uyen trong trang phục cưới truyền thống",
      sunflowers: "Anders và Uyen tạo dáng giữa hoa hướng dương",
      lanterns: "Anders và Uyen nắm tay dưới ánh đèn lồng",
      courtyard: "Anders và Uyen đứng trong sân đầy đèn lồng",
    },
  },
  zh: {
    hero: {
      eyebrow: "婚礼邀请",
      scroll: "下滑",
    },
    invitation: {
      mrMrs: "先生与夫人",
      inviteSon: "诚挚邀请您出席爱子的婚礼",
      daughterOf: "爱女",
    },
    countdown: {
      eyebrow: "距离大喜之日",
      eyebrowPassed: "我们已结为连理",
      title: "倒计时",
      titlePassed: "喜结连理",
      days: "天",
      hours: "时",
      minutes: "分",
      seconds: "秒",
      until: "直至我们许下承诺 — 晚上7:00，2026年圣诞夜",
    },
    details: {
      eyebrow: "详情",
      title: "时间与地点",
      venueLabel: "婚礼将于以下地点举行",
      timeLabel: "时间",
      dressLabel: "着装要求",
      timeValue: "晚上7:00 — 2026年12月24日 星期四",
      timeSub: "圣诞夜",
      dressValue: "正式着装，轻松愉悦",
      dressSub: "欢迎柔和色调 — 粉彩、腮红粉、鼠尾草绿",
      map: "查看地图 ↗",
    },
    rsvp: {
      eyebrow: "敬请于 2026.10.24 前确认出席",
      title: "您会与我们同庆吗？",
      thankYou: "谢谢",
      thankYouBody: "我们已收到您的回复，期待与您共庆。",
      name: "您的姓名 *",
      namePlaceholder: "例如：Nguyen Van An",
      contact: "电话 / 邮箱（选填）",
      contactPlaceholder: "方便我们与您联系",
      attend: "您是否出席？ *",
      accept: "欣然接受",
      decline: "遗憾无法出席",
      guests: "座位人数（含本人）",
      fewerGuests: "减少人数",
      moreGuests: "增加人数",
      note: "给新人的留言（选填）",
      notePlaceholder: "祝福、饮食需求、点歌…",
      send: "提交确认",
      sending: "提交中…",
      error: "出错了，请重试。",
    },
    music: {
      play: "播放音乐",
      playing: "播放中",
      failed: "请再点一次",
      playAria: "播放音乐",
      pauseAria: "暂停音乐",
      credit: "",
    },
    language: {
      label: "语言",
    },
    photos: {
      pavilion: "Anders 与 Uyen 身着传统婚服立于亭下",
      selfie: "Anders 与 Uyen 相视而笑",
      flowerField: "Anders 与 Uyen 在黄色花田间",
      handKiss: "Anders 轻吻 Uyen 的手",
      sunflowers: "Anders 与 Uyen 在向日葵中留影",
      lanterns: "Anders 与 Uyen 在灯笼下牵手",
      courtyard: "Anders 与 Uyen 站在灯笼庭院中",
    },
  },
};
