import classNames from 'classnames'

export function StatusPill({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={
        classNames(
          "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
          status === "subscribed" ? "bg-green-100 text-green-800" : null,
          status === "unsubscribed" ? "bg-red-100 text-red-800" : null
        )
      }
    >
      {status}
    </span>
  );
};