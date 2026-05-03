// Dojo capture flow — three connected screens
// All UI is monochrome. Type system: Inter for UI labels, IBM Plex Mono for tags/numerals,
// Instrument Serif italic for the introspective overlay copy.

const DOJO_W = 402;
const DOJO_H = 874;

// ─────────────────────────────────────────────────────────────
// Shared bits
// ─────────────────────────────────────────────────────────────
const mono = '"IBM Plex Mono", ui-monospace, Menlo, monospace';
const sans = '"Inter", -apple-system, system-ui, sans-serif';
const serif = '"Instrument Serif", "Times New Roman", serif';

// Placeholder "photograph" — a striped diagonal pattern in grayscale to stand in
// for a real reference image. Looks deliberate, never AI-sloppy.
function PhotoPlaceholder({ seed = 0, label = 'REFERENCE' }) {
  // pick one of a few hand-tuned compositions based on seed
  const variants = [
    { bg: '#1a1a1a', fg: '#2a2a2a', mid: '#888', accent: '#d6d6d6' },
    { bg: '#0e0e0e', fg: '#222', mid: '#666', accent: '#bdbdbd' },
    { bg: '#222', fg: '#2e2e2e', mid: '#9a9a9a', accent: '#ececec' },
  ];
  const v = variants[seed % variants.length];
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: v.bg,
    }}>
      {/* base diagonal stripes */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(115deg, ${v.bg} 0 22px, ${v.fg} 22px 23px)`,
      }} />
      {/* big architectural block */}
      <div style={{
        position: 'absolute', left: '12%', top: '18%', width: '62%', height: '70%',
        background: `linear-gradient(180deg, ${v.mid} 0%, ${v.fg} 100%)`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
      }} />
      {/* doorway / opening */}
      <div style={{
        position: 'absolute', left: '28%', top: '34%', width: '22%', height: '50%',
        background: '#070707',
        borderTop: `1px solid ${v.accent}`,
      }} />
      {/* window slits */}
      <div style={{
        position: 'absolute', left: '56%', top: '28%', width: '14%', height: '4%',
        background: v.accent, opacity: 0.85,
      }} />
      <div style={{
        position: 'absolute', left: '56%', top: '40%', width: '14%', height: '4%',
        background: v.accent, opacity: 0.7,
      }} />
      <div style={{
        position: 'absolute', left: '56%', top: '52%', width: '14%', height: '4%',
        background: v.accent, opacity: 0.55,
      }} />
      {/* light rake from top-left */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 18% 8%, rgba(255,255,255,0.18), transparent 55%)',
      }} />
      {/* vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(0,0,0,0.55) 100%)',
      }} />
      {/* film grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.18, mixBlendMode: 'overlay',
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>")',
      }} />
      {/* tiny corner caption */}
      <div style={{
        position: 'absolute', left: 14, bottom: 10,
        fontFamily: mono, fontSize: 9, letterSpacing: '0.14em',
        color: 'rgba(255,255,255,0.5)',
      }}>
        [ {label} · PLACEHOLDER ]
      </div>
    </div>
  );
}

// Composition rule-of-thirds grid for camera viewport
function CameraGrid() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
      <line x1="66.66%" y1="0" x2="66.66%" y2="100%" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
      <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
      <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
      {/* center reticle */}
      <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.75" fill="none">
        <line x1="50%" y1="calc(50% - 6px)" x2="50%" y2="calc(50% + 6px)" />
        <line x1="calc(50% - 6px)" y1="50%" x2="calc(50% + 6px)" y2="50%" />
      </g>
    </svg>
  );
}

// Tiny icon set — stroke based, monochrome
const Icon = {
  X: ({ s = 18, c = '#fff' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  ),
  Bolt: ({ s = 18, c = '#fff', off = false }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />
      {off && <line x1="4" y1="4" x2="20" y2="20" stroke={c} strokeWidth="1.5" />}
    </svg>
  ),
  Folder: ({ s = 14, c = '#fff' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round">
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  ),
  Check: ({ s = 14, c = '#fff' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 6" />
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────
// Screen 1 — Camera
// ─────────────────────────────────────────────────────────────
function CameraScreen({ onCapture, onClose, onImport, lastImage }) {
  const [flash, setFlash] = React.useState('off'); // off | auto | on
  const [shutterFlash, setShutterFlash] = React.useState(false);

  const cycleFlash = () => {
    setFlash(f => (f === 'off' ? 'auto' : f === 'auto' ? 'on' : 'off'));
  };

  const fire = () => {
    setShutterFlash(true);
    setTimeout(() => {
      setShutterFlash(false);
      onCapture();
    }, 180);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      {/* Live camera feed (placeholder) */}
      <PhotoPlaceholder seed={0} label="LIVE · 24MM · ƒ1.8" />

      {/* Composition grid */}
      <CameraGrid />

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '60px 22px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)',
      }}>
        <button onClick={onClose} style={{
          width: 38, height: 38, border: '0.5px solid rgba(255,255,255,0.35)',
          background: 'rgba(0,0,0,0.25)', borderRadius: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        }}>
          <Icon.X s={16} />
        </button>

        {/* Center brand wordmark — barely there */}
        <div style={{
          fontFamily: mono, fontSize: 10, letterSpacing: '0.5em',
          color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase',
        }}>DOJO</div>

        <button onClick={cycleFlash} style={{
          width: 38, height: 38, border: '0.5px solid rgba(255,255,255,0.35)',
          background: 'rgba(0,0,0,0.25)', borderRadius: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          color: '#fff', fontFamily: mono, fontSize: 9, letterSpacing: '0.1em',
          flexDirection: 'column',
        }}>
          <Icon.Bolt s={14} off={flash === 'off'} />
        </button>
      </div>

      {/* Flash mode label, very subtle, under the bolt */}
      <div style={{
        position: 'absolute', top: 102, right: 22,
        fontFamily: mono, fontSize: 9, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase',
      }}>{flash}</div>

      {/* The introspective overlay */}
      <div style={{
        position: 'absolute', top: '14%', left: 0, right: 0,
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: serif, fontStyle: 'italic', fontSize: 22, lineHeight: 1.25,
          color: 'rgba(255,255,255,0.78)', letterSpacing: '0.005em',
          textShadow: '0 1px 12px rgba(0,0,0,0.5)',
          padding: '0 40px',
        }}>
          What are you really<br/>capturing?
        </div>
      </div>

      {/* Frame info — bottom-left of viewport, above controls */}
      <div style={{
        position: 'absolute', left: 22, bottom: 200,
        fontFamily: mono, fontSize: 9, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.55)',
      }}>
        24MM · ƒ1.8 · 1/120
      </div>
      <div style={{
        position: 'absolute', right: 22, bottom: 200,
        fontFamily: mono, fontSize: 9, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.55)',
      }}>
        REF · 0042
      </div>

      {/* Bottom control rail */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height: 180, padding: '0 22px 44px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'end', gap: 0,
        background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
      }}>
        {/* Left — last gallery item */}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button style={{
            width: 56, height: 56, padding: 0, border: '0.5px solid rgba(255,255,255,0.5)',
            background: '#222', cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }}>
            {lastImage ? (
              <PhotoPlaceholder seed={1} label="" />
            ) : (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: mono, fontSize: 8, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em',
              }}>EMPTY</div>
            )}
          </button>
        </div>

        {/* Center — capture */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <button onClick={fire} aria-label="Capture" style={{
            width: 78, height: 78, borderRadius: '50%', padding: 0,
            border: '1.5px solid #fff', background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.1s ease',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.94)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ width: 62, height: 62, borderRadius: '50%', background: '#fff' }} />
          </button>
          <div style={{
            fontFamily: mono, fontSize: 9, letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.7)',
          }}>CAPTURE</div>
        </div>

        {/* Right — IMPORT */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 6 }}>
          <button onClick={onImport} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            color: '#fff', padding: 6,
          }}>
            <Icon.Folder s={18} />
            <div style={{
              fontFamily: mono, fontSize: 10, letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.85)',
            }}>IMPORT</div>
          </button>
        </div>
      </div>

      {/* Shutter flash */}
      {shutterFlash && (
        <div style={{
          position: 'absolute', inset: 0, background: '#fff',
          animation: 'shutterFade 0.18s ease-out forwards', pointerEvents: 'none',
        }} />
      )}
      <style>{`
        @keyframes shutterFade {
          0% { opacity: 0.95; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 2 — Preview (DISCARD / KEEP)
// ─────────────────────────────────────────────────────────────
function PreviewScreen({ onDiscard, onKeep }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      <PhotoPlaceholder seed={2} label="UNTITLED · JUST CAPTURED" />

      {/* Top — barely-there frame stamp */}
      <div style={{
        position: 'absolute', top: 60, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', padding: '0 22px',
        fontFamily: mono, fontSize: 9, letterSpacing: '0.22em',
        color: 'rgba(255,255,255,0.55)',
      }}>
        <span>REF · 0042</span>
        <span>2026·05·03 · 14:02</span>
      </div>

      {/* Decision prompt — hairline line + serif question */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 220,
        textAlign: 'center', padding: '0 40px',
      }}>
        <div style={{
          fontFamily: serif, fontStyle: 'italic', fontSize: 20, lineHeight: 1.3,
          color: 'rgba(255,255,255,0.85)',
          textShadow: '0 1px 14px rgba(0,0,0,0.55)',
        }}>
          Does this earn a place<br/>in the dojo?
        </div>
      </div>

      {/* Bottom decision rail */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '40px 22px 44px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
        }}>
          <button onClick={onDiscard} style={{
            height: 64, background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.95)',
            color: '#fff', cursor: 'pointer', borderRadius: 0,
            fontFamily: mono, fontSize: 13, letterSpacing: '0.32em', fontWeight: 500,
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >DISCARD</button>

          <button onClick={onKeep} style={{
            height: 64, background: '#fff',
            border: '1.5px solid #fff',
            color: '#000', cursor: 'pointer', borderRadius: 0,
            fontFamily: mono, fontSize: 13, letterSpacing: '0.32em', fontWeight: 600,
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#e8e8e8'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >KEEP</button>
        </div>
        <div style={{
          marginTop: 14, textAlign: 'center',
          fontFamily: mono, fontSize: 9, letterSpacing: '0.28em',
          color: 'rgba(255,255,255,0.4)',
        }}>NOT SAVED · DECIDE NOW</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 3 — Classify
// ─────────────────────────────────────────────────────────────
const TYPES = ['DOOR', 'FACADE', 'TYPOGRAPHY', 'DETAIL'];
const STYLES = ['BRUTALIST', 'VERNACULAR', 'CORPORATE', 'ORNAMENTAL', 'MINIMAL'];
const MATERIALS = ['WOOD', 'METAL', 'GLASS', 'CONCRETE', 'MIXED'];

function Chip({ label, selected, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '10px 14px', minHeight: 36,
      border: '1px solid #000',
      background: selected ? '#000' : '#fff',
      color: selected ? '#fff' : '#000',
      fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', fontWeight: 500,
      borderRadius: 0, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.32 : 1,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      transition: 'background 0.12s ease, color 0.12s ease',
      whiteSpace: 'nowrap',
    }}>
      {selected && <Icon.Check s={11} c="#fff" />}
      {label}
    </button>
  );
}

function Section({ index, title, rule, children }) {
  return (
    <div style={{ borderTop: '1px solid #000', padding: '16px 22px 18px' }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{
            fontFamily: mono, fontSize: 10, color: '#000', letterSpacing: '0.1em',
          }}>{String(index).padStart(2, '0')}</span>
          <span style={{
            fontFamily: sans, fontSize: 13, fontWeight: 600, letterSpacing: '0.18em',
            color: '#000',
          }}>{title}</span>
        </div>
        <span style={{
          fontFamily: mono, fontSize: 9, letterSpacing: '0.16em',
          color: '#666', textTransform: 'uppercase',
        }}>{rule}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {children}
      </div>
    </div>
  );
}

function ClassifyScreen({ onBack, onNext }) {
  const [type, setType] = React.useState(null);
  const [styles, setStyles] = React.useState([]);
  const [materials, setMaterials] = React.useState([]);

  const toggleMulti = (list, setList, value, max) => {
    if (list.includes(value)) {
      setList(list.filter(x => x !== value));
    } else if (list.length < max) {
      setList([...list, value]);
    }
  };

  const valid = type !== null && styles.length > 0;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Top stamp bar */}
      <div style={{
        padding: '54px 22px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #000',
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: mono, fontSize: 11, letterSpacing: '0.22em', color: '#000',
        }}>← BACK</button>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.32em', color: '#000' }}>
          CLASSIFY · 02/03
        </div>
        <div style={{ width: 56 }} />
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Image preview row */}
        <div style={{
          padding: '18px 22px 20px',
          display: 'grid', gridTemplateColumns: '92px 1fr', gap: 16, alignItems: 'center',
        }}>
          <div style={{ position: 'relative', width: 92, height: 116, border: '1px solid #000', overflow: 'hidden' }}>
            <PhotoPlaceholder seed={2} label="" />
          </div>
          <div>
            <div style={{
              fontFamily: mono, fontSize: 9, letterSpacing: '0.22em', color: '#666',
              marginBottom: 6,
            }}>REF · 0042</div>
            <div style={{
              fontFamily: serif, fontStyle: 'italic', fontSize: 22, lineHeight: 1.15,
              color: '#000', marginBottom: 6,
            }}>Untitled<br/>capture</div>
            <div style={{
              fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', color: '#000',
            }}>2026·05·03 · 14:02</div>
          </div>
        </div>

        {/* Sections */}
        <Section index={1} title="TYPE" rule="REQUIRED · SINGLE">
          {TYPES.map(t => (
            <Chip key={t} label={t} selected={type === t} onClick={() => setType(t === type ? null : t)} />
          ))}
        </Section>

        <Section
          index={2}
          title="STYLE"
          rule={`REQUIRED · ${styles.length}/2`}
        >
          {STYLES.map(s => {
            const sel = styles.includes(s);
            const blocked = !sel && styles.length >= 2;
            return (
              <Chip key={s} label={s} selected={sel} disabled={blocked}
                onClick={() => toggleMulti(styles, setStyles, s, 2)} />
            );
          })}
        </Section>

        <Section
          index={3}
          title="MATERIAL"
          rule={`OPTIONAL · ${materials.length}/2`}
        >
          {MATERIALS.map(m => {
            const sel = materials.includes(m);
            const blocked = !sel && materials.length >= 2;
            return (
              <Chip key={m} label={m} selected={sel} disabled={blocked}
                onClick={() => toggleMulti(materials, setMaterials, m, 2)} />
            );
          })}
        </Section>

        {/* Validation note */}
        <div style={{
          borderTop: '1px solid #000',
          padding: '14px 22px 24px',
          fontFamily: mono, fontSize: 10, letterSpacing: '0.14em',
          color: valid ? '#000' : '#666',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8,
            background: valid ? '#000' : 'transparent',
            border: '1px solid #000',
          }} />
          {valid
            ? 'READY TO FILE'
            : `AWAITING ${[!type && 'TYPE', styles.length === 0 && 'STYLE'].filter(Boolean).join(' + ')}`}
        </div>
        <div style={{ height: 100 }} />
      </div>

      {/* Sticky next */}
      <div style={{
        borderTop: '1px solid #000',
        padding: '14px 22px 30px', background: '#fff',
      }}>
        <button
          onClick={() => valid && onNext({ type, styles, materials })}
          disabled={!valid}
          style={{
            width: '100%', height: 60,
            background: valid ? '#000' : '#fff',
            color: valid ? '#fff' : '#000',
            border: '1.5px solid #000',
            cursor: valid ? 'pointer' : 'not-allowed',
            opacity: valid ? 1 : 0.4,
            borderRadius: 0,
            fontFamily: mono, fontSize: 13, letterSpacing: '0.4em', fontWeight: 600,
          }}
        >NEXT →</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 4 — Judgment ("IS THIS GOOD?" → "WHY?")
// ─────────────────────────────────────────────────────────────
const REASONS = ['PROPORTION', 'TEXTURE', 'CONTRAST', 'RHYTHM', 'COLOR', 'TYPOGRAPHY', 'COMPOSITION'];

function JudgmentScreen({ onBack, onSave }) {
  const [verdict, setVerdict] = React.useState(null); // 'YES' | 'NO'
  const [reasons, setReasons] = React.useState([]);

  const toggle = (r) => {
    if (reasons.includes(r)) setReasons(reasons.filter(x => x !== r));
    else if (reasons.length < 2) setReasons([...reasons, r]);
  };

  const canSave = verdict !== null && reasons.length >= 1;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Top stamp bar */}
      <div style={{
        padding: '54px 22px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #000',
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: mono, fontSize: 11, letterSpacing: '0.22em', color: '#000',
        }}>← BACK</button>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.32em', color: '#000' }}>
          JUDGE · 03/03
        </div>
        <div style={{ width: 56 }} />
      </div>

      {/* Image preview — small, anchors the page */}
      <div style={{
        padding: '20px 22px 18px',
        borderBottom: '1px solid #000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          position: 'relative', width: 136, height: 170, border: '1px solid #000', overflow: 'hidden',
        }}>
          <PhotoPlaceholder seed={2} label="" />
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Step 1 — IS THIS GOOD? */}
        <div style={{
          padding: '32px 22px 24px',
          borderBottom: verdict ? '1px solid #000' : 'none',
        }}>
          <div style={{
            fontFamily: mono, fontSize: 10, letterSpacing: '0.32em', color: '#000',
            marginBottom: 14,
          }}>STEP 01 · VERDICT</div>
          <div style={{
            fontFamily: serif, fontSize: 56, lineHeight: 0.95, color: '#000',
            letterSpacing: '-0.02em', marginBottom: 22,
            textWrap: 'balance',
          }}>
            Is this<br/><span style={{ fontStyle: 'italic' }}>good?</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['YES', 'NO'].map(v => {
              const sel = verdict === v;
              return (
                <button key={v} onClick={() => setVerdict(v)} style={{
                  height: 76, borderRadius: 0, cursor: 'pointer',
                  border: '1.5px solid #000',
                  background: sel ? '#000' : '#fff',
                  color: sel ? '#fff' : '#000',
                  fontFamily: sans, fontSize: 26, fontWeight: 700, letterSpacing: '0.18em',
                  transition: 'background 0.12s ease, color 0.12s ease',
                }}>{v}</button>
              );
            })}
          </div>
        </div>

        {/* Step 2 — WHY? (only after verdict) */}
        {verdict && (
          <div style={{
            padding: '28px 22px 32px',
            animation: 'judgeIn 0.28s ease-out',
          }}>
            <div style={{
              fontFamily: mono, fontSize: 10, letterSpacing: '0.32em', color: '#000',
              marginBottom: 14,
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <span>STEP 02 · {verdict === 'YES' ? 'WHAT WORKS' : 'WHAT FAILS'}</span>
              <span>{reasons.length}/2</span>
            </div>
            <div style={{
              fontFamily: serif, fontStyle: 'italic', fontSize: 64, lineHeight: 0.9,
              color: '#000', letterSpacing: '-0.03em', marginBottom: 24,
            }}>
              Why?
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {REASONS.map(r => {
                const sel = reasons.includes(r);
                const blocked = !sel && reasons.length >= 2;
                return (
                  <button key={r} onClick={() => toggle(r)} disabled={blocked} style={{
                    padding: '12px 16px', minHeight: 40,
                    border: '1px solid #000',
                    background: sel ? '#000' : '#fff',
                    color: sel ? '#fff' : '#000',
                    fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', fontWeight: 500,
                    borderRadius: 0,
                    cursor: blocked ? 'not-allowed' : 'pointer',
                    opacity: blocked ? 0.32 : 1,
                    transition: 'background 0.12s ease, color 0.12s ease',
                    whiteSpace: 'nowrap',
                  }}>{r}</button>
                );
              })}
            </div>
            <div style={{
              marginTop: 20,
              fontFamily: mono, fontSize: 10, letterSpacing: '0.14em',
              color: reasons.length >= 1 ? '#000' : '#666',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                display: 'inline-block', width: 8, height: 8,
                background: reasons.length >= 1 ? '#000' : 'transparent',
                border: '1px solid #000',
              }} />
              {reasons.length >= 1 ? 'PICK UP TO ONE MORE — OR SAVE' : 'PICK AT LEAST ONE REASON'}
            </div>
          </div>
        )}

        <div style={{ flex: 1 }} />
      </div>

      {/* Sticky save */}
      <div style={{
        borderTop: '1px solid #000',
        padding: '14px 22px 30px', background: '#fff',
      }}>
        <button
          onClick={() => canSave && onSave({ verdict, reasons })}
          disabled={!canSave}
          style={{
            width: '100%', height: 64,
            background: canSave ? '#000' : '#fff',
            color: canSave ? '#fff' : '#000',
            border: '1.5px solid #000',
            cursor: canSave ? 'pointer' : 'not-allowed',
            opacity: canSave ? 1 : 0.4,
            borderRadius: 0,
            fontFamily: mono, fontSize: 14, letterSpacing: '0.5em', fontWeight: 700,
          }}
        >SAVE</button>
      </div>

      <style>{`
        @keyframes judgeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Confirmation (lightweight, after NEXT) — closes flow back to camera
// ─────────────────────────────────────────────────────────────
function FiledScreen({ payload, onAgain }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#fff',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      padding: '0 32px', textAlign: 'center',
    }}>
      <div style={{
        fontFamily: mono, fontSize: 10, letterSpacing: '0.4em', color: '#000', marginBottom: 18,
      }}>FILED · REF·0042</div>
      <div style={{
        fontFamily: serif, fontStyle: 'italic', fontSize: 30, lineHeight: 1.15, color: '#000',
        marginBottom: 22,
      }}>Filed in the dojo.</div>
      <div style={{
        fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', color: '#000', lineHeight: 1.8,
      }}>
        TYPE · {payload?.type}<br/>
        STYLE · {payload?.styles.join(' / ')}<br/>
        {payload?.materials?.length > 0 && <>MATERIAL · {payload.materials.join(' / ')}<br/></>}
        {payload?.verdict && <>VERDICT · {payload.verdict}<br/></>}
        {payload?.reasons?.length > 0 && <>BECAUSE · {payload.reasons.join(' / ')}<br/></>}
      </div>
      <button onClick={onAgain} style={{
        marginTop: 36, padding: '14px 26px',
        border: '1.5px solid #000', background: '#fff', color: '#000', cursor: 'pointer',
        fontFamily: mono, fontSize: 11, letterSpacing: '0.32em', borderRadius: 0,
      }}>CAPTURE ANOTHER</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Flow controller
// ─────────────────────────────────────────────────────────────
function DojoFlow({ initial = 'camera' }) {
  const [screen, setScreen] = React.useState(initial);
  const [payload, setPayload] = React.useState(null);
  const [hasLast, setHasLast] = React.useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}>
      {screen === 'camera' && (
        <CameraScreen
          lastImage={hasLast}
          onCapture={() => setScreen('preview')}
          onClose={() => {}}
          onImport={() => {}}
        />
      )}
      {screen === 'preview' && (
        <PreviewScreen
          onDiscard={() => setScreen('camera')}
          onKeep={() => setScreen('classify')}
        />
      )}
      {screen === 'classify' && (
        <ClassifyScreen
          onBack={() => setScreen('preview')}
          onNext={(data) => { setPayload(data); setScreen('judge'); }}
        />
      )}
      {screen === 'judge' && (
        <JudgmentScreen
          onBack={() => setScreen('classify')}
          onSave={(data) => { setPayload(p => ({ ...p, ...data })); setHasLast(true); setScreen('filed'); }}
        />
      )}
      {screen === 'filed' && (
        <FiledScreen payload={payload} onAgain={() => setScreen('camera')} />
      )}
    </div>
  );
}

Object.assign(window, {
  DojoFlow, CameraScreen, PreviewScreen, ClassifyScreen, JudgmentScreen, FiledScreen,
  DOJO_W, DOJO_H,
});
