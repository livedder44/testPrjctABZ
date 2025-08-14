import { useEffect, useMemo, useRef } from 'react';
import s from "./Inputs.module.scss";

type Props = {
  value: string;
  onChange: (v: string) => void;
  submitted?: boolean;
  onValidityChange?: (ok: boolean) => void;
};

const enforceUaPrefix = (raw: string) => {
  if (!raw || raw.trim() === '') return '';
  let v = raw.replace(/[^\d+]/g, '');
  if (!v.startsWith('+')) v = '+' + v;
  if (!v.startsWith('+380')) {
    v = '+380' + v.replace(/^\+?/, '').replace(/^380/, '');
  }
  return v.slice(0, 13);
};

export default function PhoneInput({
  value,
  onChange,
  submitted = false,
  onValidityChange,
}: Props) {
  const dirtyRef = useRef(false);

  const error = useMemo(() => {
    const v = value.trim();
    if (v.length === 0) return 'Phone must be +380XXXXXXXXX';
    if (!/^(\+?380\d{9}|\+38\s?\(\d{3}\)\s?\d{3}\s?-?\s?\d{2}\s?-?\s?\d{2})$/.test(v))
      return 'Phone must be +380XXXXXXXXX';
    return null;
  }, [value]);

  const isValid = error === null;

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  const showError = submitted || (dirtyRef.current && !!error);

  return (
    <div className={s.inputWrap}>
      <div
        className={`${s.field} ${value.trim() ? 'filled ' + s.filled : ''} ${
          showError ? 'error ' + s.error : ''
        }`}
        data-placeholder="Phone"
      >
        <input
          type="tel"
          name="phone"
          aria-label="Phone"
          placeholder="+380XXXXXXXXX"
          value={value}
          onFocus={() => {
            if (!value) onChange('+380');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && value === '+380') {
              e.preventDefault();
              onChange('');
            }
          }}
          onChange={(e) => {
            dirtyRef.current = true;
            onChange(enforceUaPrefix(e.target.value));
          }}
        />
      </div>
      <div className={`${s.msg} ${showError ? s.error : ''}`}>
        {showError ? error : ''}
      </div>
    </div>
  );
}
