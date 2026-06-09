// Web app para registrar pedidos en la hoja activa.
// 1. Pega este archivo dentro de Apps Script vinculado a tu Google Sheet.
// 2. Despliega como Web app.
// 3. Copia la URL de despliegue en `window.GOOGLE_SHEETS_WEBAPP_URL`.

const SHEET_NAME = "Pedidos";
const TIME_ZONE = "America/Bogota";
const HEADERS = [
  "Fecha",
  "ID pedido",
  "Canal",
  "Nombre",
  "Teléfono",
  "Dirección",
  "Método de pago",
  "Arepa",
  "Bebida",
  "Adicional",
  "Notas",
  "Subtotal",
  "Ahorro",
  "Total",
  "Estado"
];

const LEGACY_HEADERS = [
  "Fecha",
  "ID pedido",
  "Canal",
  "Arepa",
  "Bebida",
  "Adicional",
  "Notas",
  "Subtotal",
  "Ahorro",
  "Total",
  "Estado"
];

function doPost(e) {
  try {
    const data = parsePayload_(e);
    const sheet = getOrdersSheet_();
    ensureHeaderRow_(sheet);

    const existingRow = findOrderRow_(sheet, data.orderId || "");
    const existingValues = existingRow
      ? sheet.getRange(existingRow, 1, 1, HEADERS.length).getValues()[0]
      : null;
    const status = resolveStatus_(existingValues ? existingValues[HEADERS.indexOf("Estado")] : "", data.status, Boolean(existingRow));
    const rowValues = buildRowValues_(data, status);

    if (existingRow) {
      sheet.getRange(existingRow, 1, 1, HEADERS.length).setValues([rowValues]);
    } else {
      sheet.appendRow(rowValues);
    }

    return jsonResponse_({ ok: true, action: existingRow ? "updated" : "created" });
  } catch (error) {
    return jsonResponse_({ ok: false, error: error.message });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, message: "Sabor +58 order webhook activo" });
}

function getOrdersSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Este script debe estar vinculado a una hoja de calculo.");
  }

  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() > 0) {
    const firstRow = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), HEADERS.length)).getValues()[0];
    const isEmptyHeaderRow = firstRow.every((value) => value === "");
    const isLegacyHeaderRow = LEGACY_HEADERS.every((header, index) => firstRow[index] === header);

    if (isEmptyHeaderRow || isLegacyHeaderRow) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }

    return;
  }

  sheet.appendRow(HEADERS);
}

function findOrderRow_(sheet, orderId) {
  const normalizedOrderId = String(orderId || "").trim();
  if (!normalizedOrderId || sheet.getLastRow() < 2) {
    return 0;
  }

  const values = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
  for (let index = 0; index < values.length; index += 1) {
    if (String(values[index][0] || "").trim() === normalizedOrderId) {
      return index + 2;
    }
  }

  return 0;
}

function resolveStatus_(existingStatus, incomingStatus, isExistingRow) {
  const currentStatus = String(existingStatus || "").trim();

  if (isExistingRow) {
    if (currentStatus && currentStatus !== "Nuevo") {
      return currentStatus;
    }

    return "Editado";
  }

  if (currentStatus && currentStatus !== "Nuevo") {
    return currentStatus;
  }

  return String(incomingStatus || "Nuevo").trim() || "Nuevo";
}

function buildRowValues_(data, status) {
  return [
    Utilities.formatDate(new Date(), TIME_ZONE, "yyyy-MM-dd HH:mm:ss"),
    data.orderId || "",
    data.channel || "Web + WhatsApp",
    data.customerName || "",
    data.customerPhone || "",
    data.customerAddress || "",
    data.paymentMethod || "",
    data.arepaName || "",
    data.drinkName || "",
    data.additionalName || "",
    data.notes || "",
    Number(data.subtotal || 0),
    Number(data.savings || 0),
    Number(data.total || 0),
    status
  ];
}

function parsePayload_(e) {
  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  const raw = e && e.postData && e.postData.contents ? e.postData.contents : "";
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch (error) {
    // Fall back to querystring parsing.
  }

  const payload = {};
  const params = new URLSearchParams(raw);
  params.forEach((value, key) => {
    payload[key] = value;
  });

  return payload;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
