
export default function Section({title, subtitle, children, action}){
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
            {subtitle && <p className="text-gray-500">{subtitle}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  )
}
