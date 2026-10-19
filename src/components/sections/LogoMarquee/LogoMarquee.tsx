import Image from "next/image";
import { clients, type Client } from "@/data";
import { cn } from "@/lib/cn";
import { asset } from "@/lib/site";
import styles from "./LogoMarquee.module.css";

function Tile({ client }: { client: Client }) {
  return (
    <li className={styles.tile}>
      {client.file ? (
        <Image
          unoptimized
          src={asset(`/clients/grey/${client.file}.webp`)}
          alt=""
          title={client.name}
          width={client.w}
          height={client.h}
          // Tiny files. Loading them up front stops them decoding mid-slide, which made the rows stutter.
          loading="eager"
          decoding="async"
          className={styles.logo}
        />
      ) : (
        <span className={styles.name}>{client.name}</span>
      )}
    </li>
  );
}

/**
 * Client logos in two rows sliding in opposite directions (CSS only, pauses on hover,
 * still for reduced motion). Kept cheap to animate: logos are pre-made grey files (no CSS filter)
 * and the edge fade is a plain gradient overlay (no mask). The moving rows are decorative; a plain list of names
 * is provided for screen readers and search engines.
 */
export function LogoMarquee() {
  const half = Math.ceil(clients.length / 2);
  const rows = [clients.slice(0, half), clients.slice(half)];
  return (
    <div className={styles.wrap}>
      {rows.map((row, r) => (
        <div key={r} aria-hidden className={styles.row}>
          <ul
            className={cn(styles.track, r === 1 && styles.reverse)}
            style={{ "--duration": r === 0 ? "55s" : "65s" } as React.CSSProperties}
          >
            {[...row, ...row].map((c, i) => (
              <Tile key={`${c.name}-${i}`} client={c} />
            ))}
          </ul>
        </div>
      ))}
      <ul className={styles.srList}>
        {clients.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
