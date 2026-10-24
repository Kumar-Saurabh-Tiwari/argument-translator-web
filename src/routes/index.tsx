import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownUp, AudioLines, Globe2, MessageSquareText, Radio, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatMockTranslation } from "@/lib/live-translation";

const languages = ["English", "Hindi", "Spanish", "Japanese"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CrossTalk — Live Translation Room" },
      {
        name: "description",
        content: "A two-sided live translation conversation room mockup.",
      },
      { property: "og:title", content: "CrossTalk — Live Translation Room" },
      {
        property: "og:description",
        content: "A two-sided live translation conversation room mockup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type SpeakerPanelProps = {
  side: "a" | "b";
  name: string;
  initials: string;
  language: string;
  incomingFrom: string;
  incomingText: string;
  draft: string;
  onLanguageChange: (language: string) => void;
  onDraftChange: (text: string) => void;
};

function SpeakerPanel({
  side,
  name,
  initials,
  language,
  incomingFrom,
  incomingText,
  draft,
  onLanguageChange,
  onDraftChange,
}: SpeakerPanelProps) {
  const isTyping = draft.trim().length > 0;

  return (
    <section className={`speaker-panel speaker-${side} flex min-h-[39rem] flex-col`}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 px-5 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="speaker-avatar grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{side === "a" ? "YOUR SIDE" : "THEIR SIDE"}</p>
          </div>
        </div>

        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger aria-label={`${name}'s language`} className="h-10 w-[10.5rem] rounded-lg border-border/80 bg-background/60 text-sm">
            <Globe2 className="mr-2 size-4 shrink-0 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((item) => (
              <SelectItem key={item} value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-10 px-5 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-7 flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] text-muted-foreground">
            <span className="speaker-signal inline-flex items-center gap-2">
              <AudioLines className="size-4" />
              <span>INCOMING FROM {incomingFrom.toUpperCase()}</span>
            </span>
            {incomingText && <span className="translation-tag">MOCK TRANSLATION</span>}
          </div>
          {incomingText ? (
            <p aria-live="polite" className="incoming-copy animate-in fade-in duration-300">
              {incomingText}
            </p>
          ) : (
            <p className="waiting-copy">Waiting for {incomingFrom}…</p>
          )}
        </div>

        <div className={`composer-surface rounded-xl border p-4 transition-all duration-300 sm:p-5 ${isTyping ? "composer-active" : ""}`}>
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className={`speaker-dot ${isTyping ? "is-live" : ""}`} />
              {isTyping ? "Speaking now" : "Your message"}
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">{draft.length}/500</span>
          </div>
          <Textarea
            aria-label={`Message from ${name}`}
            maxLength={500}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="Type what you want to say…"
            value={draft}
            className="min-h-28 resize-none border-0 bg-transparent px-0 py-1 text-base leading-7 shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-0 sm:text-lg"
          />
          <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
            <span className="text-xs text-muted-foreground">Translated into {side === "a" ? "their" : "your"} language</span>
            <Button variant="ghost" size="icon" aria-label={`Clear ${name}'s message`} title="Clear message" disabled={!draft} onClick={() => onDraftChange("")} className="size-8 rounded-full text-muted-foreground">
              <span className="sr-only">Clear message</span>
              <MessageSquareText className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [languageA, setLanguageA] = useState("English");
  const [languageB, setLanguageB] = useState("Spanish");
  const [draftA, setDraftA] = useState("");
  const [draftB, setDraftB] = useState("");

  const swapLanguages = () => {
    setLanguageA(languageB);
    setLanguageB(languageA);
  };

  return (
    <main className="conversation-backdrop min-h-screen px-4 py-5 text-foreground sm:px-8 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100svh-2.5rem)] max-w-7xl flex-col sm:min-h-[calc(100svh-4rem)]">
        <header className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8">
          <a className="flex items-center gap-3" href="/" aria-label="CrossTalk home">
            <span className="brand-mark grid size-10 place-items-center rounded-xl">
              <AudioLines className="size-5" />
            </span>
            <span className="text-[15px] font-semibold tracking-[0.02em]">crosstalk<span className="brand-period">.</span></span>
          </a>

          <div className="flex items-center gap-3">
            <div className="room-status flex items-center gap-2 rounded-full border border-border/70 px-3 py-2 text-xs text-muted-foreground">
              <span className="status-dot" />
              <span>LOCAL PREVIEW</span>
            </div>
            <Button variant="outline" size="icon" aria-label="Swap languages" title="Swap languages" onClick={swapLanguages} className="size-10 rounded-full border-border/80 bg-background/50">
              <ArrowDownUp className="size-4" />
            </Button>
          </div>
        </header>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Radio className="size-3.5 text-primary" />
              <span>TWO SIDES · ONE CONVERSATION</span>
            </div>
            <h1 className="page-title">Say it like you mean it.</h1>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-card/40 px-3 py-2 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            <span>Instant translation preview</span>
          </div>
        </div>

        <div className="language-flow mb-4 hidden items-center justify-center gap-3 text-xs text-muted-foreground sm:flex" aria-hidden="true">
          <span>{languageA}</span>
          <span className="flow-line" />
          <ArrowDownUp className="size-3.5" />
          <span className="flow-line" />
          <span>{languageB}</span>
        </div>

        <div className="conversation-grid grid flex-1 grid-cols-1 overflow-hidden rounded-2xl border border-border/80 bg-card/50 shadow-conversation md:grid-cols-2">
          <SpeakerPanel
            side="a"
            name="You"
            initials="A"
            language={languageA}
            incomingFrom="Speaker B"
            incomingText={formatMockTranslation(draftB)}
            draft={draftA}
            onLanguageChange={setLanguageA}
            onDraftChange={setDraftA}
          />
          <SpeakerPanel
            side="b"
            name="Speaker B"
            initials="B"
            language={languageB}
            incomingFrom="You"
            incomingText={formatMockTranslation(draftA)}
            draft={draftB}
            onLanguageChange={setLanguageB}
            onDraftChange={setDraftB}
          />
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 px-1 pt-4 text-[11px] text-muted-foreground/80">
          <span>Both sides are ready.</span>
          <span>Prototype · no messages are sent</span>
        </footer>
      </div>
    </main>
  );
}
