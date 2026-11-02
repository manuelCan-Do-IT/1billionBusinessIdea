import { MiniCutout } from "./MiniCutout";

export function CollageSide({ side }: { side: "left" | "right" }) {
  return <aside className={`collage-side collage-${side}`} aria-hidden="true">
    {side === "left" ? <>
      <MiniCutout motif="coffee" />
      <div className="cutout cutout-groceries">
        <svg viewBox="0 0 190 205" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 27 75 13l19 6 55-8 20 15-3 45 13 20-9 43 4 49-55 10-37-7-55 8-10-32 3-48-9-34 8-53Z" fill="#FFF9EA" stroke="#162044" strokeWidth="3" strokeLinejoin="round"/>
          <path d="m64 29 65-7 5 14-71 8-4-9 5-6Z" fill="#FFC2A8" opacity=".9"/>
          <path d="m76 82-9-24 9-5 14 28M109 79l10-33 11 4-8 32" fill="#FFF9EA" stroke="#162044" strokeWidth="4" strokeLinecap="round"/>
          <path d="M48 86 146 72l-9 92-72 7-17-85Z" fill="#FF7953" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
          <path d="M75 78c-4-11-3-22 1-28 7-4 11 4 15 12" stroke="#162044" strokeWidth="4" strokeLinecap="round"/>
          <path d="M109 75c0-10 2-18 8-23 8-2 12 6 11 17" stroke="#162044" strokeWidth="4" strokeLinecap="round"/>
          <path d="M65 49c-6-11-1-23 6-26 8 2 13 11 12 20" fill="#FF7953" stroke="#162044" strokeWidth="3"/>
          <path d="M70 22c5-7 11-8 17-4-2 7-8 11-15 10" fill="#3F69DE" stroke="#162044" strokeWidth="2"/>
          <path d="m101 57 7-30c7-10 18-6 19 2l-8 30" fill="#EFC98C" stroke="#162044" strokeWidth="3"/>
          <path d="m69 114 19-4m36-6 10-2m-64 24 63-12m-56 25 47-9" stroke="#162044" strokeWidth="3" strokeLinecap="round" opacity=".65"/>
          <path d="m29 61-10-3m19-15-7-9m128 108 13 5" stroke="#3F69DE" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
      <MiniCutout motif="clock" />
      <MiniCutout motif="keys" />
      <div className="collage-scribble">✳</div>
      <MiniCutout motif="headphones" />
      <div className="cutout cutout-ticket">
        <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m16 23 158-13 6 27c-10 4-14 14-12 23 2 9 9 15 18 16l6 39-161 14-3-31c9-4 14-12 13-21-1-10-8-16-19-18l-6-36Z" fill="#FF7953" stroke="#162044" strokeWidth="3" strokeLinejoin="round"/>
          <path d="m58 22 9 98" stroke="#162044" strokeWidth="2" strokeDasharray="4 6" opacity=".7"/>
          <rect x="82" y="43" width="76" height="38" rx="6" fill="#FFF9EA" stroke="#162044" strokeWidth="3"/>
          <path d="M90 56h59m-57 13h47" stroke="#3F69DE" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="110" cy="97" r="6" fill="#162044"/><circle cx="148" cy="94" r="6" fill="#162044"/>
          <path d="m14 14-9-8m19 2-1-8m169 120 8 6" stroke="#FFF9EA" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
      <MiniCutout motif="tools" />
      <MiniCutout motif="home" />
      <MiniCutout motif="apple" />
    </> : <>
      <MiniCutout motif="laptop" />
      <div className="cutout cutout-notes">
        <svg viewBox="0 0 205 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m31 16 145 5-6 26 13 29-8 53 7 60-18 18-144-9 9-44-7-46 8-43 1-49Z" fill="#FFF9EA" stroke="#162044" strokeWidth="3" strokeLinejoin="round"/>
          <path d="M26 59h152" stroke="#FF7953" strokeWidth="3"/>
          <path d="M48 35c0-15 12-18 15-8 3 12-4 25-10 23-6-2-3-11-1-15m29 0c0-15 12-18 15-8 3 12-4 25-10 23-6-2-3-11-1-15m29 0c0-15 12-18 15-8 3 12-4 25-10 23-6-2-3-11-1-15" stroke="#162044" strokeWidth="3" strokeLinecap="round"/>
          <path d="M49 87h84m-83 24h91m-92 24h66m-66 25h91" stroke="#3F69DE" strokeWidth="4" strokeLinecap="round" opacity=".75"/>
          <path d="m144 153 23-53 9 3-21 55-10 13-1-18Z" fill="#FF7953" stroke="#162044" strokeWidth="3" strokeLinejoin="round"/>
          <path d="m145 153 10 5-10 13v-18Z" fill="#EFC98C" stroke="#162044" strokeWidth="2"/>
          <path d="m20 32-15-4m22-13-9-9m166 150 16 1" stroke="#FF7953" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
      <MiniCutout motif="plant" />
      <MiniCutout motif="letter" />
      <div className="cutout cutout-phone">
        <svg viewBox="0 0 170 175" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m22 19 119-8 11 35-4 52 11 50-37 17-98-6-12-54 12-42-2-44Z" fill="#FFF9EA" stroke="#162044" strokeWidth="3" strokeLinejoin="round"/>
          <rect x="53" y="20" width="78" height="139" rx="13" transform="rotate(8 53 20)" fill="#3F69DE" stroke="#162044" strokeWidth="4"/>
          <path d="m73 32 35 5" stroke="#FFF9EA" strokeWidth="3" strokeLinecap="round"/>
          <path d="M69 65c0-9 7-15 16-15h24c9 0 16 6 16 15v23c0 9-7 15-16 15H94l-13 12 1-12c-8-1-13-7-13-15V65Z" fill="#FF7953" stroke="#162044" strokeWidth="3"/>
          <circle cx="84" cy="77" r="3" fill="#162044"/><circle cx="97" cy="77" r="3" fill="#162044"/><circle cx="110" cy="77" r="3" fill="#162044"/>
          <circle cx="99" cy="136" r="5" fill="#FFF9EA"/>
          <path d="m26 84-13 4m10 11-11 8m140-13 13 4" stroke="#FF7953" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
      <MiniCutout motif="shirt" />
      <MiniCutout motif="book" />
      <MiniCutout motif="camera" />
      <MiniCutout motif="bulb" />
      <div className="collage-loop">↗</div>
    </>}
  </aside>;
}
