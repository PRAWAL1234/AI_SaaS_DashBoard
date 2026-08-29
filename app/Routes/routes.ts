export const ROUTES = {
  // Public
  HOME: '/',
  ONBOARDING: '/onboarding',

  // Auth
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Dashboard (protected)
  DASHBOARD: '/dashboard',
  JOBMATCH: '/dashboard/job-match',
  HISTORY: '/dashboard/AnalysisHistory',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
  BILLING: '/dashboard/billing',
  MATCH_ANALYSIS: '/dashboard/job-match/MatchAnalysisResult',
} as const;