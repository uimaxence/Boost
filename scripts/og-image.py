#!/usr/bin/env python3
"""
Génère le visuel de partage (Open Graph, 1200x630) d'un article du blog.

Usage :
    npm run og -- <slug>                       # visuel de marque (dégradé bleu)
    npm run og -- <slug> --photo chemin.jpg    # avec la photo de l'article en fond

Sortie : public/blog/<slug>/og.jpg  (référencé par `ogImage` dans src/lib/blog/articles.js)

Dépendances : Node (pour lire articles.js) et Playwright Python :
    python3 -m pip install playwright && python3 -m playwright install chromium
"""
import argparse
import base64
import html
import json
import mimetypes
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

READ_ARTICLE_JS = """
import('./src/lib/blog/articles.js').then((m) => {
  const a = m.getArticle(process.argv[1]);
  if (!a) { console.error('Article introuvable : ' + process.argv[1]); process.exit(1); }
  console.log(JSON.stringify({
    slug: a.slug,
    title: a.title,
    category: a.category,
    date: m.formatDate(a.date),
    minutes: m.readingTime(a),
    author: (m.authors[a.author] || {}).name || '',
    location: a.location || '',
    cover: a.cover || null,
  }));
});
"""


def load_article(slug):
    out = subprocess.run(
        ['node', '--input-type=module', '-e', READ_ARTICLE_JS, slug],
        cwd=ROOT, capture_output=True, text=True,
    )
    if out.returncode != 0:
        sys.exit(out.stderr.strip() or 'Impossible de lire articles.js')
    return json.loads(out.stdout)


def data_uri(path):
    path = pathlib.Path(path)
    mime = mimetypes.guess_type(str(path))[0] or 'application/octet-stream'
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def build_html(article, photo):
    fonts = {
        'medium': data_uri(ROOT / 'public/fonts/Switzer-Medium.woff2'),
        'semibold': data_uri(ROOT / 'public/fonts/Switzer-Semibold.woff2'),
        'bold': data_uri(ROOT / 'public/fonts/Switzer-Bold.woff2'),
    }
    logo = (ROOT / 'assets/logo.svg').read_text()

    title = article['title']
    n = len(title)
    title_size = 64 if n <= 55 else 56 if n <= 75 else 48 if n <= 95 else 42

    facts = ' · '.join(x for x in [article['date'], f"{article['minutes']} min de lecture"] if x)
    photo_css = ''
    if photo:
        photo_css = f"""
        .photo {{ position:absolute; inset:0; background: url("{data_uri(photo)}") center / cover no-repeat; }}
        .photo::after {{ content:''; position:absolute; inset:0;
          background: linear-gradient(90deg, rgba(21,37,86,.96) 0%, rgba(21,37,86,.86) 45%, rgba(21,37,86,.45) 100%),
                      linear-gradient(0deg, rgba(12,26,58,.7) 0%, rgba(12,26,58,0) 50%); }}
        """

    return f"""<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<style>
  @font-face {{ font-family: 'Switzer'; font-weight: 500; src: url("{fonts['medium']}") format('woff2'); }}
  @font-face {{ font-family: 'Switzer'; font-weight: 600; src: url("{fonts['semibold']}") format('woff2'); }}
  @font-face {{ font-family: 'Switzer'; font-weight: 700; src: url("{fonts['bold']}") format('woff2'); }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  html, body {{ width: 1200px; height: 630px; overflow: hidden; }}
  body {{ font-family: 'Switzer', -apple-system, sans-serif; background: #152556; color: #fff; position: relative; }}
  .glow {{ position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 55% 70% at 12% 18%, rgba(32,100,240,.55), transparent 60%),
      radial-gradient(ellipse 45% 60% at 92% 88%, rgba(24,77,217,.45), transparent 60%); }}
  .ring {{ position: absolute; border-radius: 50%; border: 90px solid rgba(92,167,254,.10); }}
  .ring-1 {{ width: 760px; height: 760px; right: -300px; top: -260px; }}
  .ring-2 {{ width: 760px; height: 760px; right: -300px; top: -260px; border-width: 2px; transform: scale(1.18); border-color: rgba(255,255,255,.10); }}
  {photo_css}
  .card {{ position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; }}
  .top {{ display: flex; align-items: center; justify-content: space-between; }}
  .brand {{ display: flex; align-items: center; gap: 18px; }}
  .brand svg {{ width: 62px; height: auto; }}
  .brand svg path {{ fill: #fff; }}
  .brand-text {{ display: flex; flex-direction: column; line-height: 1.15; }}
  .brand-name {{ font-weight: 700; font-size: 26px; letter-spacing: -0.01em; }}
  .brand-sub {{ font-weight: 500; font-size: 17px; color: rgba(255,255,255,.62); }}
  .pill {{ font-weight: 600; font-size: 16px; letter-spacing: .12em; text-transform: uppercase;
    padding: 12px 22px; border-radius: 999px; border: 1.5px solid rgba(255,255,255,.35); color: #fff; background: rgba(255,255,255,.08); }}
  .title {{ font-weight: 700; font-size: {title_size}px; line-height: 1.08; letter-spacing: -0.025em; max-width: 1000px; text-wrap: balance; }}
  .bottom {{ display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; }}
  .facts {{ font-weight: 500; font-size: 20px; color: rgba(255,255,255,.7); display: flex; align-items: center; gap: 14px; }}
  .facts .dot {{ width: 8px; height: 8px; border-radius: 50%; background: #5CA7FE; }}
  .url {{ font-weight: 600; font-size: 20px; color: #fff; padding: 12px 20px; border-radius: 10px; background: rgba(32,100,240,.9); }}
</style></head>
<body>
  <div class="glow"></div>
  <div class="ring ring-1"></div>
  <div class="ring ring-2"></div>
  {'<div class="photo"></div>' if photo else ''}
  <div class="card">
    <div class="top">
      <div class="brand">
        {logo}
        <div class="brand-text"><span class="brand-name">Boost</span><span class="brand-sub">Le blog du Club</span></div>
      </div>
      <span class="pill">{html.escape(article['category'])}</span>
    </div>
    <h1 class="title">{html.escape(title)}</h1>
    <div class="bottom">
      <div class="facts"><span>{html.escape(article['author'])}</span><span class="dot"></span><span>{html.escape(facts)}</span></div>
      <span class="url">joinboost.fr/blog</span>
    </div>
  </div>
</body></html>"""


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('slug', help="slug de l'article (voir src/lib/blog/articles.js)")
    parser.add_argument('--photo', help="photo à utiliser en fond (sinon la cover de l'article si elle existe dans public/, sinon le dégradé de marque)")
    parser.add_argument('--out', help='chemin de sortie (défaut : public/blog/<slug>/og.jpg)')
    args = parser.parse_args()

    article = load_article(args.slug)

    photo = None
    if args.photo:
        photo = pathlib.Path(args.photo)
    elif article['cover']:
        candidate = ROOT / 'public' / article['cover'].lstrip('/')
        if candidate.exists():
            photo = candidate
    if photo and not photo.exists():
        sys.exit(f'Photo introuvable : {photo}')

    out = pathlib.Path(args.out) if args.out else ROOT / 'public' / 'blog' / article['slug'] / 'og.jpg'
    out.parent.mkdir(parents=True, exist_ok=True)

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit('Playwright manquant : python3 -m pip install playwright && python3 -m playwright install chromium')

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1200, 'height': 630}, device_scale_factor=1)
        page.set_content(build_html(article, photo))
        page.evaluate('document.fonts.ready')
        page.wait_for_timeout(200)
        page.screenshot(path=str(out), type='jpeg', quality=90)
        browser.close()

    print(f'OK → {out.relative_to(ROOT)}  ({out.stat().st_size // 1024} Ko)')


if __name__ == '__main__':
    main()
