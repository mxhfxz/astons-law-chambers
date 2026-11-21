import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './styleguide.css'
import { SgTabs } from './SgTabs'
import {
  STYLEGUIDE_PATH,
  styleguideMeta,
  styleguideNav,
  architecture,
  codeInventory,
  documentedExceptions,
  cleanupBacklog,
  conversionPaths,
  patterns,
  accessibilityRules,
  typeLadder,
  colorPrimitives,
  recipeGraph,
  recipeLabels,
  pathToRecipes,
  colorSemantic,
  typeRoles,
  trackingOnly,
  spaceScale,
  containers,
  sectionShells,
  gapsMargins,
  breakpoints,
  components,
  chromeDocs,
  pageMap,
  invariants,
  driftForbidden,
  cardRecipes,
  buttons,
  type ComponentDoc,
} from '@/lib/styleguide-spec'

export const metadata: Metadata = {
  title: { absolute: `${styleguideMeta.title} — ${styleguideMeta.product}` },
  description: styleguideMeta.note,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: STYLEGUIDE_PATH },
}

function Code({ children }: { children: string }) {
  return <code className="sg-code">{children}</code>
}

function SpecTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <table className="sg-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td>{r.label}</td>
            <td><Code>{r.value}</Code></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function CodeTable({ rows }: { rows: { label: string; path: string; note: string }[] }) {
  return (
    <table className="sg-table">
      <thead>
        <tr>
          <th>Piece</th>
          <th>Path</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.path + r.label}>
            <td>{r.label}</td>
            <td><Code>{r.path}</Code></td>
            <td>{r.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function RelatedLinks({ recipeId }: { recipeId: string }) {
  const g = recipeGraph[recipeId]
  if (!g) return null
  return (
    <div className="sg-refs">
      {g.related.length > 0 && (
        <p className="sg-muted-note">
          Related:{' '}
          {g.related.map((id, i) => (
            <span key={id}>
              {i > 0 ? ' · ' : null}
              <a href={`#${id}`}>{recipeLabels[id] || id}</a>
            </span>
          ))}
        </p>
      )}
      {g.openFirst.length > 0 && (
        <p className="sg-muted-note">
          Open first:{' '}
          {g.openFirst.map((path, i) => (
            <span key={path}>
              {i > 0 ? ' · ' : null}
              <Code>{path}</Code>
            </span>
          ))}
        </p>
      )}
    </div>
  )
}

function ComponentBlock({ doc, demo }: { doc: ComponentDoc; demo?: ReactNode }) {
  const tabs = [
    {
      id: 'guidelines',
      label: 'Guidelines',
      content: (
        <ul className="sg-list">
          {doc.guidelines.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      ),
    },
    ...(demo
      ? [
          {
            id: 'live-demo',
            label: 'Live demo',
            content: demo,
          },
        ]
      : []),
    {
      id: 'specifications',
      label: 'Specifications',
      content: <SpecTable rows={[...doc.specs]} />,
    },
    {
      id: 'code',
      label: 'Code',
      content: <CodeTable rows={[...doc.code]} />,
    },
  ]

  return (
    <section className="sg-section" id={doc.id}>
      <div className="sg-comp-head">
        <h2>{doc.name}</h2>
        <span className="sg-tag">{doc.status}</span>
      </div>
      <p className="sg-desc">{doc.summary}</p>
      <p className="sg-muted-note">
        Model: <Code>{doc.modelFile}</Code>
      </p>
      <RelatedLinks recipeId={doc.id} />
      <SgTabs label={`${doc.name} documentation`} tabs={tabs} />
    </section>
  )
}

export default function StyleguidePage() {
  const tocItems: { id: string; label: string }[] = []
  for (const g of styleguideNav) {
    for (const item of g.items) tocItems.push({ id: item.id, label: item.label })
  }

  const buttonDemo = (
    <div className="sg-stack-lg">
      <div className="sg-demo">
        <p className="sg-demo__label">Dark surface</p>
        <div className="sg-demo__body sg-demo__body--dark sg-stack">
          <span className="btn btn-lg btn-inverse w-full flex">btn-inverse</span>
          <span className="btn btn-lg btn-on-dark w-full flex">btn-on-dark</span>
        </div>
      </div>
      <div className="sg-demo">
        <p className="sg-demo__label">Light surface</p>
        <div className="sg-demo__body sg-demo__body--subtle sg-stack">
          <span className="btn btn-md btn-primary w-full flex">btn-primary</span>
          <span className="btn btn-md btn-secondary w-full flex">btn-secondary</span>
        </div>
      </div>
      <div className="sg-demo">
        <p className="sg-demo__label">Emergency</p>
        <div className="sg-demo__body sg-demo__body--emergency sg-stack">
          <span className="btn btn-md btn-inverse-emergency w-full flex">btn-inverse-emergency</span>
          <span className="btn btn-lg btn-emergency w-full flex">btn-emergency</span>
        </div>
      </div>
      <div className="sg-demo">
        <p className="sg-demo__label">Sizes</p>
        <div className="sg-demo__body sg-row-wrap">
          {buttons.sizes.map((s) => (
            <span key={s.token} className={`btn ${s.token} btn-primary`}>
              {s.token}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  const cardDemo = (
    <div className="sg-stack-lg">
      {cardRecipes.map((c) => (
        <div key={c.name} className="sg-demo">
          <p className="sg-demo__label">{c.name}</p>
          <div className="sg-demo__body sg-demo__body--subtle">
            <p className="sg-muted-note">
              <Code>{c.chrome}</Code>
            </p>
            <div className={c.chrome}>
              <p className="text-xl font-semibold tracking-tight2 text-navy-950">{c.name}</p>
              <p className="mt-3 text-base text-navy-700 leading-relaxed">
                Feature card body uses text-base leading-relaxed.
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="sg-demo">
        <p className="sg-demo__label">Contact channel</p>
        <div className="sg-demo__body sg-card-demo">
          <div className="bg-offwhite border border-grey-300 rounded p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-grey-600">WhatsApp</p>
            <p className="mt-2 text-2xl font-semibold tracking-tightish text-navy-950">Message us</p>
            <p className="mt-2 text-sm text-navy-700 leading-relaxed">
              Outside office hours, or if you prefer to write.
            </p>
            <span className="btn btn-md btn-primary w-full mt-4 flex">WhatsApp</span>
          </div>
          <div className="bg-navy-950 text-white rounded p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-navy-100/80">Phone</p>
            <p className="mt-2 text-2xl font-semibold tracking-tightish">07922 247 999</p>
            <p className="mt-2 text-sm text-navy-100/90 leading-relaxed">
              Answered direct. Available 24/7 for police station support.
            </p>
            <span className="btn btn-md btn-inverse w-full mt-4 flex">Call now</span>
          </div>
        </div>
      </div>
    </div>
  )

  const asideDemo = (
    <div className="sg-demo">
      <p className="sg-demo__label">ContactAside</p>
      <div className="sg-demo__body sg-demo__body--subtle">
        <div className="bg-offwhite border border-grey-300 rounded p-6 pa-aside self-start max-w-prose">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-grey-600">Contact</p>
          <p className="mt-2 text-base text-navy-700 leading-relaxed">
            Speak to Astons Law Chambers about your situation.
          </p>
          <span className="btn btn-md btn-primary w-full mt-4 md:hidden">Call now</span>
          <p className="aside-phone-desktop mt-4 text-lg font-semibold tracking-tightish text-navy-950">
            07922 247 999
          </p>
          <span className="btn btn-md btn-secondary w-full mt-2">WhatsApp</span>
          <span className="btn btn-md btn-secondary w-full mt-2">Book a call</span>
        </div>
      </div>
    </div>
  )

  const heroDemo = (
    <div className="sg-demo">
      <p className="sg-demo__label">Hero CTAs (dark)</p>
      <div className="sg-demo__body sg-demo__body--dark">
        <p className="fluid-h1 font-semibold tracking-tight2 text-white">Criminal Defence Barrister</p>
        <p className="mt-4 fluid-lead text-navy-100/90 max-w-prose">
          Operating across London, Birmingham, Manchester and other UK cities.
        </p>
        <div className="mt-8 btn-row sg-stack">
          <span className="btn btn-lg btn-inverse btn-full">Book a Free Consultation</span>
          <span className="btn btn-lg btn-on-dark btn-full">Call 07922 247 999</span>
        </div>
      </div>
    </div>
  )

  const stripDemo = (
    <div className="sg-demo">
      <p className="sg-demo__label">FinalStrip</p>
      <div className="sg-demo__body sg-demo__body--dark">
        <p className="text-3xl md:text-4xl font-semibold tracking-tight2 text-white">
          Speak to someone today
        </p>
        <p className="mt-3 text-base text-navy-100/90 leading-relaxed max-w-prose">
          Available 24/7 for police station representation. Call or WhatsApp any time.
        </p>
        <div className="mt-8 sg-stack">
          <span className="btn btn-xl btn-inverse w-full flex">Call now</span>
          <span className="btn btn-lg btn-on-dark w-full flex">Message on WhatsApp</span>
          <span className="btn btn-lg btn-on-dark w-full flex">Book a call</span>
        </div>
      </div>
    </div>
  )

  const demoFor: Record<string, ReactNode> = {
    button: buttonDemo,
    card: cardDemo,
    aside: asideDemo,
    hero: heroDemo,
    'final-strip': stripDemo,
  }

  return (
    <div data-page="styleguide">
      <header className="sg-topbar">
        <span className="sg-topbar__brand">Astons Design System</span>
        <span className="sg-topbar__meta">
          v{styleguideMeta.version} · Internal
        </span>
      </header>

      <div className="sg-shell">
        <nav className="sg-nav" aria-label="Design system">
          {styleguideNav.map((group) => (
            <div key={group.group} className="sg-nav__group">
              <p className="sg-nav__label">{group.group}</p>
              {group.items.map((item) => (
                <a key={item.id} className="sg-nav__link" href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="sg-main">
          <div className="sg-main-inner">
            {/* Overview */}
            <header className="sg-pagehead" id="overview">
              <div className="sg-pagehead__row">
                <span className="sg-tag">{styleguideMeta.status}</span>
                <span className="sg-updated">Last updated {styleguideMeta.updated}</span>
              </div>
              <h1>{styleguideMeta.title}</h1>
              <p className="sg-pagehead__lead">
                Catalogue of foundations, components, patterns, and the code that wires them.
                Product pages compose only what is documented here.
              </p>
            </header>

            <section className="sg-section" id="architecture">
              <h2>Architecture</h2>
              <p className="sg-desc">{architecture.summary}</p>
              <h3 className="sg-h3">Pipeline</h3>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Step</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {architecture.pipeline.map((p) => (
                    <tr key={p.step}>
                      <td>{p.step}</td>
                      <td>{p.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 className="sg-h3">Key files</h3>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Path</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {architecture.keyFiles.map((f) => (
                    <tr key={f.path}>
                      <td><Code>{f.path}</Code></td>
                      <td>{f.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="sg-section" id="path-index">
              <h2>Path → recipe</h2>
              <p className="sg-desc">
                Reverse index. When editing a file, jump to its recipe(s). Built from the code map +
                Code tabs + open-first lists.
              </p>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Path</th>
                    <th>Recipes</th>
                  </tr>
                </thead>
                <tbody>
                  {pathToRecipes.map((row) => (
                    <tr key={row.path}>
                      <td><Code>{row.path}</Code></td>
                      <td>
                        {row.recipeIds.map((id, i) => (
                          <span key={id}>
                            {i > 0 ? ' · ' : null}
                            <a href={`#${id}`}>{recipeLabels[id] || id}</a>
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="sg-section" id="code-map">
              <h2>Full code map</h2>
              <p className="sg-desc">
                Every site file. If it is not listed, flag the gap. Status{' '}
                <Code>legacy</Code> = leave in place; do not wire, rename, or delete without unlock.
                Status <Code>docs</Code> = styleguide-only (may break OOP).
              </p>
              {codeInventory.map((group) => (
                <div key={group.group}>
                  <h3 className="sg-h3">{group.group}</h3>
                  <table className="sg-table">
                    <thead>
                      <tr>
                        <th>Path</th>
                        <th>Role</th>
                        <th>Connects to</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.files.map((f) => (
                        <tr key={f.path}>
                          <td><Code>{f.path}</Code></td>
                          <td>{f.role}</td>
                          <td>{f.connects}</td>
                          <td>{f.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </section>

            <section className="sg-section" id="exceptions">
              <h2>Documented exceptions</h2>
              <p className="sg-desc">
                Live off-recipe shells. Do not copy into new work. See Cleanup backlog for migrate
                targets when unlocked.
              </p>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Where</th>
                    <th>Why</th>
                    <th>Connects</th>
                  </tr>
                </thead>
                <tbody>
                  {documentedExceptions.map((e) => (
                    <tr key={e.id}>
                      <td><Code>{e.id}</Code></td>
                      <td>{e.where}</td>
                      <td>{e.why}</td>
                      <td>{e.connects}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="sg-section" id="cleanup-backlog">
              <h2>Cleanup backlog</h2>
              <p className="sg-desc">
                Refactor debt kept on purpose. Do not migrate inside a feature PR. When you unlock a
                cleanup pass, work only this list — migrate to the target; do not invent a third style.
              </p>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Where</th>
                    <th>Current</th>
                    <th>Target</th>
                    <th>Blocker</th>
                  </tr>
                </thead>
                <tbody>
                  {cleanupBacklog.map((c) => (
                    <tr key={c.id}>
                      <td><Code>{c.id}</Code></td>
                      <td>{c.where}</td>
                      <td>{c.current}</td>
                      <td>{c.target}</td>
                      <td>{c.blocker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Foundations */}
            <section className="sg-section" id="color">
              <h2>Color</h2>
              <p className="sg-desc">
                Tokens in <Code>styles/tokens.css</Code>. Product CSS never invents raw hex outside
                that file.
              </p>
              {colorPrimitives.map((group) => (
                <div key={group.group} className="sg-color-family">
                  <h3 className="sg-h3">{group.group}</h3>
                  {group.tokens.map((c) => (
                    <div key={c.token} className="sg-color-row">
                      <div
                        className={`sg-color-row__swatch ${c.light ? 'sg-color-row__swatch--light' : 'sg-color-row__swatch--dark'}`}
                        data-hex={c.tw}
                      >
                        <p className="sg-color-row__name">{c.tw}</p>
                      </div>
                      <div className="sg-color-row__meta">
                        <strong>{c.hex}</strong>
                        <span><Code>{c.token}</Code></span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <h3 className="sg-h3">Semantic</h3>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Maps to</th>
                  </tr>
                </thead>
                <tbody>
                  {colorSemantic.map((s) => (
                    <tr key={s.token}>
                      <td><Code>{s.token}</Code></td>
                      <td>{s.maps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="sg-section" id="typography">
              <h2>Typography</h2>
              <p className="sg-desc">
                IBM Plex Sans on the product site. One ranked ladder — use a role, then its exact
                classes. Never invent a parallel size.
              </p>
              <h3 className="sg-h3">Type ladder</h3>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Role</th>
                    <th>Recipe</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {typeLadder.map((r) => (
                    <tr key={r.rank}>
                      <td>{r.rank}</td>
                      <td>{r.role}</td>
                      <td><Code>{r.recipe}</Code></td>
                      <td>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 className="sg-h3">Roles</h3>
              {typeRoles.map((t) => (
                <article key={t.id} className="sg-type">
                  <div className="sg-type__grid">
                    <div>
                      <div className={`sg-type__canvas${t.dark ? ' sg-type__canvas--dark' : ''}`}>
                        <p
                          className={
                            t.dark && t.id === 'hero-lead'
                              ? `${t.classes} text-navy-100/90`
                              : t.dark
                                ? `${t.classes} text-white`
                                : t.classes
                          }
                        >
                          {t.sample}
                        </p>
                      </div>
                    </div>
                    <dl className="sg-type__meta">
                      <dt>Style name</dt>
                      <dd>{t.role}</dd>
                      <dt>Size</dt>
                      <dd>{t.size}</dd>
                      <dt>Classes</dt>
                      <dd><Code>{t.classes}</Code></dd>
                    </dl>
                  </div>
                </article>
              ))}
              <h3 className="sg-h3">Tracking</h3>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingOnly.map((t) => (
                    <tr key={t.token}>
                      <td><Code>{t.token}</Code></td>
                      <td>{t.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="sg-section" id="spacing">
              <h2>Spacing</h2>
              <p className="sg-desc">Primitive scale + only allowed layout paddings/gaps.</p>
              <h3 className="sg-h3">Scale</h3>
              {spaceScale.map((s) => (
                <div key={s.token} className="sg-space">
                  <Code>{s.token}</Code>
                  <div className="sg-space-bar" data-n={s.token.replace('--space-', '')} aria-hidden />
                  <span>
                    {s.rem} · {s.px}
                  </span>
                </div>
              ))}
              <h3 className="sg-h3">Containers & shells</h3>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[...containers, ...sectionShells.map((s) => ({ name: s.name, value: s.classes }))].map(
                    (c) => (
                      <tr key={c.name}>
                        <td>{c.name}</td>
                        <td><Code>{c.value}</Code></td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
              <h3 className="sg-h3">Gaps & margins</h3>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Use</th>
                    <th>Classes</th>
                  </tr>
                </thead>
                <tbody>
                  {gapsMargins.map((g) => (
                    <tr key={g.use}>
                      <td>{g.use}</td>
                      <td><Code>{g.classes}</Code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="sg-section" id="breakpoints">
              <h2>Breakpoints</h2>
              <p className="sg-desc">Three layout breakpoints only.</p>
              <div className="sg-bp">
                {breakpoints.map((b) => (
                  <div key={b.px} className="sg-bp__row">
                    <strong>{b.px}px</strong>
                    <div>
                      <div className="sg-bp__track" aria-hidden>
                        <div className={`sg-bp__fill sg-bp__fill--${b.px}`} />
                      </div>
                      <p className="sg-muted-note">{b.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="sg-section" id="conversion">
              <h2>Conversion paths</h2>
              <p className="sg-desc">
                Only approved conversion mechanisms. Resolve values through <Code>lib/contact.ts</Code>{' '}
                (and Web3Forms on HomeHero) — never hardcode elsewhere.
              </p>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th>Value</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {conversionPaths.map((c) => (
                    <tr key={c.channel}>
                      <td>{c.channel}</td>
                      <td><Code>{c.value}</Code></td>
                      <td><Code>{c.source}</Code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Components */}
            {components.map((doc) => (
              <ComponentBlock key={doc.id} doc={doc} demo={demoFor[doc.id]} />
            ))}

            {/* Patterns */}
            {patterns.map((p) => (
              <section key={p.id} className="sg-section" id={p.id}>
                <div className="sg-comp-head">
                  <h2>{p.name}</h2>
                  <span className="sg-tag">Stable</span>
                </div>
                <p className="sg-desc">{p.summary}</p>
                <RelatedLinks recipeId={p.id} />
                <SgTabs
                  label={`${p.name} documentation`}
                  tabs={[
                    {
                      id: 'guidelines',
                      label: 'Guidelines',
                      content: (
                        <ul className="sg-list">
                          {p.guidelines.map((g) => (
                            <li key={g}>{g}</li>
                          ))}
                        </ul>
                      ),
                    },
                    {
                      id: 'code',
                      label: 'Code',
                      content: <CodeTable rows={[...p.code]} />,
                    },
                  ]}
                />
              </section>
            ))}

            {/* Chrome */}
            {chromeDocs.map((c) => (
              <section key={c.id} className="sg-section" id={c.id}>
                <div className="sg-comp-head">
                  <h2>{c.name}</h2>
                  <span className="sg-tag">Stable</span>
                </div>
                <p className="sg-desc">{c.summary}</p>
                <RelatedLinks recipeId={c.id} />
                <SgTabs
                  label={`${c.name} documentation`}
                  tabs={[
                    {
                      id: 'guidelines',
                      label: 'Guidelines',
                      content: (
                        <ul className="sg-list">
                          {c.guidelines.map((g) => (
                            <li key={g}>{g}</li>
                          ))}
                        </ul>
                      ),
                    },
                    {
                      id: 'code',
                      label: 'Code',
                      content: <CodeTable rows={[...c.code]} />,
                    },
                  ]}
                />
              </section>
            ))}

            {/* Guidelines */}
            <section className="sg-section" id="page-map">
              <h2>Page → class map</h2>
              <p className="sg-desc">Which header / aside / strip each route uses.</p>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Header</th>
                    <th>Aside</th>
                    <th>FinalStrip</th>
                  </tr>
                </thead>
                <tbody>
                  {pageMap.map((r) => (
                    <tr key={r.page}>
                      <td>{r.page}</td>
                      <td>{r.header}</td>
                      <td>{r.aside}</td>
                      <td>{r.strip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="sg-section" id="invariants">
              <h2>Invariants</h2>
              <p className="sg-desc">Must hold on every product page.</p>
              <ul className="sg-list">
                {invariants.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>

            <section className="sg-section" id="forbidden">
              <h2>Do not use</h2>
              <p className="sg-desc">Refactor drift. Not style. Do not copy into product work.</p>
              <table className="sg-table">
                <thead>
                  <tr>
                    <th>Forbidden</th>
                    <th>Use instead</th>
                  </tr>
                </thead>
                <tbody>
                  {driftForbidden.map((d) => (
                    <tr key={d.drift}>
                      <td><Code>{d.drift}</Code></td>
                      <td>{d.migrate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="sg-section" id="accessibility">
              <h2>Accessibility</h2>
              <p className="sg-desc">Product a11y rules. Docs page is exempt from product chrome a11y patterns.</p>
              <ul className="sg-list">
                {accessibilityRules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <aside className="sg-toc" aria-label="On this page">
          <p className="sg-toc__title">On this page</p>
          {tocItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </aside>
      </div>
    </div>
  )
}
