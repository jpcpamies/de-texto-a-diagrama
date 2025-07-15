declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

export const initializeGA4 = () => {
  if (!GA4_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not provided');
    return;
  }

  // Create script tag for Google Analytics
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer.push(args);
  };

  // Configure Google Analytics
  window.gtag('js', new Date());
  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_title: 'De Texto a Diagrama',
    page_location: window.location.href,
    send_page_view: true,
  });

  console.log('Google Analytics initialized with ID:', GA4_MEASUREMENT_ID);
};

export const trackEvent = (
  eventName: string,
  parameters?: {
    [key: string]: string | number | boolean;
  }
) => {
  if (!window.gtag) {
    console.warn('Google Analytics not initialized');
    return;
  }

  window.gtag('event', eventName, {
    ...parameters,
    timestamp: Date.now(),
  });

  console.log('GA4 Event tracked:', eventName, parameters);
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!window.gtag) {
    console.warn('Google Analytics not initialized');
    return;
  }

  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
};