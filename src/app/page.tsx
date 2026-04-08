'use client'

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root{--gold:#c9a96e;--gold-light:#e8d5a3;--navy:#0a0e1a;--navy-mid:#111827;--navy-light:#1c2637;--white:#f5f3ee;--muted:#8a9bb0;--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans',sans-serif}
        .mmv-body{font-family:var(--sans);font-weight:300;background:var(--navy);color:var(--white);overflow-x:hidden}
        .mmv-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 48px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(to bottom,rgba(10,14,26,0.95),transparent);backdrop-filter:blur(8px)}
        .mmv-logo{font-family:var(--serif);font-size:22px;font-weight:300;letter-spacing:0.12em;color:var(--gold);text-decoration:none}
        .mmv-nav-links{display:flex;gap:36px;list-style:none;margin:0;padding:0}
        .mmv-nav-links a{color:var(--muted);text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;transition:color 0.3s}
        .mmv-nav-links a:hover{color:var(--gold)}
        .mmv-nav-cta{background:transparent;border:1px solid var(--gold);color:var(--gold);padding:10px 24px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;transition:all 0.3s}
        .mmv-nav-cta:hover{background:var(--gold);color:var(--navy)}
        .mmv-hero{position:relative;height:100vh;min-height:700px;display:flex;align-items:center;overflow:hidden}
        .mmv-hero-bg{position:absolute;inset:0;background:url('https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.40.jpeg') center/cover no-repeat;opacity:0.25}
        .mmv-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,14,26,0.97) 40%,rgba(10,14,26,0.7) 100%)}
        .mmv-hero-content{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 48px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
        .mmv-eyebrow{font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin-bottom:24px;display:flex;align-items:center;gap:12px}
        .mmv-eyebrow::before{content:'';width:32px;height:1px;background:var(--gold)}
        .mmv-hero-title{font-family:var(--serif);font-size:clamp(42px,5vw,68px);font-weight:300;line-height:1.1;color:var(--white);margin-bottom:24px}
        .mmv-hero-title em{font-style:italic;color:var(--gold)}
        .mmv-hero-sub{font-size:15px;line-height:1.8;color:var(--muted);margin-bottom:40px;max-width:480px}
        .mmv-actions{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
        .mmv-btn{background:var(--gold);color:var(--navy);padding:14px 32px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;font-weight:500;transition:all 0.3s;border:none;cursor:pointer;display:inline-block}
        .mmv-btn:hover{background:var(--gold-light)}
        .mmv-btn-ghost{background:transparent;border:1px solid rgba(201,169,110,0.4);color:var(--gold);padding:14px 32px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;transition:all 0.3s}
        .mmv-btn-ghost:hover{border-color:var(--gold);background:rgba(201,169,110,0.08)}
        .mmv-countries{margin-top:48px;display:flex;gap:10px;flex-wrap:wrap}
        .mmv-pill{display:flex;align-items:center;gap:6px;padding:6px 14px;border:1px solid rgba(201,169,110,0.2);font-size:12px;color:var(--muted)}
        .mmv-stats{display:flex;flex-direction:column;gap:32px}
        .mmv-stat{border-left:1px solid rgba(201,169,110,0.3);padding-left:24px}
        .mmv-stat-n{font-family:var(--serif);font-size:48px;font-weight:300;color:var(--gold);line-height:1}
        .mmv-stat-l{font-size:12px;color:var(--muted);letter-spacing:0.08em;text-transform:uppercase;margin-top:6px}
        .mmv-trust{background:var(--navy-mid);border-top:1px solid rgba(201,169,110,0.15);border-bottom:1px solid rgba(201,169,110,0.15);padding:20px 48px;display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap}
        .mmv-trust-item{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--muted);letter-spacing:0.06em;text-transform:uppercase}
        .mmv-trust-icon{color:var(--gold)}
        .mmv-section{padding:100px 48px}
        .mmv-max{max-width:1200px;margin:0 auto}
        .mmv-section-title{font-family:var(--serif);font-size:clamp(32px,4vw,52px);font-weight:300;line-height:1.2;color:var(--white);margin-bottom:16px}
        .mmv-section-title em{font-style:italic;color:var(--gold)}
        .mmv-divider{width:48px;height:1px;background:var(--gold);margin:24px 0}
        .mmv-treatments-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:64px}
        .mmv-card{position:relative;overflow:hidden;aspect-ratio:3/4}
        .mmv-card img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;filter:brightness(0.5)}
        .mmv-card:hover img{transform:scale(1.05);filter:brightness(0.65)}
        .mmv-card-content{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:32px;background:linear-gradient(to top,rgba(10,14,26,0.95) 0%,transparent 60%)}
        .mmv-card-tag{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
        .mmv-card-title{font-family:var(--serif);font-size:26px;font-weight:300;color:var(--white);margin-bottom:8px}
        .mmv-card-prices{display:flex;align-items:baseline;gap:12px;margin-top:12px}
        .mmv-price-home{font-size:13px;color:var(--muted);text-decoration:line-through}
        .mmv-price-ist{font-family:var(--serif);font-size:22px;color:var(--gold);font-weight:300}
        .mmv-price-save{font-size:13px;color:var(--gold-light)}
        .mmv-calc{background:var(--navy-mid)}
        .mmv-calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;margin-top:64px}
        .mmv-calc-form{background:var(--navy-light);padding:48px;border:1px solid rgba(201,169,110,0.15)}
        .mmv-label{font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;display:block}
        .mmv-select{width:100%;background:var(--navy);border:1px solid rgba(201,169,110,0.2);color:var(--white);padding:14px 18px;font-family:var(--sans);font-size:14px;margin-bottom:24px;appearance:none;cursor:pointer}
        .mmv-t-btns{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px}
        .mmv-t-btn{background:var(--navy);border:1px solid rgba(201,169,110,0.15);color:var(--muted);padding:12px;font-size:12px;cursor:pointer;text-align:left;transition:all 0.2s;font-family:var(--sans)}
        .mmv-t-btn.active,.mmv-t-btn:hover{border-color:var(--gold);color:var(--gold);background:rgba(201,169,110,0.06)}
        .mmv-result-big{font-family:var(--serif);font-size:72px;font-weight:300;color:var(--gold);line-height:1}
        .mmv-result-label{font-size:13px;color:var(--muted);letter-spacing:0.08em;text-transform:uppercase;margin-top:8px}
        .mmv-breakdown{margin-top:40px}
        .mmv-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid rgba(201,169,110,0.1)}
        .mmv-row:last-child{border-bottom:none}
        .mmv-row-l{font-size:13px;color:var(--muted)}
        .mmv-row-v{font-family:var(--serif);font-size:18px;color:var(--white)}
        .mmv-row-v.gold{color:var(--gold)}
        .mmv-note{font-size:11px;color:var(--muted);margin-top:20px;line-height:1.7;opacity:0.7}
        .mmv-process{background:var(--navy)}
        .mmv-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:64px}
        .mmv-step{text-align:center;padding:0 24px}
        .mmv-step-num{width:56px;height:56px;border:1px solid rgba(201,169,110,0.4);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-family:var(--serif);font-size:20px;font-weight:300;color:var(--gold);background:var(--navy)}
        .mmv-step-title{font-family:var(--serif);font-size:20px;font-weight:300;color:var(--white);margin-bottom:12px}
        .mmv-step-desc{font-size:13px;line-height:1.8;color:var(--muted)}
        .mmv-about{background:var(--navy-mid)}
        .mmv-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:64px}
        .mmv-about-img{width:100%;aspect-ratio:3/4;object-fit:cover;filter:brightness(0.85)}
        .mmv-about-text{font-size:15px;line-height:1.9;color:var(--muted);margin-bottom:20px}
        .mmv-creds{display:flex;flex-direction:column;gap:16px;margin-top:40px}
        .mmv-cred{display:flex;align-items:flex-start;gap:16px}
        .mmv-cred-icon{width:32px;height:32px;border:1px solid rgba(201,169,110,0.3);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:12px;flex-shrink:0;margin-top:2px}
        .mmv-cred-text{font-size:13px;color:var(--muted);line-height:1.6}
        .mmv-cred-text strong{color:var(--white);font-weight:400;display:block;margin-bottom:2px}
        .mmv-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:48px}
        .mmv-gallery-item{aspect-ratio:1;overflow:hidden}
        .mmv-gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s;filter:brightness(0.9)}
        .mmv-gallery-item img:hover{transform:scale(1.05)}
        .mmv-testi{background:var(--navy)}
        .mmv-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:64px}
        .mmv-testi-card{background:var(--navy-light);padding:40px;border:1px solid rgba(201,169,110,0.08);transition:border-color 0.3s}
        .mmv-testi-card:hover{border-color:rgba(201,169,110,0.3)}
        .mmv-stars{color:var(--gold);font-size:13px;letter-spacing:4px;margin-bottom:20px}
        .mmv-quote{font-family:var(--serif);font-size:17px;font-weight:300;line-height:1.7;color:var(--white);margin-bottom:24px;font-style:italic}
        .mmv-author{display:flex;align-items:center;gap:14px}
        .mmv-avatar{width:40px;height:40px;border-radius:50%;background:var(--navy-mid);border:1px solid rgba(201,169,110,0.3);display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:16px;color:var(--gold)}
        .mmv-author-name{font-size:13px;color:var(--white);font-weight:400}
        .mmv-author-loc{font-size:12px;color:var(--muted)}
        .mmv-author-save{font-size:12px;color:var(--gold);margin-top:2px}
        .mmv-contact{background:var(--navy-mid)}
        .mmv-contact-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:80px;align-items:start;margin-top:64px}
        .mmv-contact-title{font-family:var(--serif);font-size:32px;font-weight:300;color:var(--white);margin-bottom:16px}
        .mmv-contact-text{font-size:14px;line-height:1.9;color:var(--muted);margin-bottom:40px}
        .mmv-promises{display:flex;flex-direction:column;gap:14px}
        .mmv-promise{display:flex;align-items:flex-start;gap:12px}
        .mmv-promise-icon{color:var(--gold);flex-shrink:0;margin-top:2px}
        .mmv-promise-text{font-size:13px;color:var(--muted);line-height:1.6}
        .mmv-form-box{background:var(--navy-light);padding:48px;border:1px solid rgba(201,169,110,0.15)}
        .mmv-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .mmv-form-group{margin-bottom:20px}
        .mmv-form-label{display:block;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-bottom:8px}
        .mmv-input,.mmv-form-select,.mmv-textarea{width:100%;background:var(--navy);border:1px solid rgba(201,169,110,0.2);color:var(--white);padding:14px 18px;font-family:var(--sans);font-size:14px;font-weight:300;transition:border-color 0.2s;box-sizing:border-box}
        .mmv-input:focus,.mmv-form-select:focus,.mmv-textarea:focus{outline:none;border-color:var(--gold)}
        .mmv-textarea{resize:vertical;min-height:100px}
        .mmv-form-select{appearance:none;cursor:pointer}
        .mmv-input::placeholder,.mmv-textarea::placeholder{color:rgba(138,155,176,0.5)}
        .mmv-submit{width:100%;background:var(--gold);color:var(--navy);padding:16px;font-family:var(--sans);font-size:13px;letter-spacing:0.1em;text-transform:uppercase;font-weight:500;border:none;cursor:pointer;transition:background 0.3s;margin-top:8px}
        .mmv-submit:hover{background:var(--gold-light)}
        .mmv-form-note{font-size:11px;color:var(--muted);margin-top:16px;text-align:center;line-height:1.6;opacity:0.7}
        .mmv-success{display:none;text-align:center;padding:48px 24px}
        .mmv-success.show{display:block}
        .mmv-success-icon{font-size:40px;margin-bottom:16px}
        .mmv-success-title{font-family:var(--serif);font-size:28px;font-weight:300;color:var(--gold);margin-bottom:12px}
        .mmv-success-text{font-size:14px;color:var(--muted);line-height:1.8}
        .mmv-footer{background:var(--navy);border-top:1px solid rgba(201,169,110,0.15);padding:40px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
        .mmv-footer-logo{font-family:var(--serif);font-size:20px;font-weight:300;letter-spacing:0.12em;color:var(--gold)}
        .mmv-footer-text{font-size:12px;color:var(--muted)}
        .mmv-footer-wa{display:flex;align-items:center;gap:8px;background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.3);color:#25d366;padding:10px 20px;text-decoration:none;font-size:13px;transition:all 0.3s}
        .mmv-footer-wa:hover{background:rgba(37,211,102,0.2)}
        .mmv-wa-float{position:fixed;bottom:32px;right:32px;z-index:200;background:#25d366;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 24px rgba(37,211,102,0.4);transition:transform 0.3s}
        .mmv-wa-float:hover{transform:scale(1.1)}
        .mmv-wa-float svg{width:28px;height:28px;fill:#fff}
        @media(max-width:900px){
          .mmv-nav{padding:16px 24px}
          .mmv-nav-links{display:none}
          .mmv-hero-content,.mmv-calc-grid,.mmv-about-grid,.mmv-contact-grid{grid-template-columns:1fr;gap:40px}
          .mmv-hero-content{padding:0 24px}
          .mmv-section{padding:64px 24px}
          .mmv-treatments-grid,.mmv-testi-grid{grid-template-columns:1fr}
          .mmv-gallery{grid-template-columns:repeat(2,1fr)}
          .mmv-steps{grid-template-columns:1fr 1fr;gap:40px}
          .mmv-trust{padding:20px 24px;gap:24px}
          .mmv-form-row{grid-template-columns:1fr}
          .mmv-footer{flex-direction:column;text-align:center;padding:32px 24px}
        }
      `}</style>

      <div className="mmv-body">
        {/* NAV */}
        <nav className="mmv-nav">
          <a href="/" className="mmv-logo">MMV Medical</a>
          <ul className="mmv-nav-links">
            <li><a href="#treatments">Treatments</a></li>
            <li><a href="#calculator">Savings</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className="mmv-nav-cta">Free Consultation</a>
        </nav>

        {/* HERO */}
        <div className="mmv-hero">
          <div className="mmv-hero-bg"></div>
          <div className="mmv-hero-overlay"></div>
          <div className="mmv-hero-content">
            <div>
              <div className="mmv-eyebrow">Istanbul · Turkey · Est. 2024</div>
              <h1 className="mmv-hero-title">World-Class Dental Care,<br/><em>Honest Pricing</em></h1>
              <p className="mmv-hero-sub">MMV Medical connects European patients with Dr. Mat Dental Clinic in Istanbul — one of Turkey&apos;s most trusted specialist dental practices. Your dedicated coordinator handles everything from consultation to aftercare.</p>
              <div className="mmv-actions">
                <a href="#contact" className="mmv-btn">Get Your Free Plan</a>
                <a href="#calculator" className="mmv-btn-ghost">Calculate Savings</a>
              </div>
              <div className="mmv-countries">
                {['🇬🇧 UK','🇮🇪 Ireland','🇳🇱 Netherlands','🇧🇪 Belgium','🇩🇪 Germany','🇫🇷 France','🇸🇪 Sweden','🇳🇴 Norway','🇨🇭 Switzerland','🇷🇴 Romania'].map(c=>(
                  <span key={c} className="mmv-pill">{c}</span>
                ))}
              </div>
            </div>
            <div className="mmv-stats">
              <div className="mmv-stat"><div className="mmv-stat-n">70%</div><div className="mmv-stat-l">Average cost saving vs. home country</div></div>
              <div className="mmv-stat"><div className="mmv-stat-n">3–5</div><div className="mmv-stat-l">Days for most complete treatments</div></div>
              <div className="mmv-stat"><div className="mmv-stat-n">24h</div><div className="mmv-stat-l">Response time on all enquiries</div></div>
            </div>
          </div>
        </div>

        {/* TRUST BAR */}
        <div className="mmv-trust">
          {['MOH Licensed Facility','Straumann & Nobel Biocare Implants','English-Speaking Coordinator','VIP Airport Transfers Included','Full Aftercare Support'].map(t=>(
            <div key={t} className="mmv-trust-item"><span className="mmv-trust-icon">✦</span> {t}</div>
          ))}
        </div>

        {/* TREATMENTS */}
        <section className="mmv-section" id="treatments" style={{background:'var(--navy)'}}>
          <div className="mmv-max">
            <div className="mmv-eyebrow">Treatments</div>
            <h2 className="mmv-section-title">Specialist Care Across<br/><em>All Dental Disciplines</em></h2>
            <div className="mmv-treatments-grid">
              {[
                {tag:'Most Popular',title:'Single Dental Implant',img:'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(3).jpeg',home:'£2,800 UK',ist:'£420',save:'Save up to £2,380'},
                {tag:'Smile Transformation',title:'Porcelain Veneers',img:'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.39.jpeg',home:'£900 each UK',ist:'£180',save:'Full smile from £1,800'},
                {tag:'Full Arch Restoration',title:'All-on-4 / All-on-6',img:'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(8).jpeg',home:'£20,000 UK',ist:'£6,500',save:'Save over £13,500'},
                {tag:'Restoration',title:'Zirconia Crowns',img:'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.42%20(3).jpeg',home:'£1,200 UK',ist:'£220',save:'Save up to £980'},
                {tag:'Full Makeover',title:'Complete Smile Design',img:'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.40.jpeg',home:'£18,000 UK',ist:'£4,500',save:'Comprehensive redesign'},
                {tag:'Real Results',title:'Before & After',img:'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.41%20(3).jpeg',home:'£9,000 UK',ist:'£1,800',save:'Full veneers from £1,800'},
              ].map(t=>(
                <div key={t.title} className="mmv-card">
                  <img src={t.img} alt={t.title}/>
                  <div className="mmv-card-content">
                    <div className="mmv-card-tag">{t.tag}</div>
                    <div className="mmv-card-title">{t.title}</div>
                    <div className="mmv-card-prices">
                      <span className="mmv-price-home">{t.home}</span>
                      <span className="mmv-price-ist">{t.ist}</span>
                    </div>
                    <div className="mmv-price-save">{t.save}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="mmv-section mmv-calc" id="calculator">
          <div className="mmv-max">
            <div className="mmv-eyebrow">Savings Calculator</div>
            <h2 className="mmv-section-title">See Exactly How Much<br/><em>You Will Save</em></h2>
            <div className="mmv-calc-grid">
              <div className="mmv-calc-form">
                <label className="mmv-label">Your Country</label>
                <select className="mmv-select" id="calc-country" onChange={() => {if(typeof window!=='undefined')(window as any).updateCalc()}}>
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="IE">🇮🇪 Ireland</option>
                  <option value="NL">🇳🇱 Netherlands</option>
                  <option value="BE">🇧🇪 Belgium</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="FR">🇫🇷 France</option>
                  <option value="SE">🇸🇪 Sweden</option>
                  <option value="NO">🇳🇴 Norway</option>
                  <option value="CH">🇨🇭 Switzerland</option>
                  <option value="DK">🇩🇰 Denmark</option>
                  <option value="AT">🇦🇹 Austria</option>
                  <option value="RO">🇷🇴 Romania</option>
                  <option value="OTHER">🌍 Other European</option>
                </select>
                <label className="mmv-label">Treatment</label>
                <div className="mmv-t-btns">
                  {[
                    {k:'implant',l:'Single Implant'},{k:'implants4',l:'4+ Implants'},
                    {k:'allon4',l:'All-on-4'},{k:'allon6',l:'All-on-6'},
                    {k:'veneer',l:'Single Veneer'},{k:'veneers10',l:'Full Veneers (10)'},
                    {k:'crown',l:'Zirconia Crown'},{k:'smile',l:'Smile Design'},
                  ].map((t,i)=>(
                    <button key={t.k} className={`mmv-t-btn${i===0?' active':''}`} data-treatment={t.k}
                      onClick={e=>{
                        document.querySelectorAll('.mmv-t-btn').forEach(b=>b.classList.remove('active'));
                        (e.target as HTMLElement).classList.add('active');
                        if(typeof window!=='undefined')(window as any).selectedTreatment=t.k;
                        if(typeof window!=='undefined')(window as any).updateCalc();
                      }}>
                      {t.l}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{paddingTop:'48px'}}>
                <div id="calc-saving-display" className="mmv-result-big">£2,380</div>
                <div className="mmv-result-label">Estimated saving</div>
                <div className="mmv-divider"></div>
                <div className="mmv-breakdown">
                  {[
                    {l:'Cost at home',id:'calc-home',v:'£2,800',gold:false},
                    {l:'Cost in Istanbul',id:'calc-istanbul',v:'£420',gold:false},
                    {l:'Flights (estimate)',id:'calc-flights',v:'£180',gold:false},
                    {l:'Hotel (3 nights)',id:'calc-hotel',v:'£120',gold:false},
                    {l:'Net saving',id:'calc-net',v:'£2,080',gold:true},
                    {l:'Saving percentage',id:'calc-pct',v:'74%',gold:true},
                  ].map(r=>(
                    <div key={r.id} className="mmv-row">
                      <span className="mmv-row-l">{r.l}</span>
                      <span id={r.id} className={`mmv-row-v${r.gold?' gold':''}`}>{r.v}</span>
                    </div>
                  ))}
                </div>
                <p className="mmv-note">Estimates based on average market rates. Your exact quote will be provided free within 24 hours.</p>
                <a href="#contact" className="mmv-btn" style={{marginTop:'32px'}}>Get Exact Quote →</a>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="mmv-section mmv-process">
          <div className="mmv-max">
            <div className="mmv-eyebrow">How It Works</div>
            <h2 className="mmv-section-title">From First Enquiry to<br/><em>Perfect Smile</em></h2>
            <div className="mmv-steps">
              {[
                {n:'01',t:'Free Consultation',d:'Share your dental history and X-rays. We prepare a personalised treatment plan with full transparent pricing — no hidden fees.'},
                {n:'02',t:'Plan Your Trip',d:'We coordinate flights, hotel accommodation, and all clinic appointments. VIP airport transfers are included in your package.'},
                {n:'03',t:'Treatment',d:'Treated by specialist surgeons at Dr. Mat Dental Clinic — a MOH-licensed facility. Your coordinator is with you every appointment.'},
                {n:'04',t:'Aftercare',d:'Full aftercare package and ongoing WhatsApp support after you return home. We remain your point of contact for any follow-up.'},
              ].map(s=>(
                <div key={s.n} className="mmv-step">
                  <div className="mmv-step-num">{s.n}</div>
                  <div className="mmv-step-title">{s.t}</div>
                  <div className="mmv-step-desc">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE AFTER GALLERY */}
        <section className="mmv-section" id="results" style={{background:'var(--navy-mid)'}}>
          <div className="mmv-max">
            <div className="mmv-eyebrow">Real Results</div>
            <h2 className="mmv-section-title">Before & After<br/><em>Dr. Mat Dental Clinic</em></h2>
            <p style={{fontSize:'14px',color:'var(--muted)',marginBottom:'48px',maxWidth:'560px',lineHeight:'1.8'}}>Every result shown is a real patient treated at Dr. Mat Dental Clinic in Istanbul. No filters, no stock photos — just real transformations.</p>
            <div className="mmv-gallery">
              {[
                'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.39.jpeg',
                'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.40.jpeg',
                'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.41%20(3).jpeg',
                'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.42%20(3).jpeg',
                'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(3).jpeg',
                'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(6).jpeg',
                'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(8).jpeg',
                'https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.45%20(5).jpeg',
              ].map((url,i)=>(
                <div key={i} className="mmv-gallery-item">
                  <img src={url} alt={`Patient result ${i+1}`}/>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center',marginTop:'48px'}}>
              <a href="#contact" className="mmv-btn">Book Your Free Consultation →</a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="mmv-section mmv-about" id="about">
          <div className="mmv-max">
            <div className="mmv-about-grid">
              <div><img src="https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(6).jpeg" alt="Dr. Mat Dental Clinic Istanbul" className="mmv-about-img"/></div>
              <div>
                <div className="mmv-eyebrow">About MMV Medical</div>
                <h2 className="mmv-section-title">Specialist Care,<br/><em>Personal Service</em></h2>
                <div className="mmv-divider"></div>
                <p className="mmv-about-text">MMV Medical was founded to give European patients direct access to world-class dental care in Istanbul — with the same level of trust, transparency, and personalised attention they would expect at home, at a fraction of the price.</p>
                <p className="mmv-about-text">We work exclusively with Dr. Mat Dental Clinic, a specialist practice with a dedicated international patient team. Every patient is assigned a personal coordinator who speaks your language and is available from first enquiry to final check-up.</p>
                <div className="mmv-creds">
                  {[
                    {t:'Dr. Mat Dental Clinic, Istanbul',d:'MOH-licensed specialist dental facility. Straumann & Nobel Biocare implant systems.'},
                    {t:'Personal Coordinator Service',d:'English-speaking coordinator from first WhatsApp to post-treatment follow-up.'},
                    {t:'Transparent Pricing',d:'Full treatment cost confirmed before you book — no surprises on arrival.'},
                    {t:'European Patient Specialists',d:'Serving patients from UK, Ireland, Netherlands, Belgium, Germany, France and beyond.'},
                  ].map(c=>(
                    <div key={c.t} className="mmv-cred">
                      <div className="mmv-cred-icon">✦</div>
                      <div className="mmv-cred-text"><strong>{c.t}</strong>{c.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mmv-section mmv-testi">
          <div className="mmv-max">
            <div className="mmv-eyebrow">Patient Stories</div>
            <h2 className="mmv-section-title">What Our Patients<br/><em>Say About Us</em></h2>
            <div className="mmv-testi-grid">
              {[
                {i:'S',n:'Sarah M.',l:'🇬🇧 Manchester, UK',s:'Saved £4,200 on 2 implants',q:'My coordinator was available on WhatsApp at all hours. The whole trip felt completely seamless — transfers, hotel, clinic. The implants are perfect and I saved over £4,000.'},
                {i:'D',n:'Declan O.',l:'🇮🇪 Dublin, Ireland',s:'Saved €7,400 on full veneers',q:'I was nervous about travelling for dental work but the team made every step easy. The clinic is modern and spotless. My veneers look completely natural. Would recommend to anyone.'},
                {i:'M',n:'Mieke V.',l:'🇳🇱 Amsterdam, Netherlands',s:'Saved €13,500 on All-on-4',q:'The pricing was exactly as quoted — not a cent more. The surgeon was clearly a specialist and explained every step. I got my All-on-4 done in 4 days and flew home smiling.'},
              ].map(t=>(
                <div key={t.n} className="mmv-testi-card">
                  <div className="mmv-stars">★★★★★</div>
                  <p className="mmv-quote">&ldquo;{t.q}&rdquo;</p>
                  <div className="mmv-author">
                    <div className="mmv-avatar">{t.i}</div>
                    <div>
                      <div className="mmv-author-name">{t.n}</div>
                      <div className="mmv-author-loc">{t.l}</div>
                      <div className="mmv-author-save">{t.s}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mmv-section mmv-contact" id="contact">
          <div className="mmv-max">
            <div className="mmv-contact-grid">
              <div>
                <div className="mmv-eyebrow">Free Consultation</div>
                <div className="mmv-contact-title">Your Treatment Plan,<br/>Within 24 Hours</div>
                <div className="mmv-divider"></div>
                <p className="mmv-contact-text">Share your situation and we will send a personalised treatment plan with exact pricing — no commitment required, no pushy follow-up calls.</p>
                <div className="mmv-promises">
                  {['Response within 24 hours, usually much faster','Exact pricing with no hidden costs','No obligation — information only until you decide','English-speaking coordinator assigned from day one','WhatsApp or email — whichever you prefer'].map(p=>(
                    <div key={p} className="mmv-promise"><span className="mmv-promise-icon">✦</span><span className="mmv-promise-text">{p}</span></div>
                  ))}
                </div>
              </div>
              <div className="mmv-form-box">
                <div id="form-fields">
                  <div className="mmv-form-row">
                    <div className="mmv-form-group">
                      <label className="mmv-form-label">Full Name</label>
                      <input type="text" id="f-name" className="mmv-input" placeholder="Your name" required/>
                    </div>
                    <div className="mmv-form-group">
                      <label className="mmv-form-label">Country</label>
                      <select id="f-country" className="mmv-form-select">
                        <option value="">Select country</option>
                        {['🇬🇧 United Kingdom','🇮🇪 Ireland','🇳🇱 Netherlands','🇧🇪 Belgium','🇩🇪 Germany','🇫🇷 France','🇸🇪 Sweden','🇳🇴 Norway','🇨🇭 Switzerland','🇩🇰 Denmark','🇦🇹 Austria','🇷🇴 Romania','🌍 Other'].map(c=>(
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mmv-form-row">
                    <div className="mmv-form-group">
                      <label className="mmv-form-label">Email</label>
                      <input type="email" id="f-email" className="mmv-input" placeholder="your@email.com" required/>
                    </div>
                    <div className="mmv-form-group">
                      <label className="mmv-form-label">WhatsApp</label>
                      <input type="tel" id="f-wa" className="mmv-input" placeholder="+44 7700 000000"/>
                    </div>
                  </div>
                  <div className="mmv-form-group">
                    <label className="mmv-form-label">Treatment Interest</label>
                    <select id="f-treatment" className="mmv-form-select">
                      <option value="">Select treatment</option>
                      {['Single Dental Implant','Multiple Implants (4+)','Full Arch — All-on-4','Full Arch — All-on-6','Porcelain Veneers','Full Veneers (10 teeth)','Zirconia Crowns','Complete Smile Design','Not sure — need advice'].map(t=>(
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mmv-form-group">
                    <label className="mmv-form-label">Budget Range</label>
                    <select id="f-budget" className="mmv-form-select">
                      <option value="">Prefer not to say</option>
                      {['Under £1,000','£1,000 – £3,000','£3,000 – £6,000','£6,000 – £12,000','£12,000+'].map(b=>(
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mmv-form-group">
                    <label className="mmv-form-label">Your Situation (optional)</label>
                    <textarea id="f-notes" className="mmv-textarea" placeholder="Tell us about your dental situation, any X-rays you have, timeline, or questions..."></textarea>
                  </div>
                  <button className="mmv-submit" onClick={() => {if(typeof window!=='undefined')(window as any).submitForm()}}>
                    Send My Free Consultation Request →
                  </button>
                  <p className="mmv-form-note">Your information is kept private and never shared with third parties.</p>
                </div>
                <div className="mmv-success" id="form-success">
                  <div className="mmv-success-icon">✦</div>
                  <div className="mmv-success-title">Request Received</div>
                  <p className="mmv-success-text">Thank you. Your coordinator will be in touch within 24 hours with a personalised treatment plan and exact pricing.</p>
                  <a href="https://wa.me/905527827698" target="_blank" className="mmv-btn" style={{display:'inline-block',marginTop:'24px'}}>💬 Message on WhatsApp Now</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mmv-footer">
          <div className="mmv-footer-logo">MMV Medical</div>
          <div className="mmv-footer-text">© 2026 MMV Medical. Connecting European patients with specialist dental care in Istanbul.</div>
          <a href="https://wa.me/905527827698" target="_blank" className="mmv-footer-wa">💬 WhatsApp Us</a>
        </footer>

        {/* WHATSAPP FLOAT */}
        <a href="https://wa.me/905527827698" target="_blank" className="mmv-wa-float">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>

        <script dangerouslySetInnerHTML={{__html:`
          var selectedTreatment='implant';
          var TREATMENTS={implant:{istanbul:420},implants4:{istanbul:1600},allon4:{istanbul:6500},allon6:{istanbul:8500},veneer:{istanbul:180},veneers10:{istanbul:1800},crown:{istanbul:220},smile:{istanbul:4500}};
          var HOME_PRICES={UK:{currency:'£',flights:180,hotel:120,implant:2800,implants4:10000,allon4:20000,allon6:26000,veneer:900,veneers10:9000,crown:1200,smile:18000},IE:{currency:'€',flights:160,hotel:120,implant:2600,implants4:9500,allon4:19000,allon6:25000,veneer:850,veneers10:8500,crown:1100,smile:17000},NL:{currency:'€',flights:150,hotel:120,implant:2500,implants4:9000,allon4:18000,allon6:24000,veneer:800,veneers10:8000,crown:1000,smile:16000},BE:{currency:'€',flights:150,hotel:120,implant:2400,implants4:8800,allon4:17500,allon6:23000,veneer:780,veneers10:7800,crown:980,smile:15500},DE:{currency:'€',flights:160,hotel:120,implant:2600,implants4:9500,allon4:19000,allon6:25000,veneer:850,veneers10:8500,crown:1100,smile:17000},FR:{currency:'€',flights:160,hotel:120,implant:2400,implants4:8800,allon4:17000,allon6:22000,veneer:750,veneers10:7500,crown:950,smile:15000},SE:{currency:'kr',flights:200,hotel:150,implant:28000,implants4:100000,allon4:195000,allon6:255000,veneer:8500,veneers10:85000,crown:11000,smile:170000},NO:{currency:'kr',flights:220,hotel:150,implant:30000,implants4:108000,allon4:210000,allon6:275000,veneer:9200,veneers10:92000,crown:12000,smile:185000},CH:{currency:'CHF',flights:180,hotel:130,implant:3200,implants4:11500,allon4:22000,allon6:29000,veneer:1100,veneers10:11000,crown:1400,smile:22000},DK:{currency:'kr',flights:190,hotel:140,implant:22000,implants4:80000,allon4:155000,allon6:205000,veneer:7000,veneers10:70000,crown:9000,smile:140000},AT:{currency:'€',flights:150,hotel:120,implant:2500,implants4:9000,allon4:18000,allon6:24000,veneer:800,veneers10:8000,crown:1000,smile:16000},RO:{currency:'€',flights:100,hotel:80,implant:1200,implants4:4500,allon4:9000,allon6:12000,veneer:400,veneers10:4000,crown:500,smile:8000},OTHER:{currency:'€',flights:170,hotel:120,implant:2500,implants4:9000,allon4:18000,allon6:23000,veneer:800,veneers10:8000,crown:1000,smile:16000}};
          function fmt(n,c){return c+(Math.abs(n)>=1000?n.toLocaleString():n);}
          function updateCalc(){
            var country=document.getElementById('calc-country').value;
            var d=HOME_PRICES[country];
            var ist=TREATMENTS[selectedTreatment].istanbul;
            var home=d[selectedTreatment];
            var total=ist+d.flights+d.hotel;
            var save=home-total;
            var pct=Math.round((save/home)*100);
            document.getElementById('calc-home').textContent=fmt(home,d.currency);
            document.getElementById('calc-istanbul').textContent=fmt(ist,d.currency);
            document.getElementById('calc-flights').textContent=fmt(d.flights,d.currency);
            document.getElementById('calc-hotel').textContent=fmt(d.hotel,d.currency);
            document.getElementById('calc-net').textContent=fmt(Math.max(0,save),d.currency);
            document.getElementById('calc-pct').textContent=Math.max(0,pct)+'%';
            document.getElementById('calc-saving-display').textContent=fmt(Math.max(0,save),d.currency);
          }
          function submitForm(){
            var name=document.getElementById('f-name').value;
            var email=document.getElementById('f-email').value;
            var country=document.getElementById('f-country').value;
            var treatment=document.getElementById('f-treatment').value;
            var wa=document.getElementById('f-wa').value;
            var budget=document.getElementById('f-budget').value;
            var notes=document.getElementById('f-notes').value;
            if(!name||!email){alert('Please enter your name and email.');return;}
            var msg=encodeURIComponent('New MMV Medical Enquiry\\n\\nName: '+name+'\\nCountry: '+country+'\\nEmail: '+email+'\\nWhatsApp: '+wa+'\\nTreatment: '+treatment+'\\nBudget: '+budget+'\\nNotes: '+notes);
            window.open('https://wa.me/905527827698?text='+msg,'_blank');
            document.getElementById('form-fields').style.display='none';
            document.getElementById('form-success').classList.add('show');
          }
          window.updateCalc=updateCalc;
          window.submitForm=submitForm;
          window.selectedTreatment=selectedTreatment;
          updateCalc();
        `}}/>
      </div>
    </>
  )
}
