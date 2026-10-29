(() => {
  const win = document.querySelector('#profile-window');
  const themeToggle = document.querySelector('#theme-toggle');
  themeToggle.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark-mode');
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  });

  const slash = String.fromCharCode(92);
  const root = 'C:' + slash + 'lia';
  const originalProfile = win.querySelector('.profile-content').innerHTML;
  const pages = {
    profile: [root + slash + 'profile', originalProfile],
    works: [root + slash + 'work', '<div class="dynamic-body projects-body"><p class="projects-kicker">SELECTED WORK &amp; PROFILES</p><h2>Projects</h2><div class="project-list"><a class="project-card" href="https://github.com/TheGaca" target="_blank" rel="noopener noreferrer"><span class="project-number">01</span><span class="project-copy"><strong>GitHub Profile</strong><small>TheGaca · Code and projects</small></span><span class="project-arrow" aria-hidden="true">&#8599;</span></a><a class="project-card" href="https://orcid.org/0009-0003-8256-7472" target="_blank" rel="noopener noreferrer"><span class="project-number">02</span><span class="project-copy"><strong>ORCID</strong><small>Researcher profile</small></span><span class="project-arrow" aria-hidden="true">&#8599;</span></a><a class="project-card" href="https://github.com/Muhammedokbi/OkulSiteProjesi11sinif" target="_blank" rel="noopener noreferrer"><span class="project-number">03</span><span class="project-copy"><strong>School Website</strong><small>OkulSiteProjesi11sinif</small></span><span class="project-arrow" aria-hidden="true">&#8599;</span></a><a class="project-card" href="https://github.com/TheGaca/Gps-and-Mapping" target="_blank" rel="noopener noreferrer"><span class="project-number">04</span><span class="project-copy"><strong>GPS &amp; Mapping</strong><small>Navigation and mapping project</small></span><span class="project-arrow" aria-hidden="true">&#8599;</span></a><a class="project-card" href="https://github.com/TheGaca/rslidar16p-and-mapping" target="_blank" rel="noopener noreferrer"><span class="project-number">05</span><span class="project-copy"><strong>RS-LiDAR 16P &amp; Mapping</strong><small>LiDAR mapping project</small></span><span class="project-arrow" aria-hidden="true">&#8599;</span></a><a class="project-card" href="https://github.com/TheGaca/su_alti_rov" target="_blank" rel="noopener noreferrer"><span class="project-number">06</span><span class="project-copy"><strong>Underwater ROV</strong><small>su_alti_rov</small></span><span class="project-arrow" aria-hidden="true">&#8599;</span></a></div></div>'],
    contact: [root + slash + 'contact', '<div class="dynamic-body"><h2>Say hello &#10033;</h2><p>You can work with me or get in touch.</p><p class="contact-email"><a href="mailto:muhammedalokbi207@gmail.com">muhammedalokbi207@gmail.com</a></p><form class="contact-form"><label>Your name<input name="name" autocomplete="name" placeholder="Your name" required></label><label>Your email<input type="email" name="email" autocomplete="email" placeholder="you@example.com" required></label><label>Your message<textarea name="message" placeholder="Tell me a little about your project..." required></textarea></label><button class="retro-button" type="submit"><span>Send message</span><span aria-hidden="true">&#8599;</span></button><p class="form-status" role="status" aria-live="polite"></p></form></div>'],
    resume: [root + slash + 'resume', '<div class="dynamic-body resume-copy"><p class="projects-kicker">ABOUT ME</p><h2>Muhammed Okbi</h2><h3>Software Developer</h3><p>I have been working in software development since 2022, having participated in numerous competitions and workshops and delivered several successful projects.</p><p>The programming languages I know, along with my other skills, are listed in the README.md file below.</p><table class="resume-skills" border="0"><tr><td><img src="https://skillicons.dev/icons?i=cpp,cs,py,c,linux,ubuntu,arch,vscode,git,github" alt="Languages and tools: C++, C#, Python, C, Linux, Ubuntu, Arch, VS Code, Git, GitHub"></td><td><img src="assets/Arsenal_FC.png" height="48" alt="Arsenal"></td><td><img src="https://skillicons.dev/icons?i=tensorflow,pytorch,opencv,arduino,ros,flutter,dart,docker,bash" alt="AI, embedded and mobile: TensorFlow, PyTorch, OpenCV, Arduino, ROS, Flutter, Dart, Docker, Bash"></td></tr></table></div>']
  };

  function connectContactForm(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const subject = encodeURIComponent('Portfolio message from ' + name);
      const body = encodeURIComponent(message + '\n\nReply to: ' + email);
      const mailto = 'mailto:muhammedalokbi207@gmail.com?subject=' + subject + '&body=' + body;
      const status = form.querySelector('.form-status');
      status.textContent = 'Opening your email app with the message ready to send...';
      const fallback = document.createElement('a');
      fallback.href = mailto;
      fallback.textContent = 'If it did not open, click here to email me.';
      fallback.className = 'email-fallback';
      status.append(' ', fallback);
      window.location.href = mailto;
    });
  }

  function render(page) {
    const entry = pages[page];
    win.querySelector('.titlebar span').textContent = entry[0];
    win.querySelector('.profile-content').outerHTML = '<div class="profile-content">' + entry[1] + '</div>';
    win.dataset.page = page;
    win.classList.remove('is-hidden');
    const form = win.querySelector('.contact-form');
    if (form) connectContactForm(form);
  }

  document.querySelectorAll('.desktop-icon').forEach(icon => icon.addEventListener('click', () => render(icon.dataset.open)));
  win.querySelector('.close').addEventListener('click', () => win.classList.add('is-hidden'));

  const titlebar = win.querySelector('.titlebar');
  let drag = null;
  titlebar.addEventListener('pointerdown', event => {
    if (event.target.closest('button')) return;
    const rect = win.getBoundingClientRect();
    const parent = win.parentElement.getBoundingClientRect();
    win.style.left = (rect.left - parent.left + rect.width / 2) + 'px';
    win.style.top = (rect.top - parent.top + rect.height / 2) + 'px';
    win.style.transform = 'translate(-50%, -50%)';
    drag = { x: event.clientX, y: event.clientY, left: parseFloat(win.style.left), top: parseFloat(win.style.top) };
    titlebar.setPointerCapture(event.pointerId);
  });
  titlebar.addEventListener('pointermove', event => {
    if (!drag) return;
    const parent = win.parentElement.getBoundingClientRect();
    win.style.left = Math.max(win.offsetWidth / 2, Math.min(parent.width - win.offsetWidth / 2, drag.left + event.clientX - drag.x)) + 'px';
    win.style.top = Math.max(win.offsetHeight / 2, Math.min(parent.height - win.offsetHeight / 2 - 75, drag.top + event.clientY - drag.y)) + 'px';
  });
  titlebar.addEventListener('pointerup', () => { drag = null; });
  render('resume');
})();