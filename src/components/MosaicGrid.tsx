import Link from "next/link";
import { BRAND_IMAGE } from "@/lib/content";

interface Tile {
  title: string;
  note: string;
  /** Corner-curve treatment — only some sides, never all four for every tile. */
  corners: string;
  position: "bottom-left" | "bottom-right" | "top-left" | "center-left";
  objectPos: string;
  span: string;
}

const TILES: Tile[] = [
  {
    title: "Agribusiness",
    note: "Value chains & export",
    corners: "rounded-3xl",
    position: "bottom-left",
    objectPos: "object-center",
    span: "h-72 sm:h-[380px] lg:col-span-7 lg:h-[460px]",
  },
  {
    title: "Energy",
    note: "Power & renewables",
    corners: "rounded-t-3xl",
    position: "top-left",
    objectPos: "object-top",
    span: "h-56 sm:h-64 lg:h-[218px]",
  },
  {
    title: "Infrastructure",
    note: "Transport corridors",
    corners: "rounded-b-3xl",
    position: "bottom-left",
    objectPos: "object-bottom",
    span: "h-56 sm:h-64 lg:h-[218px]",
  },
  {
    title: "ICT",
    note: "Digital & fintech",
    corners: "rounded-3xl",
    position: "center-left",
    objectPos: "object-left",
    span: "h-48 sm:h-56 lg:col-span-3 lg:h-60",
  },
  {
    title: "Healthcare",
    note: "Health-sector investment",
    corners: "rounded-3xl",
    position: "bottom-left",
    objectPos: "object-center",
    span: "h-48 sm:h-56 lg:col-span-3 lg:h-60",
  },
  {
    title: "Logistics",
    note: "Freight & supply chains",
    corners: "rounded-3xl",
    position: "bottom-right",
    objectPos: "object-right",
    span: "h-48 sm:h-56 lg:col-span-3 lg:h-60",
  },
  {
    title: "Manufacturing",
    note: "Local value addition",
    corners: "rounded-3xl",
    position: "bottom-left",
    objectPos: "object-bottom",
    span: "h-48 sm:h-56 lg:col-span-3 lg:h-60",
  },
];

const CAPTION_POS: Record<Tile["position"], string> = {
  "bottom-left": "inset-x-0 bottom-0 items-end",
  "bottom-right": "inset-x-0 bottom-0 items-end text-right",
  "top-left": "inset-x-0 top-0 items-start",
  "center-left": "inset-0 items-center",
};

/**
 * Pinterest-style mosaic: images in varied tile sizes with a deliberate
 * "corner curve" motif — some tiles round all corners, others only the
 * top, bottom, left or right edge, and one tile is left square.
 */
export default function MosaicGrid() {
  const feature = TILES.slice(0, 1)[0];
  const stack = TILES.slice(1, 3);
  const row = TILES.slice(3);

  const renderTile = (tile: Tile, key: string) => (
    <Link
      key={key}
      href="/sectors"
      className={`group relative block overflow-hidden bg-primary ring-1 ring-transparent transition-all duration-300 hover:ring-gold/50 ${tile.corners} ${tile.span}`}
    >
      <img
        src={BRAND_IMAGE}
        alt={tile.title}
        loading="lazy"
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 ${tile.objectPos}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
      <div className={`absolute flex p-5 sm:p-6 ${CAPTION_POS[tile.position]}`}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">{tile.note}</p>
          <h3 className="mt-1 font-serif text-xl font-bold text-white sm:text-2xl">{tile.title}</h3>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6">
      {/* Row 1 — feature + stacked pair */}
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
        {renderTile(feature, "t1")}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-5 lg:grid-cols-1 lg:gap-6">
          {stack.map((tile, i) => renderTile(tile, `t${i + 2}`))}
        </div>
      </div>

      {/* Row 2 — four balanced tiles */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
        {row.map((tile, i) => renderTile(tile, `t${i + 4}`))}
      </div>
    </div>
  );
}