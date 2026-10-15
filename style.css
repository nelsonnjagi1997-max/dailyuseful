
:root {
  --navy: #10243a;
  --navy-light: #193752;
  --blue: #2463eb;
  --blue-dark: #174ac0;
  --background: #f5f7fb;
  --white: #ffffff;
  --text: #1b2638;
  --muted: #687589;
  --border: #e0e6ef;
  --success-bg: #eaf8ef;
  --success-text: #17643a;
  --error-bg: #fff0f0;
  --error-text: #a61b1b;
  --radius: 16px;
  --shadow: 0 8px 28px rgba(16, 36, 58, 0.06);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 85px;
}

body {
  margin: 0;
  background: var(--white);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.65;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}

button,
select {
  cursor: pointer;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid #91b4ff;
  outline-offset: 3px;
}

.container {
  width: min(1120px, calc(100% - 40px));
  margin-inline: auto;
}

.narrow {
  max-width: 760px;
  margin-inline: auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid var(--border);
}

.nav {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  color: var(--navy);
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: -0.7px;
  white-space: nowrap;
}

.brand span {
  color: var(--blue);
}

.nav nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.nav nav a,
.footer-links a {
  color: var(--muted);
  font-size: 0.94rem;
  font-weight: 600;
}

.nav nav a:hover,
.footer-links a:hover {
  color: var(--blue);
}

.hero {
  padding: 94px 0 84px;
  background:
    radial-gradient(ellipse at 90% 10%, rgba(61, 111, 207, 0.25), transparent 35%),
    linear-gradient(135deg, var(--navy), var(--navy-light));
  color: var(--white);
}

.hero-content {
  max-width: 1120px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  color: var(--blue);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 1.7px;
  text-transform: uppercase;
}

.hero .eyebrow {
  color: #a8c6ff;
}

.hero h1 {
  max-width: 750px;
  margin: 0 0 20px;
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  line-height: 1.08;
  letter-spacing: -2px;
}

.hero-content > p:not(.trust-line) {
  max-width: 680px;
  color: #d7e2f1;
  font-size: 1.12rem;
}

.trust-line {
  margin-top: 25px;
  color: #c0d0e4;
  font-size: 0.9rem;
}

.button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  padding: 11px 19px;
  border: 0;
  border-radius: 9px;
  font-weight: 700;
  text-align: center;
  transition: background 0.2s, transform 0.2s;
}

.button:hover {
  transform: translateY(-1px);
}

.button-primary {
  background: var(--blue);
  color: var(--white);
}

.button-primary:hover {
  background: var(--blue-dark);
}

.hero .button {
  margin-top: 14px;
  background: #ffffff;
  color: var(--navy);
}

.hero .button:hover {
  background: #eaf0ff;
}

.button-secondary {
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
}

.button-secondary:hover {
  background: var(--background);
}

.currency-section {
  padding: 32px 0;
  background: var(--background);
  border-bottom: 1px solid var(--border);
}

.currency-panel {
  display: grid;
  grid-template-columns: 1fr minmax(230px, 340px);
  align-items: center;
  gap: 35px;
}

.currency-panel h2,
.section-heading h2,
.narrow h2,
.contact-panel h2 {
  margin: 0 0 10px;
  color: var(--navy);
  font-size: clamp(1.65rem, 3vw, 2.2rem);
  line-height: 1.2;
  letter-spacing: -0.7px;
}

.currency-panel p,
.section-heading p,
.narrow p,
.contact-panel p {
  margin: 0 0 14px;
  color: var(--muted);
}

label {
  display: grid;
  gap: 7px;
  color: var(--text);
  font-size: 0.93rem;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  min-width: 0;
  padding: 12px 13px;
  border: 1px solid #ccd5e2;
  border-radius: 9px;
  background: var(--white);
  color: var(--text);
}

input::placeholder,
textarea::placeholder {
  color: #9aa5b5;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--blue);
}

.section {
  padding-top: 76px;
  padding-bottom: 76px;
}

.section-heading {
  max-width: 720px;
  margin-bottom: 28px;
}

.tool-grid,
.service-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.tool-card,
.service-card {
  min-width: 0;
  padding: 25px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
}

.tool-card {
  display: flex;
  flex-direction: column;
  min-height: 225px;
  transition: transform 0.2s, border-color 0.2s;
}

.tool-card:hover {
  transform: translateY(-4px);
  border-color: #9bb8ff;
}

.tool-icon {
  display: inline-flex;
  width: 43px;
  height: 43px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border-radius: 12px;
  background: #edf3ff;
  color: var(--blue);
  font-size: 1rem;
  font-weight: 800;
}

.tool-card h3,
.service-card h3 {
  margin: 0 0 8px;
  color: var(--navy);
  font-size: 1.15rem;
}

.tool-card p,
.service-card p {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 0.94rem;
}

.card-link {
  margin-top: auto;
  color: var(--blue);
  font-size: 0.92rem;
  font-weight: 800;
}

.calculator-section,
.about-section {
  background: var(--background);
}

.calculator-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  align-items: start;
  gap: 55px;
}

.calculator-layout > .section-heading {
  margin: 0;
}

.calculator-card {
  display: grid;
  gap: 19px;
  min-width: 0;
  padding: 27px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow);
}

.calculator-card .button {
  width: 100%;
}

.result {
  min-height: 54px;
  padding: 14px 15px;
  overflow-wrap: anywhere;
  border: 1px solid #dce5f4;
  border-radius: 9px;
  background: #f5f8ff;
  color: var(--navy);
  font-weight: 700;
}

.result.success {
  border-color: #c4e9d0;
  background: var(--success-bg);
  color: var(--success-text);
}

.result.error {
  border-color: #f1cccc;
  background: var(--error-bg);
  color: var(--error-text);
}

.note {
  margin: 0;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 400;
}

.count-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.count-box {
  display: grid;
  gap: 3px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--background);
  text-align: center;
}

.count-box span {
  color: var(--navy);
  font-size: 1.6rem;
  font-weight: 800;
}

.count-box small {
  color: var(--muted);
}

.service-grid {
  margin-bottom: 28px;
}

.service-card {
  box-shadow: none;
}

.contact-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 35px;
  border-radius: var(--radius);
  background: var(--background);
}

.contact-panel > div {
  max-width: 620px;
}

.site-footer {
  padding: 38px 0;
  background: var(--navy);
  color: #d7e2f1;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 22px;
}

.footer-brand {
  color: var(--white);
}

.footer-content p {
  margin: 7px 0 0;
  color: #b6c6da;
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 16px;
}

.footer-links a {
  color: #d7e2f1;
}

.copyright {
  grid-column: 1 / -1;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

@media (max-width: 800px) {
  .nav {
    padding-top: 12px;
    padding-bottom: 12px;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .nav nav {
    gap: 12px 18px;
  }

  .hero {
    padding: 70px 0 60px;
  }

  .currency-panel,
  .calculator-layout {
    grid-template-columns: 1fr;
    gap: 26px;
  }

  .tool-grid,
  .service-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-panel {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-links {
    justify-content: flex-start;
  }
}

@media (max-width: 520px) {
  .container {
    width: min(100% - 28px, 1120px);
  }

  .hero h1 {
    letter-spacing: -1px;
  }

  .section {
    padding-top: 52px;
    padding-bottom: 52px;
  }

  .tool-grid,
  .service-grid {
    grid-template-columns: 1fr;
  }

  .calculator-card,
  .tool-card,
  .service-card,
  .contact-panel {
    padding: 20px;
  }

  .nav nav {
    gap: 9px 13px;
  }

  .nav nav a {
    font-size: 0.87rem;
  }
}
