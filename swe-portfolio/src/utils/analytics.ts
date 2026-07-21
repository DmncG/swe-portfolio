declare global {
  interface Window {
    dataLayer: unknown[];
    // Use an explicit Arguments type match or any[] here for exact GA compatibility
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void; 
  }
}

export function initGA() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!measurementId) return

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  
  // Use the native 'arguments' object to preserve Google's array flattening structure
  window.gtag = function() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments) 
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId)
}
