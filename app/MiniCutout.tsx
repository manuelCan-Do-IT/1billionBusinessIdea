type Motif = "coffee" | "keys" | "clock" | "tools" | "home" | "headphones" | "apple" | "letter" | "laptop" | "plant" | "book" | "camera" | "bulb" | "shirt";

function MotifArt({ motif }: { motif: Motif }) {
  switch (motif) {
    case "coffee": return <>
      <path d="M31 57h51v23c0 11-9 19-20 19H50c-11 0-19-8-19-19V57Z" fill="#FF7953" stroke="#162044" strokeWidth="4"/>
      <path d="M82 62h8c14 0 15 24 0 25h-8M39 47c-7-8 7-12 0-20m18 21c-6-8 8-12 1-21m17 20c-5-7 7-10 2-18" stroke="#162044" strokeWidth="3" strokeLinecap="round"/>
      <path d="M28 101h67" stroke="#3F69DE" strokeWidth="4" strokeLinecap="round"/>
    </>;
    case "keys": return <>
      <circle cx="51" cy="48" r="19" fill="#FF7953" stroke="#162044" strokeWidth="4"/><circle cx="51" cy="48" r="7" fill="#FFF9EA" stroke="#162044" strokeWidth="3"/>
      <path d="M64 61 91 91l-7 7-10-8-6 5-8-8 6-6-11-13" fill="#3F69DE" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M40 68 30 91l11 4 6-12 8 3 5-18" fill="#EFC98C" stroke="#162044" strokeWidth="3"/>
    </>;
    case "clock": return <>
      <circle cx="60" cy="62" r="37" fill="#FF7953" stroke="#162044" strokeWidth="4"/>
      <path d="M60 35v7m0 40v7M33 62h7m40 0h7M60 61V45m0 16 14 10" stroke="#162044" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="60" cy="61" r="4" fill="#FFF9EA" stroke="#162044" strokeWidth="2"/>
    </>;
    case "tools": return <>
      <path d="M32 28c-8 8-9 21-3 29l16-12 10 11-13 16c9 6 22 3 28-6 6-9 4-20-3-28l-12 12-11-11 12-15c-8-5-17-3-24 4Z" fill="#3F69DE" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="m67 74 26 24 8-9-27-26" fill="#FF7953" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M85 95 96 84" stroke="#162044" strokeWidth="2"/>
    </>;
    case "home": return <>
      <path d="M23 58 61 26l37 31v42H26V58" fill="#FFF9EA" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M20 59 61 24l40 35" stroke="#FF7953" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M53 99V68h18v31M35 67h10v11H35zM80 67h10v11H80z" fill="#3F69DE" stroke="#162044" strokeWidth="3"/>
    </>;
    case "headphones": return <>
      <path d="M24 67V57c0-22 16-38 36-38s36 16 36 38v10" stroke="#162044" strokeWidth="7" strokeLinecap="round"/>
      <path d="M25 64c-8 0-11 5-11 13v14c0 7 4 12 11 12h11V64H25Zm70 0c8 0 11 5 11 13v14c0 7-4 12-11 12H84V64h11Z" fill="#FF7953" stroke="#162044" strokeWidth="4"/>
      <path d="M83 98c-3 11-12 13-24 13" stroke="#162044" strokeWidth="3" strokeLinecap="round"/>
    </>;
    case "apple": return <>
      <path d="M61 43c-17-15-39-6-39 18 0 19 15 42 29 42 5 0 8-3 13-3 5 0 8 3 13 3 14 0 27-23 27-42 0-24-24-32-43-18Z" fill="#FF7953" stroke="#162044" strokeWidth="4"/>
      <path d="M61 43c-1-11 2-19 10-25M64 36c3-13 13-18 28-15-3 13-13 18-28 15Z" fill="#3F69DE" stroke="#162044" strokeWidth="3" strokeLinecap="round"/>
      <path d="M36 59c0-5 2-8 6-10" stroke="#FFF9EA" strokeWidth="4" strokeLinecap="round"/>
    </>;
    case "letter": return <>
      <path d="M19 38 100 31l4 63-80 7-5-63Z" fill="#FFF9EA" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="m22 41 43 31 35-37M26 97l28-32m48 27L77 63" stroke="#162044" strokeWidth="3" strokeLinejoin="round"/>
      <rect x="78" y="42" width="14" height="13" fill="#FF7953" stroke="#162044" strokeWidth="2"/>
    </>;
    case "laptop": return <>
      <path d="M28 32h65v52H28V32Z" fill="#3F69DE" stroke="#162044" strokeWidth="4"/>
      <path d="M19 86h84l8 12H13l6-12Z" fill="#FFF9EA" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="m39 70 14-13 11 8 17-20M76 45h6v6" stroke="#FF7953" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </>;
    case "plant": return <>
      <path d="M38 70h44l-6 32H44l-6-32Z" fill="#FF7953" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M60 70V28M59 56C42 53 33 42 35 31c13 0 24 10 24 25Zm2-12c2-16 11-24 24-24 0 13-8 23-24 24Zm0 19c3-15 15-21 29-17-4 12-14 18-29 17Z" fill="#3F69DE" stroke="#162044" strokeWidth="3" strokeLinejoin="round"/>
    </>;
    case "book": return <>
      <path d="M19 36c17-7 28-4 41 5 13-9 26-12 43-5v62c-16-6-30-4-43 5-13-9-26-11-41-5V36Z" fill="#FF7953" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M60 42v60M30 53c8-2 15 0 21 3m-21 13c8-2 15 0 21 3m18-16c7-3 15-5 24-3m-24 18c8-3 16-4 24-3" stroke="#162044" strokeWidth="3" strokeLinecap="round"/>
    </>;
    case "camera": return <>
      <path d="M18 43h24l8-11h24l8 11h21v56H18V43Z" fill="#3F69DE" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <circle cx="61" cy="70" r="20" fill="#FFF9EA" stroke="#162044" strokeWidth="4"/><circle cx="61" cy="70" r="9" fill="#FF7953" stroke="#162044" strokeWidth="3"/>
      <circle cx="91" cy="53" r="4" fill="#FF7953"/>
    </>;
    case "bulb": return <>
      <path d="M60 18c-20 0-34 14-34 33 0 12 6 20 16 29l5 9h26l5-9c10-9 16-17 16-29 0-19-14-33-34-33Z" fill="#FF7953" stroke="#162044" strokeWidth="4"/>
      <path d="M47 89h26m-24 8h22m-18 7h14M50 64l10 11 11-11M60 75v13" stroke="#162044" strokeWidth="3" strokeLinecap="round"/>
      <path d="M60 6V1m42 49h7M12 50H5m18-31-6-6m80 6 6-6" stroke="#FFF9EA" strokeWidth="4" strokeLinecap="round"/>
    </>;
    case "shirt": return <>
      <path d="m40 25 19 9 20-9 25 19-13 18-11-7v45H39V55l-11 7-13-18 25-19Z" fill="#FF7953" stroke="#162044" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M48 28c0 14 23 19 31-1M50 74h20" stroke="#162044" strokeWidth="3" strokeLinecap="round"/>
      <path d="m84 71 6 6m-6 0 6-6" stroke="#FFF9EA" strokeWidth="3" strokeLinecap="round"/>
    </>;
  }
}

export function MiniCutout({ motif }: { motif: Motif }) {
  const color = motif === "clock" || motif === "letter" || motif === "book" ? "#FFC2A8" : "#FFF9EA";
  return <div className={`cutout mini-cutout cutout-${motif}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m13 18 29-5 16 4 39-6 11 20-3 28 6 24-11 25-30-4-23 5-32-7 2-30-6-27 2-27Z" fill={color} stroke="#162044" strokeWidth="3" strokeLinejoin="round"/>
      <MotifArt motif={motif} />
    </svg>
  </div>;
}
