import { assetPath } from "../utils/assetPath.js";

// Catálogo de componentes de sueroterapia.
// Para agregar/editar un suero, solo modifica este arreglo.
// `image` debe apuntar a un archivo dentro de /public/images.

const products = [
  {
    id: 1,
    commercialName: "SUERO LONGEVIDAD CELULAR",
    commercialTag: "LONGEVIDAD",
    technicalName: "Solución de Ascorbato de Procaina USP 40 mg/ml - VIAL 10 ML",
    category: "Antioxidantes",
    price: 90000,
    description: "Estabilizador del sistema celular y modulador del envejecimiento.",
    benefits: [
      "Equilibrio bioeléctrico celular",
      "Efecto antiinflamatorio sistémico",
      "Revitalización y longevidad celular",
    ],
    image: assetPath("images/suero-01.png"),
  },
  {
    id: 2,
    commercialName: "SUERO ANTIEDAD LUMINOSO",
    commercialTag: "ANTIEDAD",
    technicalName: "Solución de Ascorbato de Sodio al 50% - VIAL 20 ML",
    category: "Antioxidantes",
    price: 110000,
    description: "Potente acción antioxidante y antienvejecimiento de alta concentración.",
    benefits: [
      "Neutraliza radicales libres",
      "Estimula producción de colágeno",
      "Fortalece sistema inmune",
    ],
    image: assetPath("images/suero-02.png"),
  },
  {
    id: 3,
    commercialName: "SUERO VITAMINA C REVITALIZANTE",
    commercialTag: "VITAMINA C",
    technicalName: "Solución con Vitamina C - VIAL 20 ML",
    category: "Vitaminas",
    price: 100000,
    description: "Antioxidante esencial que revitaliza desde adentro, piel y energía.",
    benefits: [
      "Luminosidad y uniformidad de piel",
      "Energía celular inmediata",
      "Protección oxidativa profunda",
    ],
    image: assetPath("images/suero-03.png"),
  },
  {
    id: 4,
    commercialName: "SUERO CIRCULACIÓN Y FOCO MENTAL",
    commercialTag: "FOCO MENTAL",
    technicalName: "Solución de Niacina 200 mg/ml - 60 ML GOTERO",
    category: "Vitaminas",
    price: 160000,
    description: "Vitamina B3 de alta potencia para circulación, cerebro y metabolismo.",
    benefits: [
      "Mejora circulación y oxigenación celular",
      "Apoya metabolismo energético y función cerebral",
      "Favorece desintoxicación y salud hepática",
    ],
    image: assetPath("images/suero-04.png"),
  },
  {
    id: 5,
    commercialName: "SUERO BELLEZA CAPILAR",
    commercialTag: "BELLEZA",
    technicalName: "Solución de Biotina 2.5 mg/ml - 1 GRAMO - Fortalece cabello, piel y uñas",
    category: "Vitaminas",
    price: 115000,
    description: "La vitamina de la belleza, esencial para el metabolismo energético.",
    benefits: [
      "Fortalece cabello, piel y uñas",
      "Apoya el metabolismo energético celular",
      "Favorece regeneración tisular",
    ],
    image: assetPath("images/suero-05.png"),
  },
  {
    id: 6,
    commercialName: "SUERO ANTI-ESTRÉS ENERGÉTICO",
    commercialTag: "ANTI-ESTRÉS",
    technicalName: "Solución de Complejo B USP - VIAL 20 ML",
    category: "Vitaminas",
    price: 150000,
    description: "Sinergia completa del complejo B para sistema nervioso y vitalidad.",
    benefits: [
      "Apoya sistema nervioso y reduce estrés",
      "Favorece producción de energía celular",
      "Mejora estado de ánimo y concentración",
    ],
    image: assetPath("images/suero-06.png"),
  },
  {
    id: 7,
    commercialName: "SUERO REGENERADOR DERMAL",
    commercialTag: "REGENERADOR",
    technicalName:
      "Solución de D-Pantenol 250 mg/ml USP - VIAL 10 ML - Hidrata y regenera piel y cabello",
    category: "Vitaminas",
    price: 100000,
    description: "Provitamina B5 para hidratación y regeneración profunda.",
    benefits: [
      "Hidrata y regenera la piel en profundidad",
      "Fortalece el cabello y previene la caída",
      "Acelera cicatrización y reparación",
    ],
    image: assetPath("images/suero-07.png"),
  },
  {
    id: 8,
    commercialName: "SUERO NAD+ ENERGÍA PREMIUM",
    commercialTag: "NAD+ PREMIUM",
    technicalName:
      "Solución de NAD USP - VIAL 20 ML - Optimiza equilibrio bioquímico y regeneración celular",
    category: "Antioxidantes",
    price: 100000,
    description: "Coenzima maestra de la longevidad y el metabolismo energético celular.",
    benefits: [
      "Restaura energía celular (ATP)",
      "Optimiza equilibrio bioquímico y regeneración",
      "Respuesta inmune y bienestar integral",
    ],
    image: assetPath("images/suero-08.png"),
  },
  {
    id: 9,
    commercialName: "SUERO MITOCONDRIAL COGNITIVO",
    commercialTag: "MITOCONDRIAL",
    technicalName:
      "Solución Azul de Metileno 10 mg/ml USP - VIAL 20 ML - Potente antioxidante mitocondrial",
    category: "Antioxidantes",
    price: 110000,
    description: "Potente antioxidante mitocondrial, nootrópico y desintoxicante.",
    benefits: [
      "Favorece producción de energía mitocondrial",
      "Apoya oxigenación cerebral y función cognitiva",
      "Previene envejecimiento prematuro",
    ],
    image: assetPath("images/suero-09.png"),
  },
  {
    id: 10,
    commercialName: "SUERO REPARACIÓN MUSCULAR",
    commercialTag: "REPARACIÓN",
    technicalName: "Glutatione + Carnosina USP - 1 GRAMO - Antioxidante celular y neuromuscular",
    category: "Antioxidantes",
    price: 120000,
    description: "Dúo antioxidante de alto rendimiento para protección total.",
    benefits: [
      "Potente acción antioxidante celular",
      "Protección neuromuscular",
      "Regeneración tisular avanzada",
    ],
    image: assetPath("images/suero-10.png"),
  },
  {
    id: 11,
    commercialName: "SUERO DETOX UNIVERSAL",
    commercialTag: "DETOX",
    technicalName:
      "Solución de Ácido Alfa-Lipoico 50 mg/ml USP - VIAL 20 ML - Antioxidante universal",
    category: "Antioxidantes",
    price: 145000,
    description: "El antioxidante universal capaz de regenerar otros antioxidantes.",
    benefits: [
      "Antioxidante universal y regenerador",
      "Mejora sensibilidad a la insulina",
      "Desintoxicación hepática y neural",
    ],
    image: assetPath("images/suero-11.png"),
  },
  {
    id: 12,
    commercialName: "SUERO DETOX & GLOW",
    commercialTag: "GLOW",
    technicalName: "Glutatione USP - 1 GRAMO - Detoxificador celular y refuerzo inmune, unifica tono de piel",
    category: "Antioxidantes",
    price: 140000,
    description: "El maestro detox intracelular y aclarante natural.",
    benefits: [
      "Detoxificador celular profundo",
      "Refuerzo del sistema inmune",
      "Aclara y unifica tono de piel",
    ],
    image: assetPath("images/suero-12.png"),
  },
];

export default products;
