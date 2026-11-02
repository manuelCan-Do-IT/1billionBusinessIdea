export function FarewellSticker({ thanks, bye }: { thanks: string; bye: string }) {
  return <div className="farewell-sticker" role="img" aria-label={`${thanks} ${bye}`}>
    <svg viewBox="0 0 250 225" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="m32 25 29-7 28 5 31-12 22 10 34-7 13 12 30 2 6 28-6 30 13 23-8 31 7 31-24 17-24-1-21 16-38-4-26 8-26-11-31 3-20-20-5-29 5-28-6-24 10-31-2-42Z" fill="#FFFDF6" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M77 145c-18-3-34-14-40-28-3-7 3-15 10-13 7 2 8 9 16 13l20 7" fill="#FF7953" stroke="#162044" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <g className="wave-hand">
        <path d="M175 124c15-3 25-18 28-34 2-7 9-9 13-4 4 5 0 13-1 17 6-8 10-16 16-13 7 4 2 14-2 21 8-6 15-10 19-4 5 8-5 15-11 18 9-1 14 4 11 11-5 12-32 19-52 12l-24-5" fill="#FF7953" stroke="#162044" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m204 108 11-15m-5 26 17-15" stroke="#162044" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <path d="M66 90c0-36 27-59 61-59 35 0 62 27 62 61 0 40-27 71-64 71-35 0-59-28-59-73Z" fill="#FF7953" stroke="#162044" strokeWidth="5"/>
      <path d="M77 79c-9 4-15 13-17 22m130-19c8 3 12 10 13 18" stroke="#162044" strokeWidth="4" strokeLinecap="round"/>
      <path d="M91 89c4-6 12-6 16 0m36 0c4-6 12-6 16 0" stroke="#162044" strokeWidth="5" strokeLinecap="round"/>
      <path d="M100 112c9 23 39 27 53 2" stroke="#162044" strokeWidth="5" strokeLinecap="round"/>
      <ellipse cx="86" cy="112" rx="8" ry="5" fill="#FFB99F"/><ellipse cx="169" cy="112" rx="8" ry="5" fill="#FFB99F"/>
      <path d="m46 62-10-7m18-10-4-10m159 17 9-11m-5 28 13-3" stroke="#3F69DE" strokeWidth="4" strokeLinecap="round"/>
    </svg>
    <span className="farewell-ribbon">{thanks}</span>
    <span className="farewell-bye">{bye} <span aria-hidden="true">↗</span></span>
  </div>;
}
