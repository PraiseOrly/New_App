declare module 'PatientDashboardLayout' {
  import { FC, ReactNode } from 'react';

  interface DashboardLayoutProps {
    children: ReactNode;
    userName: string;
    role?: string;
  }

  const PatientDashboardLayout: FC<DashboardLayoutProps>;

  export default PatientDashboardLayout;
}
