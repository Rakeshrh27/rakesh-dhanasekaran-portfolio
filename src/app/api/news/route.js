import { NextResponse } from 'next/server';

export async function GET() {
  const tags = ['dotnet', 'angular', 'react', 'azure', 'aws', 'sqlserver', 'mysql', 'events'];
  
  try {
    // Fetch from Dev.to API
    // We'll broaden the search to get a good mix of the requested topics
    const response = await fetch(`https://dev.to/api/articles?tags=${tags.join(',')}&per_page=6`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Dev.to');
    }

    const articles = await response.json();

    const formattedArticles = articles.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.description,
      category: article.tag_list[0]?.toUpperCase() || 'TECH',
      date: new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      readTime: `${article.reading_time_minutes} min read`,
      link: article.url,
      image: article.cover_image || article.social_image
    }));

    return NextResponse.json(formattedArticles);
  } catch (error) {
    console.error('News fetch error:', error);
    // Fallback static data if API fails
    return NextResponse.json([
      {
        id: 1,
        title: 'Building Modern .NET Applications with Azure',
        excerpt: 'Discover latest best practices for deploying scalable .NET 8 services on Azure Container Apps.',
        category: 'AZURE',
        date: 'Recent',
        readTime: '8 min read',
        link: '#'
      },
      {
        id: 2,
        title: 'Angular vs React in 2024: Architecture Guide',
        excerpt: 'An in-depth comparison of signals in Angular and Server Components in React.',
        category: 'FRONTEND',
        date: 'Recent',
        readTime: '12 min read',
        link: '#'
      }
    ]);
  }
}
