# El Buen Sabor — Backend

API REST desarrollada con NestJS y TypeScript para el ecommerce de restaurante. Gestiona productos, categorías, pedidos y pagos con Mercado Pago.

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| NestJS | Framework principal |
| TypeScript | Lenguaje |
| TypeORM | ORM para base de datos |
| PostgreSQL (Neon) | Base de datos en la nube |
| Mercado Pago SDK | Integración de pagos |
| Swagger | Documentación de la API |
| JWT | Autenticación |
| AWS S3 | Almacenamiento de imágenes |

---

## Estructura del proyecto

```
src/
├── common/
│   ├── bases/
│   │   ├── base.controller.ts
│   │   ├── base.entity.ts
│   │   └── base.service.ts
│   ├── dtos/
│   │   ├── base-full.dto.ts
│   │   ├── base-short.dto.ts
│   │   ├── index.ts
│   │   └── pagination-common.dto.ts
│   └── exceptions/
│       ├── error.manager.ts
│       └── http-exception.filter.ts
├── config/
│   ├── database.providers.ts
│   └── envs.ts
├── domain/
│   ├── dto/
│   │   ├── category.dto.ts
│   │   ├── index.ts
│   │   ├── order_detail.dto.ts
│   │   ├── order.dto.ts
│   │   ├── price.dto.ts
│   │   └── product.dto.ts
│   ├── entities/
│   │   ├── category.entity.ts
│   │   ├── index.ts
│   │   ├── order_detail.entity.ts
│   │   ├── order.entity.ts
│   │   └── product.entity.ts
│   ├── enum/
│   │   ├── OrderStatus.ts
│   │   └── Paid.ts
│   └── mapper/
│       ├── category.mapper.ts
│       ├── order_detail.mapper.ts
│       ├── order.mapper.ts
│       └── product.mapper.ts
└── modules/
    ├── category/
    ├── mercadopago/
    ├── order/
    ├── order_detail/
    ├── product/
    ├── index.ts
    └── module.modules.ts
```

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd backend

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run start:dev
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
NODE_ENV=development

# Base de datos (PostgreSQL — Neon)
HOST=your-neon-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-dbname

# Swagger
SWAGGER_PATH=/api/docs
SWAGGER_PASSWORD=your-swagger-password

# AWS S3
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=sa-east-1
S3_BUCKET_NAME=your-bucket-name

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-jwt-refresh-secret

# Mercado Pago
MP_ACCESS_TOKEN=your-mp-access-token

# Frontend
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/category/catalogue` | Categorías con subcategorías |
| GET | `/api/price/p/:id` | Producto por ID con precio |
| POST | `/api/order` | Crear pedido |
| POST | `/api/mercadopago/create-preference` | Crear preferencia de pago MP |

La documentación completa de la API está disponible en `/api/docs` (requiere contraseña definida en `SWAGGER_PASSWORD`).

---

## Integración Mercado Pago

El módulo `mercadopago` recibe el total del pedido desde el frontend y genera una preferencia de pago usando el SDK oficial de MP.

```
POST /api/mercadopago/create-preference
Body: { "total": 8010 }
Response: { "preferenceId": "...", "checkoutUrl": "..." }
```

El `checkoutUrl` devuelto corresponde a `sandbox_init_point` en modo prueba y a `init_point` en producción. Para pasar a producción reemplazá el `MP_ACCESS_TOKEN` por el token productivo y cambiá `sandbox_init_point` por `init_point` en el service.

---

## Base de datos

PostgreSQL alojado en [Neon](https://neon.tech) (serverless). La conexión se configura en `config/database.providers.ts` usando las variables de entorno. TypeORM gestiona las migraciones y entidades automáticamente con `synchronize: true` en desarrollo.

---

## Scripts disponibles

```bash
npm run start          # Producción
npm run start:dev      # Desarrollo con hot reload
npm run start:debug    # Debug mode
npm run build          # Compilar
npm run lint           # Linter
npm run test           # Tests unitarios
npm run test:e2e       # Tests end-to-end
```
## Link de FrontEnd  
- [FrontEnd](https://github.com/Palavesino/Ecommerce-frontEnd)
