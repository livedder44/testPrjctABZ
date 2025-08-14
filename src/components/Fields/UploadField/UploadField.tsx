import React from 'react';
import s from './UploadField.module.scss';

type Props = {
  onChange: (file: File | null) => void;
  filename?: string;
  error?: string | null;
  showError?: boolean;
  className?: string;
};

export default function UploadField({
  onChange,
  filename,
  error,
  showError,
  className = '',
}: Props) {
  const filled = Boolean(filename);
  const hasError = Boolean(showError && error);

  return (
    <div className={`${s.root} ${className}`}>
      <label
        className={`${s.control} ${filled ? s.filled : ''} ${hasError ? s.error : ''}`}
      >
        <input
          type="file"
          accept=".jpeg,.jpg,image/jpeg"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          aria-invalid={hasError || undefined}
        />

        <span className={s.button}>Upload</span>
        <span className={s.filename}>
          {filename || 'Upload your photo'}
        </span>
      </label>

      <div className={`${s.msg} ${hasError ? s.error : ''}`}>
        {hasError ? error : ''}
      </div>
    </div>
  );
}
