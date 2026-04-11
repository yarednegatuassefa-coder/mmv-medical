# MMV Medical V3 — Complete Guide — Setup, Deployment & QA

---

## 1. LOCAL SETUP

### Prerequisites
- Node.js 20+
- A Supabase project (free tier works)
- An Anthropic API key (console.anthropic.com)

### Step 1 — Install dependencies
```bash
cd mmv-v3
npm install
```

### Step 2 — Create environment file
```bash
cp .env.example .env.local
```
Fill in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=sk-ant-your-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WA_NUMBER=905527827698
```

### Step 3 — Run database migrations
Go to your Supabase project → SQL Editor.
Run in order:
1. Paste contents of `supabase/migrations/001_initial.sql` → Run
2. Paste contents of `supabase/migrations/002_seed.sql` → Run (after creating your first user)

### Step 4 — Create your admin user
Go to Supabase Dashboard → Authentication → Users → Invite User.
Use your email + a strong password.

Then run this in SQL Editor (replace the email):
```sql
update public.profiles
set role = 'admin', full_name = 'Jared MMV'
where id = (select id from auth.users where email = 'your@email.com');
```

### Step 5 — Start dev server
```bash
npm run dev
```
Open http://localhost:3000

### Step 6 — Verify health
```
GET http://localhost:3000/api/health
```
All checks should return "ok" or "configured".

---

## 2. VERCEL DEPLOYMENT

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "MMV Medical V3 initial"
git remote add origin https://github.com/YOUR_USERNAME/mmv-medical
git push -u origin main
```

### Step 2 — Import to Vercel
1. Go to vercel.com → New Project
2. Import your GitHub repository
3. Framework: Next.js (auto-detected)
4. Root directory: `mmv-v3` (if nested) or leave as `/`

### Step 3 — Set environment variables
In Vercel project settings → Environment Variables, add ALL variables from `.env.example`:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ANTHROPIC_API_KEY
NEXT_PUBLIC_SITE_URL          → https://mmvmedical.health
NEXT_PUBLIC_WA_NUMBER         → 905527827698
```
Set all to: Production + Preview + Development

### Step 4 — Deploy
Click Deploy. First build takes ~2 minutes.

### Step 5 — Add custom domain
Vercel Dashboard → Domains → Add `mmvmedical.health`
Follow DNS instructions (add A record and CNAME in Namecheap).
SSL is automatic.

### Step 6 — Verify production
```
GET https://mmvmedical.health/api/health
```
All checks should pass.

### Netlify alternative
If using Netlify instead:
- Build command: `npm run build`
- Publish directory: `.next`
- Install Netlify Next.js plugin: `@netlify/plugin-nextjs`
- Add all env vars in Netlify → Site Settings → Environment Variables
- Note: Server Actions work on Netlify with the plugin installed

---

## 3. SUPABASE BACKUP & RESTORE

### Automated backups
Supabase Pro plan includes daily automated backups with 7-day retention.
Free plan: export manually via Dashboard → Settings → Database → Backups.

### Manual export
```bash
# Install Supabase CLI
npm install -g supabase

# Export data
supabase db dump --db-url "postgresql://postgres:[password]@[host]:5432/postgres" > backup.sql
```

### Restore
```bash
psql "postgresql://postgres:[password]@[host]:5432/postgres" < backup.sql
```

---

## 4. INCIDENT CHECKLIST — FAILED LEAD CAPTURE

If a patient submits the form but no lead appears in CRM:

1. Check `/api/health` — is Supabase returning "ok"?
2. Check Vercel logs → Functions → `capturePublicLead` action for errors
3. Check Supabase → Table Editor → `leads` — was the row created?
4. Check for deduplication trigger — same email/WhatsApp submitted within 24h returns silent success
5. Check honeypot — if `website` field was filled, submission is silently dropped
6. If all else fails: patient can reach you directly at wa.me/905527827698 (floating button is always visible)

---

## 5. QA TEST PLAN

### A — Public Website

| Test | Expected | Pass? |
|------|----------|-------|
| Homepage loads at `/` | Hero, stats, steps, form visible | |
| Nav links work | All 4 links navigate correctly | |
| Lead form: submit with valid data | Success state shown + WhatsApp link opens | |
| Lead form: submit missing required field | Inline error shown, no submission | |
| Lead form: honeypot field filled | Silently accepted (no error to user), no DB write | |
| Lead form: duplicate email within 24h | Silent success shown, no second DB row | |
| Calculator page `/calculator` | Country/treatment selectors work, saving updates live | |
| Treatments page `/treatments` | All 6 treatments render with correct prices | |
| `/robots.txt` | Returns correct file | |
| `/sitemap.xml` | Returns valid XML with all 5 public URLs | |
| `/api/health` | Returns `{"status":"healthy"}` | |
| Mobile nav toggle | Hamburger opens/closes mobile menu | |
| WhatsApp float button | Opens wa.me/905527827698 in new tab | |

### B — Authentication

| Test | Expected | Pass? |
|------|----------|-------|
| `/login` with valid credentials | Redirects to `/app/dashboard` | |
| `/login` with wrong password | Error message shown, no redirect | |
| Visit `/app/dashboard` while logged out | Redirects to `/login` | |
| Sign out from sidebar | Redirects to `/login`, session cleared | |
| Refresh after login | Stays logged in (session persisted) | |

### C — CRM

| Test | Expected | Pass? |
|------|----------|-------|
| Dashboard KPIs match lead count | Numbers accurate | |
| Pipeline page loads all 7 columns | All stages visible | |
| Drag card from New → Contacted | Card moves, stage updates in DB, activity logged | |
| Click lead card → detail page | Lead detail loads with all fields | |
| Change stage via dropdown on detail page | Updates immediately, activity logged | |
| Add note on detail page | Note appears in notes list | |
| Update estimated value + follow-up date | Saves to DB | |
| Leads table: search by name | Filters correctly | |
| Leads table: filter by stage | Only matching stage shown | |
| CSV export | Downloads file with all visible leads | |
| Analytics page | All 5 charts render with data | |

### D — Knowledge Base

| Test | Expected | Pass? |
|------|----------|-------|
| Add source (save only) | Appears in source list as "Pending" | |
| Add source + compile | Appears as "Compiled", article created in wiki | |
| Wiki articles page: click article | Full article renders with summary + key facts | |
| Ask page: submit question with articles | Answer returned with [N] citations | |
| Ask page: submit question with no articles | Clear error message shown | |
| Health check: run with 3+ articles | Returns gaps, strengths, opportunities, next_sources | |
| Health check: run with no articles | Clear error message shown | |
| Settings page: save profile name | Name updates in DB | |
| Settings page: env var display | Shows configured/missing status correctly | |

### E — Security

| Test | Expected | Pass? |
|------|----------|-------|
| Direct GET `/app/dashboard` while logged out | 302 → `/login` | |
| ANTHROPIC_API_KEY visible in browser network tab | Not present anywhere client-side | |
| SUPABASE_SERVICE_ROLE_KEY in client bundle | Not present | |
| Lead insert via Supabase anon key directly | Blocked by RLS (no created_by = null bypass) | |
| X-Frame-Options header | `DENY` present on all responses | |

---

## 6. GO-LIVE CHECKLIST

- [ ] All env vars set in Vercel Production
- [ ] `/api/health` returns 200 with all checks passing
- [ ] Lead form submission tested end-to-end on production URL
- [ ] WhatsApp link opens to correct number (+905527827698)
- [ ] Admin user created and profile role = 'admin' confirmed in DB
- [ ] Seed data removed from production (run: `delete from leads where source = 'website' and email like '%@gmail.com%'` after seeding only)
- [ ] Domain `mmvmedical.health` resolving correctly with SSL
- [ ] Google Search Console: site submitted for indexing
- [ ] Supabase backups enabled (upgrade to Pro or schedule manual exports)
- [ ] Verify Anthropic API key has sufficient credits

---

## 7. POST-LAUNCH 30-DAY OPTIMISATION PLAN

**Week 1 — Baseline**
- Monitor `/api/health` daily
- Check Vercel function logs for any form submission errors
- Confirm first real lead captured correctly in CRM
- Add first 5 knowledge base sources (competitor clinics, UK price data, patient forum reviews)

**Week 2 — Lead Quality**
- Review lead form conversion rate in Vercel Analytics
- A/B test CTA button copy if < 5% of visitors submit form
- Add country-specific landing pages if one market dominates
- Run first KB health check and act on top gap

**Week 3 — Pipeline Hygiene**
- Audit all demo/test leads and delete them
- Set follow-up dates on all real leads
- Review conversion funnel — identify biggest drop-off stage
- Add 10 more KB sources based on health check recommendations

**Week 4 — Revenue Review**
- Count leads generated via MMV website (separate from Dr. Mat)
- Calculate estimated pipeline value from owned leads
- Identify 2–3 clinics to approach for intelligence report subscriptions
- Prepare first demo intelligence report using KB export

**Ongoing metrics to watch**
- Lead form submission rate (target: > 3% of visitors)
- Lead → Contacted conversion (target: > 80% within 24h)
- Contacted → Plan Sent (target: > 60%)
- Plan Sent → Deposit (target: > 25%)
- KB articles compiled (target: 30+ by end of month 1)
