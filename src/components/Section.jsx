/* Section.jsx */
export default function Section({
  title,
  subtitle = "",
  children,
  action = null,
  className = "",
}) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 text-sm md:text-base">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
