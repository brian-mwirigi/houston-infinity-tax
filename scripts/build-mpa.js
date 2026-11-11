const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ASSET = 'https://www.houstoninfinitytaxservices.com/wp-content/uploads/2021/02';
const PHONE = '(832) 478-5561';
const TEL = 'tel:+18324785561';
const FAX = '(832) 478-5583';
const EMAIL = 'support@houstoninfinitytaxservices.com';
const MAPS = 'https://www.google.com/maps/dir//Houston+Infinity+Tax+Service/data=!4m8!4m7!1m0!1m5!1m1!1s0x8640dc254989247f:0x217aa8ea32411f23!2m2!1d-95.585129!2d29.967948';
const MAP_EMBED = 'https://www.google.com/maps?q=13347+Jones+Road,+Houston,+TX+77070&output=embed';
// Same end time and dismiss key as the live WordPress countdown plugin.
const CD_END = '1807847940000';
const CD_KEY = '12066-1793223858';

const icon = {
  person: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  building: '<path d="M4 21V5l8-3 8 3v16"/><path d="M9 21v-5h6v5M8 8h2M14 8h2M8 12h2M14 12h2"/>',
  ledger: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  chart: '<path d="M4 20h16"/><path d="M6 16l4-5 3 3 5-7"/><path d="M15 7h3v3"/>',
};
const pic = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces,center&w=${w}&h=${h}&q=75`;
const PIC = {
  hero: '1611095790444-1dfa35e37b52',
  individual: '1758523418820-a492bf647c63',
  business: '1573165706511-3ffde6ef1fe3',
  accounting: '1758876201935-0d85989a52e2',
  consulting: '1758691737124-05c5bffe46f0',
  consult: '1551836022-d5d88e9218df',
  couple: '1758691031730-640885ad19e5',
  team: '1572021335469-31706a17aaef',
};
const svg = (d) => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const pages = [
  ['home', '/', 'Home'],
  ['about', '/about-us/', 'About'],
  ['services', '/services/', 'Services'],
  ['contact', '/contact-us/', 'Contact'],
  ['blog', '/blog/', 'Blog'],
];

function nav(current) {
  return pages
    .map(([id, href, label]) => `<a href="${href}"${id === current ? ' aria-current="page"' : ''}>${label}</a>`)
    .join('\n          ');
}

function chrome(current, main) {
  return `    <a class="skip" href="#main">Skip to content</a>
    <div class="topbar">
      <div class="wrap">
        <div class="hide-sm"><span>13347 Jones Road, Houston, TX 77070 USA</span><span>09:00 – 20:00</span></div>
        <div><span><a href="${TEL}">${PHONE}</a></span><span>FAX: ${FAX}</span></div>
      </div>
    </div>
    <header class="site-head">
      <div class="wrap head-row">
        <a class="logo" href="/" aria-label="Houston Infinity Tax Services home"><img src="${ASSET}/HITS-logo.png" alt="Houston Infinity Tax Services" width="196" height="48" /></a>
        <nav class="nav" id="menu">${nav(current)}</nav>
        <a class="btn btn-dark head-phone" href="${TEL}">${PHONE}</a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><i></i><i></i><i></i></button>
      </div>
    </header>
    <div class="cd" role="region" aria-label="Countdown" hidden data-end="${CD_END}" data-key="${CD_KEY}">
      <div class="wrap cd-row">
        <p class="cd-msg">Tax Day is April 15. Let a Houston tax pro get you your biggest refund.</p>
        <div class="cd-timer" role="timer">
          <span><b data-u="d">00</b><small>Days</small></span>
          <span><b data-u="h">00</b><small>Hrs</small></span>
          <span><b data-u="m">00</b><small>Min</small></span>
          <span><b data-u="s">00</b><small>Sec</small></span>
        </div>
        <a class="cd-link" href="/appointments/index.html">Book an appointment <span aria-hidden="true">&rsaquo;</span></a>
      </div>
      <button type="button" class="cd-close" aria-label="Close countdown">&times;</button>
    </div>
    <main id="main">
${main}
    </main>
    <footer class="site-foot">
      <div class="wrap foot-main">
        <div>
          <a href="/"><img src="${ASSET}/HITS-white.png" alt="Houston Infinity Tax Services" width="176" height="44" /></a>
          <p>Tax Preparation Services in Houston. Fast, accurate and low fees.</p>
          <p>Newsletter Subscribe</p>
        </div>
        <div>
          <h4>Pages</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about-us/">About</a></li>
            <li><a href="/services/">Services</a></li>
            <li><a href="/contact-us/">Contact</a></li>
            <li><a href="/appointments/index.html">Appointments</a></li>
            <li><a href="/blog/">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="/services/">Individual Income Tax</a></li>
            <li><a href="/services/">Business Tax Preperation</a></li>
            <li><a href="/services/">Book Keeping Payroll</a></li>
            <li><a href="/services/">Business Planning &amp; Consultation</a></li>
          </ul>
        </div>
        <div>
          <h4>Office</h4>
          <ul>
            <li><a href="${MAPS}" target="_blank" rel="noreferrer">13347 Jones Road<br />Houston, TX 77070 USA</a></li>
            <li>09:00 – 20:00</li>
            <li><a href="${TEL}">${PHONE}</a></li>
            <li>FAX: ${FAX}</li>
            <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div class="wrap foot-bottom">
        <span>© Copyright 2021 Houston Infinity Tax Services. All Rights Reserved.</span>
        <a href="#top">Back to top</a>
      </div>
    </footer>`;
}

function pageHero(crumb, title, lead) {
  return `      <section class="page-hero">
        <div class="wrap">
          <nav class="crumbs"><a href="/">Home</a><span>/</span><span>${crumb}</span></nav>
          <h1>${title}</h1>
          ${lead ? `<p>${lead}</p>` : ''}
        </div>
      </section>`;
}

function band(title, extra) {
  return `      <section class="band">
        <div class="wrap">
          <h2>${title}</h2>
          <div class="band-actions">
            <a class="btn" href="/contact-us/">Get in touch</a>
            ${extra || `<a class="btn btn-line" href="${TEL}">${PHONE}</a>`}
          </div>
        </div>
      </section>`;
}

const homeServices = [
  ['Individual Tax', 'We help you remit tax levied in an easy, simplistic way.', PIC.individual, 'A couple reviewing paperwork at their kitchen table'],
  ['Business Tax', 'We assist business operators and other individuals engaged in the provision of taxable services.', PIC.business, 'Three colleagues talking through business documents'],
  ['Accounting Services', 'We do financial accounting, management accounting, auditing, cost containment and auditing services, taxation and accounting information systems.', PIC.accounting, 'An accountant working on a laptop'],
  ['Business Consulting', 'We work with you to solve various issues, create value, maximize growth and to improve overall business performance.', PIC.consulting, 'A business team meeting around a laptop'],
];

const catalog = [
  ['Individual Income Tax', 'Income tax is a type of tax that governments impose on income generated by businesses and individuals.', 'i'],
  ['Business Tax Preperation', 'Running a business is hard enough without adding the complexity of filing taxes each year. Making financial decisions without consulting an accountant or financial adviser can put you at risk and cost you more money in the long run.', 'b'],
  ['Book Keeping Payroll', "We oversee a company's financial data and compliance by maintaining accurate books on accounts payable and receivable, payroll, and daily financial entries and reconciliations.", 'b'],
  ['Business Planning &amp; Consultation', 'We serve the comprehensive needs of businesses in the full range of the business cycle.', 'b'],
  ['Franchise Tax', 'A franchise tax is a government levy (tax) charged by some US states to certain business organizations such as corporations and partnerships with a nexus in the state.', 'b'],
  ['Death Tax', 'Death tax is a tax imposed by certain states on those who inherit assets from the estate of a deceased person.', 'i'],
  ['Property/ Real Estate Tax', 'Property tax is tax paid on property owned by an individual or other legal entity, such as a corporation.', 'i'],
  ['Sales Tax', 'A sales tax is a consumption tax imposed by the government on the sale of goods and services.', 'b'],
  ['Inheritance Tax', 'An inheritance tax is a tax imposed by certain states on those who inherit assets from the estate of a deceased person.', 'i'],
];

const serviceList = (kind) =>
  catalog
    .filter((s) => s[2] === kind)
    .map(([t, p], n) => `<li><span class="svc-num">${String(n + 1).padStart(2, '0')}</span><div><h3>${t}</h3><p>${p}</p></div></li>`)
    .join('\n              ');

const hp = '<div class="hp" aria-hidden="true"><label>Company<input type="text" name="company" tabindex="-1" autocomplete="off" /></label></div>';

const contactForm = `<form class="form" action="/hits-mail.php" method="post">
              <input type="hidden" name="form" value="contact" />
              ${hp}
              <div class="form-2">
                <label class="field"><span>Name <i>*</i></span><input type="text" name="your-name" required placeholder="Name" autocomplete="name" /></label>
                <label class="field"><span>E-Mail <i>*</i></span><input type="email" name="your-email" required placeholder="E-Mail" autocomplete="email" /></label>
              </div>
              <div class="form-2">
                <label class="field"><span>Phone Number <i>*</i></span><input type="tel" name="your-phone" required placeholder="Phone Number" autocomplete="tel" /></label>
                <label class="field"><span>Your Website</span><input type="text" name="your-website" placeholder="Your Website" autocomplete="url" /></label>
              </div>
              <label class="field"><span>Your Message Here</span><textarea name="your-message" placeholder="Your Message Here"></textarea></label>
              <button class="btn btn-dark" type="submit">Submit Now</button>
              <p class="note" data-form-note role="status"></p>
            </form>`;

const appointmentForm = `<form class="form" action="/hits-mail.php" method="post">
              <input type="hidden" name="form" value="appointment" />
              ${hp}
              <div class="form-2">
                <label class="field"><span>Name <i>*</i></span><input type="text" name="your-name" required placeholder="Name" autocomplete="name" /></label>
                <label class="field"><span>E-Mail <i>*</i></span><input type="email" name="your-email" required placeholder="E-Mail" autocomplete="email" /></label>
              </div>
              <div class="form-2">
                <label class="field"><span>Phone Number <i>*</i></span><input type="tel" name="your-phone" required placeholder="Phone Number" autocomplete="tel" /></label>
                <label class="field"><span>Preferred day <i>*</i></span><input type="date" name="preferred-day" required /></label>
              </div>
              <div class="form-2">
                <label class="field"><span>Preferred time <i>*</i></span><select name="preferred-time" required><option value="">Preferred time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
                <label class="field"><span>Type of Service <i>*</i></span><select name="sevicetype" required><option value="">Type of Service</option><option>Individual Tax</option><option>Business Tax</option><option>Business Consulting</option><option>Accounting</option></select></label>
              </div>
              <label class="field"><span>Your Message Here</span><textarea name="your-message" placeholder="Your Message Here"></textarea></label>
              <button class="btn btn-dark" type="submit">Request appointment</button>
              <p class="note" data-form-note data-sent="Your appointment request was sent to our office." role="status"></p>
            </form>`;

const downloadsForm = `<form class="form" action="/hits-mail.php" method="post" enctype="multipart/form-data">
              <input type="hidden" name="form" value="downloads" />
              ${hp}
              <div class="form-2">
                <label class="field"><span>Enter Your Name <i>*</i></span><input type="text" name="your-name" required placeholder="Enter Your Name" autocomplete="name" /></label>
                <label class="field"><span>Enter Your Email <i>*</i></span><input type="email" name="your-email" required placeholder="Enter Your Email" autocomplete="email" /></label>
              </div>
              <label class="field"><span>Type of Service <i>*</i></span><select name="sevicetype" required><option value="">Type of Service</option><option>Individual Tax</option><option>Business Tax</option><option>Business Consulting</option><option>Accounting</option><option>Employment Application</option></select></label>
              <div class="form-2">
                <label class="field"><span>Your Employment <i>*</i></span><input type="text" name="your-employment" required placeholder="Your Employment" /></label>
                <label class="field"><span>Annual Income <i>*</i></span><input type="text" name="annual-income" required placeholder="Annual Income" /></label>
              </div>
              <fieldset class="files">
                <legend>Upload Documents</legend>
                <p>Accepted files are .doc, .docx, .pdf, and .odt.</p>
                <input type="file" name="file-789" accept=".doc,.docx,.pdf,.odt" aria-label="Document 1" />
                <input type="file" name="file-790" accept=".doc,.docx,.pdf,.odt" aria-label="Document 2" />
                <input type="file" name="file-791" accept=".doc,.docx,.pdf,.odt" aria-label="Document 3" />
                <input type="file" name="file-792" accept=".doc,.docx,.pdf,.odt" aria-label="Document 4" />
                <input type="file" name="file-793" accept=".doc,.docx,.pdf,.odt" aria-label="Document 5" />
              </fieldset>
              <button class="btn btn-dark" type="submit">SUBMIT</button>
              <p class="note" data-form-note role="status"></p>
            </form>`;

const bodies = {
  home: chrome(
    'home',
    `      <section class="hero">
        <div class="hero-photo"><img src="${ASSET}/000.jpg" alt="" width="1600" height="900" /></div>
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <p class="kicker">Tax Preparation Services in Houston</p>
            <h1>We Provide Best Tax Service For You</h1>
            <p class="lead">Fast, accurate and low fees. We know our clients by name, not only by their SS #.</p>
            <div class="hero-actions">
              <a class="btn" href="/appointments/index.html">Book an appointment</a>
              <a class="btn btn-line" href="/services/">Discover More</a>
            </div>
          </div>
          <aside class="hero-card" aria-label="Office details">
            <h2>Visit the office</h2>
            <dl>
              <div><dt>Address</dt><dd><a href="${MAPS}" target="_blank" rel="noreferrer">13347 Jones Road<br />Houston, TX 77070 USA</a></dd></div>
              <div><dt>Hours</dt><dd>09:00 – 20:00</dd></div>
              <div><dt>Phone</dt><dd><a href="${TEL}">${PHONE}</a></dd></div>
              <div><dt>Fax</dt><dd>${FAX}</dd></div>
            </dl>
            <a class="btn btn-dark" href="${TEL}">Call ${PHONE}</a>
          </aside>
        </div>
      </section>
      <section class="pillars" aria-label="Why Houston Infinity">
        <div class="wrap pillars-row">
          <div><b>01</b><h3>Expert People</h3><p>Be 100% certain. File with a tax pro.</p></div>
          <div><b>02</b><h3>Our Process</h3><p>We add every credit and deduction you deserve to get your biggest refund.</p></div>
          <div><b>03</b><h3>Low Cost Fees</h3><p>We will notify you if there is a change in your tax situation that requires a price adjustment.</p></div>
        </div>
      </section>
      <section class="block">
        <div class="wrap">
          <div class="block-head">
            <div>
              <p class="kicker">Our services</p>
              <h2>Tax service for you.</h2>
            </div>
            <p>Our experts are always ready to work with you. <a class="text-link" href="/services/">See all services &rsaquo;</a></p>
          </div>
          <div class="cards">
            ${homeServices.map(([t, p, id, alt], i) => `<a class="card card-pic" href="/services/"><img src="${pic(id, 560, 380)}" alt="${alt}" width="560" height="380" loading="lazy" /><div class="card-body"><span class="card-icon">${svg(Object.values(icon)[i])}</span><h3>${t}</h3><p>${p}</p><span class="card-more">Learn more &rsaquo;</span></div></a>`).join('\n            ')}
          </div>
        </div>
      </section>
      <section class="block block-alt">
        <div class="wrap split">
          <figure class="photo">
            <img src="${ASSET}/003.png" alt="Waiting area at Houston Infinity Tax Services" width="640" height="760" />
            <figcaption><strong>Referrals, $25</strong><span>Come visit us today and join a growing family that supports Houston local business.</span></figcaption>
          </figure>
          <div class="copy">
            <p class="kicker">About us</p>
            <h2>Peace of mind with more money.</h2>
            <p>Houston Infinity Tax Services is relentlessly keeping up with the ever changing Federal and State tax laws, in order to provide our valuable clients with an experience they can trust, while at the same time keeping our fees at reasonable rates.</p>
            <p>We maximize individual tax return with various money-saving deductions or available credits. We save businesses money, thus realizing favorable profits. We prepare, trust, gift and estate tax returns. Furthermore, we prepare NGO's and expatriate tax return.</p>
            <div class="split-actions">
              <a class="btn btn-dark" href="/about-us/">About us</a>
              <a class="btn btn-ghost" href="${TEL}">${PHONE}</a>
            </div>
          </div>
        </div>
      </section>
      <section class="block">
        <div class="wrap">
          <div class="block-head">
            <div>
              <p class="kicker">What we handle</p>
              <h2>Full list of services.</h2>
            </div>
            <p><a class="text-link" href="/services/">View the full service list &rsaquo;</a></p>
          </div>
          <ul class="tags">
            ${catalog.map(([t]) => `<li><a href="/services/">${t}</a></li>`).join('\n            ')}
          </ul>
        </div>
      </section>
      <section class="docs">
        <div class="wrap docs-row">
          <div>
            <p class="kicker">Book an appointment</p>
            <h2>Gather your docs and let your tax pro do the rest.</h2>
            <p>Be 100% certain. File with a tax pro. We add every credit and deduction you deserve to get your biggest refund.</p>
          </div>
          <div class="docs-actions">
            <a class="btn" href="/appointments/index.html">Book an appointment</a>
            <a class="btn btn-line" href="${TEL}">${PHONE}</a>
          </div>
        </div>
      </section>
      <section class="block visit">
        <div class="wrap visit-grid">
          <div>
            <p class="kicker">Find us</p>
            <h2>13347 Jones Road, Houston.</h2>
            <div class="details">
              <a class="details-row" href="${TEL}"><small>Phone</small><strong>${PHONE}</strong></a>
              <div><small>Fax</small><strong>${FAX}</strong></div>
              <a class="details-row" href="mailto:${EMAIL}"><small>Email</small><strong>${EMAIL}</strong></a>
              <div><small>Hours</small><strong>09:00 – 20:00</strong></div>
            </div>
            <div class="split-actions"><a class="btn btn-dark" href="${MAPS}" target="_blank" rel="noreferrer">Get directions</a></div>
          </div>
          <div class="map map-tall">
            <iframe src="${MAP_EMBED}" title="Map to Houston Infinity Tax Services, 13347 Jones Road" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>`
  ),

  about: chrome(
    'about',
    `${pageHero('About', 'Fast, accurate and low fees.', 'Peace of mind with more money.')}
      <section class="block">
        <div class="wrap split">
          <figure class="photo"><img src="${ASSET}/003.png" alt="Waiting area at Houston Infinity Tax Services" width="640" height="760" /></figure>
          <div class="copy">
            <p>We are not another drive through, main stream tax preparation service, we know our clients by name, not only by their SS #. We personalize your taxes to get you the maximum tax return. Peace of mind with more money.</p>
            <p>We offer the most accurate and affordable tax preparation services around Houston, Texas. We keenly customize your income tax return to make sure you get the biggest tax return refund. We offer referrals, $25. We are simply guided by integrity, ample knowledge of tax laws and our zeal to please our customer, who are our number one priority. Come visit us today and join a growing family that supports Houston local business. We are looking forward to meet you. Thank you and welcome.</p>
            <ul class="points">
              <li><strong>01 Expert People</strong><span>Be 100% certain. File with a tax pro.</span></li>
              <li><strong>02 Our Process</strong><span>We add every credit and deduction you deserve to get your biggest refund.</span></li>
              <li><strong>03 Low Cost Fees</strong><span>We will notify you if there is a change in your tax situation that requires a price adjustment.</span></li>
            </ul>
            <div class="split-actions">
              <a class="btn btn-dark" href="/appointments/index.html">Book appointment</a>
              <a class="btn btn-ghost" href="${TEL}">${PHONE}</a>
            </div>
          </div>
        </div>
      </section>
${band('Gather your docs and let your tax pro do the rest.')}`
  ),

  services: chrome(
    'services',
    `${pageHero('Services', 'Tax service for you.', 'Our experts are always ready to work with you.')}
      <section class="block">
        <div class="wrap">
          <div class="catalog">
            ${catalog.map(([t, p]) => `<article><h3>${t}</h3><p>${p}</p></article>`).join('\n            ')}
          </div>
        </div>
      </section>
${band('Our experts are always ready to work with you.')}`
  ),

  downloads: chrome(
    'downloads',
    `${pageHero('Downloads', 'Tax submission forms.', 'Fill in the form below and attach the documents you have downloaded and filled out for further assistance.')}
      <section class="block">
        <div class="wrap contact-grid">
          <div>
            <p class="kicker">Submission form</p>
            <h2>Send your documents.</h2>
            <p style="margin-top:16px">Accepted files are .doc, .docx, .pdf, and .odt.</p>
            <div class="details">
              <a class="details-row" href="${TEL}"><small>Phone</small><strong>${PHONE}</strong></a>
              <div><small>Hours</small><strong>09:00 – 20:00</strong></div>
            </div>
          </div>
          <div class="form-box">
            <h2>Submission form</h2>
            <p>Fields marked * are required.</p>
            ${downloadsForm}
          </div>
        </div>
      </section>`
  ),

  testimonials: chrome(
    'testimonials',
    `${pageHero('Testimonials', 'What clients say.')}
      <section class="block">
        <div class="wrap">
          <div class="empty">
            <h2>No testimonials have been published yet.</h2>
            <p>Call the office or send a note and the team will take it from there.</p>
            <a class="btn btn-dark" href="/contact-us/">Get in touch</a>
            <a class="btn btn-ghost" href="${TEL}">${PHONE}</a>
          </div>
        </div>
      </section>`
  ),

  contact: chrome(
    'contact',
    `${pageHero('Contact', 'Get in touch.', 'Call, fax, email, or visit our office on Jones Road.')}
      <section class="block">
        <div class="wrap contact-grid">
          <div>
            <div class="details">
              <a class="details-row" href="${TEL}"><small>Phone number</small><strong>${PHONE}</strong></a>
              <div><small>Fax</small><strong>${FAX}</strong></div>
              <a class="details-row" href="mailto:${EMAIL}"><small>Email address</small><strong>${EMAIL}</strong></a>
              <a class="details-row" href="${MAPS}" target="_blank" rel="noreferrer"><small>Office address</small><strong>13347 Jones Road, Houston, TX 77070 USA</strong></a>
              <div><small>Office hours</small><strong>09:00 – 20:00</strong></div>
            </div>
            <div class="split-actions"><a class="btn btn-dark" href="${MAPS}" target="_blank" rel="noreferrer">Get directions</a></div>
          </div>
          <div class="form-box">
            <h2>Send a message</h2>
            <p>Please fill out contact form. Thank you.</p>
            ${contactForm}
          </div>
        </div>
        <div class="wrap">
          <div class="map">
            <iframe src="${MAP_EMBED}" title="Map to Houston Infinity Tax Services, 13347 Jones Road" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <a class="btn btn-dark" href="${MAPS}" target="_blank" rel="noreferrer">Get directions</a>
          </div>
        </div>
      </section>`
  ),

  appointments: chrome(
    'appointments',
    `${pageHero('Appointments', 'Book an appointment.', 'Come visit our office on Jones Road, or tell us a time that works for you.')}
      <section class="block">
        <div class="wrap contact-grid">
          <div>
            <p class="kicker">Our office</p>
            <h2>File with a tax pro.</h2>
            <p style="margin-top:16px">Be 100% certain. Hours are 09:00 – 20:00.</p>
            <div class="details">
              <a class="details-row" href="${TEL}"><small>Phone number</small><strong>${PHONE}</strong></a>
              <div><small>Fax</small><strong>${FAX}</strong></div>
              <a class="details-row" href="${MAPS}" target="_blank" rel="noreferrer"><small>Office address</small><strong>13347 Jones Road, Houston, TX 77070 USA</strong></a>
              <div><small>Office hours</small><strong>09:00 – 20:00</strong></div>
            </div>
            <div class="split-actions"><a class="btn btn-dark" href="${TEL}">Call ${PHONE}</a></div>
          </div>
          <div class="form-box">
            <h2>Request a time</h2>
            <p>Fields marked * are required. Our office will confirm the time.</p>
            ${appointmentForm}
          </div>
        </div>
      </section>`
  ),

  blog: chrome(
    'blog',
    `${pageHero('Blog', 'Blog.')}
      <section class="block">
        <div class="wrap">
          <div class="empty">
            <h2>No posts have been published yet.</h2>
            <p>When the office publishes notes, they will appear here.</p>
            <a class="btn btn-dark" href="/contact-us/">Get in touch</a>
          </div>
        </div>
      </section>`
  ),
};

function documentFor(title, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0b3a2b" />
    <meta name="description" content="Tax Services, tax preparation, filing your taxes. Houston Infinity Tax Services in Houston, Texas." />
    <title>${title}</title>
    <link rel="icon" href="${ASSET}/HITS-logo.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/concept-two.css?v=4" />
  </head>
  <body id="top">
${body}
    <script src="/concept-two.js"></script>
  </body>
</html>
`;
}

const files = {
  home: 'concept-two.html',
  about: 'about.html',
  services: 'services.html',
  downloads: 'downloads.html',
  testimonials: 'testimonials.html',
  contact: 'contact.html',
  appointments: 'appointments.html',
  blog: 'blog.html',
};

const titles = {
  home: 'Houston Infinity Tax Services | Tax Services, tax preparation, filing your taxes',
  about: 'About | Houston Infinity Tax Services',
  services: 'Services | Houston Infinity Tax Services',
  downloads: 'Downloads | Houston Infinity Tax Services',
  testimonials: 'Testimonials | Houston Infinity Tax Services',
  contact: 'Contact | Houston Infinity Tax Services',
  appointments: 'Book an appointment | Houston Infinity Tax Services',
  blog: 'Blog | Houston Infinity Tax Services',
};

for (const id of Object.keys(bodies)) {
  fs.writeFileSync(path.join(root, files[id]), documentFor(titles[id], bodies[id]));
}

console.log('wrote', Object.keys(bodies).join(', '));
