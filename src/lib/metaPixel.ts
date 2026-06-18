/**
 * Rastreamento de Eventos (Meta Pixel + Conversions API)
 * Com deduplicação robusta por Event ID
 */

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

/**
 * Gera um ID único de evento para fins de deduplicação (Pixel vs CAPI).
 * Formato: [nome_do_evento]_[timestamp]_[string_aleatoria]
 */
export function generateEventId(eventName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${eventName.toLowerCase()}_${timestamp}_${random}`;
}

/**
 * Recupera o valor de um cookie armazenado no navegador.
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

interface TrackParams {
  eventName: "PageView" | "Lead";
  eventId: string;
  customData?: Record<string, any>;
}

/**
 * Dispara um evento rastreado de forma síncrona/assíncrona no Pixel do navegador
 * e faz a requisição em background para a Conversions API (CAPI) no servidor.
 */
export async function trackEvent({ eventName, eventId, customData = {} }: TrackParams): Promise<void> {
  console.log(`[Tracker] Iniciando disparo do evento '${eventName}' (ID: ${eventId})`);

  // 1. Envia via Pixel do Navegador (Browser Client)
  if (typeof window !== "undefined") {
    if (window.fbq) {
      try {
        window.fbq("track", eventName, customData, { eventID: eventId });
        console.log(`[Pixel Browser] Evento '${eventName}' enviado com sucesso.`);
      } catch (err) {
        console.error("[Pixel Browser Error] Falha ao enviar evento:", err);
      }
    } else {
      console.warn("[Pixel Browser Warn] Objeto 'window.fbq' não foi encontrado. O script do Pixel está ativo?");
    }
  }

  // 2. Envia via Conversions API (CAPI Server-side)
  try {
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    const eventSourceUrl = typeof window !== "undefined" ? window.location.href : "";

    await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl,
        fbp,
        fbc,
        customData,
      }),
    });
    console.log(`[CAPI Server Handler] Evento '${eventName}' enviado com sucesso para desduplicação.`);
  } catch (err) {
    console.error("[CAPI Client Error] Falha ao despachar requisição para proxy do CAPI:", err);
  }
}
