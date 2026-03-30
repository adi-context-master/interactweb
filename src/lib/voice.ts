// Browser-native voice — completely free, no API costs

// Speech-to-Text using Web Speech API
export function startListening(
  onResult: (text: string) => void,
  onEnd: () => void
): { stop: () => void } | null {
  const SpeechRecognition =
    typeof window !== "undefined"
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    const text = event.results[0]?.[0]?.transcript || "";
    if (text) onResult(text);
  };

  recognition.onend = onEnd;
  recognition.onerror = onEnd;
  recognition.start();

  return { stop: () => recognition.stop() };
}

// Text-to-Speech using browser SpeechSynthesis
export function speak(text: string, onEnd?: () => void): { cancel: () => void } {
  // Strip demo commands from spoken text
  const cleanText = text.replace(/\[DEMO:\w+\]/g, "").trim();

  if (!cleanText || typeof window === "undefined") {
    onEnd?.();
    return { cancel: () => {} };
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.05;
  utterance.pitch = 1.0;

  // Pick a good female voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) =>
      v.name.includes("Samantha") ||
      v.name.includes("Karen") ||
      v.name.includes("Google UK English Female") ||
      (v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
  );
  if (preferred) utterance.voice = preferred;

  utterance.onend = () => onEnd?.();
  window.speechSynthesis.speak(utterance);

  return { cancel: () => window.speechSynthesis.cancel() };
}

// Type declarations for WebKit Speech API
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}
