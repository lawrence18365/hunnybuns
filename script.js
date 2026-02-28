document.addEventListener('DOMContentLoaded', () => {
    /* ================================================================
       Header state on scroll (tightens spacing once page moves)
       ================================================================ */
    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    let lastY = window.scrollY;
    const scrollDelta = 8;

    const onScroll = () => {
        if (!header) return;

        const y = window.scrollY;
        header.classList.toggle('is-scrolled', y > 16);

        const menuOpen = mobileMenu && mobileMenu.classList.contains('is-open');
        if (menuOpen) {
            header.classList.remove('is-hidden');
            lastY = y;
            return;
        }

        if (y <= 12) {
            header.classList.remove('is-hidden');
            lastY = y;
            return;
        }

        const scrollingDown = y > lastY + scrollDelta;
        const scrollingUp = y < lastY - scrollDelta;

        if (scrollingDown) header.classList.add('is-hidden');
        if (scrollingUp) header.classList.remove('is-hidden');

        lastY = y;
    };

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(onScroll);
    }, { passive: true });

    onScroll();

    /* ================================================================
       V3/V5: MOBILE MENU
       ================================================================ */
    if (menuBtn && mobileMenu) {
        const toggle = () => {
            const open = mobileMenu.classList.toggle('is-open');
            menuBtn.classList.toggle('is-active', open);
            menuBtn.setAttribute('aria-expanded', open);
            mobileMenu.setAttribute('aria-hidden', !open);
            document.body.style.overflow = open ? 'hidden' : '';
            if (open && header) header.classList.remove('is-hidden');
        };

        menuBtn.addEventListener('click', toggle);
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-open')) toggle();
        }));
    }

    /* ================================================================
       V3/V5: SCROLL REVEAL OBSERVERS
       ================================================================ */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.anim-up').forEach(el => observer.observe(el));


    /* ================================================================
       V3/V5: FORM SUBMISSION (Toast)
       ================================================================ */
    const form = document.getElementById('bookingForm');
    const toast = document.getElementById('toast');

    if (form && toast) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'SENDING...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            setTimeout(() => {
                toast.classList.add('is-visible');

                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;

                setTimeout(() => { toast.classList.remove('is-visible'); }, 3500);
            }, 700);
        });
    }
    /* ================================================================
       V8: FAQ ACCORDION
       ================================================================ */
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqItems = document.querySelectorAll('.faq-item');

    const setFaqState = (item, open) => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!button || !answer) return;

        item.classList.toggle('is-active', open);
        button.setAttribute('aria-expanded', String(open));
        answer.setAttribute('aria-hidden', String(!open));
        answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '0px';
    };

    faqItems.forEach(item => setFaqState(item, false));

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.closest('.faq-item');
            if (!parent) return;

            const isActive = parent.classList.contains('is-active');
            faqItems.forEach(item => setFaqState(item, false));

            if (!isActive) setFaqState(parent, true);
        });
    });

    window.addEventListener('resize', () => {
        faqItems.forEach(item => {
            if (!item.classList.contains('is-active')) return;
            const answer = item.querySelector('.faq-answer');
            if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
        });
    });
});
