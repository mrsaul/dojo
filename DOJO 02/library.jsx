// Dojo library + cluster screens
// Reuses PhotoPlaceholder, Icon, mono/sans/serif from screens.jsx (loaded first).

// Tiny utility: stripey thumb that varies by seed so a 4-image grid feels distinct
function ThumbTile({ seed, ratio = '1 / 1', tone = 'dark' }) {
  // We render multiple rotations of the placeholder by reusing different seeds.
  // PhotoPlaceholder is absolutely positioned, so we wrap it.
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: ratio,
      border: tone === 'light' ? '1px solid #000' : '0.5px solid rgba(255,255,255,0.18)',
      overflow: 'hidden', background: '#0a0a0a',
    }}>
      <PhotoPlaceholder seed={seed} label="" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LIBRARY
// ─────────────────────────────────────────────────────────────
const FILTERS = {
  TYPE: ['ALL', 'DOOR', 'FACADE', 'TYPOGRAPHY', 'DETAIL'],
  STYLE: ['ALL', 'BRUTALIST', 'VERNACULAR', 'CORPORATE', 'ORNAMENTAL', 'MINIMAL'],
  VERDICT: ['ALL', 'GOOD', 'BAD'],
};

function LibraryScreen({ onOpenCluster, onCapture }) {
  const [type, setType] = React.useState('ALL');
  const [styleSel, setStyleSel] = React.useState('ALL');
  const [verdict, setVerdict] = React.useState('ALL');

  const clusters = [
    { id: 'brutalist-doors', label: 'BRUTALIST DOORS', count: 14, seeds: [0, 1, 2, 0] },
    { id: 'metal-contrast', label: 'METAL · HIGH CONTRAST', count: 9, seeds: [1, 2, 0, 1] },
    { id: 'vernacular-typo', label: 'VERNACULAR TYPOGRAPHY', count: 22, seeds: [2, 0, 1, 2] },
    { id: 'concrete-grids', label: 'CONCRETE GRIDS', count: 7, seeds: [0, 2, 1, 0] },
    { id: 'oxidized-detail', label: 'OXIDIZED DETAIL', count: 11, seeds: [1, 0, 2, 1] },
  ];

  const recent = Array.from({ length: 8 }, (_, i) => ({ id: 100 - i, seed: i % 3 }));

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '54px 22px 18px',
        borderBottom: '1px solid #000',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        }}>
          <div style={{
            fontFamily: sans, fontSize: 38, fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1,
            color: '#000',
          }}>LIBRARY</div>
          <div style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', color: '#000',
          }}>042 REFS</div>
        </div>
        <div style={{
          fontFamily: serif, fontStyle: 'italic', fontSize: 15, lineHeight: 1.3,
          color: '#000', marginTop: 8,
        }}>
          Your visual intelligence system.
        </div>
      </div>

      {/* Sticky filter bar */}
      <div style={{
        padding: '14px 22px 14px',
        borderBottom: '1px solid #000',
        background: '#fff',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <FilterRow label="TYPE" options={FILTERS.TYPE} value={type} onChange={setType} />
        <FilterRow label="STYLE" options={FILTERS.STYLE} value={styleSel} onChange={setStyleSel} />
        <FilterRow label="VERDICT" options={FILTERS.VERDICT} value={verdict} onChange={setVerdict} />
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Section: CLUSTERS */}
        <SectionHeader index="01" title="CLUSTERS" rule={`${clusters.length} GROUPS`} />
        <div style={{
          display: 'flex', gap: 12, padding: '0 22px 22px',
          overflowX: 'auto', scrollSnapType: 'x mandatory',
        }}>
          {clusters.map(c => (
            <button key={c.id} onClick={() => onOpenCluster(c)} style={{
              flex: '0 0 192px', scrollSnapAlign: 'start',
              padding: 0, border: '1px solid #000', background: '#fff',
              cursor: 'pointer', textAlign: 'left',
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
                background: '#000', padding: 1,
              }}>
                {c.seeds.map((s, i) => (
                  <div key={i} style={{ position: 'relative', aspectRatio: '1/1', background: '#0a0a0a', overflow: 'hidden' }}>
                    <PhotoPlaceholder seed={s} label="" />
                  </div>
                ))}
              </div>
              <div style={{
                padding: '10px 12px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                borderTop: '1px solid #000',
              }}>
                <div style={{
                  fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', fontWeight: 600,
                  color: '#000',
                }}>{c.label}</div>
                <div style={{
                  fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: '#666',
                }}>{String(c.count).padStart(2, '0')}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Section: RECENT CAPTURES */}
        <SectionHeader index="02" title="RECENT CAPTURES" rule="LAST 8" />
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
          padding: '0 22px 22px',
        }}>
          {recent.map((r, i) => (
            <div key={r.id} style={{ position: 'relative', aspectRatio: '1/1', border: '1px solid #000', overflow: 'hidden' }}>
              <PhotoPlaceholder seed={r.seed} label="" />
              <div style={{
                position: 'absolute', top: 6, left: 6,
                fontFamily: mono, fontSize: 9, letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(0,0,0,0.4)', padding: '2px 5px',
              }}>REF·00{40 + recent.length - i}</div>
              {i % 3 === 0 && (
                <div style={{
                  position: 'absolute', bottom: 6, right: 6,
                  fontFamily: mono, fontSize: 9, letterSpacing: '0.2em',
                  color: '#000', background: '#fff', padding: '2px 5px',
                }}>GOOD</div>
              )}
            </div>
          ))}
        </div>

        {/* End cap */}
        <div style={{
          borderTop: '1px solid #000', padding: '18px 22px 28px',
          fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', color: '#666',
          textAlign: 'center',
        }}>END · {recent.length} OF 042</div>
        <div style={{ height: 80 }} />
      </div>

      {/* Floating capture button */}
      <button onClick={onCapture} aria-label="Capture" style={{
        position: 'absolute', bottom: 32, right: 22,
        width: 64, height: 64, borderRadius: '50%',
        background: '#000', color: '#fff', border: '1.5px solid #000',
        cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        fontFamily: sans, fontSize: 32, fontWeight: 300, lineHeight: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingBottom: 4,
      }}>+</button>
    </div>
  );
}

function FilterRow({ label, options, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        fontFamily: mono, fontSize: 9, letterSpacing: '0.22em', color: '#000',
        width: 56, flexShrink: 0,
      }}>{label}</div>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', flex: 1 }}>
        {options.map(o => {
          const sel = o === value;
          return (
            <button key={o} onClick={() => onChange(o)} style={{
              padding: '5px 9px', border: '1px solid #000',
              background: sel ? '#000' : '#fff',
              color: sel ? '#fff' : '#000',
              fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', fontWeight: 500,
              cursor: 'pointer', borderRadius: 0, whiteSpace: 'nowrap',
            }}>{o}</button>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeader({ index, title, rule }) {
  return (
    <div style={{
      padding: '20px 22px 12px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: mono, fontSize: 10, color: '#000', letterSpacing: '0.1em' }}>{index}</span>
        <span style={{
          fontFamily: sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.22em', color: '#000',
        }}>{title}</span>
      </div>
      <span style={{
        fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', color: '#666',
      }}>{rule}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CLUSTER VIEW
// ─────────────────────────────────────────────────────────────
function ClusterScreen({ onBack, cluster }) {
  const c = cluster ?? { label: 'METAL DOORS / HIGH CONTRAST', count: 12 };
  const [cols, setCols] = React.useState(3);
  const items = Array.from({ length: 12 }, (_, i) => ({ id: i, seed: i % 3 }));

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{
        padding: '54px 22px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #000',
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: mono, fontSize: 11, letterSpacing: '0.22em', color: '#000',
        }}>← LIBRARY</button>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.32em', color: '#000' }}>
          CLUSTER
        </div>
        <button style={{
          background: 'transparent', border: '1px solid #000', padding: '6px 9px', cursor: 'pointer',
          fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', color: '#000', borderRadius: 0,
        }}>EDIT</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Title block */}
        <div style={{ padding: '24px 22px 18px', borderBottom: '1px solid #000' }}>
          <div style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', color: '#666', marginBottom: 8,
          }}>CLUSTER · 03</div>
          <div style={{
            fontFamily: sans, fontSize: 30, fontWeight: 700, lineHeight: 1.05,
            letterSpacing: '-0.005em', color: '#000',
          }}>
            METAL DOORS<br/>
            <span style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400 }}>/ high contrast</span>
          </div>
          <div style={{
            display: 'flex', gap: 16, marginTop: 14,
            fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', color: '#000',
          }}>
            <div><span style={{ color: '#666' }}>COUNT</span> · 12</div>
            <div><span style={{ color: '#666' }}>SPAN</span> · 4 MO</div>
            <div><span style={{ color: '#666' }}>GOOD%</span> · 83</div>
          </div>
        </div>

        {/* Column toggle */}
        <div style={{
          padding: '12px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #000',
        }}>
          <div style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', color: '#000',
          }}>{items.length} REFS</div>
          <div style={{ display: 'flex', gap: 0 }}>
            {[2, 3].map(n => (
              <button key={n} onClick={() => setCols(n)} style={{
                width: 32, height: 28,
                border: '1px solid #000',
                background: cols === n ? '#000' : '#fff',
                color: cols === n ? '#fff' : '#000',
                fontFamily: mono, fontSize: 10, letterSpacing: '0.1em',
                cursor: 'pointer', borderRadius: 0, marginLeft: -1,
              }}>{n}×</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 1,
          padding: '0 22px 22px', marginTop: 22,
        }}>
          {items.map((it, i) => (
            <div key={it.id} style={{
              position: 'relative', aspectRatio: '1/1',
              border: '1px solid #000', overflow: 'hidden',
            }}>
              <PhotoPlaceholder seed={it.seed} label="" />
              <div style={{
                position: 'absolute', top: 6, left: 6,
                fontFamily: mono, fontSize: 8, letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(0,0,0,0.4)', padding: '2px 4px',
              }}>R·{String(40 + i).padStart(3, '0')}</div>
            </div>
          ))}
        </div>

        {/* Pattern insight card */}
        <div style={{
          margin: '4px 22px 24px', padding: '18px 18px 18px',
          border: '1px solid #000', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -8, left: 14,
            background: '#fff', padding: '0 8px',
            fontFamily: mono, fontSize: 10, letterSpacing: '0.32em', color: '#000',
          }}>PATTERN INSIGHT</div>
          <div style={{
            fontFamily: serif, fontSize: 22, lineHeight: 1.25, color: '#000',
            marginTop: 6,
          }}>
            You consistently select <span style={{ background: '#000', color: '#fff', padding: '0 6px' }}>METAL</span> + <span style={{ background: '#000', color: '#fff', padding: '0 6px' }}>CONTRAST</span> as <span style={{ fontStyle: 'italic' }}>good</span>.
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
            marginTop: 18, borderTop: '1px solid #000',
          }}>
            <Stat label="OBSERVATIONS" value="10" />
            <Stat label="CONFIDENCE" value="0.82" border />
            <Stat label="OUTLIERS" value="02" border />
          </div>
        </div>

        <div style={{ height: 100 }} />
      </div>

      {/* Sticky generate button */}
      <div style={{
        borderTop: '1px solid #000',
        padding: '14px 22px 30px', background: '#fff',
      }}>
        <button style={{
          width: '100%', height: 60,
          background: '#000', color: '#fff', border: '1.5px solid #000',
          cursor: 'pointer', borderRadius: 0,
          fontFamily: mono, fontSize: 13, letterSpacing: '0.4em', fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          GENERATE BOARD
          <span style={{ fontFamily: mono, fontSize: 11, opacity: 0.6 }}>→</span>
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, border }) {
  return (
    <div style={{
      padding: '12px 10px',
      borderLeft: border ? '1px solid #000' : 'none',
    }}>
      <div style={{
        fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', color: '#666',
        marginBottom: 4,
      }}>{label}</div>
      <div style={{
        fontFamily: sans, fontSize: 22, fontWeight: 600, color: '#000',
        letterSpacing: '-0.01em',
      }}>{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BOARD — editorial, asymmetric grid moodboard
// ─────────────────────────────────────────────────────────────
function BoardScreen({ onBack }) {
  // 12-col × N-row grid. Each tile pins col/row spans for an editorial layout.
  // Mix of imagery, type plates, and a couple of caption/quote cells.
  const tiles = [
    // big hero (top-left)
    { kind: 'img', seed: 0, c: '1 / span 7', r: '1 / span 5', cap: 'PLATE 01 · DOOR' },
    // tall vertical right of hero
    { kind: 'img', seed: 2, c: '8 / span 5', r: '1 / span 8', cap: 'PLATE 02 · FACADE' },
    // type plate under hero
    { kind: 'type', text: 'METAL', c: '1 / span 4', r: '6 / span 3', sub: 'MATERIAL · 09' },
    // small detail
    { kind: 'img', seed: 1, c: '5 / span 3', r: '6 / span 3', cap: 'DETAIL' },
    // strapline beneath
    { kind: 'quote', c: '1 / span 7', r: '9 / span 2',
      text: 'High contrast, hard edges, oxidized surfaces.',
      meta: 'BOARD · 03 · 12 REFS' },
    // bottom-right square
    { kind: 'img', seed: 0, c: '8 / span 5', r: '9 / span 4', cap: 'PLATE 03 · DETAIL' },
    // bottom-left square
    { kind: 'img', seed: 2, c: '1 / span 4', r: '11 / span 2', cap: 'PLATE 04' },
    // numeric plate
    { kind: 'type', text: '012', c: '5 / span 3', r: '11 / span 2', sub: 'REFERENCES', big: true },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top — minimal */}
      <div style={{
        padding: '54px 22px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderBottom: '1px solid #000',
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: mono, fontSize: 11, letterSpacing: '0.22em', color: '#000',
        }}>← BACK</button>
        <div style={{
          fontFamily: sans, fontSize: 22, fontWeight: 700, letterSpacing: '0.32em', color: '#000',
        }}>BOARD</div>
        <div style={{
          fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', color: '#000',
          width: 56, textAlign: 'right',
        }}>03</div>
      </div>

      {/* Sub-meta strip */}
      <div style={{
        padding: '10px 22px',
        display: 'flex', justifyContent: 'space-between',
        borderBottom: '1px solid #000',
        fontFamily: mono, fontSize: 9, letterSpacing: '0.2em', color: '#000',
      }}>
        <span>METAL · HIGH CONTRAST</span>
        <span>2026·05·03</span>
      </div>

      {/* Editorial grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '40px',
          gap: 6,
        }}>
          {tiles.map((t, i) => {
            const baseStyle = {
              gridColumn: t.c, gridRow: t.r,
              border: '1px solid #000',
              position: 'relative', overflow: 'hidden',
              background: '#fff',
            };
            if (t.kind === 'img') {
              return (
                <div key={i} style={baseStyle}>
                  <PhotoPlaceholder seed={t.seed} label="" />
                  {t.cap && (
                    <div style={{
                      position: 'absolute', bottom: 6, left: 6,
                      fontFamily: mono, fontSize: 8, letterSpacing: '0.18em',
                      color: 'rgba(255,255,255,0.85)',
                      background: 'rgba(0,0,0,0.45)', padding: '2px 5px',
                    }}>{t.cap}</div>
                  )}
                </div>
              );
            }
            if (t.kind === 'type') {
              return (
                <div key={i} style={{
                  ...baseStyle,
                  background: '#000', color: '#fff',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  padding: 12,
                }}>
                  <div style={{
                    fontFamily: mono, fontSize: 9, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.6)',
                  }}>{t.sub}</div>
                  <div style={{
                    fontFamily: sans,
                    fontSize: t.big ? 64 : 38, lineHeight: 0.9,
                    fontWeight: 700, letterSpacing: t.big ? '-0.04em' : '0.02em',
                  }}>{t.text}</div>
                </div>
              );
            }
            if (t.kind === 'quote') {
              return (
                <div key={i} style={{
                  ...baseStyle,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  padding: 14,
                }}>
                  <div style={{
                    fontFamily: serif, fontStyle: 'italic',
                    fontSize: 22, lineHeight: 1.15, color: '#000',
                    letterSpacing: '-0.005em',
                    textWrap: 'balance',
                  }}>"{t.text}"</div>
                  <div style={{
                    fontFamily: mono, fontSize: 9, letterSpacing: '0.22em', color: '#000',
                  }}>{t.meta}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div style={{ height: 22 }} />
        {/* Editorial colophon */}
        <div style={{
          borderTop: '1px solid #000',
          padding: '12px 8px 22px',
          display: 'flex', justifyContent: 'space-between',
          fontFamily: mono, fontSize: 9, letterSpacing: '0.22em', color: '#000',
        }}>
          <span>DOJO · BOARD 03</span>
          <span>METAL · CONTRAST</span>
          <span>012 / 042</span>
        </div>
      </div>

      {/* Action rail — three equal buttons, no decoration */}
      <div style={{
        borderTop: '1px solid #000', background: '#fff',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        paddingBottom: 24,
      }}>
        {[
          { label: 'EXPORT', primary: false },
          { label: 'SAVE', primary: true },
          { label: 'EDIT', primary: false },
        ].map((a, i) => (
          <button key={a.label} style={{
            height: 60,
            background: a.primary ? '#000' : '#fff',
            color: a.primary ? '#fff' : '#000',
            border: 'none',
            borderLeft: i > 0 ? '1px solid #000' : 'none',
            cursor: 'pointer', borderRadius: 0,
            fontFamily: mono, fontSize: 12, letterSpacing: '0.4em', fontWeight: 600,
          }}>{a.label}</button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { LibraryScreen, ClusterScreen, BoardScreen });
