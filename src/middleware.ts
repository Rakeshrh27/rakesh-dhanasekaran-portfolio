import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'sv'],

    // Used when no locale matches
    defaultLocale: 'en'
});

export const config = {
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_static (inside /public)
    // - /_vercel (Vercel internals)
    // - all files (e.g. favicon.ico)
    matcher: ['/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)']
};
