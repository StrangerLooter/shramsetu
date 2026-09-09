'use client';

/**
 * Procedural Web Audio Chime & Vernacular Speech Synthesis
 * Emulates the Indian Paytm/PhonePe/Govt Soundbox ("₹350 ShramSetu Parishramik Prapt Hua")
 * Zero external mp3 dependencies - uses Web Audio API synthesizer + Web Speech API.
 */

// Play authentic payment settlement chime using Web Audio API oscillators
export function playSoundboxChime() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.1);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + index * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.1 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.1);
      osc.stop(ctx.currentTime + index * 0.1 + 0.35);
    });
  } catch (e) {
    console.warn('Web Audio playback error', e);
  }
}

/**
 * Speaks message in Hindi or English using browser SpeechSynthesis
 */
export function speakSoundboxAnnouncement(text: string, lang: 'hi' | 'en' = 'hi') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    // Play soundbox tone first
    playSoundboxChime();

    setTimeout(() => {
      window.speechSynthesis.cancel(); // Stop any pending utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      // Pick Hindi or Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(v => 
        lang === 'hi' 
          ? v.lang.includes('hi') || v.name.includes('Hindi') 
          : v.lang.includes('IN') || v.name.includes('India')
      );
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      window.speechSynthesis.speak(utterance);
    }, 450);
  } catch (e) {
    console.warn('Speech synthesis error', e);
  }
}

export function announceWorkerWageSettlement(amount: number, workerName: string, lang: 'hi' | 'en' = 'hi') {
  if (lang === 'hi') {
    speakSoundboxAnnouncement(
      `श्रमसेतु पर तीन सौ पचास रुपये का संरक्षित पारिश्रमिक प्राप्त हुआ। कामगार ${workerName} का धन्यवाद।`,
      'hi'
    );
  } else {
    speakSoundboxAnnouncement(
      `Protected wage of rupees ${amount} credited successfully to ${workerName} via ShramSetu Escrow.`,
      'en'
    );
  }
}
