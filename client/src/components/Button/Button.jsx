import React from 'react'
import cx from 'classnames'
import LoadingSpinner from '../LoadingSpinner';

export function SecondaryButton({ children, className, loading, disabled, ...rest }) {
  return (
    <button
      type="button"
      className={
        cx(
          "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
          className
        )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <LoadingSpinner className="mr-3" color="white" />}
      {children}
    </button>
  )
}

export function PrimaryButton({ children, className, loading, disabled, ...rest }) {
  return (
    <button
      type="button"
      className={
        cx(
          "relative inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-700 text-white",
          className
        )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <LoadingSpinner className="mr-3" color="white" />}
      {children}
    </button>
  )
}