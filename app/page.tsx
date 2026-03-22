'use client';

import { useMemo, useState } from 'react';
import { FlashcardDrawer } from '@/components/FlashcardDrawer';
import { WorkshopPanel } from '@/components/WorkshopPanel';
import {
  discoverCard,
  discoverExperts,
  FlashcardDraft,
  recentExperts,
  recentSummary,
} from '@/data/mock';

type View = 'recent' | 'discover';

export default function Home() {
  const [view, setView] = useState<View>('recent');
  const [cards, setCards] = useState<FlashcardDraft[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const saveCard = (incoming: FlashcardDraft) => {
    setCards((prev) => {
      const exists = prev.some((card) => card.id === incoming.id);
      if (exists) return prev;
      return [incoming, ...prev];
    });
  };

  const content = useMemo(() => {
    if (view === 'discover') {
      return (
        <div className="space-y-6">
          <section>
            <p className="eyebrow">Discovery Workspace</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Discover</h1>
            <p className="mt-2 max-w-2xl text-sm text-text-secondary">
              Questions built from your saved collection, with the brand purple reserved for the
              moments that need action.
            </p>
          </section>

          <section className="panel p-7">
            <p className="eyebrow">Generated Card</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">{discoverCard.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{discoverCard.subtitle}</p>
            <div className="mt-5">
              <WorkshopPanel
                experts={discoverExperts}
                subtitle="Pick one expert question from this card"
                onSave={saveCard}
                cards={cards}
                mode="discover"
              />
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <section className="panel p-7">
          <p className="eyebrow">Saved</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">
            {recentSummary.title}
          </h1>
          <p className="mt-2 text-sm text-text-secondary">{recentSummary.source}</p>
        </section>

        <section className="panel p-7">
          <p className="eyebrow">Summary</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">What this content says</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-text-secondary">
            {recentSummary.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <WorkshopPanel experts={recentExperts} onSave={saveCard} cards={cards} />
      </div>
    );
  }, [cards, view]);

  return (
    <main className="min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="panel h-fit p-4">
          <p className="eyebrow mb-3">Workspace</p>
          <div className="space-y-2">
            <button
              onClick={() => setView('recent')}
              className="nav-button"
              data-active={view === 'recent'}
            >
              Recent
            </button>
            <button
              onClick={() => setView('discover')}
              className="nav-button"
              data-active={view === 'discover'}
            >
              Discover
            </button>
          </div>
        </aside>

        <section>{content}</section>
      </div>

      <button
        onClick={() => setDrawerOpen(true)}
        className="btn-primary fixed bottom-6 right-6 z-20 rounded-full px-5 py-3 shadow-soft"
      >
        Flashcards ({cards.length})
      </button>

      <FlashcardDrawer
        open={drawerOpen}
        cards={cards}
        onClose={() => setDrawerOpen(false)}
        onRemove={(id) => setCards((prev) => prev.filter((card) => card.id !== id))}
      />
    </main>
  );
}
