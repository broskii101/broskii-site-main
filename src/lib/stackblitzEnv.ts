export function ensureStackblitzEnv() {
  // only run this on StackBlitz preview URLs
  if (window.location.hostname.includes('webcontainer.io')) {
    localStorage.setItem(
      'VITE_SUPABASE_URL',
      'https://ewdezxzvrcirfujxndyz.supabase.co'
    )
    localStorage.setItem(
      'VITE_SUPABASE_ANON_KEY',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZGV6eHp2cmNpcmZ1anhuZHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNDY4MjYsImV4cCI6MjA2NzgyMjgyNn0.xJA23v9VnH7RKyjvu4gxNdWDumnOBkWnjFEhkAH1Bvc'
    )
  }
}
