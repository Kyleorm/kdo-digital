# KDO Digital: redesign page plan

Written 29 October 2026, following `../WEBSITE-STANDARD.md`. Notes in *(Kyle: …)* need your facts or your OK.

**Built as a preview on 29 October 2026**, on the branch `redesign-story`: **https://kdo-redesign-preview.vercel.app** (hidden from Google). The live site (www.kdodigital.co.uk, branch `master`) hasn't changed. To update the preview after a change, run `node deploy-preview.mjs` from this folder. It never touches the live site.

### Changes made while building

- **Hero picture:** an example "free website check" card (a sketch of a typical website with 3 numbered problems, and the 3 fixes), so people see what they get. Your photo goes in "About me".
- **"Like this page" lines** under 4 of the 5 rules: the page proves its own rules.
- **FAQ:** "Will I be able to update it myself?" became "What if I need changes later?". Small changes come with the £59 care plan, so the old "yes" promised more than the site does.
- **Booking answer** says "I'll point you to a good ready-made one", and **monthly help** shows no price, until you confirm both.
- **On phones, the form comes straight after its heading**, so the button lands on it (an iPhone test caught this).
- **The yellow notes** are questions for you; **yellow highlights** are missing words. "Hide Kyle's notes" (bottom left on a computer, in the footer on a phone) shows the clean look. Adding `?notes=off` to the link does the same.
- **Faster and safer:** the 3D background and animation libraries are gone. Fonts are served from the site itself (no Google), and `vercel.json` adds strict security headers. New link-preview picture (`og.png`) with the headline.
- **The live site publishes internal files** today (for example DESIGN.md, index-old.html and the tests). `.vercelignore` stops that: checked on 29 October 2026 on Vercel's own copy of this branch, where those files return "not found" and the page still loads.

### Before it goes live

1. Fill the gaps and answer the notes (list at the end).
2. Remove the notes: the `.kyle-note` boxes, the `mark.gap` highlights, both "Hide Kyle's notes" buttons, and `setupNotes` in `assets/js/kdo.js`.
3. Run the tests (`npx playwright test`), then merge `redesign-story` into `master`. Vercel publishes `master` to www.kdodigital.co.uk.
4. Check the live site: security headers, no internal files served, and the form delivers to your inbox.

---

## The big idea

**Now:** "Full Service Digital. Built for Growth." It could be any agency, anywhere, and it doesn't say who you are.

**New:** you know what makes people buy, because you've spent 5+ years in e-commerce. Now you build websites that do the same for Isle of Man businesses.

How the words should sound:
- **"I", never "we".** It's just you, and that's a selling point.
- **Plain words.** "Converts" is a web word. Business owners say "brings in work". Same idea.
- **Opinions, not adjectives.** Personality comes from saying what you believe (section 3), not from words like "premium" or "world-class".

---

## What changes

**Cut**
- Booking System, Mobile Apps, UI/UX Design, Digital Marketing and Brand Identity as separate services.
- "Full Service Digital", "The same business. A different league." and "Big-agency work". Any agency could say them.
- "Trusted by businesses from here to London". Only keep it if it's true and you can name them.
- The "Sound familiar?" list. Its best points live on in the 5 rules (section 3).

**Keep**
- Your logo and colours, the contact form, most of the FAQ answers, and "you deal with me directly".

**Add**
- Your story, your photo, your prices, the 5 rules, and a free website check as the main button.

---

## What we're making

- A new home page, plus the privacy and terms pages.
- Built on a new branch. The live site (www.kdodigital.co.uk) stays as it is until you approve the new one.
- "My work" comes later, once there are 2 or 3 real client sites to show. The Phoenix, Fynoderee and Laser Mayhem mock-ups stay off it unless they say yes.

---

## The page plan

| # | Section | ATIDFA step | Its one job | Light or dark |
|---|---|---|---|---|
| 1 | Hero | Attention | In 5 seconds: websites that bring in customers, from someone with 5+ years in e-commerce | Dark |
| 2 | How it works | Transformation | Show it's 3 easy steps, ending with customers getting in touch | Light |
| 3 | What selling online taught me | Interest | Prove you know what makes people buy, with the 5 rules every site follows | Dark |
| 4 | What I can do for you | Interest | Show what you offer and what it costs | Light |
| 5 | Meet Kyle | Desire | Tell your story and show real proof | Dark |
| 6 | Questions | FAQ | Answer the worries that stop people getting in touch | Light |
| 7 | Free website check | Action | Say the offer again, with the form | Blue |

**The main button everywhere is "Get a free website check".** It goes to the form in section 7. Your email sits beside it as the backup. On phones, a bar with the button sits at the bottom once the hero has scrolled away.

*(Kyle: happy to do free checks? If not, the button becomes "Tell me about your business". Add a WhatsApp number as a second backup?)*

---

## Section by section

### 1. Hero (Attention)
- **Headline, pick one:**
  1. "Websites that win you customers, not just compliments." *(my pick: says what it is, with a bit of cheek)*
  2. "I spent 5+ years learning what makes people buy online. Now I build websites that do it for you."
  3. "Pretty doesn't pay the bills. I build websites that bring in work."
- **Line under it:** "I'm Kyle. I've spent 5+ years in e-commerce, where a website is judged on one thing: sales. Now I build websites for Isle of Man businesses the same way."
- **Quick facts:** 5+ years in e-commerce · Websites from £2,000 · Live in 2 to 4 weeks · You deal with me, start to finish
- **Button:** "Get a free website check", with kyle@kdodigital.co.uk beside it.
- **Picture:** a real photo of you instead of the AI images. *(Kyle: is IMG_4195 in Photo assets, the blue fleece one, you? It would work well.)*

### 2. How it works (Transformation)
Drawn like the **progress bar at the top of an online checkout** (1, 2, 3, with a tick at the end), as a nod to your e-commerce years. Not three circles.
1. **Send me your website.** No website yet? Tell me about your business instead. I'll reply with the 3 things I'd fix first, free. *(Kyle: how fast can you reply? 2 working days?)*
2. **I design and build it.** You see the design before I build anything. I help with the words, set up your Google listing and make it fast on phones. You pay half to start and half when you're happy, before it goes live.
3. **Customers get in touch.** Your site goes live and gets to work: people find you, trust you and call.

### 3. What selling online taught me (Interest)
**Line under the heading:** "In e-commerce, every change shows up in the sales. You learn fast what makes people buy. Every website I build follows these rules." *(Kyle: does this match your job? Swap in your own examples.)*
1. **You've got 5 seconds.** People decide almost straight away whether to stay. So the top of your page says what you do, where, and why you, in plain words.
2. **Hidden prices lose customers.** People who can't find a price go and look somewhere else. A "from" price keeps them with you.
3. **Reviews sell better than you can.** People trust other customers more than any slogan. So your star rating goes right at the top, and real reviews follow.
4. **Most of your customers are on a phone.** So I build for phones first, and your call button stays in reach.
5. **One page, one job.** Every section points to the same next step, so nobody has to hunt for how to get in touch.

These are the rules in WEBSITE-STANDARD.md, so it's honestly how you work.

Optional, desktop only: small handwritten-style notes in the margins of your own page that point at a part and say why it's there ("this button follows you down the page on phones"). Your site proves the rules. Phones stay clean.

### 4. What I can do for you (Interest)
Benefit first, then the price.
- **A website that brings in work.** Designed around your business and built for phones, with your reviews and Google listing set up. **From £2,000.** Custom artwork and interactive features from £3,000.
- **Get found on Google.** I set up or fix your free Google Business Profile, so you show up on the map. Included with every website.
- **Win more of the work you already get.** Monthly help that runs in the background: a fast reply to every enquiry, a nudge when a quote goes quiet, and a text asking happy customers for a review. *(Kyle: show "from £150 a month"? That's the Starter price in the Phoenix proposal.)*
- **Looking after it.** Hosting, security and backups, from £39 a month.
- **Got an app idea?** One small line: "I build the odd app when it's the right fit. Ask me."

**What I don't do:** custom booking systems · jargon · going quiet for weeks.

### 5. Meet Kyle (Desire)
**Heading:** "Hi, I'm Kyle. KDO is just my initials."

**Story (draft):**
> For 5+ years I've worked in e-commerce *(Kyle: where, and what you do. You don't have to name the company: "running the online shop for a UK clothing brand" works)*. In e-commerce there's nowhere to hide. Change a photo, a headline or a button, and you see it in the sales. You learn fast what makes people buy, and what makes them leave.
>
> *(Kyle: the moment KDO started, in your words. For example: "Then I looked at the websites of businesses I use here on the island. Great businesses, great reviews, and websites that made them hard to find.")*
>
> So I started KDO Digital to build the kind of website I'd want if it were my business: one with a job to do.
>
> You deal with me from the first chat to launch day, and after. No account managers. No passing you around.

**Proof, real things only:**
- *(Kyle: one result from work you can share, as a number. Only if it's true and your employer wouldn't mind.)*
- **FitnessPod:** "I built FitnessPod's new website." *(Kyle: OK to name them and link to it? Ask them for a two-line review.)*
- Nobody's review gets written for them. Empty spots stay hidden until real reviews come in.

### 6. Questions (FAQ)
Money and worries first.
1. **How much does a website cost?** From £2,000 for a one-page site. You get a fixed price before I start: half to begin, half when you're happy, before it goes live.
2. **How long does it take?** Most sites are live in 2 to 4 weeks.
3. **What's the free website check?** Send me your web address. I'll look at it like a customer would and send you the 3 things I'd fix first, in plain English. No charge and no pushy follow-up.
4. **Do you use AI?** *(Kyle: your call. Suggested:)* "Yes, like any good tool. It does the heavy lifting, so you get your site sooner. The thinking, the words, the design and the checks are mine."
5. **Do you build booking systems?** "Not custom ones. If you need online booking, I'll set you up with a good ready-made tool." *(Kyle: still offering the £450 booking setup in PRICING.md? If not: "I'll point you to a good one.")*
6. **Can you build me an app?** "Sometimes. A new app takes weeks to get into the app stores, so I'll tell you honestly if a website would do the job sooner."
7. **I already have a website. Can you help?** Keep today's answer, and point to the free check.
8. **Will I be able to update it myself?** Keep today's answer.
9. **What happens to my details?** "I only use them to reply to you. They're never sold or shared." Plus a link to the privacy policy.
10. **Are you only for Isle of Man businesses?** Keep today's answer.

### 7. Free website check (Action)
- **Headline:** "Find out what your website's missing."
- **Line:** "Send me your web address. I'll reply with the 3 things I'd fix first, in plain English. Free, and no pressure."
- **Form:** name, email, your website (optional), anything else (optional). Button: "Get my free website check".
- Same form service as now (Web3Forms), with the spam trap kept.

---

## What I need from Kyle

1. **Your e-commerce story:** where (or what kind of business), what you do, when you started, and one win you're proud of.
2. **How KDO started:** the real moment you thought "I could do this better".
3. **A photo of you.**
4. **FitnessPod:** OK to name them and ask for a review?
5. **The free check:** happy to offer it? How fast can you reply?
6. **Prices on the site:** "from £2,000" (recommended), and the monthly plans?
7. **The AI answer:** keep, change or drop?
8. **WhatsApp:** add your number?
9. **Booking setup (£450):** still offering it?
