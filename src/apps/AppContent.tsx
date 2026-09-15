import type { AppId } from '../os/os';
import Finder from './Finder';
import ProjectViewer from './ProjectViewer';
import Terminal from './Terminal';
import Skills from './Skills';
import Photos from './Photos';
import { GitHubApp, Safari } from './Internet';
import {
  About,
  Achievements,
  CertificateViewer,
  Contact,
  Education,
  Experience,
  Notes,
  Resume,
  SettingsApp,
  Welcome,
} from './apps';

export default function AppContent({ app, payload }: { app: AppId; payload?: any }) {
  switch (app) {
    case 'finder':
      return <Finder initialSection={payload?.section} />;
    case 'project':
      return <ProjectViewer slug={payload?.slug ?? 'safespeak'} />;
    case 'certificate':
      return <CertificateViewer index={payload?.index ?? 0} />;
    case 'welcome':
      return <Welcome />;
    case 'about':
      return <About />;
    case 'terminal':
      return <Terminal />;
    case 'skills':
      return <Skills />;
    case 'experience':
      return <Experience />;
    case 'education':
      return <Education />;
    case 'achievements':
      return <Achievements />;
    case 'resume':
      return <Resume />;
    case 'safari':
      return <Safari />;
    case 'github':
      return <GitHubApp />;
    case 'photos':
      return <Photos />;
    case 'notes':
      return <Notes />;
    case 'contact':
      return <Contact />;
    case 'settings':
      return <SettingsApp />;
    default:
      return <Welcome />;
  }
}
