import { FlashcardDraft } from '@/data/mock';

type Props = {
  open: boolean;
  cards: FlashcardDraft[];
  onClose: () => void;
  onRemove: (id: string) => void;
};

export function FlashcardDrawer({ open, cards, onClose, onRemove }: Props) {
  return (
    <>
      {open ? <button className="fixed inset-0 z-30 bg-surface-overlay" onClick={onClose} /> : null}
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-full max-w-md border-l border-line-subtle bg-surface-elevated p-6 shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="eyebrow">Collection</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">Flashcards</h3>
            <p className="text-sm text-text-secondary">{cards.length} saved</p>
          </div>
          <button onClick={onClose} className="btn-secondary px-3 py-1.5 text-sm">
            Close
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto pb-20">
          {cards.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line-strong p-5 text-sm text-text-meta">
              No flashcards yet. Save from any answer block.
            </div>
          ) : (
            cards.map((card) => (
              <div key={card.id} className="rounded-2xl border border-line-subtle bg-surface-base p-4">
                <p className="text-xs uppercase tracking-wide text-text-meta">Front</p>
                <p className="mb-2 text-sm font-medium text-text-primary">{card.front}</p>
                <p className="text-xs uppercase tracking-wide text-text-meta">Back</p>
                <p className="mb-2 text-sm text-text-secondary">{card.back}</p>
                <p className="text-xs text-text-meta">Source: {card.source}</p>
                <button
                  className="mt-3 text-sm font-medium text-text-secondary underline decoration-line-strong underline-offset-4 hover:text-interactive-primary"
                  onClick={() => onRemove(card.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
