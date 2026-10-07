export default function ProductSpecifications({ items, showHeading = true }) {
  if (!items?.length) return null;

  return (
    <div>
      {showHeading ? (
        <h2 className="text-base font-semibold text-gray-900 mb-3  lg:top-0 lg:bg-white/95 lg:backdrop-blur-sm lg:py-2 lg:z-10">
          Product Description
        </h2>
      ) : null}

      <dl className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
        {items.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 sm:grid-cols-[minmax(130px,36%)_1fr] gap-0.5 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 bg-white even:bg-gray-50/80"
          >
            <dt className="text-xs sm:text-sm font-medium text-gray-600">
              {row.label}
            </dt>
            <dd className="text-xs sm:text-sm text-gray-900">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
