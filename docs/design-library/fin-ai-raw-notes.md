# fin.ai: raw page notes (field notes behind fin-ai.md)
## Global
- Next.js + Tailwind v4 + Sanity CMS. Fonts: Serrif (display serif, w300), Saans (sans, 400/500), SaansMono (labels). Also SerrifCondensed, MediumLL, IvoryLL, AeonikFono, ScrewtopLight (campaign pages).
- body bg page: off-white #faf9f6 (header), main white #fff; content cards chalk #f1eee9; canvas #e7e3db; cream #f4f3ec
- text: black #000 / off-black #111; secondary black 80% ; tertiary 60%
- accent: fin orange #ff5600 (highlight on quotes: bg orange text black, inset shadow 0 -1em trick for marker-style underline), helpdesk blue #0007cb (corner squares 4px, primary btn hover), operator purple #441572, ecom green #2f6a5e + lime #e2f947, sales #055895
- Buttons: h40 (2.5rem), px .875rem, radius 4px, Saans 14-16px w400. Primary bg #111 text white; hover bg helpdesk blue. Secondary transparent 1px #111 border.
- Type scale: H1 desktop 100px/0.9-0.95 ls -4px Serrif w300; H2 80px; H3 54px; H4 40px; H5 24; H6 20. Body XL 25.6px. Callout 28px. Section numbered title Serrif 32px/1.2. Body 18px/1.4 Saans black 80%. Small 14px black 60%. Label: SaansMono 11-12px uppercase ls .6px black 60%.
- Grid 12 cols gap 24px; page padding 16px; container max 1920.
## Header
- Announcement bar 34px: full-bleed iridescent/marble image bg, centered 14px "Introducing Fin 4. ... Learn more" underlined link, × close at right.
- Nav 60-74px off-white bg fixed; logo left (Fin mark + "from salesforce" sub-lockup); links Saans 16 w400 with chevrons; right: Log in, Contact sales, Start free trial (text), View demo (black btn), divider, Intercom → (outline btn).
## Homepage
- Hero: left-aligned 100px Serrif 3 lines, two buttons, big 3D render (gold ribbon/loop) bottom right, lots of empty space. Floating "Ask Fin" pill input bottom right (rounded full, shadow, rotating placeholder questions, ↑ circle button).
- "22 reasons to hire Fin" — H2 56px. Then numbered list 01..22: left col big serif number (32px "01"), title Serrif 32px 2 lines max ~470px, then 2-4 short paragraphs 18px with underlined inline links. Right col (narrow ~200px): side-note card: hairline top border, mono label "[ 01.A ]", 14px caption, video thumbnail with frosted "▶ Play" pill.
- Sticky bottom-left chapter selector: white box 260x48, "05  Weekly releases ▾" — updates as you scroll; dropdown jumps.
- Media frames: grey/chalk bg panels with 4px squares at each corner (corner marks). No radius on frames.
- Section tint bands: full-width rounded? colored gradient band (warm yellow-cream watercolour texture) behind a numbered section (03 AI models), peach band (08 channels). Bands inset 16px from viewport edges.
- Stat cards (Apex): 3 cards translucent cream, hairline border, corner marks; title Saans 24 with orange prefix "Apex 2.0:"; giant number Saans 80px orange "+8.6%"; caption 13px "Confirmed resolutions vs Apex 1.0".
- Logo wall: 6 cols x 3 rows greyscale logos, no boxes, generous row gap.
- Role tabs: 4 columns, small orange square bullet, title Saans 20, desc 16 grey; active tab chalk bg.
- Quote block: chalk gradient panel, corner marks, quote Saans 24 with orange highlighted phrase, name 14 + role grey, B&W portrait right.
- Compliance grid: 5 square chalk tiles with line-art certification marks, corner marks, mono label below "ISO 42001".
- Team grid: B&W portraits, mono uppercase name, role grey.
- Event: big photo + vertical thumbnail strip on right.
- Closing CTA: centered giant serif "Perfect customer experiences / made possible with Fin" with 3D object between lines.
- Footer: off-white, 6 columns, mono 11px uppercase column headers, 14px links, ↗ for external, bottom row Terms Privacy Security + privacy choices toggle. No logo, no big blocks. Padding 72 top 36 bottom.
## Nav mega-menu (hover Product)
- White panel r~6px, hairline border, sits under nav aligned to item. 2 columns split by vertical hairline. Item: title Saans 16 black + subtitle 14 grey, → arrow right. Sub-items indented with 1px left rule, title 14 + sub 13 grey; inline underlined links list ("Train, Test, Deploy, Analyze"). Bottom full-width row separated by hairline: "Fin 4 is here / A major step..." with →.
- Nav item hover: chalk bg pill r6px.
## /operator  (product page template, "Saans" variant)
- Page bg off-white #faf9f6. No announcement bar shown after first visit.
- Hero centered: H1 Saans w500 139px/1 ls -5.5px two-tone "Meet"(black 40%) "Operator"(black). Sub: Serrif 16/22.4 w300 70% black, max-w 576 centered. Buttons centered. Then full-bleed (16px inset) ORANGE panel 617h with product UI screenshot + 3D object breaking out above the panel edge; frosted "▶ Play" pill centred.
- Logo strip: mono 12px uppercase 50% label "JOIN THE COMPANIES TRANSFORMING..." centred, 6x2 grey logos.
- Statement H2 Saans 80 w500 two-tone ("Operator" grey + rest black), left aligned.
- Mono eyebrow with 6px orange square bullet: "■ WATCH THE OPERATOR LAUNCH KEYNOTE"
- 2-col: video left / Serrif body paragraphs right.
- Banner card: grey panel w/ 3D glass object right, H2 Saans 40 + body.
- Feature sections = WHITE panels (inset 16px, pad 80px 16px, r0) on off-white page; separated by ~80px off-white gaps. Each: two-tone H2 80px (lead grey, rest black, rest may be indented), mono eyebrow w/ orange square, Serrif body 16 max ~520, big product screenshot on purple (#441572) panel with blob art, then 4-col feature row: orange square bullet, H3 Saans 20 w500, body 14 grey.
- Quote: on off-white (no panel), purple 6px corner squares, company logo top-left, quote Saans 28 w/ orange highlighted second half, name/role, B&W portrait right.
- Knowledge section: alternating text-list right, image left; list items with orange square bullets.
- CTA banner mid-page: orange panel, H2 Saans 54 black, buttons (black primary + outline secondary in dark), 3D object overflows right edge.
- "Read more" 2 cards: image top (greyscale 3D render), white body, H3 20 + 14 grey + underlined "Learn more". r0.
- 3-col cards w/ purple screenshot panels + H3 + body.
- Final CTA: centred H2 Saans 80 "Transform your customer operations with Operator", small square art tile, buttons; whole block framed by grid of tiny grey squares (crosshair marks at corners/thirds) on off-white.
## /channels  ("editorial dark" template — IvoryLL serif + MediumLL sans + Saans mono labels)
- Page bg deep navy #080f1e; nav goes dark (white text, white "View demo" btn, outline Intercom).
- Hero dark: faint grid lines bg (thin 1px lines forming a blueprint grid); H1 IvoryLL 80px w300 two-tone ("One AI Agent." white 60%, "For every channel." white); lead 18 white + rest white 60%; buttons r6px (white primary, outline secondary); stacked 3D-perspective product screenshots on right; row of channel chips below: icon + mono 11px uppercase (VOICE · EMAIL · MESSENGER · WHATSAPP · SOCIAL · SLACK · API).
- Sticky LEFT INDEX (176px wide, top 32px) on dark: "01 VOICE / 02 EMAIL / ..." mono 11-12 uppercase, hairline separators between rows, active row white + orange underline segment; inactive 60% white.
- Content = stack of cream "paper" cards #f6f6f1, w~1009, pad 32 48 48, r0, ~24-32px dark gaps between. Each card has L-shaped corner brackets (1px lines) inset at 4 corners.
- Card anatomy: mono eyebrow w/ orange square "■ VOICE" + hairline rule under; H2 IvoryLL 72px w300 (alternates left-aligned / right-aligned, second line indented); small mono number "01" inline before paragraph (16px MediumLL); "Learn more" underlined link; then 2-col: FIG frame left (hairline border, dotted grid bg, mono tab label "FIG 1.A" in top-left box) + right column of 3 feature items (title 18 MediumLL + body 14 grey).
- Quote in card: left framed box with customer logo centred; right quote MediumLL 32px with orange highlight on first sentence; name 12 + mono uppercase role.
- FAQ card is DARK (#080f1e) with white IvoryLL 54 "FAQs" and accordion rows: question 18 MediumLL white-80, chevron right, dashed/hairline separators.
- Final CTA dark: two-tone IvoryLL 72 ("Get started with the" 60% / "#1 AI Agent today" white, offset right), white + outline buttons, faint circuit-line background.
- Footer inherits dark theme.
## /pricing  (white page, Saans w400)
- Hero centred: H1 Saans 54 two-tone reversed ("AI customer service for just" grey 50% / "$0.99 per outcome" black). Below: inline row of 3 bullets w/ orange 6px squares, 13px ("Only pay when Fin delivers · Set limits... · 90-day money-back guarantee [i]").
- 2 plan cards side by side (~430w): white, 1px border #d3cec6 (clay), r0-2px; featured card has 1px ORANGE border + mono "MOST POPULAR" tag sitting on top edge (orange bg, black mono 10px). Content: logo lockup (icons + "+"), H3 Saans 24, desc 14 grey, label 14 then big price Saans 24 "$0.99" + "per outcome" 13 + (Learn more) underlined; buttons black primary + text link "Contact sales" underlined.
- Full-width strip card beneath (chalk bg): title 20 + sub 14 grey, "Apply now" underlined link right.
- Section "Only pay for outcomes. / Not conversations. Not answers." centred H2 40 two-tone (black / grey). 2-col: list of 3 points (orange square bullet, H3 20, body 14 grey) left; image right (3D render with UI overlay). "What counts as an outcome?" underlined link.
- Centred one-liner note: bold lead + grey text + underlined link.
- Calculator card (white, clay border r2).
- Add-ons on off-white band: centred H2 40 + sub 14; 2 bordered white cards with inline tag "■ Includes Operator", "From $100 per workspace/mo" price line, "Learn more".
- Testimonial TABS: row of 3 mono uppercase tabs in a bordered strip (active has blue top/bottom bar) + quote panel below with blue (#0007cb) corner squares, highlight in BLUE bg w/ white text on this page.
- FAQ: 2-col: left giant "FAQs" Saans 54; right accordion rows 18px, hairline (clay) separators, small ▾ caret.
- Live Intercom/Fin chat widget bottom-right (dark bubble + suggestion chips).
## /customer-agent (announcement/essay template)
- Hero white, framed by 4 ORANGE 6px corner squares at viewport corners of hero block; H1 Saans 100 centred; logo row 5.
- Essay block on off-white: centred video (grey, frosted Play pill), then large Serrif 22-24px reading text with bold key phrases (black vs 70% grey) and superscript mono refs [01]; right margin sidenotes "[ 01 ]" mono + quote 14px — like footnotes in margin (Tufte style).
- Sections alternate white / off-white full-bleed (no inset). Pattern: mono eyebrow "■ CUSTOMER AGENT" (orange square) → H2 Saans 54 left → 1px hairline full width → 50/50 rows: full-bleed image left (3D render + product UI), right text: H3 Saans 40 two lines, mono "■ NEW" chip (chalk bg, 10px), Serrif body 16 grey, outlined "Learn more" button (1px black, r4). Rows separated by hairlines.
- FAQ on off-white (same as pricing).
- Closing H2 54 + buttons + logos.
## /service  (ROLE PAGE template — also used for sales/ecommerce/success w/ different accent)
- SPLIT HERO 50/50 full-height: LEFT off-white, centred stack: mono eyebrow "■ FIN FOR SERVICE", H1 Saans ~54-60 two-tone (black first two lines, grey last two), 3D object (orange infinity loop) under headline, Serrif body 16 centred, buttons. RIGHT: full-bleed image panel (warm 3D swirl bg) w/ floating Messenger UI & "Fin's actions" mono list.
- Logo grid 4x3 centred under mono caption "OVER 12,000 COMPANIES ARE TRANSFORMING...", framed by small grey corner squares.
- Intro statement: centred two-tone H2 54 (grey line 1 / black line 2) on faint wireframe-globe line drawing bg; square 3D tile below.
- Feature sections: white panel (inset 16px) with RUNNING HEADER row (mono 11px "FIN FOR SERVICE" left, topic "PERFORMANCE"/"CONTROL" right) like a document header. H2 Saans 80 two-tone with second line pushed right (staggered indent). Serrif body left max ~330. Big media frame (chalk bg, orange 6px corner squares) with product UI. Below: 3 TAB-CARDS in a row (orange square bullet, title 18, body 14, "Learn more" underlined) — active one chalk bg + black text, inactive grey text; auto-cycling, linked to media above.
- Quote band on off-white between panels (logo top-left, highlighted orange phrase, portrait, grey corner squares).
- Customer story tabs: bordered strip of mono tabs (GAMMA · MPB · CLAY), active tab has orange top progress line; quote card below.
- "Fit Fin into your existing stack": left vertical accordion list (active item chalk bg, orange progress line on top edge, items: orange square + title 18 + body 14 + Learn more), right sticky media (chalk bg w/ channel icon nodes + stacked UIs).
- Security: 5 square chalk tiles w/ line-art cert logos + mono captions (same as homepage).
- Closing CTA: centred two-tone H2 80 (grey / black), 3D object, buttons, framed by 3x3 crosshair grid of tiny grey squares.
- FAQ.
## /sales /ecommerce /success — same split-hero ROLE template; accent swaps: sales indigo/periwinkle 3D spring on navy panel (#055895/#a3b3ff), ecommerce lime-green 3D links on dark green (#2f6a5e/#e2f947), success steel-blue knot on dark teal. Eyebrow square takes accent colour. Sales intro: 3-line centred statement, lines 1-2 grey, line 3 black ("Fin changes that."), on faint wireframe-globe bg, square 3D tile, then 2 Serrif paragraphs in columns.
## /fin4 (launch page)
- Silver/grey vertical gradient hero; giant debossed/embossed white serif wordmark "Fin4" filling width; iridescent chrome 3D object overlapping; bottom-left: H1 Saans 20 "Introducing Fin 4." black + grey continuation; buttons. Content reveals with blur/fade-in on scroll. Sections: H2 54, screenshots in rounded (r~16) frosted panels, feature items with small blue square bullets.
## /updates (changelog) — dark navy
- H1 IvoryLL ~48 white "Fin product updates" + sub 16 grey; hairline.
- LEFT sticky "ruler" index: month label mono orange "SEP 2026", tick-mark dashes (like a ruler) per entry, entry titles mono 10px uppercase, active white + orange marker, others dim.
- Entries: 3 cols (title Saans 20 white | body 16 grey + underlined "Read more" | thumbnail). Hairline separators. Non-active entries dimmed (opacity ~40%) — focus follows scroll.
## /capabilities — dark editorial (like channels but DARK cards)
- Hero dark w/ blueprint frame lines (thin vertical/horizontal rules framing content, like a technical drawing). H1 IvoryLL ~64 white left. Body 16 white + grey continuation. Buttons white/outline r6. Orange square "stamp" badge (Fin mark + POWERED BY FIN APEX 1.0) with mono caption "THE HIGHEST-PERFORMING, FASTEST MODEL..." + Learn more.
- Sticky left index "01 TRAIN / 02 TEST / 03 DEPLOY / 04 ANALYZE / 05 FAQS".
- Cards: dark (#0b1220-ish) with L-corner brackets; mono "■ TEST" eyebrow + hairline; 2-col: H2 IvoryLL 48 left / numbered para "02" + outline "Learn more" btn right. "FEATURED CAPABILITIES:" mono label + hairline; figure frames with dotted grid + "NEW" tab label.
## /train — dark editorial w/ cream cards (= channels template). Hero dark, H1 IvoryLL ~72 two-tone (grey "Train Fin to resolve" / white "all your queries"). Index: 01 PROCEDURES 02 CONTENT 03 GUIDANCE 04 INTEGRATIONS 05 FAQS. FIG frames with connector diagram (tiles: Zendesk/Notion/Salesforce…), feature pairs separated by hairline-topped columns. Customer quote card w/ photo left + IvoryLL quote + orange highlight.
## /testing — LIGHT, asymmetric hero (BEST minimal reference)
- Off-white. Left 60%: mono "■ TESTING" eyebrow; H1 Saans 80 two-tone (grey "Evaluate Fin's behavior" → black "before, during, and after you go live"). Right 40% top-aligned: Serrif 16 paragraph + single black "Contact sales" button. Lots of air.
- Sections: centred-ish two-tone H2 80 with second line indented right; mono eyebrow "■ EVAL-DRIVEN DELIVERY"; Serrif para max 330; huge chalk media frame with grey corner squares. White panels on off-white. 3-col feature rows (H3 20). Quote highlight colour on this page = PINK (#f5b3e0-ish) → highlight colour is per-page accent.
## /analyze — dark, light-beam photographic bg; H1 IvoryLL two-tone staggered right ("Complete observability for" grey / "every customer conversation" white right-aligned). Inline "NEW" orange chip within text.
## /voice — LIGHT, soft radial gradient bg (blue→lime→white aurora). H1 Serrif ~110 "Fin / Voice 2" stacked + lime "NEW" chip superscript. Sub 16 + grey. Single black "Contact sales". Floating pill widget right: dark rounded-full "Try it live now / Speak to Fin Voice" with lime circular phone button. Bottom-left mono badge card (POWERED BY APEX FLASH / OUR FASTEST MODEL YET / LEARN MORE →) with corner dots. ↓ arrow centred at bottom. Highlight colour lime on quotes. Running header "FIN VOICE 2 ... ACTION".
## /procedures — dark, three-line serif statement each line a sentence ("Powerful AI automation." grey / "Built for complex queries." grey / "Controlled by you." white), isometric grid of integration icon tiles + UI fragments right, blueprint lines.
## /ai-engine — dark blueprint. Hero framed by thin rules (technical drawing). H1 IvoryLL 64 white. Bold inline product name in para. Orange APEX stamp badge.
- Body: sticky left index of 8 phases (mono, 2-line items). Center: isometric line-art 3D diagram (white wireframe on dark grid) w/ orange arrows. Right: phase card (dark, hairline border): mono "■ PHASE 3", H3 Saans 24, para, mini badge "POWERED BY FIN-CX MODELS", "SPECIFICATION" mono header then numbered spec table rows "3.1  Score relevance..." with hairline separators, "Learn more" underlined.
## /cx-models (Apex) — light cream
- HERO = big rounded image card (r~16, inset 16px) w/ vivid orange/lime thermal 3D art; centred: Fin dotted-circle mark, mono overline "FIN'S CX MODEL SUITE: PURPOSE-BUILT FOR CUSTOMER SERVICE", H1 Serrif ~72 3 lines black ("Meet Fin Apex 2.0 / The best-performing model / for customer service"), buttons.
- MODEL SPEC ROWS (great for structured facts): grid row = mono index "[ 4 ]" (col 1) | H2 Serrif 40 "Fin Retrieval" (col 2-5) | right col: para 16 + mono "SPECIFICATION" header + numbered rows "4.1  Understand intent..." each w/ hairline separator, number in mono grey, text 14. Rows separated by full-width hairline. Cream bg #f4f3ec-ish.
## /api-platform — same rounded image-card hero; mono "INTRODUCING THE"; H1 Serrif 72 "Fin API Platform"; centred sub 16; single "Request access" black button.
## /trust-reliability — dark hero (aurora light) + H1 IvoryLL two-tone ("Safe AI, built on" white / "partnership" grey); sticky left index 01 PARTNERSHIP … 07 FAQS; cream cards.
- PROOF BENTO inside cream card: grid of bordered tiles (1px clay border, r0) — each: customer logo top-left, small square ↗ icon button top-right (1px border), content = either IvoryLL 32 headline + para, or quote 16, or GIANT stat Saans 64 "91%"; bottom: mono 10px uppercase caption ("FIN ANSWER RATE", "HEAD OF SUPPORT AT CLAY").
## /integrations (hub)
- Split hero (light): left mono eyebrow + H1 Saans 60 two-tone stacked 5 short lines (grey "Fin fits seamlessly" / black "into your existing stack."), Serrif para, buttons; right full-bleed gold 3D photo with white circular logo nodes on an orbit line (big "Fin" circle centre).
- Connector cards: 4-col, white, no/hairline borders; icon 20 + name Saans 18 + desc 13 grey. Below: centred mono pill button "SHOW ALL 60 CONNECTORS (+48 MORE)" (1px border, r full? r4, mono 10px).
- CTA strip card: white, orange 6px corner squares, 2-col: H2 Saans 40 left / Serrif para + 2 underlined links right ("Start building", "Apply to become a partner").
- Running header in white panels: "HELPDESK INTEGRATIONS ........ FIN INTEGRATIONS" mono 10.
## /integrations/zendesk, /helpdesk, /salesforce… — TESTING-style asymmetric hero: left mono "■ FIN FOR ZENDESK" + H1 Saans 80 two-tone (grey…black "on Zendesk"), right top Serrif para + black btn + outline btn; then full-bleed 3D gold image band with inset product UI and floating mono tag "■ FIN AI AGENT".
## /customers (index) — dark navy page; bento grid of story cards (#111a2b-ish, hairline borders): FEATURE card 2/3 width = left text (logo, IvoryLL 32 headline, grey para, mono byline "WITH SHANE MCCARTHY FROM [SOLIDCORE]") + right full-bleed photo with overlaid white stat pairs "$569k / COSTS SAVED ANNUALLY" (Saans 48 + mono 10); outline "Read more" btn top-right. Smaller cards: logo + "Read more" + text, or centred logo only, or quote.
## /customers/<story> — dark article
- Breadcrumb mono "CUSTOMER STORIES ▸ ANTHROPIC" (current in orange). Big customer wordmark. H1 IvoryLL 48. Mono byline w/ bold names. Hero image w/ huge serif overlay text.
- STAT TILES: 3 in a row, dark, 1px hairline border, pad ~16: mono label w/ square bullet "■ FIN INVOLVEMENT RATE" top, giant Saans ~64 number "96%" bottom-left. 
- METADATA ROW: 3 cols, each hairline top + mono label "REGION" + value 16 ("Global"), values may be underlined links.
- Body: cream article card (#f4f3ec) w/ mono "■ AT A GLANCE" and Saans 20 body; left sticky rail: "← See all stories" white button + "SHARE STORY" mono + 4 square outline icon buttons.
## /solutions/financial-services — dark editorial template (index: 01 BUILT FOR ACCURACY … 06 FAQS), H1 IvoryLL two-tone (grey 3 lines → white "Financial Services support"), flywheel diagram (circle w/ pill nodes DEPLOY/TRAIN/TEST), FIG 2.A dashboard frame, 4-col tab row (Analyze / Train / Test / Deploy).
## /startups — split hero LIGHT: left centred stack mono "■ EARLY STAGE STARTUP PROGRAM", H1 Saans 54 two-tone (black "Startups get 1 year of Fin free" + grey "+ 93% off Intercom"), Serrif para, single "Apply now" black btn; right full-bleed soft lilac cloud photo. Logo strip under mono caption.
## /about
- Hero: headline SPLIT AROUND a 3D object: "Fin is defining" top-left, 3D orange knot centre, "the AI era of / customer experience" bottom-right. Saans 72 black. Section framed by grey corner squares at its 4 corners + midpoints.
- Mission text: large Saans 24 paragraphs left-aligned in ~760 col (black), no heading — reads like a letter.
- Leadership grid: 3 cols; photo in chalk frame w/ corner squares (B&W), name Saans 24, mono role "SVP, PEOPLE", bio 13 grey, "Read full bio" underlined.
- OFFICES: H2 Saans 48 "Our offices"; 3x2 grid; each: orange square bullet + city Saans 18 + address 12 grey (2 lines) + "View roles" underlined. 
## /careers — centred H1 Saans 54 black 2 lines + single black btn "See 104 open roles"; then 4-col photo strip (full-bleed edge to edge, no gaps radius).
## /deployment-services — dark; H1 IvoryLL 72 two-tone (grey line 1, white 2-3); right-offset para w/ bold product name + white button; greyscale logo strip.
