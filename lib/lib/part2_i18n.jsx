// ============================================================================
// GOLDEN GOOSE V14 FINAL - PART 2 OF 4: i18n & TASKS
// Lines: ~350 | Purpose: 5-Language Translations, Task Definitions
// ============================================================================

/* ==================== 5-LANGUAGE TRANSLATIONS ==================== */
const T = {
  en: {
    // Core
    t:"🥚 Golden Goose", b:"Balance", c:"Coins",
    // Mining
    mi:"⛏️ Start Mining", mg:"⏳ Mining...", cl:"💎 Claim $2",
    // Tabs
    tk:"📋 Daily Tasks", rw:"🏆 Giveaway", pf:"👤 Profile",
    // VIP
    vp:"💎 VIP", vipNeed:"💎 VIP Required! ${p} to continue.",
    // Buttons
    go:"Go", dn:"✓",
    // Streak
    st:"🔥 Streak", streakMax:"🔥 Max Streak Reached!",
    // Alerts
    ac:"🎉 $2 Claimed! Share proof!", nc:"❌ Need 10,000 Coins!", cd:"⏳ Wait...",
    // Misc
    sn:"Coming Soon...", rf:"Invite friends & earn 200!",
    sc:"🔒 V14 Fortress", cdd:"Claimed!",
    tp:"⛔ Time tampered!",
    // Wallet
    cn:"🔗 Connect Wallet", cnd:"✅ Connected", dc:"Disconnect",
    // Free Trial
    ft:"🎁 Free Trial ({c} left)", sh:"📸 Share Proof & Earn!",
    // Token
    tokenEarn:"📢 +1 Token (Total: {t})", needToken:"Need 1 Token!",
    // Giveaway
    win:"🏆 You won $${w}!", lose:"😔 Try again!",
    // History
    history:"📋 History", noHistory:"No history yet.",
    dailyReset:"🔄 Daily tasks & spins reset!",
    // Fingerprint
    fingerprintFail:"⛔ Fingerprint Mismatch!",
    // Spin
    spin:"🎰 SPIN & EARN", spinInfo:"1 Spin = Watch 1 Ad", spinUsed:"Daily Spins: {c}/{m}",
    spinPrize:"🎉 You got {p}!", spinFree:"🎁 Free Mining!", spinToken:"🎰 +1 Token!",
    // Install
    installMeta:"Install MetaMask!", walletError:"Wallet error",
    // Region
    regionEurope:"Europe", regionAsia:"Asia",
  },
  my: {
    t:"🥚 Golden Goose", b:"လက်ကျန်", c:"Coins",
    mi:"⛏️ စတင်တူးမယ်", mg:"⏳ တူးဖော်နေသည်...", cl:"💎 $2 ထုတ်ယူမယ်",
    tk:"📋 နေ့စဉ်အလုပ်များ", rw:"🏆 ကံစမ်းမဲ", pf:"👤 ပရိုဖိုင်",
    vp:"💎 VIP", vipNeed:"💎 VIP လိုအပ်ပါသည်! ${p} ပေးသွင်းရန်။",
    go:"သွားမယ်", dn:"✓",
    st:"🔥 ဆက်တိုက်", streakMax:"🔥 အများဆုံးဆက်တိုက်ရောက်ရှိပါပြီ!",
    ac:"🎉 $2 ရပြီ! Screenshot ရိုက်ပြီး Share လိုက်ပါ!", nc:"❌ Coins ၁၀,၀၀၀ လိုပါသည်။", cd:"⏳ ခဏစောင့်ပါ...",
    sn:"မကြာမီလာမည်...", rf:"သူငယ်ချင်းဖိတ်ပြီး 200 ရယူပါ။",
    sc:"🔒 V14 Fortress", cdd:"ပြီးပြီ!",
    tp:"⛔ အချိန်ပြောင်းထားသည်!",
    cn:"🔗 Wallet ချိတ်ရန်", cnd:"✅ ချိတ်ဆက်ပြီး", dc:"ဖြုတ်ရန်",
    ft:"🎁 အခမဲ့ ({c} ကြိမ်ကျန်)", sh:"📸 Screenshot ရိုက်ပြီး Share လုပ်ပါ!",
    tokenEarn:"📢 +1 Token (စုစုပေါင်း: {t})", needToken:"Token ၁ ခုလိုပါသည်!",
    win:"🏆 သင်အနိုင်ရရှိပါသည်! $${w}!", lose:"😔 ထပ်စမ်းကြည့်ပါ!",
    history:"📋 မှတ်တမ်း", noHistory:"မှတ်တမ်းမရှိသေးပါ။",
    dailyReset:"🔄 နေ့စဉ်အလုပ်များနှင့် Spins ပြန်သတ်မှတ်ပြီးပါပြီ!",
    fingerprintFail:"⛔ Fingerprint မကိုက်ညီပါ!",
    spin:"🎰 SPIN & EARN", spinInfo:"1 Spin = ကြော်ငြာ ၁ ပုဒ်", spinUsed:"နေ့စဉ် Spins: {c}/{m}",
    spinPrize:"🎉 {p} ရရှိပါသည်!", spinFree:"🎁 အခမဲ့ Mining!", spinToken:"🎰 +1 Token!",
    installMeta:"MetaMask ထည့်သွင်းပါ!", walletError:"Wallet ချိတ်ဆက်မှု မအောင်မြင်ပါ",
    regionEurope:"ဥရောပ", regionAsia:"အာရှ",
  },
  ru: {
    t:"🥚 Golden Goose", b:"Баланс", c:"Монет",
    mi:"⛏️ Майнить", mg:"⏳ Майнинг...", cl:"💎 Забрать $2",
    tk:"📋 Задания", rw:"🏆 Розыгрыш", pf:"👤 Профиль",
    vp:"💎 VIP", vipNeed:"💎 Нужен VIP! ${p} продолжить.",
    go:"Идти", dn:"✓",
    st:"🔥 Серия", streakMax:"🔥 Макс. серия достигнута!",
    ac:"🎉 $2 получено!", nc:"❌ Нужно 10,000!", cd:"⏳ Ждите...",
    sn:"Скоро...", rf:"Пригласи и получи 200!",
    sc:"🔒 V14 Fortress", cdd:"Готово!",
    tp:"⛔ Изменение времени!",
    cn:"🔗 Подключить", cnd:"✅ Подключено", dc:"Откл",
    ft:"🎁 Бесплатно ({c} осталось)", sh:"📸 Поделись и заработай!",
    tokenEarn:"📢 +1 Токен (Всего: {t})", needToken:"Нужен 1 Токен!",
    win:"🏆 Вы выиграли $${w}!", lose:"😔 Попробуйте снова!",
    history:"📋 История", noHistory:"Истории нет.",
    dailyReset:"🔄 Задания и спины сброшены!",
    fingerprintFail:"⛔ Отпечаток не совпадает!",
    spin:"🎰 SPIN & EARN", spinInfo:"1 Спин = 1 Реклама", spinUsed:"Спины: {c}/{m}",
    spinPrize:"🎉 Вы получили {p}!", spinFree:"🎁 Бесплатный Майнинг!", spinToken:"🎰 +1 Токен!",
    installMeta:"Установите MetaMask!", walletError:"Ошибка кошелька",
    regionEurope:"Европа", regionAsia:"Азия",
  },
  th: {
    t:"🥚 Golden Goose", b:"ยอดคงเหลือ", c:"เหรียญ",
    mi:"⛏️ เริ่มขุด", mg:"⏳ กำลังขุด...", cl:"💎 รับ $2",
    tk:"📋 ภารกิจ", rw:"🏆 รางวัล", pf:"👤 โปรไฟล์",
    vp:"💎 VIP", vipNeed:"💎 ต้องการ VIP! ${p} เพื่อดำเนินการต่อ",
    go:"ไป", dn:"✓",
    st:"🔥 สตรีค", streakMax:"🔥 สตรีคสูงสุด!",
    ac:"🎉 ได้รับ $2!", nc:"❌ ต้องการ 10,000!", cd:"⏳ รอสักครู่...",
    sn:"เร็วๆ นี้...", rf:"เชิญเพื่อนรับ 200!",
    sc:"🔒 V14 Fortress", cdd:"รับแล้ว!",
    tp:"⛔ ตรวจพบการเปลี่ยนเวลา!",
    cn:"🔗 เชื่อมต่อ", cnd:"✅ เชื่อมต่อแล้ว", dc:"ตัดการเชื่อมต่อ",
    ft:"🎁 ฟรี ({c} ครั้ง)", sh:"📸 แชร์และรับรางวัล!",
    tokenEarn:"📢 +1 Token (รวม: {t})", needToken:"ต้องการ 1 Token!",
    win:"🏆 คุณชนะ $${w}!", lose:"😔 ลองอีกครั้ง!",
    history:"📋 ประวัติ", noHistory:"ไม่มีประวัติ",
    dailyReset:"🔄 รีเซ็ตภารกิจและสปินประจำวัน!",
    fingerprintFail:"⛔ ลายนิ้วมือไม่ตรง!",
    spin:"🎰 SPIN & EARN", spinInfo:"1 สปิน = 1 โฆษณา", spinUsed:"สปิน: {c}/{m}",
    spinPrize:"🎉 คุณได้รับ {p}!", spinFree:"🎁 ขุดฟรี!", spinToken:"🎰 +1 Token!",
    installMeta:"ติดตั้ง MetaMask!", walletError:"กระเป๋าเงินผิดพลาด",
    regionEurope:"ยุโรป", regionAsia:"เอเชีย",
  },
  zh: {
    t:"🥚 金鹅", b:"余额", c:"金币",
    mi:"⛏️ 开始挖矿", mg:"⏳ 挖矿中...", cl:"💎 领取 $2",
    tk:"📋 每日任务", rw:"🏆 抽奖", pf:"👤 我的",
    vp:"💎 VIP", vipNeed:"💎 需要 VIP! ${p} 继续。",
    go:"去", dn:"✓",
    st:"🔥 连续", streakMax:"🔥 已达到最大连续!",
    ac:"🎉 $2 已领取!", nc:"❌ 需要 10,000!", cd:"⏳ 请等待...",
    sn:"即将推出...", rf:"邀请好友赚取 200!",
    sc:"🔒 V14 Fortress", cdd:"已领取!",
    tp:"⛔ 检测到时间篡改!",
    cn:"🔗 连接钱包", cnd:"✅ 已连接", dc:"断开",
    ft:"🎁 免费 ({c} 次)", sh:"📸 分享并赚取!",
    tokenEarn:"📢 +1 代币 (总计: {t})", needToken:"需要 1 个代币!",
    win:"🏆 你赢了 $${w}!", lose:"😔 再试一次!",
    history:"📋 历史", noHistory:"暂无历史。",
    dailyReset:"🔄 每日任务和转盘已重置!",
    fingerprintFail:"⛔ 指纹不匹配!",
    spin:"🎰 转盘赚取", spinInfo:"1 转 = 1 广告", spinUsed:"转盘: {c}/{m}",
    spinPrize:"🎉 你获得了 {p}!", spinFree:"🎁 免费挖矿!", spinToken:"🎰 +1 代币!",
    installMeta:"安装 MetaMask!", walletError:"钱包错误",
    regionEurope:"欧洲", regionAsia:"亚洲",
  },
};

/* ==================== TASK LIST ==================== */
const TASKS = [
  { id:"t1", icon:"🐦", nKey:"followX", rw:40, link:"https://x.com" },
  { id:"t2", icon:"📩", nKey:"joinTg", rw:50, link:"https://t.me" },
  { id:"t3", icon:"🎵", nKey:"tiktokLike", rw:40, link:"https://tiktok.com" },
  { id:"t4", icon:"▶️", nKey:"youtubeView", rw:20, link:"https://youtube.com" },
  { id:"t5", icon:"📘", nKey:"fbFollow", rw:50, link:"https://facebook.com" },
];

const TASK_NAMES = {
  en: { followX:"🐦 Follow X", joinTg:"📩 Join Telegram", tiktokLike:"🎵 TikTok Like", youtubeView:"▶️ YouTube View", fbFollow:"📘 Facebook Follow" },
  my: { followX:"🐦 X Follow", joinTg:"📩 Telegram Join", tiktokLike:"🎵 TikTok Like", youtubeView:"▶️ YouTube View", fbFollow:"📘 Facebook Follow" },
  ru: { followX:"🐦 Подписаться X", joinTg:"📩 Telegram", tiktokLike:"🎵 TikTok Лайк", youtubeView:"▶️ YouTube", fbFollow:"📘 Facebook" },
  th: { followX:"🐦 ติดตาม X", joinTg:"📩 เข้าร่วม Telegram", tiktokLike:"🎵 TikTok ไลค์", youtubeView:"▶️ YouTube ดู", fbFollow:"📘 Facebook ติดตาม" },
  zh: { followX:"🐦 关注 X", joinTg:"📩 加入 Telegram", tiktokLike:"🎵 TikTok 点赞", youtubeView:"▶️ YouTube 观看", fbFollow:"📘 Facebook 关注" },
};

/* ==================== SPIN PRIZES ==================== */
const SPIN_PRIZES = [
  { label:"💎 100 Coins", value:100, weight:25 },
  { label:"💎 200 Coins", value:200, weight:22 },
  { label:"💎 500 Coins", value:500, weight:18 },
  { label:"💎 1000 Coins", value:1000, weight:15 },
  { label:"💎 2000 Coins", value:2000, weight:10 },
  { label:"🎁 Free Mining", value:"free_mining", weight:5 },
  { label:"🎰 +1 Token", value:"token", weight:5 },
];

const getRandomPrize = () => {
  const total = SPIN_PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (const p of SPIN_PRIZES) {
    r -= p.weight;
    if (r <= 0) return p;
  }
  return SPIN_PRIZES[0];
};

/* ==================== GIVEAWAY PRIZES ==================== */
const GIVEAWAY_PRIZES = [
  { tier:1, label:"🥇 First Prize", amount:20 },
  { tier:2, label:"🥈 Second Prize", amount:10 },
  { tier:3, label:"🥉 Third Prize", amount:5 },
  { tier:4, label:"🏅 Consolation", amount:1 },
  { tier:5, label:"🏅 Consolation", amount:1 },
  { tier:6, label:"🏅 Consolation", amount:1 },
  { tier:7, label:"🏅 Consolation", amount:1 },
  { tier:8, label:"🏅 Consolation", amount:1 },
  { tier:9, label:"🏅 Consolation", amount:1 },
  { tier:10, label:"🏅 Consolation", amount:1 },
];

const getRandomGiveawayPrize = () => {
  return GIVEAWAY_PRIZES[Math.floor(Math.random() * GIVEAWAY_PRIZES.length)];
};

export { T, TASKS, TASK_NAMES, SPIN_PRIZES, getRandomPrize, GIVEAWAY_PRIZES, getRandomGiveawayPrize };
