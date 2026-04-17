interface ListLayoutProps {
  header: React.ReactNode;
  filters: React.ReactNode;
  children: React.ReactNode;
  pagination: React.ReactNode;
}

export function ListLayout({ header, filters, children, pagination }: ListLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {header}
        <div className="mt-6">{filters}</div>
        <div className="mt-6">{children}</div>
        <div className="mt-8">{pagination}</div>
      </div>
    </div>
  );
}