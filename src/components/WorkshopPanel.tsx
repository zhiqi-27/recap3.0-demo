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
    <section className="panel p-7">
      <p className="eyebrow">Workshop</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">Work through this content</h2>
      <p className="mt-2 text-sm text-text-secondary">{subtitle ?? 'Pick one question to start'}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {experts.map((expert) => {
          const selected = expert.id === selectedExpertId;
          return (
            <button
              key={expert.id}
              className="expert-card"
              data-muted={selectedExpertId && !selected}
              data-selected={selected}
              onClick={() => {
                setSelectedExpertId(expert.id);
                setEvidenceByExpert((prev) => ({ ...prev, [expert.id]: prev[expert.id] ?? 0 }));
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line-subtle bg-surface-muted text-xs font-semibold text-text-primary">
                  {expert.initials}
                </div>
                <p className="text-sm font-medium text-text-secondary">{expert.name}</p>
              </div>
              <p className="text-sm leading-relaxed text-text-primary">{expert.question}</p>
            </button>
          );
        })}
      </div>

      {selectedExpert ? (
        <div className="mt-6 space-y-6 rounded-[26px] border border-line-strong bg-surface-base p-5">
          <header>
            <h3 className="text-lg font-semibold tracking-tight">{selectedExpert.name}</h3>
            <p className="text-xs text-text-meta">Working through one angle at a time</p>
          </header>

          <div>
            <p className="eyebrow mb-2">Question</p>
            <p className="text-base">{selectedExpert.question}</p>
          </div>

          <div>
            <p className="eyebrow mb-2">Key evidence from this angle</p>
            <div className="grid gap-2 md:grid-cols-3">
              {selectedExpert.evidence.map((item, idx) => (
                <button
                  key={item}
                  onClick={() => setEvidenceByExpert((prev) => ({ ...prev, [selectedExpert.id]: idx }))}
                  className="choice-chip"
                  data-active={selectedEvidenceIndex === idx}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <p className="eyebrow">Answer</p>
              <div className="flex gap-2">
                <button className="text-xs font-medium text-text-meta underline decoration-line-strong underline-offset-4 hover:text-interactive-primary">
                  See related evidence
                </button>
                <button
                  onClick={saveAnswerFlashcard}
                  className="btn-secondary px-3 py-1 text-xs"
                >
                  Save as flashcard
                </button>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border border-line-subtle bg-surface-elevated p-4 text-sm leading-6 text-text-secondary">
              {selectedExpert.answersByEvidence[selectedEvidenceIndex]
                .split('\n\n')
                .map((part) => (
                  <p key={part}>{part}</p>
                ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-2">Continue from here</p>
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
                    className="choice-chip"
                    data-active={active}
                  >
                    {direction.title}
                  </button>
                );
              })}
            </div>

            {selectedDirection ? (
              <div className="mt-3 rounded-2xl border border-line-subtle bg-surface-elevated p-4">
                <p className="text-sm text-text-secondary">{selectedDirection.explanation}</p>
                <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-text-secondary">
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
                    className="btn-primary px-3 py-1.5 text-xs"
                  >
                    Save as flashcard
                  </button>
                  <button className="btn-secondary px-3 py-1.5 text-xs">
                    See source
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <p className="eyebrow mb-2">Flashcards from this answer</p>
            <div className="space-y-2">
              {cards.filter((card) => card.id.includes(selectedExpert.id)).length === 0 ? (
                <p className="rounded-2xl border border-dashed border-line-strong p-3 text-sm text-text-meta">
                  No flashcards saved yet for this expert.
                </p>
              ) : (
                cards
                  .filter((card) => card.id.includes(selectedExpert.id))
                  .map((card) => (
                    <div key={card.id} className="rounded-2xl border border-line-subtle bg-surface-elevated p-3">
                      <p className="text-xs text-text-meta">Front</p>
                      <p className="text-sm font-medium">{card.front}</p>
                      <p className="mt-1 text-xs text-text-meta">Back</p>
                      <p className="text-sm text-text-secondary">{card.back}</p>
                      <p className="mt-1 text-xs text-text-meta">Source: {card.source}</p>
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
