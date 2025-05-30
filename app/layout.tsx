import './globals.css'
import {
  Bricolage_Grotesque,
  DM_Sans,
  Geist_Mono,
  IBM_Plex_Mono,
  Inter,
  PT_Serif,
} from 'next/font/google'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Bricolage_Grotesque({
  variable: '--font-sans',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})
const mono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} ${serif.variable}`}>
      <body className="max-w-screen  antialiased snap-y snap-mandatory">{children}</body>
    </html>
  )
}
