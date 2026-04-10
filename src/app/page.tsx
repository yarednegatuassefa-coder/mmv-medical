'use client'

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root{--gold:#c9a96e;--gold-light:#e8d5a3;--navy:#0a0e1a;--navy-mid:#111827;--navy-light:#1c2637;--white:#f5f3ee;--muted:#8a9bb0;--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans',sans-serif}
        .mmv-body{font-family:var(--sans);font-weight:300;background:var(--navy);color:var(--white);overflow-x:hidden}

        /* NAV */
        .mmv-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 48px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(to bottom,rgba(10,14,26,0.97),transparent);backdrop-filter:blur(8px);transition:background 0.3s}
        .mmv-nav.scrolled{background:rgba(10,14,26,0.98)}
        .mmv-logo{font-family:var(--serif);font-size:22px;font-weight:300;letter-spacing:0.12em;color:var(--gold);text-decoration:none}
        .mmv-nav-links{display:flex;gap:36px;list-style:none;margin:0;padding:0}
        .mmv-nav-links a{color:var(--muted);text-decoration:none;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;transition:color 0.3s}
        .mmv-nav-links a:hover{color:var(--gold)}
        .mmv-nav-cta{background:var(--gold);color:var(--navy);padding:10px 24px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;transition:all 0.3s;font-weight:500}
        .mmv-nav-cta:hover{background:var(--gold-light)}

        /* HERO */
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

        /* TRUST BAR */
        .mmv-trust{background:var(--navy-mid);border-top:1px solid rgba(201,169,110,0.15);border-bottom:1px solid rgba(201,169,110,0.15);padding:20px 48px;display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap}
        .mmv-trust-item{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--muted);letter-spacing:0.06em;text-transform:uppercase}
        .mmv-trust-icon{color:var(--gold)}

        /* ACCREDITATION BAR */
        .mmv-accred-bar{background:var(--navy-light);border-bottom:1px solid rgba(201,169,110,0.1);padding:16px 48px;display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap}
        .mmv-accred-badge{display:flex;align-items:center;gap:8px;padding:8px 18px;border:1px solid rgba(201,169,110,0.25);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold-light)}
        .mmv-accred-badge svg{width:16px;height:16px;fill:var(--gold)}

        /* SECTIONS */
        .mmv-section{padding:100px 48px}
        .mmv-max{max-width:1200px;margin:0 auto}
        .mmv-section-title{font-family:var(--serif);font-size:clamp(32px,4vw,52px);font-weight:300;line-height:1.2;color:var(--white);margin-bottom:16px}
        .mmv-section-title em{font-style:italic;color:var(--gold)}
        .mmv-divider{width:48px;height:1px;background:var(--gold);margin:24px 0}

        /* TREATMENTS */
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

        /* CALCULATOR */
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

        /* PROCESS */
        .mmv-process{background:var(--navy)}
        .mmv-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:64px}
        .mmv-step{text-align:center;padding:0 24px}
        .mmv-step-num{width:56px;height:56px;border:1px solid rgba(201,169,110,0.4);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-family:var(--serif);font-size:20px;font-weight:300;color:var(--gold);background:var(--navy)}
        .mmv-step-title{font-family:var(--serif);font-size:20px;font-weight:300;color:var(--white);margin-bottom:12px}
        .mmv-step-desc{font-size:13px;line-height:1.8;color:var(--muted)}

        /* DOCTOR */
        .mmv-doctor{background:var(--navy-light);border-top:1px solid rgba(201,169,110,0.1);border-bottom:1px solid rgba(201,169,110,0.1)}
        .mmv-doctor-grid{display:grid;grid-template-columns:1fr 1.6fr;gap:80px;align-items:start;margin-top:64px}
        .mmv-doctor-img-wrap{position:relative}
        .mmv-doctor-img{width:100%;aspect-ratio:3/4;object-fit:cover;filter:brightness(0.9)}
        .mmv-doctor-badge{position:absolute;bottom:24px;left:24px;right:24px;background:rgba(10,14,26,0.92);border:1px solid rgba(201,169,110,0.3);padding:16px 20px;display:flex;align-items:center;gap:14px}
        .mmv-doctor-badge-icon{width:36px;height:36px;border:1px solid rgba(201,169,110,0.4);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:16px;flex-shrink:0}
        .mmv-doctor-badge-text{font-size:12px;color:var(--muted);line-height:1.5}
        .mmv-doctor-badge-text strong{color:var(--gold);display:block;font-size:13px;font-weight:400;margin-bottom:2px}
        .mmv-doctor-name{font-family:var(--serif);font-size:clamp(28px,3.5vw,44px);font-weight:300;color:var(--white);margin-bottom:6px}
        .mmv-doctor-title{font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:24px}
        .mmv-doctor-bio{font-size:15px;line-height:1.9;color:var(--muted);margin-bottom:20px}
        .mmv-doctor-specs{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:36px}
        .mmv-spec-item{background:var(--navy);border:1px solid rgba(201,169,110,0.12);padding:16px 20px}
        .mmv-spec-label{font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
        .mmv-spec-value{font-size:14px;color:var(--white);line-height:1.5}
        .mmv-doctor-quote{border-left:2px solid var(--gold);padding-left:24px;margin:32px 0;font-family:var(--serif);font-size:18px;font-style:italic;color:var(--white);line-height:1.7;font-weight:300}
        .mmv-doctor-expertise{margin-top:32px}
        .mmv-expertise-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
        .mmv-expertise-tag{padding:6px 16px;border:1px solid rgba(201,169,110,0.25);font-size:12px;color:var(--gold-light);letter-spacing:0.05em}

        /* REVIEWS */
        .mmv-reviews{background:var(--navy)}
        .mmv-reviews-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:48px;flex-wrap:wrap;gap:24px}
        .mmv-tp-score{display:flex;align-items:center;gap:20px;background:var(--navy-light);border:1px solid rgba(201,169,110,0.15);padding:20px 32px}
        .mmv-tp-logo{display:flex;align-items:center;gap:8px}
        .mmv-tp-logo-text{font-size:14px;font-weight:500;color:var(--white);letter-spacing:0.02em}
        .mmv-tp-stars{display:flex;gap:3px}
        .mmv-tp-star{width:22px;height:22px;background:#00b67a;display:flex;align-items:center;justify-content:center}
        .mmv-tp-star svg{width:14px;height:14px;fill:white}
        .mmv-tp-score-num{font-family:var(--serif);font-size:36px;font-weight:300;color:var(--white);line-height:1}
        .mmv-tp-score-sub{font-size:11px;color:var(--muted);letter-spacing:0.08em;text-transform:uppercase;margin-top:2px}
        .mmv-tp-divider{width:1px;height:48px;background:rgba(201,169,110,0.2)}
        .mmv-reviews-note{font-size:12px;color:var(--muted);font-style:italic}
        .mmv-reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
        .mmv-review-card{background:var(--navy-light);padding:36px;border:1px solid rgba(201,169,110,0.08);transition:border-color 0.3s;position:relative}
        .mmv-review-card:hover{border-color:rgba(201,169,110,0.3)}
        .mmv-review-card::before{content:'"';font-family:var(--serif);font-size:80px;color:rgba(201,169,110,0.08);position:absolute;top:16px;right:20px;line-height:1}
        .mmv-review-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
        .mmv-review-stars{display:flex;gap:2px}
        .mmv-review-star{width:16px;height:16px;background:#00b67a;display:flex;align-items:center;justify-content:center}
        .mmv-review-star svg{width:10px;height:10px;fill:white}
        .mmv-review-verified{display:flex;align-items:center;gap:4px;font-size:10px;color:#00b67a;letter-spacing:0.06em;text-transform:uppercase}
        .mmv-review-quote{font-family:var(--serif);font-size:16px;font-weight:300;line-height:1.7;color:var(--white);margin-bottom:20px;font-style:italic}
        .mmv-review-author{display:flex;align-items:center;gap:12px;padding-top:16px;border-top:1px solid rgba(201,169,110,0.08)}
        .mmv-review-avatar{width:36px;height:36px;border-radius:50%;background:var(--navy-mid);border:1px solid rgba(201,169,110,0.3);display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:14px;color:var(--gold);flex-shrink:0}
        .mmv-review-name{font-size:13px;color:var(--white);font-weight:400}
        .mmv-review-meta{font-size:11px;color:var(--muted);margin-top:2px}
        .mmv-review-saving{font-size:11px;color:var(--gold);margin-top:2px}
        .mmv-reviews-cta{text-align:center;margin-top:48px}
        .mmv-reviews-cta p{font-size:13px;color:var(--muted);margin-bottom:20px}

        /* GUARANTEE */
        .mmv-guarantee{background:var(--navy-mid)}
        .mmv-guarantee-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:64px}
        .mmv-guarantee-item{background:var(--navy-light);padding:40px 32px;text-align:center;border:1px solid rgba(201,169,110,0.08)}
        .mmv-guarantee-icon{width:56px;height:56px;border:1px solid rgba(201,169,110,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:var(--gold);font-size:22px}
        .mmv-guarantee-title{font-family:var(--serif);font-size:20px;font-weight:300;color:var(--white);margin-bottom:10px}
        .mmv-guarantee-desc{font-size:13px;color:var(--muted);line-height:1.7}

        /* GALLERY */
        .mmv-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:48px}
        .mmv-gallery-item{aspect-ratio:1;overflow:hidden}
        .mmv-gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s;filter:brightness(0.9)}
        .mmv-gallery-item img:hover{transform:scale(1.05)}

        /* ABOUT */
        .mmv-about{background:var(--navy-mid)}
        .mmv-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:64px}
        .mmv-about-img{width:100%;aspect-ratio:3/4;object-fit:cover;filter:brightness(0.85)}
        .mmv-about-text{font-size:15px;line-height:1.9;color:var(--muted);margin-bottom:20px}
        .mmv-creds{display:flex;flex-direction:column;gap:16px;margin-top:40px}
        .mmv-cred{display:flex;align-items:flex-start;gap:16px}
        .mmv-cred-icon{width:32px;height:32px;border:1px solid rgba(201,169,110,0.3);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:12px;flex-shrink:0;margin-top:2px}
        .mmv-cred-text{font-size:13px;color:var(--muted);line-height:1.6}
        .mmv-cred-text strong{color:var(--white);font-weight:400;display:block;margin-bottom:2px}

        /* FAQ */
        .mmv-faq{background:var(--navy)}
        .mmv-faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:64px}
        .mmv-faq-item{background:var(--navy-light);border:1px solid rgba(201,169,110,0.08);overflow:hidden}
        .mmv-faq-q{padding:24px 28px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;transition:background 0.2s}
        .mmv-faq-q:hover{background:rgba(201,169,110,0.04)}
        .mmv-faq-q-text{font-size:14px;color:var(--white);line-height:1.5;font-weight:400}
        .mmv-faq-toggle{color:var(--gold);font-size:20px;flex-shrink:0;transition:transform 0.3s;line-height:1}
        .mmv-faq-toggle.open{transform:rotate(45deg)}
        .mmv-faq-a{display:none;padding:0 28px 24px;font-size:13px;color:var(--muted);line-height:1.8}
        .mmv-faq-a.open{display:block}

        /* CONTACT */
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

        /* FOOTER */
        .mmv-footer{background:var(--navy);border-top:1px solid rgba(201,169,110,0.15);padding:40px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
        .mmv-footer-logo{font-family:var(--serif);font-size:20px;font-weight:300;letter-spacing:0.12em;color:var(--gold)}
        .mmv-footer-text{font-size:12px;color:var(--muted)}
        .mmv-footer-wa{display:flex;align-items:center;gap:8px;background:rgba(37,211,102,0.1);border:1px solid rgba(37,211,102,0.3);color:#25d366;padding:10px 20px;text-decoration:none;font-size:13px;transition:all 0.3s}
        .mmv-footer-wa:hover{background:rgba(37,211,102,0.2)}

        /* WHATSAPP FLOAT */
        .mmv-wa-float{position:fixed;bottom:32px;right:32px;z-index:200;background:#25d366;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 24px rgba(37,211,102,0.4);transition:transform 0.3s}
        .mmv-wa-float:hover{transform:scale(1.1)}
        .mmv-wa-float svg{width:28px;height:28px;fill:#fff}

        /* EXIT INTENT POPUP */
        .mmv-exit-overlay{position:fixed;inset:0;background:rgba(10,14,26,0.92);z-index:500;display:none;align-items:center;justify-content:center;padding:24px}
        .mmv-exit-overlay.show{display:flex}
        .mmv-exit-box{background:var(--navy-light);border:1px solid rgba(201,169,110,0.3);max-width:540px;width:100%;padding:56px 48px;position:relative;text-align:center}
        .mmv-exit-close{position:absolute;top:16px;right:20px;color:var(--muted);cursor:pointer;font-size:22px;background:none;border:none;line-height:1}
        .mmv-exit-close:hover{color:var(--white)}
        .mmv-exit-eyebrow{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
        .mmv-exit-title{font-family:var(--serif);font-size:36px;font-weight:300;color:var(--white);margin-bottom:12px;line-height:1.2}
        .mmv-exit-title em{color:var(--gold);font-style:italic}
        .mmv-exit-sub{font-size:14px;color:var(--muted);margin-bottom:32px;line-height:1.7}
        .mmv-exit-actions{display:flex;flex-direction:column;gap:12px}
        .mmv-exit-dismiss{font-size:12px;color:var(--muted);cursor:pointer;margin-top:8px;text-decoration:underline;background:none;border:none}

        /* MOBILE */
        @media(max-width:900px){
          .mmv-nav{padding:16px 24px}
          .mmv-nav-links{display:none}
          .mmv-hero-content,.mmv-calc-grid,.mmv-about-grid,.mmv-contact-grid,.mmv-doctor-grid{grid-template-columns:1fr;gap:40px}
          .mmv-hero-content{padding:0 24px}
          .mmv-section{padding:64px 24px}
          .mmv-treatments-grid,.mmv-reviews-grid,.mmv-faq-grid{grid-template-columns:1fr}
          .mmv-guarantee-grid{grid-template-columns:1fr 1fr}
          .mmv-gallery{grid-template-columns:repeat(2,1fr)}
          .mmv-steps{grid-template-columns:1fr 1fr;gap:40px}
          .mmv-trust{padding:20px 24px;gap:24px}
          .mmv-accred-bar{padding:16px 24px;gap:12px}
          .mmv-form-row{grid-template-columns:1fr}
          .mmv-footer{flex-direction:column;text-align:center;padding:32px 24px}
          .mmv-doctor-specs{grid-template-columns:1fr}
          .mmv-reviews-header{flex-direction:column;align-items:flex-start}
          .mmv-exit-box{padding:40px 28px}
          .mmv-exit-title{font-size:28px}
        }
      `}</style>

      {/* SCHEMA MARKUP — SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Dentist",
            "name": "MMV Medical",
            "description": "MMV Medical connects European patients with specialist dental care in Istanbul, Turkey. Treatments include dental implants, veneers, crowns, and full smile design at up to 70% less than UK prices.",
            "url": "https://www.mmvmedical.org",
            "telephone": "+905527827698",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Merkez Mah. Halaskargazi Cad. Kuran İş Merk. No: 145 İç Kapı No: 2",
              "addressLocality": "Şişli",
              "addressRegion": "Istanbul",
              "addressCountry": "TR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 41.0577,
              "longitude": 28.9936
            },
            "openingHours": "Mo-Sa 09:00-19:00",
            "priceRange": "££",
            "image": "https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.40.jpeg",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "47",
              "bestRating": "5"
            }
          },
          {
            "@type": "Person",
            "name": "Dr. Mehmet Akif Türkan",
            "jobTitle": "Periodontist & Implant Surgeon",
            "worksFor": { "@type": "Dentist", "name": "Dr. Mat Dental Clinic" },
            "alumniOf": "Istanbul University Faculty of Dentistry",
            "knowsAbout": ["Dental Implants","Periodontics","Sinus Lifting","Bone Augmentation","Zirconia Crowns"]
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Is it safe to get dental treatment in Turkey?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Turkey is one of the world's leading dental tourism destinations. Dr. Mat Dental Clinic is MOH-licensed and uses the same implant systems as top European clinics — Straumann and Nobel Biocare." } },
              { "@type": "Question", "name": "How many trips to Istanbul will I need?", "acceptedAnswer": { "@type": "Answer", "text": "Most treatments including implants, veneers, and crowns can be completed in a single visit of 3–5 days. Complex cases may require a second short trip for final fitting." } },
              { "@type": "Question", "name": "What happens if something goes wrong after I return home?", "acceptedAnswer": { "@type": "Answer", "text": "Your coordinator remains your point of contact after you return home. All treatments include a guarantee period and we arrange remote consultations or a follow-up visit if required." } }
            ]
          }
        ]
      })}}/>

      <div className="mmv-body">

        {/* NAV */}
        <nav className="mmv-nav" id="mmv-nav">
          <a href="/" className="mmv-logo">MMV Medical</a>
          <ul className="mmv-nav-links">
            <li><a href="#treatments">Treatments</a></li>
            <li><a href="#calculator">Savings</a></li>
            <li><a href="#doctor">Our Doctor</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#faq">FAQ</a></li>
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
              <p className="mmv-hero-sub">MMV Medical connects European patients with Dr. Mat Dental Clinic in Istanbul — led by specialist periodontist Dr. Mehmet Akif Türkan. Your dedicated coordinator handles everything from consultation to aftercare.</p>
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
              <div className="mmv-stat"><div className="mmv-stat-n">10+</div><div className="mmv-stat-l">Years specialist surgical experience</div></div>
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

        {/* ACCREDITATION BAR */}
        <div className="mmv-accred-bar">
          <div className="mmv-accred-badge">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            MOH Licensed
          </div>
          <div className="mmv-accred-badge">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            Straumann Implants
          </div>
          <div className="mmv-accred-badge">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            Nobel Biocare
          </div>
          <div className="mmv-accred-badge">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            Periodontology Specialist
          </div>
          <div className="mmv-accred-badge">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            5-Year Treatment Guarantee
          </div>
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
                {n:'01',t:'Free Consultation',d:'Share your dental history and X-rays. We prepare a personalised treatment plan with full transparent pricing within 24 hours — no hidden fees, ever.'},
                {n:'02',t:'Plan Your Trip',d:'We coordinate your flights, hotel, and all clinic appointments. VIP airport transfers and 4-star accommodation are included in your package.'},
                {n:'03',t:'Expert Treatment',d:'Treated by Dr. Mehmet Akif Türkan — specialist periodontist and implant surgeon — at our MOH-licensed clinic. Your coordinator attends every appointment.'},
                {n:'04',t:'Lifetime Aftercare',d:'Full aftercare package and ongoing WhatsApp support after you return home. We remain your point of contact for any follow-up, forever.'},
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

        {/* DOCTOR PROFILE */}
        <section className="mmv-section mmv-doctor" id="doctor">
          <div className="mmv-max">
            <div className="mmv-eyebrow">Your Specialist</div>
            <h2 className="mmv-section-title">Meet the Surgeon<br/><em>Behind Your Smile</em></h2>
            <div className="mmv-doctor-grid">
              <div className="mmv-doctor-img-wrap">
                <img
                  src="https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(6).jpeg"
                  alt="Dr. Mehmet Akif Türkan — Periodontist & Implant Surgeon"
                  className="mmv-doctor-img"
                />
                <div className="mmv-doctor-badge">
                  <div className="mmv-doctor-badge-icon">✦</div>
                  <div className="mmv-doctor-badge-text">
                    <strong>Thousands of Implants Performed</strong>
                    Sinus lifting · Bone augmentation · Complex surgical cases
                  </div>
                </div>
              </div>
              <div>
                <div className="mmv-doctor-name">Dr. Mehmet Akif Türkan</div>
                <div className="mmv-doctor-title">Dt. · Periodontology Specialist · Implant Surgeon</div>
                <div className="mmv-divider"></div>
                <p className="mmv-doctor-bio">
                  Born in Istanbul in 1989, Dr. Türkan graduated from the Faculty of Dentistry in 2014 and completed his specialist training in Periodontology in 2020 — qualifying him in the advanced surgical treatment of gum disease and implant surgery.
                </p>
                <p className="mmv-doctor-bio">
                  He has performed thousands of implant surgeries, sinus lifting procedures, and bone grafting operations, maintaining exceptionally high success rates even in complex, multi-stage cases that other clinics decline to take.
                </p>
                <p className="mmv-doctor-bio">
                  A speaker at national and international dental congresses, Dr. Türkan follows the latest science closely and applies only evidence-based techniques — using premium implant systems exclusively.
                </p>

                <blockquote className="mmv-doctor-quote">
                  &ldquo;Protecting dental health is one of the most important steps you can take for your overall wellbeing. Every patient is unique — and every treatment plan we create reflects that.&rdquo;
                </blockquote>

                <div className="mmv-doctor-specs">
                  <div className="mmv-spec-item">
                    <div className="mmv-spec-label">Graduated</div>
                    <div className="mmv-spec-value">Faculty of Dentistry, 2014</div>
                  </div>
                  <div className="mmv-spec-item">
                    <div className="mmv-spec-label">Specialisation</div>
                    <div className="mmv-spec-value">Periodontology, 2020</div>
                  </div>
                  <div className="mmv-spec-item">
                    <div className="mmv-spec-label">Location</div>
                    <div className="mmv-spec-value">Şişli, Istanbul</div>
                  </div>
                  <div className="mmv-spec-item">
                    <div className="mmv-spec-label">Implant Systems</div>
                    <div className="mmv-spec-value">Straumann · Nobel Biocare</div>
                  </div>
                </div>

                <div className="mmv-doctor-expertise">
                  <div className="mmv-spec-label">Areas of Expertise</div>
                  <div className="mmv-expertise-tags">
                    {['Dental Implants','Periodontics','Sinus Lifting','Bone Augmentation','Zirconia Crowns','Surgical Gum Treatment','Complex Surgical Cases','Smile Design'].map(tag=>(
                      <span key={tag} className="mmv-expertise-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PATIENT REVIEWS */}
        <section className="mmv-section mmv-reviews" id="reviews">
          <div className="mmv-max">
            <div className="mmv-eyebrow">Patient Reviews</div>
            <h2 className="mmv-section-title">Real Patients,<br/><em>Real Results</em></h2>
            <div className="mmv-reviews-header">
              <div className="mmv-tp-score">
                <div>
                  <div className="mmv-tp-score-num">4.9</div>
                  <div className="mmv-tp-score-sub">Patient Rating</div>
                </div>
                <div className="mmv-tp-divider"></div>
                <div>
                  <div className="mmv-tp-stars">
                    {[1,2,3,4,5].map(s=>(
                      <div key={s} className="mmv-tp-star">
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:'11px',color:'var(--muted)',marginTop:'6px',letterSpacing:'0.06em',textTransform:'uppercase'}}>Based on 47 patient reviews</div>
                </div>
              </div>
              <p className="mmv-reviews-note">All reviews are from verified patients. More reviews on Google and Trustpilot.</p>
            </div>
            <div className="mmv-reviews-grid">
              {[
                {i:'S',n:'Sarah M.',l:'Manchester, UK 🇬🇧',d:'February 2026',save:'Saved £4,200',treatment:'2 Dental Implants',q:'My coordinator was available on WhatsApp at all hours. The whole trip felt completely seamless — transfers, hotel, clinic. The implants are perfect and I saved over £4,000. I wish I had done this sooner.'},
                {i:'D',n:'Declan O.',l:'Dublin, Ireland 🇮🇪',d:'January 2026',save:'Saved €7,400',treatment:'Full Veneers (10)',q:'I was nervous about travelling for dental work but the team made every single step easy. The clinic is modern and spotless. My veneers look completely natural — my dentist at home was genuinely impressed.'},
                {i:'M',n:'Mieke V.',l:'Amsterdam, Netherlands 🇳🇱',d:'March 2026',save:'Saved €13,500',treatment:'All-on-4',q:'The pricing was exactly as quoted — not a cent more. Dr. Türkan explained every step clearly. I got my All-on-4 done in 4 days and flew home smiling. Cannot recommend this team highly enough.'},
                {i:'J',n:'James H.',l:'Birmingham, UK 🇬🇧',d:'January 2026',save:'Saved £2,980',treatment:'Zirconia Crowns',q:'Arrived not knowing what to expect. Left with 6 perfect crowns and a hotel stay that felt like a holiday. The coordinator met me at the airport. Genuinely five-star from start to finish.'},
                {i:'A',n:'Anke B.',l:'Hamburg, Germany 🇩🇪',d:'February 2026',save:'Saved €5,600',treatment:'Smile Design',q:'The doctor took time to understand exactly what I wanted. The results are beyond what I imagined — completely natural. Communication was perfect in English throughout. Worth every bit of the journey.'},
                {i:'L',n:'Lena K.',l:'Zurich, Switzerland 🇨🇭',d:'March 2026',save:'Saved CHF 8,200',treatment:'Single Implant',q:'Swiss dental prices are ridiculous. MMV Medical gave me the same quality — arguably better — at a fifth of the cost. The clinic is cleaner than most I have visited in Switzerland. Remarkable.'},
              ].map(r=>(
                <div key={r.n} className="mmv-review-card">
                  <div className="mmv-review-top">
                    <div className="mmv-review-stars">
                      {[1,2,3,4,5].map(s=>(
                        <div key={s} className="mmv-review-star">
                          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                      ))}
                    </div>
                    <div className="mmv-review-verified">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#00b67a"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                      Verified patient
                    </div>
                  </div>
                  <p className="mmv-review-quote">&ldquo;{r.q}&rdquo;</p>
                  <div className="mmv-review-author">
                    <div className="mmv-review-avatar">{r.i}</div>
                    <div>
                      <div className="mmv-review-name">{r.n}</div>
                      <div className="mmv-review-meta">{r.l} · {r.d} · {r.treatment}</div>
                      <div className="mmv-review-saving">{r.save}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mmv-reviews-cta">
              <p>Ready to join our patients? Get your personalised treatment plan within 24 hours.</p>
              <a href="#contact" className="mmv-btn">Book Free Consultation →</a>
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="mmv-section mmv-guarantee">
          <div className="mmv-max">
            <div className="mmv-eyebrow">Our Promise</div>
            <h2 className="mmv-section-title">Why Patients Trust<br/><em>MMV Medical</em></h2>
            <div className="mmv-guarantee-grid">
              {[
                {icon:'✦',title:'5-Year Guarantee',desc:'All implants and prosthetic treatments carry a minimum 5-year guarantee. If anything is not right, we fix it.'},
                {icon:'◈',title:'No Hidden Costs',desc:'Your quote is your final price. We confirm every cost in writing before you book a flight. No surprises on arrival.'},
                {icon:'◎',title:'Specialist Surgeon',desc:'Dr. Türkan is a trained periodontology specialist — not a general dentist. For complex cases, this matters enormously.'},
                {icon:'◇',title:'Lifetime Aftercare',desc:'Your coordinator does not disappear after treatment. WhatsApp support, remote consultations, and follow-up visits are all included.'},
              ].map(g=>(
                <div key={g.title} className="mmv-guarantee-item">
                  <div className="mmv-guarantee-icon">{g.icon}</div>
                  <div className="mmv-guarantee-title">{g.title}</div>
                  <div className="mmv-guarantee-desc">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE AFTER GALLERY */}
        <section className="mmv-section" id="results" style={{background:'var(--navy)'}}>
          <div className="mmv-max">
            <div className="mmv-eyebrow">Real Results</div>
            <h2 className="mmv-section-title">Before & After<br/><em>Dr. Mat Dental Clinic</em></h2>
            <p style={{fontSize:'14px',color:'var(--muted)',marginBottom:'48px',maxWidth:'560px',lineHeight:'1.8'}}>Every result shown is a real patient treated at Dr. Mat Dental Clinic in Istanbul. No filters, no stock photos — just real transformations by Dr. Türkan.</p>
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
                  <img src={url} alt={`Patient result ${i+1} — Dr. Mat Dental Clinic Istanbul`}/>
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
              <div><img src="https://tkywpdpduoucwmpgtkrd.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-04-08%20at%2014.27.44%20(6).jpeg" alt="Dr. Mat Dental Clinic Istanbul interior" className="mmv-about-img"/></div>
              <div>
                <div className="mmv-eyebrow">About MMV Medical</div>
                <h2 className="mmv-section-title">Specialist Care,<br/><em>Personal Service</em></h2>
                <div className="mmv-divider"></div>
                <p className="mmv-about-text">MMV Medical was founded to give European patients direct access to world-class dental care in Istanbul — with the same level of trust, transparency, and personalised attention they would expect at home, at a fraction of the price.</p>
                <p className="mmv-about-text">We work exclusively with Dr. Mat Dental Clinic, led by specialist periodontist Dr. Mehmet Akif Türkan. Every patient is assigned a personal coordinator who speaks your language and is available from first enquiry to final check-up.</p>
                <div className="mmv-creds">
                  {[
                    {t:'Dr. Mehmet Akif Türkan — Periodontology Specialist',d:'10+ years surgical experience. Thousands of implants, sinus lifts, and bone augmentations performed.'},
                    {t:'MOH-Licensed Clinic, Şişli Istanbul',d:'Straumann & Nobel Biocare implant systems. Modern facility meeting European hygiene standards.'},
                    {t:'Personal Coordinator Service',d:'English-speaking coordinator from first WhatsApp to post-treatment follow-up.'},
                    {t:'Transparent Pricing',d:'Full treatment cost confirmed before you book — no surprises on arrival, ever.'},
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

        {/* FAQ */}
        <section className="mmv-section mmv-faq" id="faq">
          <div className="mmv-max">
            <div className="mmv-eyebrow">Common Questions</div>
            <h2 className="mmv-section-title">Everything You Need<br/><em>To Know</em></h2>
            <div style={{marginTop:'16px',marginBottom:'48px',maxWidth:'560px'}}>
              <p style={{fontSize:'14px',color:'var(--muted)',lineHeight:'1.8'}}>We understand that travelling abroad for dental treatment raises questions. Here are honest answers to the questions our patients ask most.</p>
            </div>
            <div className="mmv-faq-grid">
              {[
                {q:'Is it safe to get dental treatment in Turkey?',a:'Yes. Turkey is one of the world\'s leading dental tourism destinations with strict Ministry of Health licensing requirements. Dr. Mat Dental Clinic is MOH-licensed and uses exactly the same implant systems as top European clinics — Straumann and Nobel Biocare. Dr. Türkan is a trained specialist, not a general dentist.'},
                {q:'How many trips to Istanbul will I need?',a:'Most treatments — including implants, full veneers, crowns, and smile design — can be completed in a single visit of 3–5 days. Treatments requiring healing time before final fitting (such as All-on-4 or All-on-6) may require a short second trip after 3–6 months.'},
                {q:'What happens if something goes wrong after I return home?',a:'Your coordinator remains your point of contact permanently after treatment. All treatments include a minimum 5-year guarantee. If any issue arises, we arrange remote video consultations first, and if a return visit is required, we coordinate and support the process.'},
                {q:'Will I be in pain during or after treatment?',a:'Modern dental anaesthesia is extremely effective. You will not feel pain during procedures. Some post-surgical tenderness is normal after implants, typically managed with standard over-the-counter pain relief. Dr. Türkan\'s surgical approach prioritises minimal-trauma techniques to reduce recovery time.'},
                {q:'How do I know the pricing is accurate before I commit?',a:'Before you book anything, we provide a written treatment plan with itemised costs. The quoted price is the final price — not an estimate. We have never charged a patient more than their quoted price. This is a core MMV Medical policy, not an aspiration.'},
                {q:'Can I see the clinic before deciding?',a:'Yes. We offer virtual clinic tours via WhatsApp video call with your coordinator before you commit. You can see the treatment rooms, sterilisation equipment, and meet the team. Transparency is everything to us.'},
                {q:'What is included in the package — flights and hotel?',a:'We coordinate VIP airport transfers (included), recommend and assist with 4-star hotel bookings within walking distance of the clinic, and manage all clinic appointment scheduling. Flights are booked by you, but we help you plan the optimal dates around your treatment timeline.'},
                {q:'What implant brands do you use?',a:'Dr. Türkan uses exclusively Straumann and Nobel Biocare implant systems — the same premium brands used in top European and US clinics. We never use unbranded or low-cost implant systems, which is why our success rates are high.'},
                {q:'Can I get a free consultation before committing to anything?',a:'Absolutely — this is always the first step. Share your dental history, any X-rays you have, and your treatment interest via the form below or WhatsApp. We will send a personalised treatment plan with full pricing within 24 hours. No commitment, no pressure, no follow-up calls unless you want them.'},
                {q:'How does MMV Medical make money if you are not the clinic?',a:'MMV Medical is a dental tourism coordination service. We charge the clinic a referral fee for patients we bring — which does not affect your treatment price. The savings you see are real: Istanbul prices are genuinely that much lower than European equivalents, even after our coordination fee.'},
              ].map((item,i)=>(
                <div key={i} className="mmv-faq-item">
                  <div className="mmv-faq-q" onClick={()=>{
                    if(typeof document!=='undefined'){
                      const toggle = document.getElementById(`faq-toggle-${i}`);
                      const answer = document.getElementById(`faq-answer-${i}`);
                      if(toggle && answer){
                        toggle.classList.toggle('open');
                        answer.classList.toggle('open');
                      }
                    }
                  }}>
                    <span className="mmv-faq-q-text">{item.q}</span>
                    <span className="mmv-faq-toggle" id={`faq-toggle-${i}`}>+</span>
                  </div>
                  <div className="mmv-faq-a" id={`faq-answer-${i}`}>{item.a}</div>
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
                <p className="mmv-contact-text">Share your situation and we will send a personalised treatment plan with exact pricing from Dr. Türkan — no commitment required, no pushy follow-up calls.</p>
                <div className="mmv-promises">
                  {['Response within 24 hours, usually much faster','Exact pricing with no hidden costs','No obligation — information only until you decide','English-speaking coordinator assigned from day one','WhatsApp or email — whichever you prefer','5-year treatment guarantee on all work'].map(p=>(
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
                  <p className="mmv-success-text">Thank you. Your coordinator will be in touch within 24 hours with a personalised treatment plan and exact pricing from Dr. Türkan.</p>
                  <a href="https://wa.me/905527827698" target="_blank" className="mmv-btn" style={{display:'inline-block',marginTop:'24px'}}>💬 Message on WhatsApp Now</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mmv-footer">
          <div className="mmv-footer-logo">MMV Medical</div>
          <div className="mmv-footer-text">© 2026 MMV Medical · Istanbul, Turkey · Connecting European patients with specialist dental care.<br/>Dr. Mat Dental Clinic · Merkez Mah. Halaskargazi Cad. No:145, Şişli · Mon–Sat 09:00–19:00</div>
          <a href="https://wa.me/905527827698" target="_blank" className="mmv-footer-wa">💬 WhatsApp Us</a>
        </footer>

        {/* WHATSAPP FLOAT */}
        <a href="https://wa.me/905527827698" target="_blank" className="mmv-wa-float" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>

        {/* EXIT INTENT POPUP */}
        <div className="mmv-exit-overlay" id="mmv-exit-popup">
          <div className="mmv-exit-box">
            <button className="mmv-exit-close" onClick={()=>{if(typeof document!=='undefined'){document.getElementById('mmv-exit-popup')?.classList.remove('show')}}}>×</button>
            <div className="mmv-exit-eyebrow">Before you go</div>
            <h3 className="mmv-exit-title">Get Your Free<br/><em>Treatment Plan</em></h3>
            <p className="mmv-exit-sub">Find out exactly how much you could save. No commitment. Dr. Türkan&apos;s team responds within 24 hours with a full personalised quote.</p>
            <div className="mmv-exit-actions">
              <a href="#contact" className="mmv-btn" onClick={()=>{if(typeof document!=='undefined'){document.getElementById('mmv-exit-popup')?.classList.remove('show')}}}>Get My Free Plan →</a>
              <a href="https://wa.me/905527827698" target="_blank" className="mmv-btn-ghost">💬 WhatsApp Us Now</a>
            </div>
            <button className="mmv-exit-dismiss" onClick={()=>{if(typeof document!=='undefined'){document.getElementById('mmv-exit-popup')?.classList.remove('show')}}}>No thanks, I&apos;ll pay full price at home</button>
          </div>
        </div>

        {/* ALL SCRIPTS */}
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

          async function submitForm(){
            var name=document.getElementById('f-name').value;
            var email=document.getElementById('f-email').value;
            var country=document.getElementById('f-country').value;
            var treatment=document.getElementById('f-treatment').value;
            var wa=document.getElementById('f-wa').value;
            var budget=document.getElementById('f-budget').value;
            var notes=document.getElementById('f-notes').value;
            if(!name||!email){alert('Please enter your name and email.');return;}
            try {
              await fetch('/api/leads',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({full_name:name,email:email,whatsapp:wa,country:country,treatment_interest:treatment||'Not specified',budget_range:budget,notes:notes,source:'website',stage:'new'})
              });
            } catch(e){ console.log('Lead save error',e); }
            var msg=encodeURIComponent('New MMV Medical Enquiry\\n\\nName: '+name+'\\nCountry: '+country+'\\nEmail: '+email+'\\nWhatsApp: '+wa+'\\nTreatment: '+treatment+'\\nBudget: '+budget+'\\nNotes: '+notes);
            window.open('https://wa.me/905527827698?text='+msg,'_blank');
            document.getElementById('form-fields').style.display='none';
            document.getElementById('form-success').classList.add('show');
          }

          /* NAV scroll effect */
          window.addEventListener('scroll',function(){
            var nav=document.getElementById('mmv-nav');
            if(nav){nav.classList.toggle('scrolled',window.scrollY>80);}
          });

          /* EXIT INTENT */
          var exitShown=false;
          var exitTimer=null;
          function showExit(){
            if(!exitShown){
              exitShown=true;
              var popup=document.getElementById('mmv-exit-popup');
              if(popup)popup.classList.add('show');
            }
          }
          document.addEventListener('mouseleave',function(e){
            if(e.clientY<=0)showExit();
          });
          exitTimer=setTimeout(function(){
            if(!exitShown)showExit();
          },120000);

          window.updateCalc=updateCalc;
          window.submitForm=submitForm;
          window.selectedTreatment=selectedTreatment;
          updateCalc();
        `}}/>
      </div>
    </>
  )
}
