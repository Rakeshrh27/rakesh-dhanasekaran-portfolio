import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';

export default createMiddleware(routing);

export const config = {
    // Match all internationalized pathnames, but ignore /api, /_next and static files
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
