import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { cloudflare } from '@cloudflare/vite-plugin';

function devEmailApiPlugin() {
  return {
    name: 'dev-email-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/send-email', (req, res) => {
        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          });
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
          return;
        }

        let raw = '';
        req.on('data', (chunk) => {
          raw += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const payload = JSON.parse(raw || '{}');
            const { senderName, senderEmail, senderMessage } = payload || {};

            if (!senderName?.trim()) {
              res.writeHead(400);
              res.end(JSON.stringify({ success: false, error: 'Name is required.' }));
              return;
            }

            if (!senderMessage?.trim()) {
              res.writeHead(400);
              res.end(JSON.stringify({ success: false, error: 'Message is required.' }));
              return;
            }

            const env = loadEnv('development', process.cwd(), '');
            const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;

            if (!apiKey) {
              res.writeHead(500);
              res.end(JSON.stringify({ success: false, error: 'RESEND_API_KEY is not set in .env' }));
              return;
            }

            const cleanEmail =
              senderEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())
                ? senderEmail.trim()
                : null;

            const escapeHtml = (str) =>
              str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');

            const safeName = escapeHtml(senderName.trim());
            const safeEmail = cleanEmail ? escapeHtml(cleanEmail) : 'Not provided';
            const safeMessage = escapeHtml(senderMessage.trim());

            const emailHtml = `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #08080c; color: #f8fafc; margin: 0; padding: 24px; }
                  .container { max-width: 600px; margin: 0 auto; background: #0e0e16; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
                  .header { border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 20px; margin-bottom: 24px; }
                  .eyebrow { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #60a5fa; font-weight: 600; }
                  .title { font-size: 22px; font-weight: 700; color: #ffffff; margin: 6px 0 0 0; }
                  .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 4px; }
                  .field-value { font-size: 15px; color: #ffffff; margin-bottom: 20px; font-weight: 500; }
                  .field-value a { color: #38bdf8; text-decoration: none; }
                  .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; color: #e2e8f0; font-size: 14px; line-height: 1.65; white-space: pre-wrap; word-break: break-word; font-family: 'SFMono-Regular', Consolas, monospace; }
                  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #64748b; text-align: center; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <div class="eyebrow">🚀 Transmission Received</div>
                    <div class="title">New Message from Portfolio</div>
                  </div>
                  <div class="field-label">Sender</div>
                  <div class="field-value">${safeName}</div>
                  <div class="field-label">Email Address</div>
                  <div class="field-value">${cleanEmail ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : '<span style="color:#94a3b8;">Not provided</span>'}</div>
                  <div class="field-label">Message Payload</div>
                  <div class="message-box">${safeMessage}</div>
                  <div class="footer">
                    Dispatched from Dan Portfolio Beacon • ${new Date().toUTCString()}
                  </div>
                </div>
              </body>
              </html>
            `;

            const emailPayload = {
              from: 'Portfolio Contact <onboarding@resend.dev>',
              to: ['activity.dann@gmail.com'],
              subject: `[Portfolio Inquiry] ${senderName.trim()}`,
              html: emailHtml,
              text: `Name: ${senderName}\nEmail: ${cleanEmail || 'Not provided'}\n\nMessage:\n${senderMessage}`,
            };

            if (cleanEmail) {
              emailPayload.reply_to = cleanEmail;
            }

            const resendRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey.trim()}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(emailPayload),
            });

            const resendData = await resendRes.json();

            if (!resendRes.ok) {
              res.writeHead(resendRes.status);
              res.end(
                JSON.stringify({
                  success: false,
                  error: resendData?.message || 'Failed to dispatch email via Resend API.',
                })
              );
              return;
            }

            res.writeHead(200);
            res.end(
              JSON.stringify({
                success: true,
                message: 'Email dispatched successfully.',
                id: resendData?.id,
              })
            );
          } catch (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ success: false, error: err?.message || 'Server error' }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare(), devEmailApiPlugin()],
  resolve: {
    // `@/lib/utils`, `@/components/ui/...`: the import paths copy-paste
    // components are published with. jsconfig.json mirrors it for editors
    // and the shadcn CLI.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    cssMinify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Named chunks only for the packages the site itself loads, by exact
          // package name. Everything else, including the libraries installed
          // for components, is left to the bundler's own splitting. Under
          // Rolldown a named chunk also takes in the dependencies of what it
          // matches, and every one of these chunks is loaded on the first
          // visit, so the old substring matches ('react', 'three', and a
          // catch-all) put any new library there, lazy or not: in a test
          // build, the whole 4 MB Spline runtime.
          //
          // Top-level packages only. A nested copy, such as the three 0.170
          // stats-gl keeps in node_modules/stats-gl/node_modules/three, would
          // otherwise match 'three' too and be sent to every visitor.
          const parts = id.split(/[\\/]node_modules[\\/]/);
          if (parts.length !== 2) {
            return;
          }
          const pkg = parts[1].match(/^(@[^\\/]+[\\/])?[^\\/]+/)?.[0];
          // Only three's core build. Its add-ons (three/addons, the WebGPU
          // renderer, TSL) go wherever their importers go: the component
          // libraries pull in 2 MB of them, which this chunk used to take.
          if (pkg === 'three') {
            return /[\\/]three[\\/]build[\\/]three\.(core|module)\.js$/.test(id) ? 'vendor-three' : undefined;
          }
          if (pkg === 'gsap') {
            return 'vendor-gsap';
          }
          if (pkg === 'lenis') {
            return 'vendor-lenis';
          }
          if (['react', 'react-dom', 'react-router', 'react-router-dom', 'lucide-react'].includes(pkg)) {
            return 'vendor-react';
          }
          if (pkg === 'scheduler') {
            return 'vendor-libs';
          }
        },
      },
    },
  },
});