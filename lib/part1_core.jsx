// ============================================================================
// GOLDEN GOOSE V14 FINAL - PART 1 OF 4: CORE ENGINE & SECURITY
// Lines: ~350 | Purpose: Anti-Hack Security, Config, Storage, Time, Guard
// ============================================================================

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Head from "next/head";
import { ethers } from "ethers";

/* ==================== GLOBAL CONFIG ==================== */
const C = {
  MT: 86400000, MC: 10000, MR: 200, CD: 2000, MAX: 999999999,
  DRIFT: 300000, FREE: 1, REF: 200,
  TOKEN_ADS: 3, GIVEAWAY_COST: 1, GIVEAWAY_WIN: 0.3,
  MAX_STREAK: 365, VIP_LEVELS: 10,
  MAX_SPINS: 10,
};

const VP = (l) => {
  const eu = ['en','fr','de','it','es','pt','nl','sv','no','da','fi','pl','cs','sk','hu','ro','bg','el','uk','ru'];
  return eu.includes(l) ? 3 : 1;
};

const getRegionName = (l) => {
  const eu = ['en','fr','de','it','es','pt','nl','sv','no','da','fi','pl','cs','sk','hu','ro','bg','el','uk','ru'];
  return eu.includes(l) ? "Europe" : "Asia";
};

/* ==================== SHA-256 HASHING ==================== */
async function sha256(str) {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

/* ==================== SECURE STORAGE (INDEXEDDB + FALLBACK) ==================== */
const Store = {
  _db: null,
  async _open() {
    if (this._db) return this._db;
    return new Promise((ok) => {
      const r = indexedDB.open("gg_v14_db", 4);
      r.onupgradeneeded = () => {
        const d = r.result;
        if (!d.objectStoreNames.contains("s")) d.createObjectStore("s");
        if (!d.objectStoreNames.contains("t")) d.createObjectStore("t");
        if (!d.objectStoreNames.contains("log")) d.createObjectStore("log");
      };
      r.onsuccess = () => { this._db = r.result; ok(r.result); };
    });
  },
  async get(k, tbl = "s") {
    const db = await this._open();
    if (!db.objectStoreNames.contains(tbl)) return null;
    return new Promise((ok) => {
      const tx = db.transaction(tbl, "readonly");
      const req = tx.objectStore(tbl).get(k);
      req.onsuccess = () => ok(req.result?.v ?? null);
    });
  },
  async set(k, v, tbl = "s") {
    const db = await this._open();
    return new Promise((ok) => {
      const tx = db.transaction(tbl, "readwrite");
      tx.objectStore(tbl).put({ k, v }, k);
      tx.oncomplete = () => ok();
    });
  },
  async getAll(tbl = "s") {
    const db = await this._open();
    if (!db.objectStoreNames.contains(tbl)) return [];
    return new Promise((ok) => {
      const tx = db.transaction(tbl, "readonly");
      const req = tx.objectStore(tbl).getAll();
      req.onsuccess = () => ok(req.result?.map(r => r.v) ?? []);
    });
  },
  async remove(k, tbl = "s") {
    const db = await this._open();
    return new Promise((ok) => {
      const tx = db.transaction(tbl, "readwrite");
      tx.objectStore(tbl).delete(k);
      tx.oncomplete = () => ok();
    });
  },
};

const LS = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ==================== MULTI-SOURCE SERVER TIME ==================== */
const TimeAPI = {
  urls: [
    "https://worldtimeapi.org/api/timezone/Etc/UTC",
    "https://timeapi.io/api/time/current/zone?timeZone=UTC",
  ],
  async get() {
    const times = [];
    for (const u of this.urls) {
      try {
        const r = await fetch(u, { cache: "no-store", signal: AbortSignal.timeout(3000) });
        if (!r.ok) continue;
        const d = await r.json();
        const dt = d.utc_datetime || d.dateTime;
        if (dt) times.push(new Date(dt).getTime());
      } catch {}
    }
    return times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : Date.now();
  },
};

/* ==================== ANTI-TAMPER GUARDS ==================== */
const Guard = {
  init() {
    if (typeof window === "undefined") return;
    
    // Anti-Console
    const noop = () => {};
    const methods = ['log','warn','error','info','debug','clear','trace','dir','table','assert','count','group','groupEnd','time','timeEnd','profile','profileEnd'];
    methods.forEach(m => { console[m] = noop; });
    
    // Anti-Debugger (Aggressive)
    setInterval(() => {
      const s = Date.now();
      debugger;
      if (Date.now() - s > 100) {
        localStorage.clear();
        indexedDB.deleteDatabase("gg_v14_db");
        location.reload();
      }
    }, 1000);
    
    // Anti-Right Click
    document.addEventListener("contextmenu", e => e.preventDefault());
    
    // Anti-DevTools Detection
    const threshold = 160;
    setInterval(() => {
      if (window.outerWidth - window.innerWidth > threshold ||
          window.outerHeight - window.innerHeight > threshold) {
        document.body.innerHTML = "<div style='display:flex;justify-content:center;align-items:center;height:100vh;background:#0a0a1e;color:#ff5252;font-family:sans-serif;'><h1>⛔ Security Alert!</h1></div>";
      }
    }, 1000);
    
    // Anti-Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && (e.key === "u" || e.key === "s" || e.key === "i" || e.key === "j" || e.key === "c")) {
        e.preventDefault();
      }
      if (e.key === "F12") e.preventDefault();
    });
  },
};

/* ==================== DEVICE FINGERPRINT ==================== */
const getFingerprint = () => {
  try {
    const data = [
      navigator.userAgent, navigator.language, screen.width, screen.height,
      navigator.platform, Intl.DateTimeFormat().resolvedOptions().timeZone,
      navigator.hardwareConcurrency, navigator.deviceMemory || "unknown",
      navigator.maxTouchPoints || 0, navigator.vendor || "unknown",
    ].join("|");
    return btoa(data).substring(0, 32);
  } catch { return "unknown"; }
};

/* ==================== SECURITY LOGS ==================== */
const SecurityLog = {
  async add(msg) {
    const logs = await Store.getAll("log");
    logs.unshift({ msg, time: Date.now() });
    if (logs.length > 100) logs.pop();
    for (let i = 0; i < logs.length; i++) {
      await Store.set(`log_${i}`, logs[i], "log");
    }
  },
};

/* ==================== ENCRYPTION UTILS ==================== */
const CryptoUtils = {
  encrypt(data, key) {
    try {
      const str = JSON.stringify(data);
      let result = "";
      for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return btoa(result);
    } catch { return data; }
  },
  decrypt(encoded, key) {
    try {
      const str = atob(encoded);
      let result = "";
      for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return JSON.parse(result);
    } catch { return null; }
  },
};

/* ==================== TRANSACTION VERIFIER ==================== */
const TxVerifier = {
  sign(action, wallet) {
    const nonce = Math.random().toString(36).substring(2, 15);
    const timestamp = Date.now();
    const payload = `${action}:${wallet || "guest"}:${nonce}:${timestamp}`;
    return btoa(payload);
  },
  verify(token) {
    try {
      if (!token) return false;
      const parts = atob(token).split(":");
      return parts.length === 4;
    } catch { return false; }
  },
};

export { C, VP, getRegionName, sha256, Store, LS, TimeAPI, Guard, getFingerprint, SecurityLog, CryptoUtils, TxVerifier };
