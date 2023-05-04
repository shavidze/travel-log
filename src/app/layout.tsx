import './globals.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
  viewport: 'width=device-width, initial-scale=1, user-scalable=no',
};
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
