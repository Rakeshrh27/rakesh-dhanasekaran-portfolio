import { Inter } from 'next/font/google'
import '../globals.css'
import ThemeToggle from '@/components/ThemeToggle'
import CustomCursor from '@/components/CustomCursor'
import FloatingNav from '@/components/FloatingNav'
import SmoothScroll from '@/components/SmoothScroll'
import LanguageSelector from '@/components/LanguageSelector'
import CommandPalette from '@/components/CommandPalette'
import TerminalFooter from '@/components/TerminalFooter'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

const locales = ['en', 'sv'];

export const metadata = {
  title: 'Rakesh Dhanasekaran - Senior .NET Developer',
  description: 'Senior .NET Full-Stack Developer with 9+ years of experience',
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} selection:bg-primary/30 selection:text-primary overflow-x-hidden`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Analytics />
          <SmoothScroll>
            <CommandPalette />
            <CustomCursor />
            <FloatingNav />
            <div className="fixed top-8 right-8 z-[101] flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            {children}
            <TerminalFooter />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}