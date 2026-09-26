// src/app/App.tsx
import React, { useState, useEffect } from 'react';
import { MotionProvider } from '@/app/providers/MotionProvider';
import { SceneProvider } from '@/app/providers/SceneProvider';
import { SkipLink } from '@/components/layout/SkipLink';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CosmicCanvas } from '@/scene/CosmicCanvas';
import { FallbackPoster } from '@/components/scene/FallbackPoster';
import { HomePage } from '@/pages/HomePage';
import { ProjectPage } from '@/pages/ProjectPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RobloxLabPage } from '@/pages/RobloxLabPage';
import { AtomicHubPage } from '@/pages/AtomicHubPage';
import { PlaygroundPage } from '@/pages/PlaygroundPage';
import { AssetStationPage } from '@/pages/AssetStationPage';
import { DevlogPage } from '@/pages/DevlogPage';
import { DevlogDetailPage } from '@/pages/DevlogDetailPage';
import { OrbitCafePage } from '@/pages/OrbitCafePage';
import { projectsContent } from '@/content/projects';
import { devlogArticles } from '@/content/devlog';

type RouteState =
  | { view: 'home' }
  | { view: 'project'; slug: string }
  | { view: 'roblox-lab' }
  | { view: 'atomic-hub' }
  | { view: 'playground' }
  | { view: 'asset-station' }
  | { view: 'devlog' }
  | { view: 'devlog-detail'; slug: string }
  | { view: 'orbit-cafe' }
  | { view: 'not-found' };

function resolveCurrentRoute(): RouteState {
  if (typeof window === 'undefined') return { view: 'home' };

  const hash = window.location.hash;
  const path = window.location.pathname;

  // 1. Project Detail: #work/:slug or /work/:slug
  const workMatch = hash.match(/^#work\/([a-zA-Z0-9_-]+)/) || path.match(/^\/work\/([a-zA-Z0-9_-]+)/);
  if (workMatch) {
    const slug = workMatch[1];
    const exists = projectsContent.some((p) => p.slug === slug);
    return exists ? { view: 'project', slug } : { view: 'not-found' };
  }

  // 2. Devlog Detail: #devlog/:slug or /devlog/:slug
  const devlogMatch = hash.match(/^#devlog\/([a-zA-Z0-9_-]+)/) || path.match(/^\/devlog\/([a-zA-Z0-9_-]+)/);
  if (devlogMatch) {
    const slug = devlogMatch[1];
    const exists = devlogArticles.some((a) => a.slug === slug);
    return exists ? { view: 'devlog-detail', slug } : { view: 'not-found' };
  }

  // 3. Space Hub Station Pages
  if (hash === '#roblox-lab' || path === '/roblox-lab') return { view: 'roblox-lab' };
  if (hash === '#atomic-hub' || path === '/atomic-hub') return { view: 'atomic-hub' };
  if (hash === '#playground' || path === '/playground') return { view: 'playground' };
  if (hash === '#asset-station' || path === '/asset-station') return { view: 'asset-station' };
  if (hash === '#devlog' || path === '/devlog') return { view: 'devlog' };
  if (hash === '#orbit-cafe' || path === '/orbit-cafe') return { view: 'orbit-cafe' };

  // 4. Invalid sub-routes with slash
  if (hash.startsWith('#/') || (hash.startsWith('#') && hash.includes('/') && !hash.startsWith('#work/'))) {
    return { view: 'not-found' };
  }

  // Default: Home Page
  return { view: 'home' };
}

export const App: React.FC = () => {
  const [route, setRoute] = useState<RouteState>(resolveCurrentRoute);

  useEffect(() => {
    const handleLocationChange = () => {
      const nextRoute = resolveCurrentRoute();
      setRoute(nextRoute);
      if (nextRoute.view !== 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleInspectProject = (slug: string) => {
    window.location.hash = `#work/${slug}`;
  };

  const handleSelectDevlogArticle = (slug: string) => {
    window.location.hash = `#devlog/${slug}`;
  };

  const handleReturnToHome = (anchor: string = '') => {
    window.location.hash = anchor ? `#${anchor}` : '#';
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateStation = (targetRoute: string) => {
    window.location.hash = targetRoute;
  };

  return (
    <MotionProvider>
      <SceneProvider>
        {/* Accessible Skip to Content Link */}
        <SkipLink />

        {/* WebGL 3D Celestial Background Canvas */}
        <CosmicCanvas />

        {/* Fallback CSS Poster (active when WebGL fails or Reduced Motion is selected) */}
        <FallbackPoster />

        {/* Persistent Top Header with Motion Switcher & Station Dropdown */}
        <Header />

        {/* Main Routed Content */}
        {route.view === 'project' && (
          <ProjectPage
            slug={route.slug}
            onBack={() => handleReturnToHome('work')}
          />
        )}

        {route.view === 'roblox-lab' && (
          <RobloxLabPage
            onBack={() => handleReturnToHome('roblox')}
            onNavigatePlayground={() => handleNavigateStation('#playground')}
          />
        )}

        {route.view === 'atomic-hub' && (
          <AtomicHubPage
            onBack={() => handleReturnToHome('atomic-hub-section')}
          />
        )}

        {route.view === 'playground' && (
          <PlaygroundPage
            onBack={() => handleReturnToHome()}
          />
        )}

        {route.view === 'asset-station' && (
          <AssetStationPage
            onBack={() => handleReturnToHome()}
          />
        )}

        {route.view === 'devlog' && (
          <DevlogPage
            onBack={() => handleReturnToHome()}
            onSelectArticle={handleSelectDevlogArticle}
          />
        )}

        {route.view === 'devlog-detail' && (
          <DevlogDetailPage
            slug={route.slug}
            onBack={() => handleNavigateStation('#devlog')}
            onNavigateRoute={handleNavigateStation}
          />
        )}

        {route.view === 'orbit-cafe' && (
          <OrbitCafePage
            onBack={() => handleReturnToHome('experience')}
          />
        )}

        {route.view === 'not-found' && (
          <NotFoundPage onReturn={() => handleReturnToHome()} />
        )}

        {route.view === 'home' && (
          <HomePage
            onInspectProject={handleInspectProject}
            onNavigateStation={handleNavigateStation}
          />
        )}

        {/* Footer with Celestial Coordinates and Back-to-Top */}
        <Footer />
      </SceneProvider>
    </MotionProvider>
  );
};

export default App;
