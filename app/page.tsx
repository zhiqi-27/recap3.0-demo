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
            <h1 className="text-2xl font-semibold">Discover</h1>
            <p className="mt-1 text-sm text-slate-500">Questions built from your saved collection</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold">{discoverCard.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{discoverCard.subtitle}</p>
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
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Saved</p>
          <h1 className="mt-2 text-3xl font-semibold">{recentSummary.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{recentSummary.source}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold">What this content says</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Workspace</p>
          <div className="space-y-2">
            <button
              onClick={() => setView('recent')}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                view === 'recent' ? 'bg-blue-50 text-accent' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setView('discover')}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                view === 'discover' ? 'bg-blue-50 text-accent' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Discover
            </button>
          </div>
        </aside>

        <section>{content}</section>
      </div>

      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-20 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-slate-700"
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
