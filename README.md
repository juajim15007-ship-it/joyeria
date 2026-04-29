# 💍 Mazal Joyería – Sitio Web Oficial

Página web elegante y funcional para la joyería **Mazal**, especializada en joyas artesanales de oro de 18K y 24K.

---

## 🌟 Características implementadas

- **Hero section** con diseño premium, animaciones y call-to-actions
- **Banner de categorías** con iconos y acceso rápido a Anillos, Pulseras y Cadenas
- **Catálogo completo** con 12 productos de oro (4 anillos, 4 pulseras, 4 cadenas)
- **Filtros interactivos** por categoría con animación suave
- **Carrito de compra lateral** (drawer) persistente via `localStorage`
  - Añadir/eliminar/modificar cantidades
  - Total calculado automáticamente
- **Formulario de contacto** con guardado en base de datos API
- **Sección de beneficios** (6 propuestas de valor)
- **Sección de testimonios** de clientes reales
- **Banner de oferta** especial
- **Scroll reveal** con IntersectionObserver
- **Toast notifications** para feedback al usuario
- **Botón scroll-to-top** flotante
- **Menú responsive** con hamburger para móvil
- **Header sticky** con efecto blur y cambio al hacer scroll
- **Diseño fully responsive** (desktop, tablet, móvil)
- **Accesibilidad**: aria-labels, roles semánticos, contraste adecuado

---

## 📁 Estructura de archivos

```
index.html          – Página principal
css/
  style.css         – Estilos CSS premium (variables, componentes, responsive)
js/
  main.js           – JavaScript: carrito, filtros, animaciones, formulario
README.md           – Este archivo
```

---

## 🛣️ Rutas y secciones

| Sección       | ID / Anchor     | Descripción                        |
|---------------|-----------------|------------------------------------|
| Inicio/Hero   | `#inicio`       | Portada principal                  |
| Catálogo      | `#catalogo`     | Grid de todos los productos        |
| Anillos       | `#anillos`      | Filtro directo a anillos           |
| Pulseras      | `#pulseras`     | Filtro directo a pulseras          |
| Cadenas       | `#cadenas`      | Filtro directo a cadenas           |
| Beneficios    | `#beneficios`   | Propuestas de valor                |
| Contacto      | `#contacto`     | Formulario de contacto             |

---

## 🗄️ Modelo de datos

### Tabla: `products`
| Campo       | Tipo    | Descripción                         |
|-------------|---------|-------------------------------------|
| id          | text    | Identificador del producto (ej: r1) |
| category    | text    | anillo / pulsera / cadena           |
| name        | text    | Nombre del producto                 |
| material    | text    | Tipo de oro (18K, 24K, Bicolor)     |
| price       | number  | Precio en euros                     |
| old_price   | number  | Precio tachado (si hay oferta)      |
| rating      | number  | Puntuación media 1–5                |
| reviews     | number  | Número de reseñas                   |
| badge       | text    | Etiqueta (Más vendido, Nuevo…)      |
| in_stock    | bool    | Disponible en stock                 |

### Tabla: `contact_messages`
| Campo    | Tipo      | Descripción              |
|----------|-----------|--------------------------|
| name     | text      | Nombre del cliente       |
| email    | text      | Email de contacto        |
| phone    | text      | Teléfono (opcional)      |
| subject  | text      | Asunto seleccionado      |
| message  | rich_text | Mensaje del cliente      |
| sent_at  | datetime  | Fecha/hora de envío      |

---

## 🚀 Próximos pasos sugeridos

- [ ] Añadir imágenes reales de las joyas (actualmente gradientes CSS decorativos)
- [ ] Implementar página de detalle de producto (`/producto/:id`)
- [ ] Añadir integración con pasarela de pago (Stripe, PayPal)
- [ ] Sistema de favoritos con almacenamiento en API
- [ ] Galería lightbox para ver las joyas en detalle
- [ ] Configurador de talla para anillos y pulseras
- [ ] Sección de joyas personalizadas / pedidos a medida

---

## 🛠️ Tecnologías utilizadas

- **HTML5** semántico con accesibilidad
- **CSS3** con variables custom, Grid, Flexbox, animaciones
- **JavaScript ES6+** vanilla (sin frameworks)
- **Google Fonts**: Playfair Display + Lato
- **Font Awesome 6** para iconografía
- **RESTful Table API** para persistencia de mensajes de contacto
- **localStorage** para persistencia del carrito de compra

---

*Mazal Joyería © 2025 – Madrid, España*
