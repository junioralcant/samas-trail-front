export function Row({
  className,
  children,
}: Readonly<{className?: string; children: React.ReactNode}>) {
  return (
    <div className={`flex justify-between w-full gap-2 ${className}`}>
      {children}
    </div>
  );
}
