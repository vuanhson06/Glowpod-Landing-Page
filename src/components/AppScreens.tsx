import type { ReactNode } from "react";

/*
 * Phone mockups of the GlowPod app, one per "How to use it" step on /app.
 * Pure CSS motion on a shared 6s loop (keyframes in globals.css, `.app-*`).
 * Base styles are the finished state, so reduced-motion users see the end of each sequence.
 */

const SHADE = { light: "#f1d6c2", medium: "#d4a17c", deep: "#8f5f42", tone: "#c9949b" };

// A finger press on the 6s loop, peaking at `at` percent of the cycle.
function Tap({ at }: { at: number }) {
  return <span className="app-tap" style={{ animationDelay: `${(at / 100) * 6 - 0.54}s` }} />;
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`relative z-10 flex items-center justify-between px-6 pt-3.5 text-[11px] font-semibold ${
        dark ? "text-white" : "text-charcoal"
      }`}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 18 12" className="h-2.5 w-auto" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-2.5 w-auto" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M1.5 4.5a9.5 9.5 0 0 1 13 0M4 7.3a6 6 0 0 1 8 0" />
          <circle cx="8" cy="10" r="1.1" fill="currentColor" stroke="none" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-2.5 w-auto">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".4" />
          <rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor" />
          <rect x="24" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".4" />
        </svg>
      </span>
    </div>
  );
}

function Phone({ label, dark = false, children }: { label: string; dark?: boolean; children: ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative mx-auto w-[264px] shrink-0 rounded-[3rem] bg-linear-to-b from-[#3d3d3d] to-[#161616] p-[9px] shadow-[0_40px_70px_-25px_rgb(37_37_37/0.55)] ring-1 ring-black/60"
    >
      <span className="absolute top-24 -left-[3px] h-8 w-[3px] rounded-l bg-[#2a2a2a]" />
      <span className="absolute top-36 -left-[3px] h-12 w-[3px] rounded-l bg-[#2a2a2a]" />
      <span className="absolute top-32 -right-[3px] h-16 w-[3px] rounded-r bg-[#2a2a2a]" />
      <div
        className={`relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[2.45rem] ${
          dark ? "bg-[#111]" : "bg-[#fbf8f5]"
        }`}
      >
        <div className="absolute top-2.5 left-1/2 z-30 h-[26px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        <StatusBar dark={dark} />
        <div className="relative flex flex-1 flex-col">{children}</div>
        <div
          className={`absolute bottom-2 left-1/2 z-30 h-1 w-24 -translate-x-1/2 rounded-full ${
            dark ? "bg-white/80" : "bg-charcoal/80"
          }`}
        />
      </div>
    </div>
  );
}

function ScreenTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="px-5 pt-5">
      <p className="text-[10px] font-semibold tracking-wider text-rose-dark uppercase">{kicker}</p>
      <p className="mt-0.5 text-[19px] leading-tight font-semibold">{title}</p>
    </div>
  );
}

const TABS = ["Home", "Scan", "Profiles", "Care"] as const;

function TabBar({ active }: { active: (typeof TABS)[number] }) {
  return (
    <div className="mt-auto grid grid-cols-4 border-t border-charcoal/10 bg-white/90 px-2 pt-2 pb-6 text-center text-[9px] font-medium">
      {TABS.map((t) => (
        <div key={t} className={t === active ? "text-rose-dark" : "text-charcoal/40"}>
          <span className={`mx-auto mb-1 block h-4 w-4 rounded-md ${t === active ? "bg-rose" : "bg-charcoal/15"}`} />
          {t}
        </div>
      ))}
    </div>
  );
}

function Check({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center rounded-full bg-sage-dark text-white ${className}`}>
      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="m2.5 6.2 2.3 2.3 4.7-5" />
      </svg>
    </span>
  );
}

/* 1. Install and connect */
function PairScreen() {
  return (
    <Phone label="App screen: the GlowPod app finds GlowPod Blend over Bluetooth and the user taps Pair to connect.">
      <ScreenTitle kicker="Set up" title="Add your GlowPod" />
      <div className="relative mx-auto mt-8 flex h-36 w-36 items-center justify-center">
        <span className="anim-pulse-ring absolute inset-0 rounded-full bg-rose/30" />
        <span className="anim-pulse-ring absolute inset-0 rounded-full bg-rose/20" style={{ animationDelay: "1.2s" }} />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-charcoal/5">
          <svg viewBox="0 0 24 24" className="h-9 w-9 text-rose-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 7 10 10-5 5V2l5 5L7 17" />
          </svg>
        </span>
      </div>
      <div className="mt-6 grid px-5 text-center *:col-start-1 *:row-start-1">
        <p className="app-out-2 text-xs text-charcoal/60">Searching for nearby devices…</p>
        <p className="app-in-2 text-xs text-charcoal/60">1 device found</p>
      </div>
      <div className="app-in-2 mx-4 mt-4 rounded-2xl bg-white p-3.5 shadow-md ring-1 ring-charcoal/5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-9 items-center justify-center rounded-xl bg-[#f3ece6] ring-1 ring-charcoal/10">
            <span className="flex gap-[2px]">
              {Object.values(SHADE).map((c) => (
                <span key={c} className="h-3 w-[3px] rounded-full" style={{ backgroundColor: c }} />
              ))}
            </span>
          </span>
          <div className="flex-1">
            <p className="text-[13px] font-semibold">GlowPod Blend</p>
            <p className="text-[10px] text-charcoal/50">Signal strong · 0.5 m away</p>
          </div>
        </div>
        <div className="relative mt-3 grid *:col-start-1 *:row-start-1">
          <span className="app-out-3 rounded-full bg-charcoal py-2 text-center text-xs font-semibold text-ivory">Pair</span>
          <span className="app-in-3 flex items-center justify-center gap-1.5 rounded-full bg-sage-light py-2 text-xs font-semibold text-sage-dark">
            <Check className="h-4 w-4" /> Connected
          </span>
          <Tap at={56} />
        </div>
      </div>
      <p className="app-in-4 mt-auto mb-10 px-5 text-center text-[11px] text-charcoal/50">Next: load your cartridges</p>
    </Phone>
  );
}

/* 2. Load the cartridges */
const CARTRIDGES = [
  { name: "Light base", color: SHADE.light },
  { name: "Medium base", color: SHADE.medium },
  { name: "Deep base", color: SHADE.deep },
  { name: "Tone adjuster", color: SHADE.tone },
];

function CartridgeScreen() {
  return (
    <Phone label="App screen: the app confirms each of the four cartridges as it is inserted into the device.">
      <ScreenTitle kicker="Set up" title="Load cartridges" />
      <div className="mx-auto mt-4 flex h-24 w-24 flex-col items-center justify-center rounded-[1.75rem] bg-linear-to-b from-white to-[#efe7df] shadow-lg ring-1 ring-charcoal/10">
        <div className="flex gap-1.5 rounded-xl bg-[#e7ddd3] p-1.5 ring-1 ring-inset ring-charcoal/10">
          {CARTRIDGES.map((c, i) => (
            <span key={c.name} className="flex h-10 w-3.5 items-end overflow-hidden rounded-full bg-white/60">
              <span className={`app-in-${i + 1} block h-full w-full rounded-full`} style={{ backgroundColor: c.color }} />
            </span>
          ))}
        </div>
        <span className="mt-2 h-4 w-4 rounded-full ring-1 ring-charcoal/15" />
      </div>
      <ul className="mt-4 space-y-1.5 px-4">
        {CARTRIDGES.map((c, i) => (
          <li key={c.name} className="flex items-center gap-3 rounded-xl bg-white px-3 py-1.5 ring-1 ring-charcoal/5">
            <span className="h-6 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
            <span className="flex-1 text-[12px] font-medium">{c.name}</span>
            <span className="grid *:col-start-1 *:row-start-1">
              <span className={`app-out-${i + 1} text-[10px] text-charcoal/40`}>Waiting</span>
              <span className={`app-in-${i + 1} flex items-center gap-1 text-[10px] font-semibold text-sage-dark`}>
                <Check className="h-4 w-4" /> 100%
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="app-in-4 mx-4 mt-3 rounded-xl bg-sage-light py-2 text-center text-[11px] font-semibold text-sage-dark">
        All 4 cartridges ready
      </p>
      <TabBar active="Home" />
    </Phone>
  );
}

/* 3. Scan your face */
function ScanScreen() {
  return (
    <Phone dark label="App screen: the camera view guides the user's face into an oval while the app checks sharpness, light and colour.">
      <div className="absolute inset-0 bg-linear-to-b from-[#5b4a42] via-[#3f342f] to-[#1d1816]" />
      <div className="relative z-10 mx-auto mt-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium text-white backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-[#9fe0a0]" /> Light: even
      </div>
      <div className="relative mx-auto mt-3 h-[250px] w-[190px]">
        <svg viewBox="0 0 200 260" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id="scan-skin" cx="45%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#e9bf9f" />
              <stop offset="100%" stopColor="#c99272" />
            </radialGradient>
          </defs>
          <path d="M14 262 C24 205 66 188 100 188 C134 188 176 205 186 262 Z" fill="#b98088" />
          <rect x="82" y="150" width="36" height="46" rx="12" fill="#c38c6c" />
          <ellipse cx="100" cy="112" rx="47" ry="58" fill="url(#scan-skin)" />
          <path d="M50 118 C44 52 78 36 101 36 C128 36 158 52 151 120 C150 88 132 64 101 64 C72 64 54 86 50 118 Z" fill="#2f211b" />
          <ellipse cx="82" cy="114" rx="5" ry="3" fill="#3a2a22" opacity=".8" />
          <ellipse cx="118" cy="114" rx="5" ry="3" fill="#3a2a22" opacity=".8" />
          <path d="M88 146 Q100 153 112 146" stroke="#a35d62" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-x-2 top-1 bottom-10 rounded-[50%] border-2 border-dashed border-white/80" />
        <div className="app-scan absolute inset-x-3 h-0.5 rounded-full bg-[#9fe0a0] shadow-[0_0_12px_2px_rgb(159_224_160/0.8)]" />
        {[
          "top-0 left-0 border-t-2 border-l-2 rounded-tl-xl",
          "top-0 right-0 border-t-2 border-r-2 rounded-tr-xl",
          "bottom-8 left-0 border-b-2 border-l-2 rounded-bl-xl",
          "bottom-8 right-0 border-b-2 border-r-2 rounded-br-xl",
        ].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-white ${c}`} />
        ))}
      </div>
      <div className="app-flash pointer-events-none absolute inset-0 z-20 bg-white" />
      <div className="relative z-10 mx-3 mt-auto mb-7 rounded-2xl bg-black/45 p-3 text-white backdrop-blur-md">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold">Hold still</span>
          <span className="flex gap-1">
            {[1, 2, 3].map((n) => (
              <span key={n} className="h-1.5 w-5 overflow-hidden rounded-full bg-white/25">
                <span className={`app-in-${n} block h-full w-full bg-white`} />
              </span>
            ))}
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-1 text-[9px]">
          {["Sharp", "Even light", "True colour"].map((t, i) => (
            <span key={t} className={`app-in-${i + 1} flex items-center gap-1`}>
              <Check className="h-3.5 w-3.5" /> {t}
            </span>
          ))}
        </div>
      </div>
    </Phone>
  );
}

/* 4. Review and adjust */
function AdjustScreen() {
  return (
    <Phone label="App screen: the suggested foundation shade with depth and warmth sliders being adjusted, then saved as a profile.">
      <ScreenTitle kicker="Your blend" title="Review & adjust" />
      <div className="mt-4 flex items-center gap-3 px-5">
        <span className="app-shade h-16 w-16 rounded-full bg-[#d3a17d] shadow-inner ring-4 ring-white" />
        <div>
          <p className="text-[13px] font-semibold">Warm beige</p>
          <p className="text-[10px] text-charcoal/50">Suggested from your scan</p>
        </div>
      </div>
      <div className="mx-5 mt-3 flex h-2 overflow-hidden rounded-full">
        <span style={{ width: "44%", backgroundColor: SHADE.light }} />
        <span style={{ width: "36%", backgroundColor: SHADE.medium }} />
        <span style={{ width: "12%", backgroundColor: SHADE.deep }} />
        <span style={{ width: "8%", backgroundColor: SHADE.tone }} />
      </div>
      <div className="mt-5 space-y-5 px-5">
        {[
          { label: "Depth", ends: ["Lighter", "Deeper"], thumb: "app-thumb-1", drag: "app-drag-1", track: "from-[#f3dcc9] to-[#8f5f42]" },
          { label: "Warmth", ends: ["Cooler", "Warmer"], thumb: "app-thumb-2", drag: "app-drag-2", track: "from-[#e8c9c4] to-[#d89a5f]" },
        ].map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-[11px] font-medium">
              <span>{s.label}</span>
              <span className="text-charcoal/40">
                {s.ends[0]} · {s.ends[1]}
              </span>
            </div>
            <div className={`relative mt-2 h-2 rounded-full bg-linear-to-r ${s.track}`}>
              <span className={`${s.thumb} absolute top-1/2 h-5 w-5 -translate-1/2 rounded-full bg-white shadow-md ring-1 ring-charcoal/10`}>
                <span className={`${s.drag} absolute -inset-2 rounded-full bg-charcoal/20 ring-2 ring-white/70`} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 px-5 text-[9px] text-charcoal/45">Adjustments stay within the tested shade range.</p>
      <div className="relative mx-5 mt-3">
        <span className="block rounded-full bg-charcoal py-2.5 text-center text-xs font-semibold text-ivory">Save as profile</span>
        <Tap at={75} />
      </div>
      <p className="app-in-4 mx-5 mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-sage-dark">
        <Check className="h-4 w-4" /> Saved as “Everyday”
      </p>
      <TabBar active="Profiles" />
    </Phone>
  );
}

/* 5. Confirm and dispense */
function DispenseScreen() {
  return (
    <Phone label="App screen: the user confirms the blend and a progress ring shows the device mixing and dispensing one measured portion.">
      <ScreenTitle kicker="Dispense" title="Ready when you are" />
      <div className="mx-4 mt-4 flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-charcoal/5">
        <span className="h-10 w-10 rounded-full bg-[#d3a17d] ring-2 ring-white" />
        <div className="flex-1">
          <p className="text-[12px] font-semibold">Everyday · Warm beige</p>
          <p className="text-[10px] text-charcoal/50">1 portion · about 0.8 ml</p>
        </div>
      </div>
      <div className="mt-6 grid flex-1 place-items-center px-5 *:col-start-1 *:row-start-1">
        <div className="app-out-2 w-full text-center">
          <p className="text-[11px] text-charcoal/55">Place your fingertip or a sponge under the tip.</p>
          <div className="relative mt-5">
            <span className="block rounded-full bg-charcoal py-3 text-center text-sm font-semibold text-ivory">Confirm & dispense</span>
            <Tap at={24} />
          </div>
          <p className="mt-3 text-[10px] text-charcoal/40">Nothing is dispensed until you confirm.</p>
        </div>
        <div className="app-in-2 relative flex h-40 w-40 items-center justify-center self-start">
          <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#ede5db" strokeWidth="10" />
            <circle
              className="app-ring"
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#c9949b"
              strokeWidth="10"
              strokeLinecap="round"
              pathLength={100}
            />
          </svg>
          <div className="grid text-center *:col-start-1 *:row-start-1">
            <p className="app-out-4 text-[13px] font-semibold">
              Mixing…
              <span className="block text-[10px] font-normal text-charcoal/50">4 bases</span>
            </p>
            <p className="app-in-4 flex flex-col items-center text-[13px] font-semibold text-sage-dark">
              <Check className="mb-1 h-6 w-6" /> Done
            </p>
          </div>
        </div>
      </div>
      <p className="app-in-4 mb-10 px-5 text-center text-[11px] text-charcoal/55">Blend and apply as usual.</p>
    </Phone>
  );
}

/* 6. Clean up */
function CareScreen() {
  return (
    <Phone label="App screen: a cleaning checklist with items being ticked off and a reminder that the weekly clean is coming up.">
      <div className="app-in-3 absolute inset-x-3 top-11 z-20 flex items-start gap-2.5 rounded-2xl bg-white/95 p-3 shadow-lg ring-1 ring-charcoal/10 backdrop-blur">
        <span className="h-7 w-7 shrink-0 rounded-lg bg-rose" />
        <div>
          <p className="text-[11px] font-semibold">GlowPod · now</p>
          <p className="text-[10px] text-charcoal/60">Weekly clean due in 3 days.</p>
        </div>
      </div>
      <ScreenTitle kicker="Care" title="After each use" />
      <ul className="mt-4 space-y-2 px-4">
        {[
          { t: "Wipe the dispensing tip", sub: "Soft, lint-free cloth", cls: "app-in-1", tap: 18 },
          { t: "Close the tip cover", sub: "Keeps the tip clean", cls: "app-in-2", tap: 38 },
        ].map((item) => (
          <li key={item.t} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 ring-charcoal/5">
            <span className="relative grid h-5 w-5 *:col-start-1 *:row-start-1">
              <span className="rounded-full ring-2 ring-charcoal/20" />
              <Check className={`h-5 w-5 ${item.cls}`} />
              <Tap at={item.tap} />
            </span>
            <span>
              <span className="block text-[12px] font-medium">{item.t}</span>
              <span className="block text-[10px] text-charcoal/45">{item.sub}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 px-5 text-[10px] font-semibold tracking-wider text-charcoal/45 uppercase">Weekly</p>
      <div className="mx-4 mt-2 rounded-xl bg-white p-3 ring-1 ring-charcoal/5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium">Deep clean</span>
          <span className="rounded-full bg-rose-light px-2 py-0.5 text-[9px] font-semibold text-rose-dark">Sunday</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand">
          <span className="block h-full w-4/7 rounded-full bg-rose" />
        </div>
        <p className="mt-1.5 text-[9px] text-charcoal/45">Step-by-step guide · about 5 min</p>
      </div>
      <TabBar active="Care" />
    </Phone>
  );
}

export const APP_SCREENS = [PairScreen, CartridgeScreen, ScanScreen, AdjustScreen, DispenseScreen, CareScreen];
