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
      {open ? <button className="fixed inset-0 z-30 bg-slate-900/20" onClick={onClose} /> : null}
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-full max-w-md border-l border-slate-200 bg-white p-6 shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Flashcards</h3>
            <p className="text-sm text-slate-500">{cards.length} saved</p>
          </div>
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm">
            Close
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto pb-20">
          {cards.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
              No flashcards yet. Save from any answer block.
            </div>
          ) : (
            cards.map((card) => (
              <div key={card.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Front</p>
                <p className="mb-2 text-sm font-medium text-slate-800">{card.front}</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">Back</p>
                <p className="mb-2 text-sm text-slate-700">{card.back}</p>
                <p className="text-xs text-slate-500">Source: {card.source}</p>
                <button
                  className="mt-3 text-sm font-medium text-rose-600 hover:text-rose-700"
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
