// src/lib/utils.js

/**
 * Utility to conditionally join classNames
 * Example: cn('btn', isPrimary && 'btn-primary', isDisabled && false) => "btn btn-primary"
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
