export function welcomeEmailHtml(name: string) {
  return `
    <div style="font-family:Segoe UI,Arial,sans-serif;padding:24px;color:#1f1e1b">
      <h1 style="margin:0 0 12px;color:#9a3412">Welcome to Listing Profit Dashboard</h1>
      <p style="font-size:16px;line-height:1.6">Hi ${name}, your workspace is ready with sample Etsy listings, fee presets, and quote-ready templates.</p>
      <p style="font-size:16px;line-height:1.6">Next step: open your dashboard, review the sample listings, and replace them with your real catalog.</p>
    </div>
  `;
}
