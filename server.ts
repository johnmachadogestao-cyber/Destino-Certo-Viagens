import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Habilita recebimento de JSON no body das requisições
  app.use(express.json());

  // Habilita proxy trusts para recuperar IPs corretos dos clientes em Cloud Run/Vercel
  app.set("trust proxy", true);

  // Endpoint de test de saúde
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Proxy de Conversões API (CAPI) do Meta
  app.post("/api/track", async (req, res) => {
    try {
      const { eventName, eventId, eventSourceUrl, fbp, fbc, customData } = req.body;

      const pixelId = process.env.META_PIXEL_ID || "995406310194858";
      const accessToken = process.env.META_ACCESS_TOKEN;

      // Se não houver token configurado, apenas faz o log para não quebrar a navegação
      if (!accessToken) {
        console.warn("[Meta CAPI Warning] META_ACCESS_TOKEN não está definido nas variáveis de ambiente.");
        return res.status(200).json({ success: true, status: "token_missing" });
      }

      // Obtém o IP real do cliente (especialmente atrás de proxies/CDN como Cloud Run ou Cloudflare)
      let ipAddress = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
      if (typeof ipAddress === "string" && ipAddress.indexOf(",") !== -1) {
        ipAddress = ipAddress.split(",")[0].trim();
      }

      const userAgent = req.headers["user-agent"] || "";

      // Payload oficial do Meta CAPI
      const payload = {
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            event_source_url: eventSourceUrl || "https://local-destino-certo.com/",
            action_source: "website",
            user_data: {
              client_ip_address: ipAddress,
              client_user_agent: userAgent,
              ...(fbp ? { fbp } : {}),
              ...(fbc ? { fbc } : {}),
            },
            ...(customData ? { custom_data: customData } : {}),
          },
        ],
      };

      console.log(`[Meta CAPI Dispatch] Enviando evento '${eventName}' com ID '${eventId}'...`);

      const fbUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
      const response = await fetch(fbUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = (await response.json()) as any;

      if (!response.ok) {
        console.error(`[Meta CAPI Error] FB respondeu com código ${response.status}:`, responseData);
        return res.status(500).json({ success: false, error: responseData });
      }

      console.log(`[Meta CAPI Success] Evento '${eventName}' sincronizado com sucesso:`, responseData);
      return res.json({ success: true, response: responseData });
    } catch (error: any) {
      console.error("[Meta CAPI Exception] Ocorreu um erro ao processar requisição:", error);
      return res.status(500).json({ success: false, error: error?.message || String(error) });
    }
  });

  // Configuração do middleware do Vite para o ambiente de desenvolvimento
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Escuta na porta 3000 exigida pela infraestrutura
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Servidor] Rodando em http://localhost:${PORT}`);
  });
}

startServer();
