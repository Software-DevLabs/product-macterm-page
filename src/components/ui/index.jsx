import React from 'react';
import { Check, X } from 'lucide-react';

/*
  Mastra Studio component port.
  Colors flow only through --* vars: fill rungs, status tokens, chart hues.
  Surfaces paint rims/shadows via shadow-{raised,input,inset,rim} stacks.
*/

/* ---------- buttons ---------- */

/* Mastra buttonVariants: default = raised field pill w/ tint hover,
   primary = fill-inverse pill, ghost/subtle/link/destructive rungs */
const VARIANTS = {
  default:
    'bg-field shadow-input text-foreground hover:[--surface-tint:var(--fill-subtle)] active:[--surface-tint:var(--fill)] disabled:bg-fill-subtle disabled:text-placeholder',
  primary:
    'bg-fill-inverse text-sidebar hover:bg-fill-inverse-hover active:bg-fill-inverse-active disabled:bg-fill-inverse-disabled disabled:text-sidebar/75',
  destructive:
    'bg-fill-destructive text-fill-destructive-foreground hover:bg-fill-destructive-hover active:bg-fill-destructive-active disabled:bg-fill-destructive-disabled disabled:text-fill-destructive-foreground/60',
  ghost:
    'bg-transparent text-muted-foreground hover:bg-fill-subtle hover:text-foreground active:bg-fill',
  subtle: 'bg-fill text-foreground hover:bg-fill-hover active:bg-fill-active',
  link: 'bg-transparent text-muted-foreground hover:text-foreground',
};

/* legacy aliases from the previous dashboard grammar */
const ALIASES = { secondary: 'default' };

const SIZES = {
  sm: 'h-control-sm gap-1.5 px-3 text-label',
  base: 'h-control-md gap-2 px-3.5 text-label',
  pill: 'h-control-md gap-2 px-3.5 text-label',
  lg: 'h-control-lg gap-2 px-4 text-label',
  icon: 'h-control-md w-control-md',
};

export const Button = ({ variant = 'primary', size = 'base', className = '', as: As = 'button', children, ...props }) => (
  <As
    className={`inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full transition-colors duration-normal ease-out disabled:pointer-events-none disabled:cursor-not-allowed ${
      VARIANTS[ALIASES[variant] || variant]
    } ${SIZES[size] || SIZES.base} ${className}`}
    {...props}
  >
    {children}
  </As>
);

export const IconButton = ({ label, children, className = '', ...props }) => (
  <button
    type="button"
    aria-label={label}
    className={`inline-flex h-control-md w-control-md shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-normal hover:bg-fill-subtle hover:text-foreground active:bg-fill ${className}`}
    {...props}
  >
    {children}
  </button>
);

/* ---------- badges / pills ---------- */

const BADGE = {
  success: 'bg-success-subtle text-success-foreground',
  info: 'bg-info-subtle text-info-foreground',
  error: 'bg-destructive-subtle text-destructive-foreground',
  warning: 'bg-warning-subtle text-warning-foreground',
  gray: 'bg-fill text-muted-foreground',
};

export const Badge = ({ variant = 'gray', className = '', children, ...props }) => (
  <span
    className={`shadow-inset inline-flex h-5 w-fit shrink-0 items-center gap-1 rounded-[7px] px-1.5 text-meta transition-colors ${
      BADGE[variant]
    } ${className}`}
    {...props}
  >
    {children}
  </span>
);

/* department-style pill: neutral chip + colored dot */
export const DotPill = ({ dot = 'bg-chart-green', label, className = '' }) => (
  <span
    className={`shadow-inset inline-flex items-center gap-1.5 rounded-[7px] bg-fill px-1.5 py-0.5 text-label text-muted-foreground ${className}`}
  >
    <span className={`size-1.5 shrink-0 rounded-full ${dot}`} />
    {label}
  </span>
);

/* employment-style status pill with leading check/cross */
export const StatusPill = ({ ok = true, label }) => (
  <span
    className={`shadow-inset inline-flex h-5 w-fit shrink-0 items-center gap-1 rounded-[7px] px-1.5 text-meta transition-colors ${
      ok ? 'bg-success-subtle text-success-foreground' : 'bg-destructive-subtle text-destructive-foreground'
    }`}
  >
    {ok ? <Check className="size-3" /> : <X className="size-3" />}
    {label}
  </span>
);

/* ---------- inputs ---------- */

const FIELD =
  'bg-field shadow-input text-foreground placeholder:text-muted-foreground transition-colors duration-normal focus-visible:outline-none focus-visible:[--field-rim:var(--field-rim-focus)] focus:placeholder:opacity-70 disabled:cursor-not-allowed disabled:bg-field-disabled disabled:text-muted-foreground';

export const Input = ({ className = '', ...props }) => (
  <input
    className={`h-control-md w-full rounded-full px-3.5 text-label ${FIELD} ${className}`}
    {...props}
  />
);

export const Textarea = ({ className = '', ...props }) => (
  <textarea
    className={`min-h-20 w-full resize-y rounded-xl px-3.5 py-2 text-body ${FIELD} ${className}`}
    {...props}
  />
);

/* selection control (Mastra selectionControlStyle) */
export const Checkbox = ({ checked = false, onChange, label }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={!!checked}
    aria-label={label}
    onClick={() => onChange && onChange(!checked)}
    className={`inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[5px] border bg-fill-hover text-sidebar transition-all duration-normal hover:border-border-strong hover:bg-fill-active active:scale-95 ${
      checked
        ? 'border-foreground bg-foreground hover:border-foreground/90 hover:bg-foreground/90'
        : 'border-border'
    }`}
  >
    {checked ? <Check className="size-3" strokeWidth={3.25} /> : null}
  </button>
);

/* switch — fill rung track, foreground thumb that inverts when checked */
export const Switch = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={!!checked}
    disabled={disabled}
    onClick={() => onChange && onChange(!checked)}
    className={`inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-normal ease-out ${
      disabled ? 'cursor-not-allowed bg-fill-hover' : 'hover:bg-fill-active'
    } ${checked ? 'bg-foreground/90' : 'bg-fill-hover'} ${disabled && checked ? 'bg-foreground/30' : ''}`}
  >
    <span
      className={`block h-4 w-5 rounded-full bg-foreground transition-[background-color,translate,width,transform] duration-normal ease-out ${
        checked ? 'translate-x-3 bg-sidebar' : 'translate-x-0'
      }`}
    />
  </button>
);

/* ---------- avatars ---------- */

const AVATAR_S = 'h-7 w-7 text-[11px]';

export const Avatar = ({ initials, className = AVATAR_S }) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center rounded-full bg-fill-hover font-medium text-foreground ${className}`}
  >
    {initials}
  </span>
);

export const AvatarStack = ({ people = [], max = 3 }) => (
  <span className="inline-flex items-center">
    {people.slice(0, max).map((p, i) => (
      <span
        key={i}
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-fill-hover text-[10px] font-semibold uppercase text-foreground ${
          i ? '-ml-2' : ''
        }`}
      >
        {p.initials}
      </span>
    ))}
  </span>
);

/* ---------- surfaces ---------- */

export const Card = ({ className = '', children, ...props }) => (
  <div className={`shadow-raised rounded-xl bg-card transition-all duration-normal ${className}`} {...props}>
    {children}
  </div>
);

/* ---------- kbd ---------- */

export const Kbd = ({ children, className = '' }) => (
  <kbd
    className={`shadow-raised inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-card px-1.5 font-mono text-caption text-foreground ${className}`}
  >
    {children}
  </kbd>
);

/* ---------- data table (Mastra "inset" variant) ---------- */

/*
  columns: [{ key, label, icon, className (td class), thClass }]
  rows: array; cell = renderCell(row, columnKey)
*/
export const DataTable = ({ columns, rows, renderCell, rowKey, empty = 'No records' }) => (
  <div className="shadow-raised rounded-xl bg-card p-1">
    <div className="overflow-x-auto rounded-lg">
      <table className="border-separate border-spacing-0 text-left text-body-sm tabular-nums">
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="h-table-header border-b border-border whitespace-nowrap px-2 align-middle text-column text-muted-foreground first:pl-3 last:pr-3"
              >
                <span className="flex items-center gap-2">
                  {c.icon ? <c.icon className="size-3.5 text-muted-foreground" /> : null}
                  {c.label || '\u00a0'}
                </span>
              </th>
            ))}
            <th className="h-table-header w-10 border-b border-border" />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="bg-background px-3 py-14 text-center text-caption text-muted-foreground">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row, ri) => (
              <tr
                key={rowKey ? rowKey(row) : (row.key ?? ri)}
                className={`group bg-background transition-colors duration-normal ease-out hover:bg-fill-subtle ${
                  ri === 0 ? '[&>td:first-child]:rounded-tl-lg [&>td:last-child]:rounded-tr-lg' : ''
                } ${
                  ri === rows.length - 1
                    ? '[&>td:first-child]:rounded-bl-lg [&>td:last-child]:rounded-br-lg'
                    : ''
                }`}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`h-table-row whitespace-nowrap px-2 py-1 align-middle text-label first:pl-3 last:pr-3 ${
                      ri > 0 ? 'border-t border-border' : ''
                    } ${c.className || ''}`}
                  >
                    {renderCell(row, c.key, row)}
                  </td>
                ))}
                <td className={`w-10 ${ri > 0 ? 'border-t border-border' : ''}`} />
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

/* ---------- empty state (Mastra EmptyState) ---------- */

export const EmptyScreen = ({ icon: Icon, headline, description, children }) => (
  <div className="flex max-w-full flex-col items-center justify-center rounded-lg bg-background px-4 py-10 text-center">
    {Icon ? (
      <div className="mb-3 inline-flex text-muted-foreground [&>svg]:size-5">
        <Icon className="size-5" />
      </div>
    ) : null}
    <h3 className="text-subheading text-foreground">{headline}</h3>
    {description ? <p className="wrap-anywhere mt-1.5 max-w-md text-caption text-muted-foreground">{description}</p> : null}
    {children ? <div className="mt-4 max-w-full">{children}</div> : null}
  </div>
);

/* ---------- settings section card ---------- */

export const Panel = ({ title, description, action, children, className = '' }) => (
  <Card className={`p-6 ${className}`}>
    {title ? (
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-heading text-foreground">{title}</h3>
          {description ? <p className="mt-1 text-caption text-muted-foreground">{description}</p> : null}
        </div>
        {action}
      </div>
    ) : null}
    {children}
  </Card>
);
