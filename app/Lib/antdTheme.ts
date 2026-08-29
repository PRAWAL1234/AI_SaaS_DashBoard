import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#4F46E5',      // Indigo - tumhare Stitch design ka primary color
    colorInfo: '#4F46E5',
    borderRadius: 10,
    fontFamily: "'Inter', -apple-system, sans-serif",
    colorBgContainer: '#ffffff',
    colorBgLayout: '#F9FAFB',
  },
  components: {
    Button: {
      controlHeight: 44,
      fontWeight: 500,
    },
    Card: {
      borderRadiusLG: 16,
      boxShadowTertiary: '0 2px 8px rgba(0,0,0,0.04)',
    },
    Input: {
      controlHeight: 44,
      borderRadius: 8,
    },
  },
};