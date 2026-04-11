# MMV Medical V3 — Setup, Deployment & QA

---

## LOCAL SETUP (Step by Step)

### Prerequisites
- Node.js 18.17+ — check with `node -v`
- A Supabase account (free): supabase.com
- An Anthropic API key: console.anthropic.com → API Keys

### 1 — Install dependencies
```bash
cd mmv-v3
npm install
```

### 2 — Create Supabase project
1. supabase.com → New Project
2. Name: `mmv-medical`, Region: Frankfurt (closest to EU patients)
3. Save your database password

### 3 — Run migrations
Supabase dashboard → SQL Editor → New Query:
- Paste and run `supabase/migrations/001_initial.sql` first
- Create your admin user (next step), then run `002_seed.sql`

### 4 — Create your admin user
Supabase → Authentication → Users → Add User:
- Email: your email
- Password: strong password
- Confirm the email you receive
- Then run `002_seed.sql` (it promotes first user to admin role)

### 5 — Configure environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=         # Supabase → Settings → API → URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Supabase → Settings → API → anon/public key
SUPABASE_SERVICE_ROLE_KEY=        # Supabase → Settings → API → service_role key
ANTHROPIC_API_KEY=sk-ant-...      # console.anthropic.com → API Keys
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WA_NUMBER=905527827698
```

### 6 — Run dev server
```bash
npm run dev
```

- Public site: http://localhost:3000
- Login: http://localhost:3000/login  
- CRM: http://localhost:3000/app/dashboard
- Health: http://localhost:3000/api/health → should return `"status":"healthy"`

---

## VERCEL DEPLOYMENT

### 1 — Push to GitHub
```bash
git init && git add . && git commit -m "MMV Medical V3"
# Create repo at github.com then:
git remote add origin https://github.com/YOUR_USERNAME/mmv-medical.git
git push -u origin main
```

### 2 — Deploy on Vercel
1. vercel.com → New Project → Import your GitHub repo
2. Framework: Next.js (auto-detected)
3. Click Deploy — first deploy will fail because env vars aren't set yet

### 3 — Add environment variables
Vercel → Project Settings → Environment Variables:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key ⚠️ never expose this |
| `ANTHROPIC_API_KEY` | sk-ant-... ⚠️ never expose this |
| `NEXT_PUBLIC_SITE_URL` | https://mmvmedical.health |
| `NEXT_PUBLIC_WA_NUMBER` | 905527827698 |

Then: Deployments → Redeploy (to pick up env vars).

### 4 — Connect mmvmedical.health domain
1. Vercel → Project → Domains → Add → type `mmvmedical.health`
2. Vercel shows DNS records to add (A record or CNAME)
3. Namecheap → mmvmedical.health → Advanced DNS → add those records
4. Wait up to 30 minutes for propagation
5. Vercel auto-provisions SSL — no action needed

### 5 — Update Supabase auth settings
Supabase → Authentication → URL Configuration:
- Site URL: `https://mmvmedical.health`
- Redirect URLs: `https://mmvmedical.health/**`

### 6 — Verify production
- https://mmvmedical.health → public site loads with SSL padlock
- https://mmvmedical.health/api/health → `{"status":"healthy"}`
- Submit a test lead → appears in Supabase → leads table
- Login at /login → CRM dashboard loads

---

## QA CHECKLIST

### Public Site
- [ ] Homepage loads — hero, savings cards, steps all visible
- [ ] Nav links work: /treatments, /calculator, /about, /contact
- [ ] Lead form: valid submit → success state + WhatsApp opens to +905527827698
- [ ] Lead form: empty required fields → validation errors shown inline
- [ ] Lead form: honeypot `website` field hidden from view (inspect element to confirm)
- [ ] Duplicate lead (same email within 24h) → silently succeeds, no crash
- [ ] New lead row appears in Supabase leads table with correct stage "new"
- [ ] Calculator: country change updates currency symbol
- [ ] Calculator: all sliders update saving in real time, no NaN displayed
- [ ] Treatments page: all 6 treatment cards render with prices
- [ ] About page: MOH credentials visible
- [ ] Contact page: WhatsApp button links to wa.me/905527827698
- [ ] /robots.txt returns plain text with Disallow: /app/
- [ ] /sitemap.xml returns valid XML (5 URLs)
- [ ] /api/health returns 200 with status healthy
- [ ] All pages responsive at 375px mobile width

### Auth
- [ ] /login renders, wrong credentials → inline error (no redirect)
- [ ] Correct credentials → redirects to /app/dashboard
- [ ] Visiting /app/* while logged out → redirects to /login
- [ ] Sign out → session cleared, redirected to /login

### CRM — Dashboard
- [ ] KPI cards show correct totals
- [ ] Pipeline bars proportional to stage counts
- [ ] Clicking a lead navigates to /app/leads/[id]
- [ ] WhatsApp icon opens correct number

### CRM — Pipeline
- [ ] 7 stage columns with correct colours render
- [ ] Lead cards show name, country, value, follow-up badge
- [ ] Overdue = red, Today = amber, future = grey
- [ ] Drag card to different column → stage updates in DB

### CRM — All Leads
- [ ] Table renders all leads
- [ ] Search, stage filter, country filter all narrow results
- [ ] CSV export downloads valid file
- [ ] New Lead form creates lead and it appears in table

### CRM — Lead Detail
- [ ] Stage buttons update stage and log to activity
- [ ] Value + follow-up date save correctly
- [ ] Add note → appears in notes list after refresh
- [ ] Activity log shows all events in reverse order
- [ ] WhatsApp button opens pre-filled message

### Knowledge Base
- [ ] Add source + compile calls Anthropic → article created in 15-30s
- [ ] Article appears in KB Articles with summary, key facts, tags
- [ ] Ask: submit question → answer with [N] citations returned
- [ ] Citations list shows correct article titles
- [ ] Health check: 4 panels render (Gaps, Strengths, Opportunities, Next Sources)
- [ ] All KB actions fail gracefully when ANTHROPIC_API_KEY is missing

### Security
- [ ] ANTHROPIC_API_KEY not visible in any browser network request
- [ ] SUPABASE_SERVICE_ROLE_KEY not visible in any browser network request
- [ ] Unauthenticated Supabase client cannot read leads table (test in browser console)

---

## INCIDENT: FAILED LEAD CAPTURE

If a patient submits the form but no lead appears:

1. Check `/api/health` — is Supabase `"ok"`?
2. Supabase → Logs → API — look for 5xx errors at submission time
3. Check for silent deduplication:
   ```sql
   select * from leads where email = 'patient@email.com' order by created_at desc;
   ```
4. Check Vercel → Functions logs for server action errors
5. **Patient fallback**: direct them to WhatsApp +905527827698
6. Once resolved: add lead manually via /app/leads/new

---

## POST-LAUNCH 30-DAY PLAN

**Week 1 — Verify**
- Confirm live leads flowing from mmvmedical.health into CRM
- Set up UptimeRobot (free) pointing to /api/health
- Add first 10 sources to Knowledge Base (competitor reviews, UK pricing pages)

**Week 2 — Convert**
- Review which countries generate most leads
- Check which treatments get most calculator interactions (add Vercel Analytics)
- Ensure all WhatsApp conversations get logged as CRM notes

**Week 3 — Intelligence**
- Target 20+ compiled KB articles
- Run Health Check — review AI-identified gaps
- Ask KB: "What are the most common objections from UK patients?" → use in call script

**Week 4 — Pipeline**
- What % of New Leads reach Contacted within 48h?
- Measure Plan Sent → Deposit conversion rate
- Rule: every lead must have a follow-up date set before leaving New stage

**Month 2 target**
- 50+ leads in CRM
- 30+ KB articles compiled
- First intelligence report drafted from KB for potential clinic client
- At least one referral fee conversation initiated with Dr. Mat
