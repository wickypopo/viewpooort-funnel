export function CalculationList({ title, items = [] }) {
  return (
    <div>
      <h3 className="type-card-title text-black">{title}</h3>
      <dl className="type-body mt-4 grid grid-cols-[1fr_auto] gap-x-6 text-black/60">
        {items.map((item) => (
          <div className="contents" key={item.label}>
            <dt>{item.label}:</dt>
            <dd className="type-body-strong text-right text-black/80">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
