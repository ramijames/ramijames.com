import articles from '../../assets/articles.json'

const SITE_URL = 'https://www.ramijames.com'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler((event) => {
  const items = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((article) => {
      const url = `${SITE_URL}/thoughts/${article.slug}`
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description>${escapeXml(article.summary)}</description>${article.tags.map(tag => `
      <category>${escapeXml(tag)}</category>`).join('')}
    </item>`
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rami James — Thoughts</title>
    <link>${SITE_URL}/thoughts/</link>
    <description>Thoughts on Software, Docs, and DevRel</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')
  return feed
})
