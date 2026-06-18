const OPENING_HOUR = 12;
const CLOSING_HOUR = 22;
const CLOSING_MINUTE = 30;
const COMBO_DISCOUNT = 0.12;
const WHATSAPP_PHONE = "573043753966";
const GOOGLE_SHEETS_WEBAPP_URL = window.GOOGLE_SHEETS_WEBAPP_URL?.trim() || "";

const arepaSelect = document.querySelector("#arepaSelect");
const drinkSelect = document.querySelector("#drinkSelect");
const additionalSelect = document.querySelector("#additionalSelect");
const customerNameInput = document.querySelector("#customerName");
const customerPhoneInput = document.querySelector("#customerPhone");
const customerAddressInput = document.querySelector("#customerAddress");
const paymentMethodSelect = document.querySelector("#paymentMethod");
const orderNotes = document.querySelector("#orderNotes");
const calculateBtn = document.querySelector("#calculateBtn");
const orderWhatsappBtn = document.querySelector("#orderWhatsappBtn");
const newOrderBtn = document.querySelector("#newOrderBtn");
const calcResult = document.querySelector("#calcResult");
const orderStatus = document.querySelector("#orderStatus");
const orderHint = document.querySelector("#orderHint");
const openStatus = document.querySelector("#openStatus");
const reviewsGrid = document.querySelector("#reviewsGrid");
const reviewsSource = document.querySelector("#reviewsSource");
const scrollProgress = document.querySelector("#scrollProgress");
const heroSection = document.querySelector(".hero");
const gallerySlider = document.querySelector("#gallerySlider");
const gallerySlides = document.querySelector("#gallerySlides");
const galleryPrev = document.querySelector("#galleryPrev");
const galleryNext = document.querySelector("#galleryNext");
const galleryDots = document.querySelector("#galleryDots");

const ORDER_DRAFT_KEY = "sb58CurrentOrderId";
const ORDER_SENT_KEY = "sb58CurrentOrderSent";

function readDraftStorage(key) {
  try {
    return window.sessionStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function writeDraftStorage(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Ignore storage failures.
  }
}

function removeDraftStorage(key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Ignore storage failures.
  }
}

let currentOrderId = readDraftStorage(ORDER_DRAFT_KEY);
let currentOrderSent = readDraftStorage(ORDER_SENT_KEY) === "true";

function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

function createOrderId() {
  return `SB58-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function persistOrderDraft() {
  writeDraftStorage(ORDER_DRAFT_KEY, currentOrderId);
  writeDraftStorage(ORDER_SENT_KEY, String(currentOrderSent));
}

function getOrCreateOrderId() {
  if (!currentOrderId) {
    currentOrderId = createOrderId();
    currentOrderSent = false;
    persistOrderDraft();
  }

  return currentOrderId;
}

function markOrderAsSent() {
  currentOrderSent = true;
  persistOrderDraft();
}

function resetOrderDraft() {
  currentOrderId = "";
  currentOrderSent = false;
  removeDraftStorage(ORDER_DRAFT_KEY);
  removeDraftStorage(ORDER_SENT_KEY);
}

function updateOrderHint() {
  if (!orderHint) return;

  orderHint.textContent = currentOrderId && currentOrderSent
    ? "Hay un pedido activo. Si lo editas y lo reenvías, se actualizará en Google Sheets. Usa 'Nuevo pedido' para iniciar otro."
    : "Si editas este pedido y vuelves a registrarlo, se actualizará la misma fila en Google Sheets.";
}

function resetOrderForm() {
  if (arepaSelect) arepaSelect.selectedIndex = 0;
  if (drinkSelect) drinkSelect.selectedIndex = 0;
  if (additionalSelect) additionalSelect.selectedIndex = 0;
  if (customerNameInput) customerNameInput.value = "";
  if (customerPhoneInput) customerPhoneInput.value = "";
  if (customerAddressInput) customerAddressInput.value = "";
  if (paymentMethodSelect) paymentMethodSelect.value = "";
  if (orderNotes) orderNotes.value = "";

  resetOrderDraft();
  calculateCombo();
  updateOrderHint();

  if (orderStatus) {
    orderStatus.textContent = "Pedido nuevo listo. El próximo envío creará otra fila en Google Sheets.";
  }
}

function getStoreStatus(now = new Date()) {
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (day === 1) {
    return {
      open: false,
      message: "🔴 Cerrado ahora - Hoy descansamos, volvemos manana a las 12:00 m."
    };
  }

  const afterOpen = hour > OPENING_HOUR || (hour === OPENING_HOUR && minute >= 0);
  const beforeClose =
    hour < CLOSING_HOUR || (hour === CLOSING_HOUR && minute <= CLOSING_MINUTE);

  if (afterOpen && beforeClose) {
    return {
      open: true,
      message: "🟢 Abierto ahora - ¡Haz tu pedido!"
    };
  }

  return {
    open: false,
    message: "🔴 Cerrado ahora - Te esperamos desde las 12:00 m."
  };
}

function updateOpenStatus() {
  if (!openStatus) return;

  const status = getStoreStatus();
  openStatus.textContent = status.message;
  openStatus.classList.remove("open", "closed");
  openStatus.classList.add(status.open ? "open" : "closed");
}

function getComboPricing() {
  if (!arepaSelect || !drinkSelect) {
    return null;
  }

  const arepaPrice = Number(arepaSelect.value);
  const drinkPrice = Number(drinkSelect.value);
  const additionalPrice = additionalSelect ? Number(additionalSelect.value) : 0;
  const subtotal = arepaPrice + drinkPrice + additionalPrice;
  const savings = Math.round(subtotal * COMBO_DISCOUNT);
  const total = subtotal - savings;

  return {
    subtotal,
    savings,
    total,
    additionalPrice
  };
}

function calculateCombo() {
  if (!calcResult) return;

  const pricing = getComboPricing();
  if (!pricing) return;

  const additionalText =
    pricing.additionalPrice > 0 ? ` | Adicional: ${formatCOP(pricing.additionalPrice)}` : "";

  calcResult.textContent =
    `Total combo: ${formatCOP(pricing.total)} | Ahorras: ${formatCOP(pricing.savings)}${additionalText}`;
}

function getSelectedLabel(selectElement) {
  if (!selectElement) return "";
  const option = selectElement.options[selectElement.selectedIndex];
  return option ? option.text.split(" - ")[0].trim() : "";
}

function buildOrderData() {
  const pricing = getComboPricing();
  if (!pricing) return;

  const arepaName = getSelectedLabel(arepaSelect);
  const drinkName = getSelectedLabel(drinkSelect);
  const additionalName = getSelectedLabel(additionalSelect);
  const customerName = customerNameInput ? customerNameInput.value.trim() : "";
  const customerPhone = customerPhoneInput ? customerPhoneInput.value.trim() : "";
  const customerAddress = customerAddressInput ? customerAddressInput.value.trim() : "";
  const paymentMethod = paymentMethodSelect ? paymentMethodSelect.value.trim() : "";
  const notes = orderNotes ? orderNotes.value.trim() : "";

  return {
    orderId: getOrCreateOrderId(),
    channel: "Web + WhatsApp",
    timestamp: new Date().toISOString(),
    customerName,
    customerPhone,
    customerAddress,
    paymentMethod,
    arepaName,
    drinkName,
    additionalName: pricing.additionalPrice > 0 ? additionalName : "",
    notes,
    subtotal: pricing.subtotal,
    savings: pricing.savings,
    total: pricing.total,
    additionalPrice: pricing.additionalPrice,
    status: "Nuevo"
  };
}

function buildWhatsAppMessage(order) {
  const lines = [
    "Hola, quiero pedir este combo:",
    `- ID pedido: ${order.orderId}`,
    `- Arepa: ${order.arepaName}`,
    `- Bebida: ${order.drinkName}`
  ];

  if (order.customerName) {
    lines.push(`- Nombre: ${order.customerName}`);
  }

  if (order.customerPhone) {
    lines.push(`- Teléfono: ${order.customerPhone}`);
  }

  if (order.customerAddress) {
    lines.push(`- Dirección: ${order.customerAddress}`);
  }

  if (order.paymentMethod) {
    lines.push(`- Método de pago: ${order.paymentMethod}`);
  }

  if (Number(order.additionalPrice) > 0 && order.additionalName) {
    lines.push(`- Adicional: ${order.additionalName} (${formatCOP(Number(order.additionalPrice))})`);
  }

  lines.push(`- Total estimado: ${formatCOP(Number(order.total))}`);

  if (order.notes) {
    lines.push(`- Notas: ${order.notes}`);
  }

  lines.push("Gracias.");

  return encodeURIComponent(lines.join("\n"));
}

function sendOrderToGoogleSheets(order) {
  if (!GOOGLE_SHEETS_WEBAPP_URL) {
    return false;
  }

  const payload = new URLSearchParams({
    orderId: order.orderId,
    channel: order.channel,
    timestamp: order.timestamp,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerAddress: order.customerAddress,
    paymentMethod: order.paymentMethod,
    arepaName: order.arepaName,
    drinkName: order.drinkName,
    additionalName: order.additionalName,
    notes: order.notes,
    subtotal: String(order.subtotal),
    savings: String(order.savings),
    total: String(order.total),
    additionalPrice: String(order.additionalPrice),
    status: order.status
  });

  if (navigator.sendBeacon) {
    const queued = navigator.sendBeacon(
      GOOGLE_SHEETS_WEBAPP_URL,
      new Blob([payload.toString()], { type: "application/x-www-form-urlencoded;charset=UTF-8" })
    );

    if (queued) {
      return true;
    }
  }

  void fetch(GOOGLE_SHEETS_WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    body: payload
  }).catch((error) => {
    console.warn("No se pudo registrar el pedido en Google Sheets", error);
  });

  return true;
}

function sendOrderToWhatsApp() {
  const order = buildOrderData();
  if (!order) return;

  const isUpdate = currentOrderSent;

  const dispatched = sendOrderToGoogleSheets(order);

  if (orderStatus) {
    orderStatus.textContent = GOOGLE_SHEETS_WEBAPP_URL
      ? dispatched
        ? isUpdate
          ? "Actualizando pedido en Google Sheets. Abriendo WhatsApp..."
          : "Registrando pedido en Google Sheets. Abriendo WhatsApp..."
        : "Abriendo WhatsApp. No se pudo confirmar el registro en Sheets."
      : "Abriendo WhatsApp. Configura la URL de Apps Script para registrar en Sheets.";
  }

  if (dispatched) {
    markOrderAsSent();
    updateOrderHint();
  }

  const message = buildWhatsAppMessage(order);
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank", "noopener,noreferrer");
}

async function loadReviews() {
  if (!reviewsGrid || !reviewsSource) return;

  const fallback = [
    {
      author_name: "Camila R.",
      rating: 5,
      text: "La arepa de la casa es brutal. El queso derretido y la carne al barril son otro nivel."
    },
    {
      author_name: "Jhon A.",
      rating: 5,
      text: "Muy buen servicio, porciones grandes y sabor autentico venezolano."
    },
    {
      author_name: "Melissa G.",
      rating: 4,
      text: "Volveria por la Reina Pepiada. Se siente hecha con mucho detalle."
    }
  ];

  try {
    const response = await fetch("/api/google-reviews");
    if (!response.ok) {
      throw new Error("No se pudo cargar endpoint");
    }

    const data = await response.json();
    const reviews = Array.isArray(data?.reviews) ? data.reviews.slice(0, 3) : fallback;
    paintReviews(reviews);
    reviewsSource.textContent = "Reseñas en vivo desde Google Maps";
  } catch {
    paintReviews(fallback);
    reviewsSource.textContent =
      "Modo demo: agrega un endpoint /api/google-reviews para sincronizar Google Maps";
  }
}

function paintReviews(reviews) {
  reviewsGrid.innerHTML = "";
  reviews.forEach((review) => {
    const stars = "★".repeat(Math.max(1, Math.min(5, review.rating || 5)));
    const article = document.createElement("article");
    article.innerHTML = `<strong>${review.author_name}</strong><p>${stars}</p><p>${review.text}</p>`;
    reviewsGrid.appendChild(article);
  });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 40, 250)}ms`;
    observer.observe(item);
  });
}

function setupScrollEffects() {
  let ticking = false;

  function updateOnScroll() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const maxScroll = doc.scrollHeight - doc.clientHeight;
    const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${percent}%`;
    }

    if (heroSection && window.innerWidth > 900) {
      const offset = Math.min(scrollTop * 0.2, 60);
      heroSection.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (ticking) return;
    window.requestAnimationFrame(updateOnScroll);
    ticking = true;
  });

  updateOnScroll();
}

function setupCardTilt() {
  if (window.innerWidth < 900) return;

  const cards = document.querySelectorAll(".dish-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      const rotateX = ((0.5 - y / rect.height)) * 6;

      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function setupGallerySlider() {
  if (!gallerySlider || !gallerySlides || !galleryDots || !galleryPrev || !galleryNext) return;

  const slides = Array.from(gallerySlides.querySelectorAll(".gallery-card"));
  if (!slides.length) return;

  let index = 0;
  let autoplay;
  let startX = 0;
  let endX = 0;

  function render() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });

    const dots = Array.from(galleryDots.querySelectorAll("button"));
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    render();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    render();
  }

  function goToSlide(newIndex) {
    index = newIndex;
    render();
  }

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir a imagen ${i + 1}`);
    dot.addEventListener("click", () => {
      goToSlide(i);
      resetAutoplay();
    });
    galleryDots.appendChild(dot);
  });

  function resetAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(nextSlide, 3500);
  }

  galleryNext.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  galleryPrev.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  gallerySlider.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
    endX = startX;
  });

  gallerySlider.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX;
  });

  gallerySlider.addEventListener("touchend", () => {
    const diff = startX - endX;
    if (Math.abs(diff) < 35) return;

    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    resetAutoplay();
  });

  gallerySlider.addEventListener("mouseenter", () => clearInterval(autoplay));
  gallerySlider.addEventListener("mouseleave", resetAutoplay);

  render();
  resetAutoplay();
}

function setupContentTabs() {
  const tabButtons = Array.from(document.querySelectorAll("[data-content-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-content-panel]"));

  if (!tabButtons.length || !panels.length) return;

  function activateTab(key) {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.contentTab === key;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.contentPanel === key;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.contentTab));
  });

  const initialTab = tabButtons.find((button) => button.classList.contains("active"))?.dataset.contentTab || tabButtons[0].dataset.contentTab;
  activateTab(initialTab);
}

calculateBtn?.addEventListener("click", calculateCombo);
orderWhatsappBtn?.addEventListener("click", sendOrderToWhatsApp);
newOrderBtn?.addEventListener("click", resetOrderForm);
arepaSelect?.addEventListener("change", calculateCombo);
drinkSelect?.addEventListener("change", calculateCombo);
additionalSelect?.addEventListener("change", calculateCombo);
updateOpenStatus();
setInterval(updateOpenStatus, 60_000);
loadReviews();
setupRevealAnimations();
setupScrollEffects();
setupCardTilt();
setupGallerySlider();
setupContentTabs();
calculateCombo();
updateOrderHint();
