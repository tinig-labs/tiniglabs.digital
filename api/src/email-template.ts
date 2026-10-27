// Email layout matching tiniglabs.digital: a calm off-white page, ink text,
// one mint panel for the part that matters, pandan green for links.
// Table-based with inline styles, because many mail apps strip <style> and flexbox.

const C = {
  gatas: "#F9FBFA",
  tinta: "#13261F",
  abo: "#5F6F68",
  pandan: "#1F6B4F",
  mint: "#E2F3EA",
  rule: "#DCE3DF",
};

const SANS = "Figtree, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const BRAND = "Montserrat, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type Panel =
  // A big word over a short line, like the role on the site's waitlist form
  | { kind: "feature"; title: string; body: string }
  // Label and value rows, for the internal signup records
  | { kind: "facts"; rows: [label: string, value: string][] };

export type EmailContent = {
  preheader: string;
  heading: string;
  paragraphs: string[];
  panel?: Panel;
  // Why the reader got this email, shown above the unsubscribe link
  reason?: string;
  unsubscribeUrl?: string;
};

function panelHtml(panel: Panel) {
  const inner =
    panel.kind === "feature"
      ? `<p style="margin:0;font-family:${SANS};font-size:32px;line-height:1.15;font-weight:600;letter-spacing:-0.02em;color:${C.pandan}">${escapeHtml(panel.title)}</p>
         <p style="margin:12px 0 0;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.tinta}">${escapeHtml(panel.body)}</p>`
      : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${panel.rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 16px 6px 0;font-family:${SANS};font-size:14px;color:${C.abo};white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
               <td style="padding:6px 0;font-family:${SANS};font-size:16px;color:${C.tinta};word-break:break-all">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}</table>`;

  return `<tr><td style="padding:32px 0 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.mint};border-radius:20px">
      <tr><td style="padding:28px 28px 30px">${inner}</td></tr>
    </table>
  </td></tr>`;
}

export function renderEmail(content: EmailContent) {
  const { preheader, heading, paragraphs, panel, reason, unsubscribeUrl } = content;

  const body = paragraphs
    .map((p) => `<p style="margin:16px 0 0;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.abo}">${escapeHtml(p)}</p>`)
    .join("");

  const footerNote = [
    reason ? escapeHtml(reason) : "",
    unsubscribeUrl
      ? `<a href="${escapeHtml(unsubscribeUrl)}" style="color:${C.pandan};font-weight:600;text-decoration:underline">Unsubscribe</a>`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(heading)}</title>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&family=Montserrat:wght@600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:${C.gatas}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.gatas}">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.gatas}">
  <tr><td align="center" style="padding:40px 20px 48px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px">
      <tr><td style="padding:0 0 40px">
        <a href="https://tiniglabs.digital" style="font-family:${BRAND};font-size:18px;font-weight:600;letter-spacing:-0.01em;color:${C.tinta};text-decoration:none">tinig labs</a>
      </td></tr>
      <tr><td>
        <h1 style="margin:0;font-family:${SANS};font-size:30px;line-height:1.15;font-weight:500;letter-spacing:-0.025em;color:${C.tinta}">${escapeHtml(heading)}</h1>
        ${body}
      </td></tr>
      ${panel ? panelHtml(panel) : ""}
      <tr><td style="padding:40px 0 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="border-top:1px solid ${C.rule};padding:20px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.abo}">
            ${footerNote ? `<p style="margin:0 0 8px">${footerNote}</p>` : ""}
            <p style="margin:0"><span style="font-family:${BRAND};font-weight:600;color:${C.tinta}">tinig</span> is Filipino for voice. <a href="https://tiniglabs.digital" style="color:${C.abo};text-decoration:underline">tiniglabs.digital</a></p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

  const text = [
    heading,
    ...paragraphs,
    panel?.kind === "feature" ? `${panel.title}\n${panel.body}` : "",
    panel?.kind === "facts" ? panel.rows.map(([l, v]) => `${l}: ${v}`).join("\n") : "",
    "--",
    reason ?? "",
    unsubscribeUrl ? `Unsubscribe: ${unsubscribeUrl}` : "",
    "tinig labs. tinig is Filipino for voice. https://tiniglabs.digital",
  ]
    .filter(Boolean)
    .join("\n\n");

  return { html, text };
}
