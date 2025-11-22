export default function PhoneMockup() {
  return (
    <div className="relative">
      {/* Decorative shapes */}
      <div className="hidden lg:block absolute -left-20 -top-10 w-40 h-40 rounded-xl bg-gradient-to-tr from-primary to-indigo-400 opacity-8 transform rotate-12 blur-3xl" />

      {/* Phone frame */}
      <div className="w-[320px] sm:w-[360px] md:w-[420px] bg-white rounded-3xl shadow-soft-lg p-4 relative">
        {/* Status bar */}
        <div className="flex items-center justify-between text-xs text-muted-600 mb-3 px-1">
          <div>Card Details</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span>Active</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-primary text-white rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="text-sm/none">VISA</div>
            <div className="text-sm">•••• 3489</div>
          </div>
          <div className="mt-6 text-2xl font-semibold">$8,430</div>
          <div className="text-xs text-indigo-100 mt-1">Available balance</div>
        </div>

        {/* Mini chart (SVG) */}
        <div className="bg-slate-50 rounded-lg p-3 mb-4">
          <svg viewBox="0 0 220 48" className="w-full h-12">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#60a5fa" stopOpacity="0.12"/>
                <stop offset="1" stopColor="#7c3aed" stopOpacity="0.04"/>
              </linearGradient>
            </defs>
            <polyline fill="url(#g)" points="0,40 28,30 56,24 84,20 112,22 140,16 168,12 196,14 220,10" stroke="transparent" />
            <polyline fill="none" stroke="#2563EB" strokeWidth="2" points="0,40 28,30 56,24 84,20 112,22 140,16 168,12 196,14 220,10" />
          </svg>
        </div>

        {/* Transaction list */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">May Transaction</div>
            <div className="text-xs text-muted-600">Last 30 days</div>
          </div>

          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow">
                  {/* Apple Pay circle */}
                  <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.02-.37 1.94-.98 2.69-.59.74-1.34 1.36-2.2 1.36-.06-1.12.37-2.04 1.01-2.75.66-.73 1.48-1.5 2.17-1.5zM12.25 6.01c-.48 0-1.01.19-1.47.54-.54.42-1.01.42-1.64.42-.7 0-1.38-.21-1.86-.21-.44 0-1.01.21-1.7.55C3.98 8.12 3 10.08 3 12.7 3 16.33 6.17 20 10.5 20c.6 0 1.18-.06 1.74-.17.66-.14 1.28.24 1.66.75.48.66 1.05 1.85 1.82 1.85.57 0 1.22-.33 1.9-.98 1.15-1.02 1.93-2.73 1.93-4.69 0-2.91-1.98-5.41-4.46-6.73-1.1-.56-2.2-.84-3.33-.84z"/></svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Apple Pay</div>
                  <div className="text-xs text-muted-600">Payment</div>
                </div>
              </div>
              <div className="text-sm font-semibold">-$45.00</div>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM8 11h2v5H8v-5zm6 0h2v5h-2v-5z"/></svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Lyft</div>
                  <div className="text-xs text-muted-600">Ride</div>
                </div>
              </div>
              <div className="text-sm font-semibold">-$22.50</div>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM10.5 7.5h3v1h-3v-1zM9 11h6v1H9v-1zM9 14h4v1H9v-1z"/></svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Uber Eats</div>
                  <div className="text-xs text-muted-600">Food</div>
                </div>
              </div>
              <div className="text-sm font-semibold">-$15.20</div>
            </li>
          </ul>
        </div>
      </div>

      {/* bottom decorative */}
      <div className="absolute -right-8 bottom-0 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-indigo-400 opacity-10 transform rotate-12" />
    </div>
  )
}
