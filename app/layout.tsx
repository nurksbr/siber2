import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#111827'
};

export const metadata: Metadata = {
  title: "CYBERLY - Siber Güvenlik Farkındalık Platformu",
  description: "Kişiler ve kurumlar için siber güvenlik farkındalığı, eğitimler ve güncel tehdit istihbaratı",
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
  ],
  appleWebApp: {
    title: "CYBERLY",
    statusBarStyle: "black-translucent"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.className}>
      <body
        className="antialiased bg-gray-900 text-white"
      >
        {/* Kod akışı animasyonu istemci tarafında render edilecek */}
        <ClientWrapper />
        
        <AuthProvider>
          <div className="relative z-20">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
