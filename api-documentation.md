# Documentación de API - Backend TuPupila

Este documento proporciona información sobre los endpoints disponibles en el backend de TuPupila para facilitar la integración con el frontend Angular.

## URL Base

La URL base para todas las solicitudes API es: `http://localhost:8080` (para desarrollo local)






## Configuración CORS




El backend está configurado para permitir solicitudes desde cualquier origen (`*`) durante el desarrollo. En producción, debes especificar los orígenes exactos permitidos.

## Autenticación

Actualmente, el sistema no implementa autenticación JWT u OAuth. Se recomienda implementar estas medidas de seguridad antes de su despliegue a producción.

## Manejo de Errores

El backend implementa un sistema unificado de manejo de errores que garantiza respuestas consistentes:

### Estructura de Respuesta de Error

```json
{
  "timestamp": "2025-06-28T14:30:00.000",
  "status": 400,
  "error": "Bad Request",
  "message": "Descripción general del error",
  "details": {
    "campo1": "Descripción del error en campo1",
    "campo2": "Descripción del error en campo2"
  }
}
```

### Códigos de Error Comunes

| Código | Descripción | Casos de Uso |
|--------|-------------|-------------|
| 400 | Bad Request | Validación fallida, parámetros incorrectos |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Intento de crear un recurso que ya existe |
| 403 | Forbidden | Acceso denegado a un recurso |
| 500 | Internal Server Error | Error inesperado en el servidor |

### Excepciones Personalizadas

El sistema utiliza las siguientes excepciones personalizadas:

1. `ResourceNotFoundException`: Cuando un recurso no se encuentra (404)

2. `ResourceAlreadyExistsException`: Cuando se intenta crear un recurso que ya existe (409)
3. `BusinessRuleViolationException`: Cuando se viola una regla de negocio (400)


## Estructura de la API

### 1. Gestión de Usuarios y Referidos

#### 1.1 Obtener todos los referidos de un usuario

- **URL**: `/api/user/{referralCode}/referrals`
- **Método**: GET
- **URL Params**: `referralCode` - Código de referido del usuario
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Objeto `UserReferralsDto` que contiene:
    - `user`: Información del usuario (UserDto)
    - `referrals`: Lista de referidos con sus compras (List<ReferralDto>)
    - `rewards`: Lista de recompensas recibidas (List<ReferralRewardDto>)
- **Respuestas de Error**:
  - **Código**: 404 Not Found - Si el código de referido no existe
  - **Código**: 400 Bad Request - Si el código de referido está vacío o es inválido

#### 1.2 Registrar un usuario con código de referido

- **URL**: `/api/user/register/{referralCode}`
- **Método**: POST
- **URL Params**: `referralCode` - Código de referido del usuario que invita
- **Data Params**: Objeto `UserDto` con los datos del nuevo usuario
- **Validaciones**:
  - El nombre es obligatorio y debe tener entre 2-100 caracteres
  - El email es obligatorio y debe tener formato válido
  - El código de referido debe existir en el sistema
- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Contenido**: Objeto `UserDto` del usuario creado

- **Respuestas de Error**:
  - **Código**: 400 Bad Request - Datos del usuario inválidos
  - **Código**: 404 Not Found - Código de referido no encontrado
  - **Código**: 409 Conflict - Email ya registrado


#### 1.3 Validar código de referido

- **URL**: `/api/user/validate/{referralCode}`
- **Método**: GET
- **URL Params**: `referralCode` - Código de referido a validar
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: `true` si es válido, `false` si no
- **Respuestas de Error**:
  - **Código**: 400 Bad Request - Si el código de referido está vacío

#### 1.4 Obtener historial de recompensas paginado

- **URL**: `/api/user/users/{userId}/rewards`

- **Método**: GET
- **URL Params**: `userId` - ID del usuario
- **Query Params**:
  - `page` (opcional, default 0) - Número de página
  - `size` (opcional, default 20) - Tamaño de página

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Página de objetos `ReferralRewardDto`

#### 1.5 Obtener estadísticas de referidos

- **URL**: `/api/user/users/{userId}/referral-stats`
- **Método**: GET
- **URL Params**: `userId` - ID del usuario
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Objeto `ReferralStatsDto` con estadísticas

### 2. Gestión de Compras

#### 2.1 Crear una nueva compra

- **URL**: `/api/admin/purchases`
- **Método**: POST
- **Data Params**: Objeto `Purchase` con los detalles de la compra
- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Contenido**: Objeto `PurchaseDto` de la compra creada

#### 2.2 Obtener todas las compras

- **URL**: `/api/admin/purchases`
- **Método**: GET
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Lista de objetos `PurchaseDto`

#### 2.3 Obtener compra por ID

- **URL**: `/api/admin/purchases/{id}`
- **Método**: GET
- **URL Params**: `id` - ID de la compra
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Objeto `PurchaseDto`

#### 2.4 Obtener todas las compras de un usuario

- **URL**: `/api/admin/users/{userId}/purchases`
- **Método**: GET
- **URL Params**: `userId` - ID del usuario
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Lista de objetos `PurchaseDto`


### 3. Gestión de Productos

#### 3.1 Listar productos con filtros y paginación

- **URL**: `/api/products`
- **Método**: GET
- **Query Params**:
  - `marca` (opcional): nombre o id de la marca
  - `material` (opcional): nombre o id del material
  - `forma` (opcional): nombre o id de la forma
  - `color` (opcional): nombre o id del color
  - `tipoLente` (opcional): tipo de lente
  - `polarizado` (opcional): boolean
  - `proteccionUV` (opcional): boolean
  - `duracion` (opcional): duración de lente de contacto
  - `genero` (opcional): hombre, mujer, niño, niña, unisex
  - `precioMin` (opcional): precio mínimo
  - `precioMax` (opcional): precio máximo
  - `categoria` (opcional): tipo de producto
  - `nombre` (opcional): búsqueda por nombre
  - `page` (opcional): número de página (default 0)
  - `size` (opcional): tamaño de página (default 20)

- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Página de objetos `ProductoDto` y subtipos
    ```json
    {
      "content": [ /* lista de productos filtrados */ ],
      "totalElements": 120,
      "totalPages": 6,
      "size": 20,
      "number": 0
    }
    ```

- **Ejemplo de consulta**:
  `/api/products?marca=Ray-Ban&genero=hombre&precioMin=50000&precioMax=150000&categoria=montura&page=0&size=20`

#### 3.2 Obtener producto por SKU

- **URL**: `/api/products/sku/{sku}`
- **Método**: GET
- **URL Params**: `sku` - SKU único del producto
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Objeto `ProductoDto` o subtipo
  - **Código**: 404 Not Found - Si el SKU no existe

#### 3.3 Crear un nuevo producto

- **URL**: `/api/admin/products`
- **Método**: POST
- **Data Params**: Objeto `ProductoDto` (ver modelo abajo)
- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Contenido**: Objeto `ProductoDto` creado
  - **Código**: 409 Conflict - Si el SKU ya existe

#### 3.4 Actualizar producto existente

- **URL**: `/api/admin/products/{id}`
- **Método**: PUT
- **URL Params**: `id` - ID del producto
- **Data Params**: Objeto `ProductoDto` con los campos a modificar
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Objeto `ProductoDto` actualizado
  - **Código**: 404 Not Found - Si el producto no existe

#### 3.5 Eliminar producto

- **URL**: `/api/admin/products/{id}`
- **Método**: DELETE
- **URL Params**: `id` - ID del producto
- **Respuesta Exitosa**:
  - **Código**: 204 No Content
  - **Código**: 404 Not Found - Si el producto no existe

### Modelo de Datos: ProductoDto (Herencia)

El catálogo de productos se modela usando herencia para máxima extensibilidad y calidad. Todos los productos comparten atributos básicos (clase base `ProductoDto`) y cada subtipo define sus propios campos.

#### ProductoDto (clase base)
```json
{
  "id": 1,
  "sku": "LNT-001",                // Requerido, único, identificador de inventario
  "nombre": "Lentes Oftálmicos",   // Requerido
  "tipo": "lente",                 // Requerido: "lente", "montura", "gafas_sol", "accesorio", etc.
  "descripcion": "Lentes para corrección visual.",
  "imagen": "assets/img/sliderProductos/lentes.jpg",
  "precio": 120000,
  "marca": "Essilor",
  "categoria": "Premium",
  "stock": 10,
  "activo": true                    // Indica si el producto está visible en el catálogo
}
```

#### MonturaDto (extiende ProductoDto)
```json
{
  "id": 2,
  "sku": "MNT-001",
  "nombre": "Montura Acetato",
  "tipo": "montura",
  "descripcion": "Montura ligera de acetato.",
  "imagen": "assets/img/sliderProductos/montura.jpg",
  "precio": 80000,
  "marca": "Ray-Ban",
  "categoria": "Clásico",
  "stock": 5,
  "activo": true,
  "forma": "rectangular",           // Específico de montura
  "material": "acetato",
  "color": "negro",
  "tamaño": "mediano"
  "genero": "hombre" // hombre, mujer, niño, niña, unisex
}
```

#### LenteSolDto (extiende ProductoDto)
```json
{
  "id": 3,
  "sku": "SOL-001",
  "nombre": "Gafas de Sol Polarizadas",
  "tipo": "gafas_sol",
  "descripcion": "Protección UV400, polarizadas.",
  "imagen": "assets/img/sliderProductos/sol.jpg",
  "precio": 150000,
  "marca": "Oakley",
  "categoria": "Deportivo",
  "stock": 7,
  "activo": true,
  "proteccionUV": true,              // Específico de gafas de sol
  "polarizado": true,
  "colorLente": "gris"
  "genero": "unisex" // hombre, mujer, niño, niña, unisex
}
```


#### Accesorios

Los accesorios no requieren un DTO específico, ya que no tienen atributos propios ni filtrado especial. Se representan simplemente como instancias de `ProductoDto` con `tipo = "accesorio"`.

Ejemplo:
```json
{
  "id": 4,
  "sku": "ACC-001",
  "nombre": "Estuche rígido",
  "tipo": "accesorio",
  "descripcion": "Estuche rígido para gafas.",
  "imagen": "assets/img/sliderProductos/estuche.jpg",
  "precio": 20000,
  "marca": "Genérico",
  "categoria": "Accesorios",
  "stock": 20,
  "activo": true
}
```


**Notas:**
* El campo `tipo` determina el subtipo y los campos adicionales esperados.
* El frontend puede filtrar y mostrar campos específicos según el tipo de producto.
* Se recomienda usar discriminadores en la API para facilitar la deserialización en el frontend.
* Los endpoints de productos devuelven una lista polimórfica de ProductoDto y subtipos (excepto accesorios, que solo usan ProductoDto).

---

## Catálogos de Atributos para Filtros y CRUD de Productos


Para garantizar filtros consistentes, validación y administración eficiente de los productos, los siguientes atributos deben gestionarse como entidades independientes (catálogos) en la base de datos y exponer endpoints CRUD:

- **Marca** (`marca`): Catálogo de marcas disponibles.
- **Material** (`material`): Catálogo de materiales de montura/lente.
- **Forma** (`forma`): Catálogo de formas de montura (rectangular, redonda, etc.).
- **Color** (`color`, `colorLente`): Catálogo de colores de montura o lente.
- **Tamaño** (`tamaño`): Catálogo de tamaños estándar (pequeño, mediano, grande).
- **Categoría** (`categoria`): Catálogo de categorías comerciales (Premium, Clásico, Deportivo, etc.).

Adicionalmente, el atributo **Género** (`genero`) debe estar presente en monturas y gafas de sol, pero no requiere CRUD ya que sus valores son fijos y universales:

- **Género** (`genero`): hombre, mujer, niño, niña, unisex

El filtro de género solo se mostrará en el frontend para monturas y gafas de sol.

### Ventajas de este enfoque

- Permite CRUD de valores desde un panel de administración.
- Los productos referencian estos catálogos por id (relación foránea), evitando duplicados y errores de escritura.
- El frontend puede consultar estos catálogos para mostrar selects y filtros consistentes, incluso si aún no hay productos de todos los valores.
- Se pueden agregar nuevos valores de forma controlada y validada.

### Endpoints recomendados para catálogos

Por cada catálogo, se recomienda exponer endpoints RESTful estándar:

- `GET    /api/catalogs/marcas`      → Listar todas las marcas
- `POST   /api/catalogs/marcas`      → Crear nueva marca
- `PUT    /api/catalogs/marcas/{id}` → Editar marca
- `DELETE /api/catalogs/marcas/{id}` → Eliminar marca (soft delete recomendado)

Repetir para materiales, formas, colores, tamaños y categorías:

- `/api/catalogs/materiales`
- `/api/catalogs/formas`
- `/api/catalogs/colores`
- `/api/catalogs/tamanos`
- `/api/catalogs/categorias`

### Ejemplo de entidad de catálogo (Marca)
```json
{
  "id": 1,
  "nombre": "Ray-Ban",
  "activo": true
}
```

### Notas de implementación

- Al crear/editar un producto, el frontend debe consultar estos catálogos y mostrar los valores en un select.
- Los filtros del catálogo de productos también deben usar estos catálogos para mostrar solo opciones válidas.
- Si se requiere agregar nuevos valores, debe hacerse desde el CRUD de catálogos, no directamente al crear un producto.

---

---

### Ejemplo de integración con Carrito de Compras

#### CartItemDto
```json
{
  "producto": {
    // Puede ser cualquier subtipo de ProductoDto (ver arriba)
  },
  "cantidad": 2
}
```

#### CartDto
```json
{
  "items": [
    {
      "producto": { /* MonturaDto */ },
      "cantidad": 1
    },
    {
      "producto": { /* LenteSolDto */ },
      "cantidad": 2
    }
  ],
  "total": 380000
}
```

**Notas carrito:**
- El carrito puede contener productos de cualquier subtipo.
- El backend debe validar stock y calcular el total dinámicamente.
- Se recomienda exponer endpoints como `/api/cart` para gestión del carrito por usuario.
- El campo `sku` es obligatorio y único, recomendado para búsquedas y gestión de inventario.
- El campo `id` es la clave primaria interna, no debe usarse como identificador público.
- El campo `activo` permite ocultar productos sin eliminarlos (soft delete). El frontend solo debe mostrar productos activos.
- Los atributos opcionales pueden dejarse nulos o incluirse en la descripción si no aplican.
- El frontend actual utiliza los campos: `nombre`, `tipo`, `descripcion`, `imagen`, `precio`, y puede mostrar `marca` y `categoria` si están presentes.

---

### 4. Gestión de Kits

#### 3.1 Registrar una nueva compra de kit

- **URL**: `/api/admin/purchases`
- **Método**: POST
- **Data Params**: Objeto `Purchase` con el campo `type = "KIT DE LIMPIEZA"`
- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Contenido**: Objeto `PurchaseDto`

#### 3.2 Verificar estado del kit de un usuario

- **URL**: `/api/admin/users/{userId}/kit-status`
- **Método**: GET
- **URL Params**: `userId` - ID del usuario
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Objeto `KitStatusDto` con el estado del kit

### 4. Administración de Usuarios

#### 4.1 Crear un nuevo usuario (Admin)

- **URL**: `/api/admin/users`
- **Método**: POST
- **Data Params**: Objeto `User` con los datos del nuevo usuario
- **Respuesta Exitosa**:
  - **Código**: 201 Created
  - **Contenido**: Objeto `UserDto` del usuario creado

#### 4.2 Obtener todos los usuarios (Admin)

- **URL**: `/api/admin/users`
- **Método**: GET
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Lista de objetos `UserDto`

#### 4.3 Obtener usuario por ID (Admin)

- **URL**: `/api/admin/users/{id}`
- **Método**: GET
- **URL Params**: `id` - ID del usuario
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Objeto `UserDto`

## Modelos de Datos (DTOs)

### UserDto

```json
{
  "id": 1,
  "name": "Nombre Usuario",          // Requerido, entre 2 y 100 caracteres
  "email": "usuario@example.com",    // Requerido, formato email válido
  "referralCode": "ABC12345",        // Solo letras y números, entre 6 y 20 caracteres
  "referredBy": "XYZ98765",          // Opcional, código de quien refirió
  "points": 1500,
  "totalEarnings": 150.50
}
```

### ReferralStatsDto

```json
{
  "userId": 1,
  "userName": "Nombre Usuario",
  "totalReferrals": 15,
  "level1Count": 5,
  "level2Count": 7,
  "level3Count": 3,
  "totalEarnings": 250.00,
  "currentMonthEarnings": 75.50,
  "totalPoints": 1500
}
```

### ReferralDto

```json
{
  "userId": 2,
  "name": "Referido Nombre",
  "email": "referido@example.com",
  "referralCode": "DEF67890",
  "level": 1,
  "purchaseDate": "2025-06-15T14:30:45",
  "purchaseAmount": 100.00,
  "purchaseId": 123
}
```

### ReferralRewardDto

```json
{
  "id": 1,
  "fromUserId": 2,
  "fromUserName": "Referido Nombre",
  "toUserId": 1,
  "toUserName": "Nombre Usuario",
  "level": 1,
  "percent": 10,
  "points": 500,
  "amount": 10.00,
  "createdAt": "2025-06-15T14:32:45"
}
```

### PurchaseDto

```json
{
  "id": 123,
  "userId": 2,
  "amount": 100.00,
  "description": "Kit de limpieza premium",
  "type": "KIT DE LIMPIEZA",        // "KIT DE LIMPIEZA", "LENTES", "ACCESORIOS", etc.
  "createdAt": "2025-06-15T14:30:45"
}
```

### KitStatusDto

```json
{
  "active": true,
  "monthsSinceLastPurchase": 0,
  "status": "Activo",               // "Activo", "Expirado", "Nunca adquirido"
  "lastPurchaseDate": "2025-06-01T10:15:30",
  "expirationDate": "2025-07-01T10:15:30",
  "daysRemaining": 5
}
```

### ReferralConfigDto

```json
{
  "level1Percent": 10,              // Entre 0 y 100
  "level2Percent": 8,               // Entre 0 y 100
  "level3Percent": 6,               // Entre 0 y 100
  "level1Points": 500,              // Mínimo 0
  "level2Points": 400,              // Mínimo 0
  "level3Points": 300               // Mínimo 0
}
```

**Nota**: Las compras de kits se manejan mediante la entidad Purchase con el campo `type = "KIT DE LIMPIEZA"`. Este tipo especial de compra no genera recompensas pero sí renueva la participación del usuario en el programa.

## Sistema de Referidos Multinivel

El sistema de referidos multinivel funciona de la siguiente manera:

1. Cada usuario tiene su propio código de referido único.
2. Cuando un usuario se registra con el código de referido de otro, se establece una relación de referencia.
3. El sistema rastrea referidos en tres niveles:
   - Nivel 1: Referidos directos (usuarios que se registraron con tu código)
   - Nivel 2: Referidos de tus referidos directos
   - Nivel 3: Referidos de los referidos de nivel 2

4. Cuando un referido hace una compra normal (no de tipo "KIT DE LIMPIEZA"), se generan recompensas para los usuarios en su cadena de referidos según el nivel:
   - Nivel 1: 10% del monto de compra + 500 puntos (configurable)
   - Nivel 2: 8% del monto de compra + 400 puntos (configurable)
   - Nivel 3: 6% del monto de compra + 300 puntos (configurable)

5. **Importante**: Las compras de tipo "KIT DE LIMPIEZA" no generan recompensas para los referidores, pero sí renuevan el periodo de participación del usuario en el programa y evitan que se reinicien sus acumulados.

## Sistema de Kits Mensuales

Los usuarios deben adquirir un kit mensual para seguir participando activamente en el programa:

1. Los kits mensuales se registran como compras normales pero con el tipo "KIT DE LIMPIEZA".
2. Estas compras no generan recompensas para la cadena de referidos.
3. Cada kit tiene una validez de un mes exacto desde la fecha de compra.
4. Cuando un kit expira, el usuario debe adquirir uno nuevo para seguir recibiendo recompensas.
5. El API proporciona información sobre el estado del kit, días restantes y fechas relevantes.
6. El administrador es quien decide qué compras se registran en el sistema.

## Configuración del Sistema

El sistema permite modificar dinámicamente la configuración de recompensas a través de la API:

### 5.1 Obtener configuración actual

- **URL**: `/api/admin/config/referral`
- **Método**: GET
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Objeto `ReferralConfigDto` con la configuración actual:
    ```json
    {
      "level1Percent": 10,
      "level2Percent": 8,
      "level3Percent": 6,
      "level1Points": 500,
      "level2Points": 400,
      "level3Points": 300
    }
    ```

### 5.2 Modificar configuración

- **URL**: `/api/admin/config/referral`
- **Método**: PUT
- **Data Params**: Objeto `ReferralConfigDto` con los valores a modificar (se pueden enviar solo los campos que se desean modificar)
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Contenido**: Objeto `ReferralConfigDto` con la configuración actualizada

## Configuración Dinámica del Sistema de Referidos

El sistema ahora implementa una actualización dinámica de la configuración de referidos que notifica automáticamente a los servicios relevantes cuando hay cambios:

### Actualización de Valores

1. Cuando se actualiza la configuración a través del endpoint PUT `/api/admin/config/referral`, el sistema:
   - Valida los nuevos valores (porcentajes entre 0-100, puntos no negativos)
   - Actualiza la configuración interna
   - Notifica automáticamente a los servicios dependientes

2. Los servicios que utilizan estos valores (como `ReferralService`) reciben una notificación y actualizan sus estructuras de datos internas.

3. Las recompensas futuras reflejarán inmediatamente los nuevos valores de configuración.

### Limitaciones Actuales

- Los cambios de configuración no son persistentes tras reiniciar la aplicación
- La configuración actualizada se aplica solo a nuevas transacciones, no retroactivamente

### Implementación Recomendada en Frontend

El frontend debería implementar un panel de administración donde:

1. Se muestren los valores actuales de configuración
2. Se permita modificar los valores con validación en tiempo real
3. Se proporcione retroalimentación instantánea sobre el impacto de los cambios
4. Se muestre un historial de cambios recientes

## Sistema de Logging

Se ha implementado un sistema de logging robusto utilizando SLF4J para facilitar el seguimiento de eventos y la depuración:

### Niveles de Log Utilizados

- **ERROR**: Errores críticos que requieren intervención inmediata
- **WARN**: Situaciones anómalas que no impiden la operación pero requieren atención
- **INFO**: Eventos normales del sistema que son útiles para monitoreo
- **DEBUG**: Información detallada útil para depuración

### Eventos Críticos Registrados

- Cambios en la configuración del sistema
- Registro de usuarios con códigos de referido
- Procesamiento de compras y generación de recompensas
- Errores de validación y acceso

### Formato de Log

```
[TIMESTAMP] [LEVEL] [CLASS] - Mensaje descriptivo: {detalles JSON}
```

### Persistencia de Logs

Por defecto, los logs se almacenan en archivos rotados diariamente con una retención de 30 días. Se recomienda configurar un sistema de centralización de logs como ELK Stack para entornos de producción.

## Recomendaciones para la Integración Frontend

### Tecnologías Recomendadas

1. **Framework**: Angular (versión 16 o superior) con TypeScript para mantener consistencia tipo-segura con el backend.

2. **Gestión de Estado**: 
   - **NgRx** para la gestión global del estado de la aplicación
   - **RxJS** para manejar flujos de datos reactivos

3. **UI/UX**:
   - **Angular Material** o **PrimeNG** para componentes UI consistentes
   - **Tailwind CSS** para personalización rápida de estilos

4. **Comunicación HTTP**:
   - Servicios basados en Angular HttpClient con interceptores personalizados

### Estructura de Módulos Recomendada

```
src/
├── app/
│   ├── core/                # Servicios singleton, guards, interceptores
│   │   ├── auth/            # Autenticación (futuro)
│   │   ├── interceptors/    # Interceptores HTTP
│   │   └── services/        # Servicios API y core
│   │
│   ├── features/            # Módulos de características
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── referrals/       # Gestión de referidos
│   │   ├── purchases/       # Gestión de compras
│   │   ├── kits/            # Gestión de kits mensuales
│   │   └── admin/           # Panel de administración
│   │
│   ├── shared/              # Componentes y utilidades compartidas
│   │   ├── components/      # Componentes reutilizables
│   │   ├── directives/      # Directivas personalizadas
│   │   ├── pipes/           # Pipes personalizados
│   │   └── models/          # Interfaces y modelos DTO
│   │
│   └── store/               # Estado NgRx global
│       ├── user/            # Estado de usuario
│       ├── referrals/       # Estado de referidos
│       └── config/          # Estado de configuración
```

### Principales Vistas y Formularios Requeridos

#### 1. Módulo de Autenticación y Usuario
- **Login**: Formulario para inicio de sesión
- **Registro**: Formulario para registro con validación de código referido
- **Perfil**: Vista de perfil con datos del usuario y opción para compartir código referido

#### 2. Módulo Dashboard
- **Resumen Estadístico**: Gráficos con KPIs principales (referidos, ganancias, puntos)
- **Alertas**: Notificaciones sobre estado del kit y recordatorios

#### 3. Módulo de Referidos
- **Árbol de Referidos**: Visualización gráfica de la red multinivel
- **Listado de Referidos**: Tabla con filtros y búsqueda
- **Detalle de Referido**: Vista detallada de cada referido y sus compras

#### 4. Módulo de Recompensas
- **Historial de Recompensas**: Listado paginado y filtrable
- **Detalles de Recompensas**: Desglose por niveles y tipos

#### 5. Módulo de Compras
- **Historial de Compras**: Listado de compras realizadas
- **Detalle de Compra**: Información detallada y recompensas generadas

#### 6. Módulo de Kit
- **Estado de Kit**: Visualización del estado con indicador visual de tiempo restante
- **Historial de Kits**: Registro histórico de compras de kit

#### 7. Módulo Administrativo
- **Gestión de Usuarios**: CRUD completo con buscador avanzado
- **Gestión de Compras**: Registro de nuevas compras y kits
- **Configuración**: Panel para modificar porcentajes y puntos del sistema de referidos
- **Reportes**: Generación de informes, exportación a Excel/CSV

### Interfaces de Usuario Críticas

#### 1. Panel Principal (Dashboard)
![Dashboard Mockup]

Elementos clave:
- Resumen de referidos por nivel
- Gráfico de ganancias por tiempo
- Indicador visual del estado del kit
- Últimas recompensas recibidas
- Contador de puntos acumulados

#### 2. Vista de Red de Referidos
![Network Mockup]

Elementos clave:
- Visualización jerárquica de los 3 niveles
- Filtro por actividad/inactividad
- Información de métricas de cada referido
- Acceso rápido a detalles de cada referido

#### 3. Panel de Administración
![Admin Mockup]

Elementos clave:
- Buscador avanzado de usuarios
- Formulario de registro de compras y kits
- Editor de configuración del sistema
- Reportes y métricas generales

### Implementación de Validaciones

1. **Registro de Usuario**:
   - Email con formato válido y único
   - Validación del código de referido en tiempo real
   - Nombre completo requerido

2. **Registro de Compras**:
   - Verificar campos obligatorios (usuario, monto, tipo)
   - Validación de valores negativos o cero en montos
   - Categorización correcta del tipo de compra

3. **Configuración del Sistema**:
   - Validar que la suma de porcentajes no exceda límites razonables
   - Evitar valores negativos en porcentajes y puntos
   - Confirmación antes de aplicar cambios

### Mejores Prácticas Recomendadas

1. **Seguridad**:
   - Implementar guardias de ruta para controlar acceso
   - Sanitizar todas las entradas de usuario
   - Tokenizar las comunicaciones con el backend (cuando se implemente autenticación)

2. **Rendimiento**:
   - Implementar lazy loading para módulos
   - Utilizar estrategias de caché para datos estáticos
   - Optimizar imágenes y recursos

3. **Experiencia de Usuario**:
   - Implementar estados de carga (loading states)
   - Proporcionar mensajes de error amigables
   - Diseñar para dispositivos móviles primero (mobile-first approach)

4. **Testing**:
   - Pruebas unitarias para servicios críticos
   - Pruebas e2e para flujos importantes como registro y compras
   - Pruebas de integración con mocks del backend

## Arquitectura del Sistema

### Diagrama de Componentes

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Controllers   │◄───►│    Services     │◄───►│  Repositories   │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│     DTOs        │     │     Models      │     │   Database      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         ▲
         │
         │
┌────────┴────────┐
│                 │
│  API Clients    │
│  (Frontend)     │
│                 │
└─────────────────┘
```

### Flujo de Datos Principal

1. Los `Controllers` reciben peticiones HTTP y validan parámetros básicos
2. Los datos se mapean a objetos del dominio en `Services`
3. La lógica de negocio se ejecuta en los `Services`
4. Los `Repositories` manejan la persistencia y recuperación de datos
5. Los resultados se transforman en `DTOs` para la respuesta API

### Patrones de Diseño Implementados

1. **Inyección de Dependencias**: Todas las dependencias se inyectan a través de constructores
2. **Observer**: Para notificar cambios en la configuración de referidos
3. **Repository**: Para abstraer el acceso a datos
4. **DTO**: Para transferir datos entre capas sin exponer detalles de implementación
5. **Facade**: Los servicios actúan como fachadas para operaciones complejas

## Mejores Prácticas para la Integración Frontend-Backend

### Manejo de Estados de Carga

Implementar estados de carga (loading states) para todas las operaciones asíncronas:

```typescript
// Ejemplo de componente con manejo de estado de carga
@Component({
  selector: 'app-referrals',
  template: `
    <ng-container *ngIf="loading">
      <app-spinner></app-spinner>
    </ng-container>
    
    <ng-container *ngIf="!loading && error">
      <app-error [message]="error"></app-error>
    </ng-container>
    
    <ng-container *ngIf="!loading && !error">
      <app-referral-list [referrals]="referrals"></app-referral-list>
    </ng-container>
  `
})
export class ReferralsComponent implements OnInit {
  referrals: ReferralDto[] = [];
  loading = false;
  error: string | null = null;
  
  constructor(private referralService: ReferralService) {}
  
  ngOnInit(): void {
    this.loadReferrals();
  }
  
  loadReferrals(): void {
    this.loading = true;
    this.error = null;
    
    this.referralService.getUserReferrals(this.currentUserCode)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (data) => this.referrals = data.referrals,
        error: (err) => this.error = this.extractErrorMessage(err)
      });
  }
  
  private extractErrorMessage(error: any): string {
    // Extraer mensaje de error de la respuesta API
    return error?.message || 'Error desconocido al cargar referidos';
  }
}
```

### Implementación de Interceptores HTTP

Crear interceptores HTTP para manejar automáticamente errores y tokens:

```typescript
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          const serverError = error.error;
          errorMsg = serverError.message || `Error ${error.status}: ${error.statusText}`;
        }
        
        this.snackBar.open(errorMsg, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
```

### Formulario de Registro Recomendado

```typescript
@Component({
  selector: 'app-register',
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Nombre completo</mat-label>
        <input matInput formControlName="name">
        <mat-error *ngIf="name.invalid && (name.dirty || name.touched)">
          <span *ngIf="name.errors?.['required']">El nombre es obligatorio</span>
          <span *ngIf="name.errors?.['minlength']">El nombre debe tener al menos 2 caracteres</span>
        </mat-error>
      </mat-form-field>
      
      <mat-form-field>
        <mat-label>Correo electrónico</mat-label>
        <input matInput formControlName="email" type="email">
        <mat-error *ngIf="email.invalid && (email.dirty || email.touched)">
          <span *ngIf="email.errors?.['required']">El correo es obligatorio</span>
          <span *ngIf="email.errors?.['email']">Ingrese un correo válido</span>
        </mat-error>
      </mat-form-field>
      
      <mat-form-field>
        <mat-label>Código de referido</mat-label>
        <input matInput formControlName="referredBy">
        <mat-hint *ngIf="referralValid === true">Código válido</mat-hint>
        <mat-error *ngIf="referralValid === false">Código de referido inválido</mat-error>
      </mat-form-field>
      
      <button mat-raised-button color="primary" type="submit" 
              [disabled]="registerForm.invalid || referralValid === false || loading">
        {{ loading ? 'Registrando...' : 'Registrarse' }}
      </button>
    </form>
  `
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  referralValid: boolean | null = null;
  loading = false;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private referralService: ReferralService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      referredBy: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.registerForm.get('referredBy')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(code => {
          if (!code) {
            this.referralValid = null;
            return of(null);
          }
          return this.referralService.validateReferralCode(code);
        })
      )
      .subscribe(isValid => {
        if (isValid !== null) {
          this.referralValid = isValid;
        }
      });
  }
  
  get name() { return this.registerForm.get('name')!; }
  get email() { return this.registerForm.get('email')!; }
  
  onSubmit(): void {
    if (this.registerForm.invalid || this.referralValid !== true) {
      return;
    }
    
    this.loading = true;
    
    const userData: UserDto = {
      ...this.registerForm.value,
      id: undefined,
      referralCode: undefined,
      points: 0,
      totalEarnings: 0
    };
    
    this.userService.registerUser(userData, this.registerForm.value.referredBy)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: user => {
          // Mostrar mensaje de éxito
          this.router.navigate(['/login']);
        },
        error: err => {
          // Mostrar mensaje de error
        }
      });
  }
}
```

## Pruebas del Backend

El backend cuenta con las siguientes pruebas:

### Pruebas Unitarias

Se han implementado pruebas unitarias para los servicios principales con JUnit y Mockito:

```java
@ExtendWith(MockitoExtension.class)
public class ReferralServiceTest {
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PurchaseRepository purchaseRepository;
    
    @Mock
    private ReferralRewardRepository referralRewardRepository;
    
    @Mock
    private ReferralProperties referralProperties;
    
    private ReferralService referralService;
    
    @BeforeEach
    public void setup() {
        // Configuración de mocks
        when(referralProperties.getLevel1Percent()).thenReturn(10);
        when(referralProperties.getLevel2Percent()).thenReturn(8);
        when(referralProperties.getLevel3Percent()).thenReturn(6);
        when(referralProperties.getLevel1Points()).thenReturn(500);
        when(referralProperties.getLevel2Points()).thenReturn(400);
        when(referralProperties.getLevel3Points()).thenReturn(300);
        
        // Inicialización del servicio
        referralService = new ReferralService(
            userRepository, 
            purchaseRepository, 
            referralRewardRepository, 
            referralProperties
        );
    }
    
    @Test
    public void testProcessPurchase_WithValidReferrals_ShouldGenerateRewards() {
        // Test implementation
    }
    
    // Más casos de prueba...
}
```

### Pruebas de Integración

Se recomienda implementar pruebas de integración que verifiquen:

1. Flujo completo de registro y referidos
2. Procesamiento de compras y generación de recompensas
3. Actualización dinámica de la configuración

### Plan de Pruebas Frontend Sugerido

Para el frontend se recomienda implementar:

1. **Pruebas unitarias** para:
   - Servicios de comunicación con API
   - Pipes y filtros personalizados
   - Validadores de formularios

2. **Pruebas de componentes** para:
   - Formularios de registro y compras
   - Visualizaciones de referidos
   - Dashboard y estadísticas

3. **Pruebas e2e** para flujos críticos:
   - Registro de usuario con código de referido
   - Visualización de red de referidos
   - Consulta de recompensas
   - Panel de administración

## Despliegue

### Requisitos del Sistema

- Java 17 o superior
- MySQL 8.0 o superior
- Servidor con al menos 1GB de RAM
- Angular 16+ para el frontend

### Configuración para Producción

Ajustar en `application-prod.properties`:

```properties
# Configuración de Base de Datos
spring.datasource.url=jdbc:mysql://<PROD_DB_HOST>:<PROD_DB_PORT>/tupupila?createDatabaseIfNotExist=true&useSSL=true&serverTimezone=UTC
spring.datasource.username=<PROD_DB_USER>
spring.datasource.password=<PROD_DB_PASSWORD>

# Configuración de JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Configuración del servidor
server.port=8080

# Configuración de seguridad
spring.security.cors.allowed-origins=https://tupupila.com
spring.security.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS

# Configuración de logs
logging.level.root=WARN
logging.level.com.tupupila=INFO
logging.file.name=/var/log/tupupila/application.log
```

### Proceso de Despliegue Recomendado

1. **Compilación**:
   ```bash
   ./mvnw clean package -Pprod
   ```

2. **Ejecución**:
   ```bash
   java -jar target/tupupila-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
   ```

3. **Contenedor Docker** (alternativo):
   ```dockerfile
   FROM openjdk:17-jdk-slim
   COPY target/tupupila-backend-0.0.1-SNAPSHOT.jar app.jar
   ENTRYPOINT ["java", "-jar", "/app.jar", "--spring.profiles.active=prod"]
   ```

### Consideraciones de Escalabilidad

1. **Caché**:
   - Implementar Redis para cachear resultados de consultas frecuentes
   - Cachear en memoria la configuración del sistema

2. **Base de datos**:
   - Considerar particionado para tablas que crecen rápidamente (purchases, referral_rewards)
   - Implementar índices adicionales según patrones de consulta

3. **Monitoreo**:
   - Integrar Prometheus y Grafana para monitoreo en tiempo real
   - Configurar alertas para eventos críticos (errores, latencia alta)

## Próximas Mejoras Recomendadas

1. **Seguridad**:
   - Implementar autenticación JWT
   - Roles de usuario (ADMIN, USER)
   - Protección contra CSRF

2. **Funcionalidades**:
   - Persistencia de configuración en base de datos
   - Exportación de reportes en formatos estándar (PDF, Excel)
   - Notificaciones por email para eventos importantes

3. **Rendimiento**:
   - Implementar paginación en más endpoints
   - Optimización de consultas para grandes volúmenes de datos
   - Caché distribuido para escalabilidad horizontal
