import React from 'react';
import s from './RadioGroup.module.scss';

export type RadioOption = {
  id: number | string;
  label: string;
};

type Props = {
  title?: string;
  name?: string;
  options: RadioOption[];
  value: number | string | null;
  onChange: (id: number | string) => void;
  error?: string | null;
  showError?: boolean;
};

export default function RadioGroup({
  title,
  name = 'radio',
  options,
  value,
  onChange,
  error,
  showError,
}: Props) {
  const hasError = !!(showError && error);

  return (
    <section className={s.group} aria-labelledby={title ? `${name}-legend` : undefined}>
      {title && (
        <p id={`${name}-legend`} className={s.title}>
          {title}
        </p>
      )}

      <div className={s.list} role="radiogroup" aria-labelledby={title ? `${name}-legend` : undefined}>
        {options.map((opt) => {
          const id = String(opt.id);
          const checked = String(value ?? '') === id;

          return (
            <label key={id} className={s.item}>
              <input
                type="radio"
                name={name}
                value={id}
                checked={checked}
                onChange={() => onChange(opt.id)}
                aria-checked={checked}
                aria-invalid={hasError || undefined}
              />
              <span className={s.text}>{opt.label}</span>
            </label>
          );
        })}
      </div>

      {}
      <div className={`${s.msg} ${hasError ? s.error : ''}`}>
        {hasError ? error : ''}
      </div>
    </section>
  );
}
