# Writing an article — Astons Law Chambers

A short guide to writing and publishing an Insights article. You do not need to
know any code, HTML, or Markdown. You write in a normal editor and the website
takes care of the formatting, headings, and layout.

---

## Writing a new article

1. Go to **app.pagescms.org** and sign in with GitHub.
2. Open the **astons-law-chambers** repository.
3. At the top, make sure the branch selector is set to **`content-staging`** (not
   `main`). This is the draft area — nothing here is live yet.
4. Open **Insights (articles)** and click **Add an entry**.
5. Fill in the fields:
   - **Headline** — the title of the article.
   - **Web address** — lowercase words joined by hyphens, e.g.
     `bail-conditions-explained`. This becomes the page address.
   - **Summary** — one or two plain sentences. This shows on the Insights list and
     in Google.
   - **Author** — leave as Ghulam Humayun.
   - **Date published** — the date you want shown.
   - **Lead image (optional)** — you can add one or leave it blank. **Do not upload
     a photograph of a person.** Landscape pictures look best.
   - **Article** — write the body here. Use the toolbar for bold, headings, lists,
     links, and quotes. You can paste from Word or Google Docs.
   - **Keep as draft** — leave this **ticked** while you write.
6. Click **Save**. Your work is stored safely. It is still not live.

## You do not need to worry about formatting

Write naturally. Use the headings and lists in the toolbar however you like. The
website automatically:

- keeps a single main heading (your Headline) and tidies the rest into the right
  order;
- styles everything to match the site;
- sizes any images correctly so the page never jumps around.

If you paste from a document, anything unusual is cleaned up automatically.

## Seeing how it looks before it goes live

After you save, the article appears on the **preview website** (a private link that
is not visible to the public or to Google). Ask for the preview link, or open the
`content-staging` preview in Vercel, to see exactly how the article will look.

## Publishing

An article only goes live after it has been reviewed. When you and the reviewer are
happy with it:

1. Untick **Keep as draft** and **Save**.
2. The reviewer merges `content-staging` into the live site.
3. Within a minute or two the article is live at
   `astonslaw.com/insights/your-web-address`.

If you ever need to take an article down, tick **Keep as draft** again and save, and
ask for it to be merged.

## A note on what you write

Articles carry your name and the chambers' name, so everything published needs to be
accurate and compliant with Bar Standards Board rules. Keep to general information,
not advice on a specific person's case. The reviewer checks this before anything goes
live.
