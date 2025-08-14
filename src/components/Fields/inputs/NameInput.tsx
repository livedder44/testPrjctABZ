import { useEffect, useMemo, useRef } from 'react';
import s from './Inputs.module.scss';

type Props = {
  value: string;
  onChange: (v: string) => void;
  submitted?: boolean;
  onValidityChange?: (ok: boolean) => void;
};

export default function NameInput({
  value,
  onChange,
  submitted = false,
  onValidityChange,
}: Props) {
  const dirtyRef = useRef(false);

  const error = useMemo(() => {
    const v = value.trim();
    if (v.length === 0) return 'Should be 2–60 characters';
    if (v.length < 2 || v.length > 60) return 'Should be 2–60 characters';
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
        data-placeholder="Your name"
      >
        <input
          type="text"
          name="name"
          aria-label="name"
          value={value}
          placeholder="Your name"
          onChange={(e) => {
            dirtyRef.current = true;
            onChange(e.target.value);
          }}
        />
      </div>
      <div className={`${s.msg} ${showError ? s.error : ''}`}>
        {showError ? error : ''}
      </div>
    </div>
  );
}
