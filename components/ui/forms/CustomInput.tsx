'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Icon } from '../Icon';

export const CUSTOM_INPUT_DEBOUNCE_TIMER = 300;

export type InputProperties = {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  classes?: string;
  dependencies?: string[];
  readonly?: boolean;
  allowedPattern?: RegExp;
};

export const CustomInput = ({
  name,
  label,
  type,
  placeholder,
  classes,
  dependencies,
  readonly,
  allowedPattern,
}: InputProperties) => {
  const { register, formState, getFieldState, watch, trigger } = useFormContext();
  const isPassword = type === 'password';
  const [visibility, visibilityToggle] = useState(false);

  const { error, isTouched, isDirty } = getFieldState(name, formState);

  const errorMessage = error?.message ?? '';

  const value = watch(name);

  const isEmpty = () => value == undefined || value == '';

  const hasInteracted = isTouched || isDirty;
  const hasError = Boolean(error) && hasInteracted;

  const [initialBlur, setInitialBlur] = useState(false);

  const {
    onChange: rhfOnChange,
    onBlur: rhfOnBlur,
    ...restRegister
  } = register(name, { valueAsNumber: type === 'number' });

  const debounceReference = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value;

    if (allowedPattern) {
      rawValue = rawValue.replace(allowedPattern, '');
      event.target.value = rawValue;
    }

    rhfOnChange(event);

    if (debounceReference.current) clearTimeout(debounceReference.current);

    debounceReference.current = setTimeout(() => {
      if (!initialBlur) {
        setInitialBlur(true);
      }

      trigger(name);
      dependencies?.forEach((dependency) => {
        if (isDirty) trigger(dependency);
      });
    }, CUSTOM_INPUT_DEBOUNCE_TIMER);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    rhfOnBlur(event);

    setInitialBlur(true);
  };

  useEffect(() => {
    return () => {
      if (debounceReference.current) clearTimeout(debounceReference.current);
    };
  }, []);

  return (
    <div className={cn('flex w-full flex-col gap-1', (readonly ?? false) && 'pointer-events-none', classes)}>
      <label className="text-greyscale-700 mb-1 text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <div className={cn('relative flex w-full align-middle')}>
        <input
          {...restRegister}
          id={name}
          type={visibility ? 'text' : type}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-md border-[1.5px] px-3 pt-4 pr-12 pb-4.5 pl-4.25 text-sm transition-all outline-none',
            hasError ? 'border-error' : 'border-greyscale-200 focus:border-greyscale-400',
            hasError
              ? 'text-error'
              : isEmpty()
                ? 'text-greyscale-400 group-hover:text-greyscale-300 group-focus:text-greyscale-100'
                : 'text-greyscale-400 group-focus:text-greyscale-700'
          )}
          onChange={handleOnChange}
          onBlur={handleBlur}
          readOnly={readonly}
          tabIndex={(readonly ?? false) ? -1 : 0}
        />
        {isPassword && (
          <Button
            variant="simpleIcon"
            size="small"
            onClick={() => visibilityToggle(!visibility)}
            className={cn(
              'absolute top-1/2 right-4 -translate-y-1/2',
              hasError ? 'text-error' : 'text-greyscale-300 hover:text-greyscale-400'
            )}
            tabIndex={-1}
          >
            {visibility ? <Icon name="eye-open" /> : <Icon name="eye-closed" />}
          </Button>
        )}
      </div>
      <div className="min-h-5">
        {hasError && initialBlur && (
          <p className="text-error text-xs font-medium">{isEmpty() ? `${label} is required` : errorMessage}</p>
        )}
      </div>
    </div>
  );
};
