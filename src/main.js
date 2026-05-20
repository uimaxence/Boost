import App from './App.svelte';
import './app.css';

// JS is running: CSS can safely hide [data-reveal] until GSAP animates them.
// If this script never loads (rare CSP/in-app-browser cases), the class is
// missing and the page stays visible instead of going blank.
document.documentElement.classList.add('js-active');

// Safety net: if GSAP fails to fire (some in-app webviews block or throttle
// ScrollTrigger), force every section visible so the page is never blank.
setTimeout(() => {
  document.documentElement.classList.add('reveal-fallback');
}, 2500);

const app = new App({
  target: document.getElementById('app'),
});

export default app;
