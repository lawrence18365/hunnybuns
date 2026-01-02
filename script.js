document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const scrollHint = document.querySelector('.scroll-hint');
    let lastScrollY = window.scrollY;
    const scrollDelta = 8;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startTypewriter = (el, speed = 90) => {
        if (el.dataset.typewriterStarted === 'true') {
            return;
        }

        const fullText = el.dataset.typewriterText || el.textContent.trim();
        if (!fullText) {
            return;
        }

        el.dataset.typewriterStarted = 'true';
        el.dataset.typewriterText = fullText;
        el.setAttribute('aria-label', fullText);

        const textHeight = el.getBoundingClientRect().height;
        if (textHeight) {
            el.style.minHeight = `${textHeight}px`;
        }

        if (prefersReducedMotion) {
            el.textContent = fullText;
            return;
        }

        el.textContent = '';
        let index = 0;
        const tick = () => {
            el.textContent = fullText.slice(0, index);
            index += 1;
            if (index <= fullText.length) {
                window.setTimeout(tick, speed);
            }
        };
        tick();
    };

    // 1. Split Text Logic
    const splitTextElements = document.querySelectorAll('.reveal-text');
    splitTextElements.forEach(el => {
        if (isMobile && el.classList.contains('typewriter-mobile')) {
            return;
        }
        const text = el.innerText;
        const words = text.split(' ');
        el.innerHTML = '';
        words.forEach(word => {
            const wrapper = document.createElement('span');
            wrapper.classList.add('word-wrapper');
            const inner = document.createElement('span');
            inner.classList.add('word-inner');
            inner.innerText = word + '\u00A0'; // Add non-breaking space
            wrapper.appendChild(inner);
            el.appendChild(wrapper);
        });
    });

    // 2. Intersection Observer for Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                if (isMobile && entry.target.classList.contains('typewriter-mobile')) {
                    startTypewriter(entry.target);
                    observer.unobserve(entry.target);
                    return;
                }

                // Restart GIF if it's the GIF container
                if (entry.target.id === 'philosophyGifContainer') {
                    const gif = entry.target.querySelector('.gif-animate');
                    if (gif) {
                        const src = gif.src;
                        gif.src = '';
                        gif.src = src;
                    }
                }

                // Stagger split text
                if (entry.target.classList.contains('reveal-text')) {
                    const words = entry.target.querySelectorAll('.word-inner');
                    words.forEach((word, index) => {
                        setTimeout(() => {
                            word.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-fade, .reveal-text, .image-frame, .draw-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 3. Parallax Effect
    const parallaxElements = document.querySelectorAll('[data-speed]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            // Skip parallax on mobile devices
            if (isMobile) {
                el.style.transform = 'translateY(0)';
                return;
            }

            const speed = parseFloat(el.getAttribute('data-speed'));
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrollY;

            // Only apply parallax when element is near viewport
            const distanceFromTop = scrollY - elementTop;

            if (distanceFromTop > -window.innerHeight && distanceFromTop < window.innerHeight) {
                const yPos = distanceFromTop * speed;
                el.style.transform = `translateY(${yPos}px)`;
            }
        });

        // Spine & Nav Active State
        updateActiveState(scrollY);

        // Sticky Header & CTA
        handleStickyElements(scrollY);

        // Hide/show header on scroll
        handleHideOnScroll(scrollY);

        // Hide scroll hint once user starts scrolling
        updateScrollHint(scrollY);
    });

    // 4. Active State Logic
    const sections = document.querySelectorAll('section[id]');
    const spineItems = document.querySelectorAll('.spine-item');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveState(scrollY) {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        spineItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === current) {
                item.classList.add('active');
            }
        });

        navItems.forEach(item => {
            const isActive = item.getAttribute('href') === '#' + current;
            item.classList.toggle('is-active', isActive);
            if (isActive) {
                item.setAttribute('aria-current', 'page');
            } else {
                item.removeAttribute('aria-current');
            }
        });
    }

    function handleStickyElements(scrollY) {
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    function updateScrollHint(scrollY) {
        if (!scrollHint) return;
        scrollHint.classList.toggle('is-hidden', scrollY > 40);
    }

    // 5. Scroll Handling (Mobile Menu Removed)
    function handleHideOnScroll(scrollY) {
        const scrollingDown = scrollY > lastScrollY + scrollDelta;
        const scrollingUp = scrollY < lastScrollY - scrollDelta;

        if (scrollY < 80) {
            header.classList.remove('is-hidden');
        } else if (scrollingDown) {
            header.classList.add('is-hidden');
        } else if (scrollingUp) {
            header.classList.remove('is-hidden');
        }

        lastScrollY = scrollY;
    }

    // Initial state
    updateScrollHint(window.scrollY);

    // 6. Form Handling
    const form = document.getElementById('bookingForm');
    const toast = document.getElementById('toast');
    const messageField = document.getElementById('message');

    // Auto-grow message textarea
    if (messageField) {
        const resizeMessage = () => {
            messageField.style.height = 'auto';
            messageField.style.height = `${messageField.scrollHeight}px`;
        };
        messageField.addEventListener('input', resizeMessage);
        resizeMessage();
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            toast.classList.add('visible');
            setTimeout(() => {
                toast.classList.remove('visible');
                form.reset();
            }, 3000);
        });
    }

    // 7. Package Helper
    window.selectPackage = function (value) {
        let mappedValue = 'weekly';
        
        // Map old values to new radio categories
        if (value === 'events') {
            mappedValue = 'dinner_party'; 
        } else if (value === 'family' || value === 'baby' || value === 'pro' || value === 'sauces') {
            mappedValue = 'weekly';
        }

        // Find the radio button
        const radio = document.querySelector(`input[name="interest"][value="${mappedValue}"]`);
        if (radio) {
            radio.checked = true;
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 8. Preloader
    const preloader = document.getElementById('preloader');
    const barFill = document.getElementById('preloader-bar-fill');
    const percentText = document.getElementById('preloader-percent');

    if (preloader && barFill && percentText) {
        let progress = 0;
        let isLoaded = false;

        // Start animation immediately
        const updateProgress = () => {
            if (!isLoaded) {
                // Increment slowly until loaded, capped at 90%
                if (progress < 90) {
                    progress += (90 - progress) * 0.05; // Ease out approach
                }
            } else {
                // Finish quickly once loaded
                progress += (100 - progress) * 0.2;
                if (progress > 99.5) progress = 100;
            }

            barFill.style.width = `${progress}%`;
            percentText.textContent = `${Math.floor(progress)}%`;

            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                // Done
                setTimeout(() => {
                    preloader.classList.add('is-hidden');
                    setTimeout(() => preloader.remove(), 700);
                }, 250);
            }
        };

        requestAnimationFrame(updateProgress);

        window.addEventListener('load', () => {
            isLoaded = true;
        });
    }

    // 9. Align process marble texture with the wave divider
    const processSection = document.getElementById('process');
    const processWaveSvg = document.getElementById('process-wave-svg');
    const processWaveImage = document.getElementById('process-wave-image');

    if (processSection && processWaveSvg && processWaveImage) {
        const marbleSrc =
            processWaveImage.getAttribute('href') ||
            processWaveImage.getAttribute('xlink:href') ||
            (processWaveImage.href ? processWaveImage.href.baseVal : '');
        if (!marbleSrc) {
            return;
        }
        const marbleAsset = new Image();
        marbleAsset.src = marbleSrc;

        const isWaveFlipped = () => {
            const transform = window.getComputedStyle(processWaveSvg).transform;
            if (!transform || transform === 'none') {
                return false;
            }
            const match = transform.match(/matrix\(([^)]+)\)/);
            if (!match) {
                return false;
            }
            const values = match[1].split(',').map((value) => parseFloat(value.trim()));
            return values.length >= 4 && values[3] < 0;
        };

        const syncWaveTexture = () => {
            if (!marbleAsset.naturalWidth || !marbleAsset.naturalHeight) {
                return;
            }

            const processRect = processSection.getBoundingClientRect();
            const waveRect = processWaveSvg.getBoundingClientRect();

            if (!processRect.width || !processRect.height || !waveRect.width || !waveRect.height) {
                return;
            }

            const scale = Math.max(
                processRect.width / marbleAsset.naturalWidth,
                processRect.height / marbleAsset.naturalHeight
            );
            const scaledWidth = marbleAsset.naturalWidth * scale;
            const scaledHeight = marbleAsset.naturalHeight * scale;
            const offsetX = (processRect.width - scaledWidth) / 2;
            const offsetY = waveRect.top - processRect.top;

            processSection.style.setProperty('--process-marble-offset', `${offsetY}px`);

            const viewBox = processWaveSvg.viewBox.baseVal;
            if (!viewBox || !viewBox.width || !viewBox.height) {
                return;
            }

            const unitX = viewBox.width / waveRect.width;
            const unitY = viewBox.height / waveRect.height;
            const imageX = offsetX * unitX;
            const imageW = scaledWidth * unitX;
            const imageH = scaledHeight * unitY;

            let imageY = 0;
            if (isWaveFlipped()) {
                imageY = viewBox.height - imageH;
            }

            processWaveImage.setAttribute('x', imageX.toFixed(2));
            processWaveImage.setAttribute('y', imageY.toFixed(2));
            processWaveImage.setAttribute('width', imageW.toFixed(2));
            processWaveImage.setAttribute('height', imageH.toFixed(2));
        };

        const scheduleWaveSync = () => {
            window.requestAnimationFrame(syncWaveTexture);
        };

        if (marbleAsset.complete) {
            scheduleWaveSync();
        } else {
            marbleAsset.addEventListener('load', scheduleWaveSync);
        }

        window.addEventListener('resize', scheduleWaveSync);
        window.addEventListener('load', scheduleWaveSync);
    }
});
