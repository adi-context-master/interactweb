export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen overflow-auto bg-background">{children}</div>;
}
