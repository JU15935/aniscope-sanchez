interface DetailLayoutProps {
  children: React.ReactNode;
}

export function DetailLayout({ children }: DetailLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}