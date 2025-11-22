import PhoneMockup from './PhoneMockup'

export default function Hero() {
  return (
    <section className="py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Left side */}
        <div className="md:col-span-6 lg:col-span-5 space-y-6">
          <div className="text-sm text-primary font-medium">Download our app</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Get the Online Payment more easily.
          </h1>
          <p className="text-muted-600 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 border rounded-lg shadow-sm hover:shadow-md"
              aria-label="Download on the App Store"
            >
              {/* Apple SVG */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M16.365 1.43c0 1.02-.37 1.94-.98 2.69-.59.74-1.34 1.36-2.2 1.36-.06-1.12.37-2.04 1.01-2.75.66-.73 1.48-1.5 2.17-1.5zM12.25 6.01c-.48 0-1.01.19-1.47.54-.54.42-1.01.42-1.64.42-.7 0-1.38-.21-1.86-.21-.44 0-1.01.21-1.7.55C3.98 8.12 3 10.08 3 12.7 3 16.33 6.17 20 10.5 20c.6 0 1.18-.06 1.74-.17.66-.14 1.28.24 1.66.75.48.66 1.05 1.85 1.82 1.85.57 0 1.22-.33 1.9-.98 1.15-1.02 1.93-2.73 1.93-4.69 0-2.91-1.98-5.41-4.46-6.73-1.1-.56-2.2-.84-3.33-.84z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-muted-600">Download on the</div>
                <div className="font-medium">App Store</div>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 border rounded-lg shadow-sm hover:shadow-md"
              aria-label="Get it on Google Play"
            >
              {/* Play Store SVG */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 2v20l15-10L3 2z" fill="currentColor"/>
                <path d="M21 12l-6 3.5V8.5L21 12z" fill="currentColor" opacity="0.6"/>
              </svg>
              <div className="text-left">
                <div className="text-xs text-muted-600">GET IT ON</div>
                <div className="font-medium">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right side */}
        <div className="md:col-span-6 lg:col-span-7 flex justify-center md:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}
