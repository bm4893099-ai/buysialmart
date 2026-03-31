import SiteHeader from '../components/layout/SiteHeader.jsx';
import SuperAdminDashboard from '../components/dashboard/SuperAdminDashboard.jsx';
import MarketingFooter from '../components/marketing/MarketingFooter.jsx';

export default function SuperAdminPage() {
  return (
    <div>
      <SiteHeader />
      <main>
        <SuperAdminDashboard />
      </main>
      <MarketingFooter />
    </div>
  );
}
