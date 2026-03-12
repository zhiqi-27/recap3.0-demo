'use client';

import { useMemo, useState } from 'react';
import { Expert, FlashcardDraft } from '@/data/mock';

type Props = {
  experts: Expert[];
  subtitle?: string;
  onSave: (card: FlashcardDraft) => void;
  cards: FlashcardDraft[];
  mode?: 'recent' | 'discover';
};

export function WorkshopPanel({ experts, subtitle, onSave, cards, mode = 'recent' }: Props) {
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [evidenceByExpert, setEvidenceByExpert] = useState<Record<string, number>>({});
  const [directionByExpert, setDirectionByExpert] = useState<Record<string, string | null>>({});

  const selectedExpert = useMemo(
    () => experts.find((expert) => expert.id === selectedExpertId) ?? null,
    [experts, selectedExpertId],
  );

  const selectedEvidenceIndex = selectedExpert ? (evidenceByExpert[selectedExpert.id] ?? 0) : 0;
  const selectedDirection =
    selectedExpert && directionByExpert[selectedExpert.id]
      ? selectedExpert.directions.find((d) => d.id === directionByExpert[selectedExpert.id]) ?? null
      : null;

  const saveAnswerFlashcard = () => {
    if (!selectedExpert) return;
    const evidenceText = selectedExpert.evidence[selectedEvidenceIndex];
    onSave({
      id: `${mode}-${selectedExpert.id}-answer-${selectedEvidenceIndex}`,
      front: `${selectedExpert.name}: ${selectedExpert.question}`,
      back: `Focus evidence: ${evidenceText}\n\n${selectedExpert.answersByEvidence[selectedEvidenceIndex].split('\n\n')[0]}`,
      source: 'Britannica / National Archives / NPS (mocked)',
    });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold">Work through this content</h2>
      <p className="mt-1 text-sm text-slate-500">{subtitle ?? 'Pick one question to start'}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {experts.map((expert) => {
          const selected = expert.id === selectedExpertId;
          return (
            <button
              key={expert.id}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? 'border-accent bg-blue-50 shadow-soft'
                  : selectedExpertId
                    ? 'border-slate-200 opacity-55 hover:opacity-80'
                    : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => {
                setSelectedExpertId(expert.id);
                setEvidenceByExpert((prev) => ({ ...prev, [expert.id]: prev[expert.id] ?? 0 }));
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  {expert.initials}
                </div>
                <p className="text-sm font-medium text-slate-700">{expert.name}</p>
              </div>
              <p className="text-sm leading-relaxed">{expert.question}</p>
            </button>
          );
        })}
      </div>

      {selectedExpert ? (
        <div className="mt-6 space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <header>
            <h3 className="text-lg font-semibold">{selectedExpert.name}</h3>
            <p className="text-xs text-slate-500">Working through one angle at a time</p>
          </header>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
            <p className="text-base">{selectedExpert.question}</p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Key evidence from this angle</p>
            <div className="grid gap-2 md:grid-cols-3">
              {selectedExpert.evidence.map((item, idx) => (
                <button
                  key={item}
                  onClick={() => setEvidenceByExpert((prev) => ({ ...prev, [selectedExpert.id]: idx }))}
                  className={`rounded-xl border p-3 text-left text-sm ${
                    selectedEvidenceIndex === idx
                      ? 'border-accent bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Answer</p>
              <div className="flex gap-2">
                <button className="text-xs text-slate-500 underline">See related evidence</button>
                <button
                  onClick={saveAnswerFlashcard}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-medium hover:border-accent hover:text-accent"
                >
                  Save as flashcard
                </button>
              </div>
            </div>
            <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
              {selectedExpert.answersByEvidence[selectedEvidenceIndex]
                .split('\n\n')
                .map((part) => (
                  <p key={part}>{part}</p>
                ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Continue from here</p>
            <div className="grid gap-2 md:grid-cols-2">
              {selectedExpert.directions.map((direction) => {
                const active = selectedDirection?.id === direction.id;
                return (
                  <button
                    key={direction.id}
                    onClick={() =>
                      setDirectionByExpert((prev) => ({
                        ...prev,
                        [selectedExpert.id]: active ? null : direction.id,
                      }))
                    }
                    className={`rounded-xl border p-3 text-left text-sm ${
                      active ? 'border-accent bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {direction.title}
                  </button>
                );
              })}
            </div>

            {selectedDirection ? (
              <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-700">{selectedDirection.explanation}</p>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-600">
                  {selectedDirection.supportingEvidence.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      onSave({
                        id: `${mode}-${selectedExpert.id}-${selectedDirection.id}`,
                        front: selectedDirection.flashcardFront,
                        back: selectedDirection.flashcardBack,
                        source: selectedDirection.source,
                      })
                    }
                    className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Save as flashcard
                  </button>
                  <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700">
                    See source
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Flashcards from this answer</p>
            <div className="space-y-2">
              {cards.filter((card) => card.id.includes(selectedExpert.id)).length === 0 ? (
                <p className="rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-500">
                  No flashcards saved yet for this expert.
                </p>
              ) : (
                cards
                  .filter((card) => card.id.includes(selectedExpert.id))
                  .map((card) => (
                    <div key={card.id} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs text-slate-500">Front</p>
                      <p className="text-sm font-medium">{card.front}</p>
                      <p className="mt-1 text-xs text-slate-500">Back</p>
                      <p className="text-sm text-slate-700">{card.back}</p>
                      <p className="mt-1 text-xs text-slate-500">Source: {card.source}</p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
