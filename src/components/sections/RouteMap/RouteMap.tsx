import { CITY_POINTS, MAP_SIZE } from "@/data/map";
import { cn } from "@/lib/cn";
import { arc, destinations, origin, toPercent, type LabelAlign } from "./geometry";
import { asset } from "@/lib/site";
import styles from "./RouteMap.module.css";

const RED = "#ff4a55";
const vars = (v: Record<string, number>) => v as React.CSSProperties;

/**
 * Dotted map of the region with animated routes from the Kathmandu head office.
 * Server-rendered SVG; all motion is CSS, so it ships zero JavaScript.
 */
export function RouteMap() {
  const { width: W, height: H } = MAP_SIZE;
  return (
    <div
      role="img"
      aria-label="Map showing routes from our Kathmandu head office to our offices and clients in the Gulf and India"
    >
      <div className={styles.canvas} style={{ aspectRatio: `${W} / ${H}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static decorative SVG, already optimal */}
        <img src={asset("/map/region-dots.svg")} alt="" width={W} height={H} decoding="async" className={styles.layer} />

        <svg viewBox={`0 0 ${W} ${H}`} className={cn(styles.layer, styles.svg)} aria-hidden>
          <defs>
            <linearGradient id="route-g" x1="1" x2="0" y1="0" y2="0">
              <stop offset="0" stopColor={RED} />
              <stop offset="1" stopColor="#ffb4a8" />
            </linearGradient>
            <radialGradient id="glow-g">
              <stop offset="0" stopColor={RED} stopOpacity=".55" />
              <stop offset="1" stopColor={RED} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={origin[0]} cy={origin[1]} r="90" fill="url(#glow-g)" />

          {destinations.map((d, i) => {
            const path = arc(CITY_POINTS[d.key]);
            return (
              <g key={d.key}>
                <path d={path} stroke="white" strokeOpacity=".08" strokeWidth="2" fill="none" />
                <path
                  d={path}
                  pathLength={1}
                  className={d.office ? styles.route : styles.clientRoute}
                  style={vars({ "--i": i })}
                  stroke="url(#route-g)"
                  strokeWidth={d.office ? 2.4 : 1.6}
                  strokeOpacity={d.office ? 1 : 0.7}
                  strokeDasharray={d.office ? undefined : "0.012 0.012"}
                  strokeLinecap="round"
                  fill="none"
                />
                {d.office ? (
                  <circle
                    r="4"
                    fill="white"
                    className={styles.traveller}
                    style={{ offsetPath: `path('${path}')`, ...vars({ "--i": i }) }}
                  />
                ) : null}
              </g>
            );
          })}

          {destinations.map((d, i) => {
            const [x, y] = CITY_POINTS[d.key];
            const fill = d.office ? RED : "white";
            return (
              <g key={`${d.key}-dot`}>
                <circle cx={x} cy={y} r="7" fill={fill} className={styles.pulse} style={vars({ "--i": i })} />
                <circle cx={x} cy={y} r={d.office ? 6 : 4.5} fill={fill} stroke="#12141a" strokeWidth="2" />
              </g>
            );
          })}

          <circle cx={origin[0]} cy={origin[1]} r="10" fill={RED} className={styles.pulse} />
          <circle cx={origin[0]} cy={origin[1]} r="8" fill="white" stroke={RED} strokeWidth="4" />
        </svg>

        <MapLabel at={origin} align="above" strong>
          Kathmandu <span className={styles.hint}>· Head office</span>
        </MapLabel>
        {destinations.map((d) => (
          <MapLabel key={d.key} at={CITY_POINTS[d.key]} align={d.align} optional={!d.office}>
            {d.office ? <i aria-hidden className={styles.dot} /> : null}
            {d.label}
          </MapLabel>
        ))}
      </div>
    </div>
  );
}

function MapLabel({
  at,
  align,
  strong,
  optional,
  children,
}: {
  at: readonly number[];
  align: LabelAlign;
  strong?: boolean;
  /** Hidden on small screens to avoid overlaps. */
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={cn(styles.label, styles[align], strong && styles.strong, optional && styles.optional)} style={toPercent(at)}>
      {children}
    </span>
  );
}
