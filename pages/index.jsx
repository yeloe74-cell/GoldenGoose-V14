// ============================================================================
// GOLDEN GOOSE V14 FINAL - PART 3 OF 4: MAIN APP LOGIC (COMPACT ~350 LINES)
// ============================================================================

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import { C, VP, getRegionName, Store, LS, TimeAPI, Guard, getFingerprint, SecurityLog, TxVerifier } from "../lib/part1_core";
import { T, TASKS, TASK_NAMES, SPIN_PRIZES, getRandomPrize, GIVEAWAY_PRIZES, getRandomGiveawayPrize } from "../lib/part2_i18n";

export default function Home() {
  const [bal, setBal] = useState(10000); const [mining, setMining] = useState(false);
  const [end, setEnd] = useState(null); const [tab, setTab] = useState("mine");
  const [vip, setVip] = useState(0); const [lang, setLang] = useState("en");
  const [toast, setToast] = useState(null); const [streak, setStreak] = useState(0);
  const [claimed, setClaimed] = useState({}); const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null); const [ft, setFt] = useState(C.FREE);
  const [region, setRegion] = useState("Asia"); const [gt, setGt] = useState(0);
  const [history, setHistory] = useState([]); const [loading, setLoading] = useState(true);
  const [spinCount, setSpinCount] = useState(0); const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null); const [showSpinModal, setShowSpinModal] = useState(false);

  const rate = useRef({}); const raf = useRef();
  const sessionToken = useRef(TxVerifier.sign("init", "user"));
  const actionCount = useRef(0); const lastAction = useRef(Date.now());
  const mineLock = useRef(false); const claimLock = useRef(false);

  const t = useMemo(() => T[lang] || T.en, [lang]);
  const tn = useMemo(() => TASK_NAMES[lang] || TASK_NAMES.en, [lang]);

  const rl = useCallback((k) => {
    const n = Date.now();
    if (rate.current[k] && n - rate.current[k] < C.CD) return false;
    actionCount.current++;
    if (actionCount.current > 30 && n - lastAction.current < 60000) return false;
    if (actionCount.current > 30) { actionCount.current = 0; lastAction.current = n; }
    if (!TxVerifier.verify(sessionToken.current)) { SecurityLog.add("Invalid token"); return false; }
    rate.current[k] = n; return true;
  }, []);

  const show = useCallback((m) => { setToast(m); setTimeout(() => setToast(null), 2200); }, []);

  useEffect(() => {
    Guard.init();
    const fp = getFingerprint(); const sfp = LS.get("fp");
    if (sfp && sfp !== fp) { show("⛔ FP Mismatch!"); setTimeout(() => location.reload(), 3000); return; }
    LS.set("fp", fp);
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp; tg.ready(); tg.expand(); tg.disableVerticalSwipes();
      const u = tg.initDataUnsafe?.user;
      if (u) { setUser(u); setLang({my:"my",ru:"ru",th:"th",zh:"zh"}[u.language_code]||"en"); setRegion(getRegionName(u.language_code||"en")); }
    }
    (async () => {
      const b = await Store.get("bal"); if (b !== null && typeof b === "number" && b >= 0 && b <= C.MAX) setBal(b); else setBal(10000);
      const e = await Store.get("end"); const v = await Store.get("vip"); const s = await Store.get("streak");
      const c = await Store.get("claimed"); const w = await Store.get("wallet");
      const f = await Store.get("ft"); const g = await Store.get("gt"); const h = await Store.getAll("t");
      const sc = await Store.get("spinCount");
      if (v) setVip(v); if (s) setStreak(s); if (c) setClaimed(c); if (w) setWallet(w);
      if (f !== null) setFt(f); if (g) setGt(g); if (h?.length) setHistory(h); if (sc) setSpinCount(sc);
      const today = new Date().toISOString().split("T")[0];
      if (LS.get("task_day") !== today) { setClaimed({}); setSpinCount(0); LS.set("task_day", today); show(t.dailyReset); }
      if (e && e > Date.now()) { const sn = await TimeAPI.get(); setEnd(Math.abs(sn-Date.now())>C.DRIFT?e+(sn-Date.now()):e); setMining(true); }
      setLoading(false);
    })();
  }, []);

  useEffect(() => { if (!loading) Store.set("bal", bal); }, [bal, loading]);
  useEffect(() => { if (!loading) Store.set("end", end); }, [end, loading]);
  useEffect(() => { if (!loading) Store.set("vip", vip); }, [vip, loading]);
  useEffect(() => { if (!loading) Store.set("streak", streak); }, [streak, loading]);
  useEffect(() => { if (!loading) Store.set("claimed", claimed); }, [claimed, loading]);
  useEffect(() => { if (wallet && !loading) Store.set("wallet", wallet); }, [wallet, loading]);
  useEffect(() => { if (!loading) Store.set("ft", ft); }, [ft, loading]);
  useEffect(() => { if (!loading) Store.set("gt", gt); }, [gt, loading]);
  useEffect(() => { if (!loading) Store.set("spinCount", spinCount); }, [spinCount, loading]);

  const [now, setNow] = useState(Date.now());
  useEffect(() => { const l = () => { setNow(Date.now()); raf.current = requestAnimationFrame(l); }; raf.current = requestAnimationFrame(l); return () => cancelAnimationFrame(raf.current); }, []);
  const timeLeft = useMemo(() => { if (!end) return ""; const d = Math.max(0, end - now); return `${String(Math.floor(d/3600000)).padStart(2,"0")}:${String(Math.floor((d%3600000)/60000)).padStart(2,"0")}:${String(Math.floor((d%60000)/1000)).padStart(2,"0")}`; }, [end, now]);
  const progress = useMemo(() => { if (!end) return 0; return Math.min(100, ((C.MT - Math.max(0, end - now)) / C.MT) * 100); }, [end, now]);
  const circ = 2 * Math.PI * 70;

  const connectWallet = async () => { if (!window.ethereum) return show(t.installMeta); try { const p = new ethers.BrowserProvider(window.ethereum); const a = await (await p.getSigner()).getAddress(); setWallet(a); sessionToken.current = TxVerifier.sign("wallet", a); show(t.cnd); } catch { show(t.walletError); } };
  const disconnectWallet = () => { setWallet(null); Store.remove("wallet"); show(t.dc); };

  const mine = useCallback(() => {
    if (!rl("mine") || mineLock.current) return show(t.cd);
    mineLock.current = true;
    if (ft > 0) { setFt(f => f - 1); setMining(true); setEnd(Date.now() + C.MT); show(t.ft.replace("{c}", ft - 1)); }
    else if (vip <= 0) show(t.vipNeed.replace("${p}", VP(user?.language_code || "en")));
    else if (bal < C.MC) show(t.nc);
    else { setBal(b => b - C.MC); setMining(true); setEnd(Date.now() + C.MT); }
    setTimeout(() => { mineLock.current = false; }, 1000);
  }, [bal, vip, ft, rl, show, t, user]);

  const claim = useCallback(async () => {
    if (!rl("claim") || claimLock.current) return show(t.cd);
    claimLock.current = true;
    const st = await TimeAPI.get();
    if (Math.abs(st - Date.now()) > C.DRIFT || st < (end - 5000)) show(t.tp);
    else { setMining(false); setEnd(null); setBal(b => Math.min(C.MAX, b + C.MR)); setVip(v => Math.min(v + 1, C.VIP_LEVELS)); setStreak(s => Math.min(s + 1, C.MAX_STREAK)); show(t.ac); setTimeout(() => show(t.sh), 2500); }
    setTimeout(() => { claimLock.current = false; }, 1000);
  }, [end, streak, vip, rl, show, t]);

  const doTask = useCallback((id, rw, link) => {
    if (!rl("task") || claimed[id]) return show(claimed[id] ? t.cdd : t.cd);
    setClaimed(p => ({ ...p, [id]: true })); setBal(b => Math.min(C.MAX, b + rw));
    setHistory(h => [{ id, rw, time: Date.now() }, ...h].slice(0, 50));
    if (link) window.open(link, "_blank");
  }, [claimed, rl, show, t]);

  const doSpin = useCallback(() => {
    if (spinning || spinCount >= C.MAX_SPINS || !rl("spin")) return;
    setSpinning(true); setSpinResult(null);
    setTimeout(() => { const p = getRandomPrize(); setSpinResult(p); setSpinning(false); setSpinCount(s => s + 1);
      if (p.value === "free_mining") { setFt(f => f + 1); show(t.spinFree); }
      else if (p.value === "token") { setGt(tk => tk + 1); show(t.spinToken); }
      else { setBal(b => Math.min(C.MAX, b + p.value)); show(t.spinPrize.replace("{p}", p.label)); }
    }, 2000);
  }, [spinning, spinCount, rl, show, t]);

  const enterGiveaway = useCallback(() => {
    if (!rl("giveaway") || gt < C.GIVEAWAY_COST) return show(gt < C.GIVEAWAY_COST ? t.needToken : t.cd);
    setGt(tk => tk - C.GIVEAWAY_COST);
    if (Math.random() < C.GIVEAWAY_WIN) { const p = getRandomGiveawayPrize(); setBal(b => Math.min(C.MAX, b + p.amount * 100)); show(t.win.replace("${w}", p.amount)); }
    else show(t.lose);
  }, [gt, rl, show, t]);

  if (loading) return <div style={L}><div style={{color:"#ffd700",fontSize:24,fontFamily:"'Orbitron',sans-serif"}}>🥚 Loading...</div></div>;

  return (
    <>
      <Head><title>Golden Goose V14</title><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet" /></Head>
      <div style={S.bg}>
        {toast && <div style={S.toast}>{toast}</div>}
        <div style={S.h}><div style={S.lg}>{t.t}</div><div style={S.hr}><select style={S.ls} value={lang} onChange={e=>setLang(e.target.value)}><option value="en">🇬🇧</option><option value="my">🇲🇲</option><option value="ru">🇷🇺</option><option value="th">🇹🇭</option><option value="zh">🇨🇳</option></select><div style={S.ub}>{user?.first_name||"Guest"}</div></div></div>
        <div style={S.br}>{ft>0&&<div style={S.fb}>{t.ft.replace("{c}",ft)}</div>}{streak>0&&<div style={S.sb}>{t.st}:{streak}🔥</div>}{vip>0&&<div style={S.vb}>💎VIP{vip}({VP(user?.language_code||"en")}/mo)</div>}</div>
        <div style={S.cd}><div style={S.cl}>{t.b}</div><div style={S.cv}>{bal.toLocaleString()}<span style={S.cu}>{t.c}</span></div><div style={S.cs}>{t.sc}•{region}</div></div>
        <div style={S.wc}>{!wallet?<button style={S.wb} onClick={connectWallet}>{t.cn}</button>:<div style={S.wr}><span style={S.ws}>●{wallet.substring(0,6)}...{wallet.substring(38)}</span><button style={S.wd} onClick={disconnectWallet}>{t.dc}</button></div>}</div>
        <div style={S.spb}><button style={S.spn} onClick={()=>{if(rl("spin"))setShowSpinModal(true);}}>🎰{t.spin}({t.spinInfo})</button><div style={S.spi}>{t.spinUsed.replace("{c}",spinCount).replace("{m}",C.MAX_SPINS)}</div></div>
        {tab==="mine"&&<><div style={S.eb}><div style={mining?S.ea:S.eg}><svg width="160" height="160" viewBox="0 0 160 160" style={S.svg}><circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6"/><circle cx="80" cy="80" r="70" fill="none" stroke={mining?"#ff9800":"#ffd700"} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={circ-(progress/100)*circ} strokeLinecap="round" transform="rotate(-90 80 80)" style={S.svgAnim}/></svg><div style={S.eggEmoji}>🥚</div>{mining&&<div style={S.eggTimer}>{timeLeft}</div>}</div></div>{!mining?<button style={S.bt} onClick={mine}>{ft>0?t.ft.replace("{c}",ft):t.mi}</button>:now>=end?<button style={S.cb} onClick={claim}>{t.cl}</button>:<button style={S.db} disabled>{t.mg}</button>}</>}
        {tab==="tasks"&&<div style={S.sc}><div style={S.st}>{t.tk}</div>{TASKS.map(tk=><div key={tk.id} style={S.tkRow}><span style={S.tkIcon}>{tk.icon}</span><span style={S.tkName}>{tn[tk.nKey]||tk.id}</span><span style={S.tkReward}>+{tk.rw}</span><button style={claimed[tk.id]?S.tkDone:S.tkGo} onClick={()=>doTask(tk.id,tk.rw,tk.link)} disabled={claimed[tk.id]}>{claimed[tk.id]?t.dn:t.go}</button></div>)}</div>}
        {tab==="rewards"&&<div style={S.sc}><div style={S.st}>{t.rw}({gt}Tokens)</div><div style={S.rf}><div style={S.rfText}>1Token=1Entry|🥇$20🥈$10🥉$5|4-10:$1</div><button style={S.rfb} onClick={enterGiveaway}>🎰Enter Giveaway</button></div><div style={S.rf}><div style={S.rfText}>{t.rf}</div><button style={S.rfb} onClick={()=>{if(rl("ref"))setBal(b=>Math.min(C.MAX,b+C.REF));}}>+{C.REF}Coins</button></div></div>}
        {tab==="profile"&&<div style={S.sc}><div style={S.st}>{t.pf}</div><div style={S.pc}><div>🆔{user?.id||"N/A"}</div><div>👤{user?.first_name||"Guest"}</div><div>💎VIP:{vip}({VP(user?.language_code||"en")}/mo)</div><div>🌍{region}</div><div>🎁Free:{ft}|🎰Token:{gt}|🎡Spin:{spinCount}/{C.MAX_SPINS}</div><div>📋Tasks:{history.length}</div><div>💳{wallet?wallet.substring(0,6)+"...":""}</div><div>🔒SHA256+IDB+TimeSync</div></div></div>}
        {showSpinModal&&<div style={S.modal}><div style={S.modalC}><div style={S.modalT}>{t.spin}</div><div style={S.modalTx}>{t.spinInfo}</div>{spinResult?<div style={S.sr}><div>{spinResult.label}</div><div style={S.srv}>{spinResult.value==="free_mining"?t.spinFree:spinResult.value==="token"?t.spinToken:`+${spinResult.value}Coins`}</div></div>:spinning?<div style={S.spinning}>🎡...</div>:<div style={S.spinW}>🎡</div>}<button style={S.spinA} onClick={doSpin} disabled={spinning||spinCount>=C.MAX_SPINS}>{spinning?"Spinning...":spinCount>=C.MAX_SPINS?"Max":"🎰SPIN NOW"}</button><button style={S.modalCl} onClick={()=>setShowSpinModal(false)}>Close</button></div></div>}
        <div style={S.nv}>{[{id:"mine",ic:"⛏️",lb:"MINE"},{id:"tasks",ic:"📋",lb:"TASKS"},{id:"rewards",ic:"🏆",lb:"REWARDS"},{id:"profile",ic:"👤",lb:"PROFILE"}].map(i=><div key={i.id} style={{...S.ni,...(tab===i.id?S.na:{})}} onClick={()=>setTab(i.id)}><div style={S.niIcon}>{i.ic}</div><div style={S.niLabel}>{i.lb}</div></div>)}</div>
      </div>
    </>
  );
}

const L = { minHeight:"100vh",background:"#0a0a1e",display:"flex",justifyContent:"center",alignItems:"center" };
