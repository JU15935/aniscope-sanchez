# AniScope

**Estudiante:** Juan Miguel Sánchez Chaverra 
**Fecha:** 17 de abril de 2026

## Decisiones arquitectónicas

Se siguió una arquitectura modular por dominio (`core/`, `design/`, `modules/`) para separar claramente las responsabilidades: la capa `core` centraliza la configuración de API y estado global, `design` contiene componentes reutilizables sin lógica de negocio, y `modules` encapsula cada dominio con sus propios tipos, servicios y hooks. Esta separación permite escalar el proyecto añadiendo nuevos módulos sin tocar código existente.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

## Decisiones técnicas relevantes

- **Axios + interceptor**: toda instancia HTTP pasa por `api-client.ts`, que convierte errores HTTP en mensajes legibles. Ningún componente llama a `fetch` directamente.
- **Zod en el service**: la validación ocurre en `anime.service.ts` antes de retornar datos. TypeScript solo garantiza tipos en compilación; Zod garantiza la forma real de la respuesta en runtime.
- **TanStack Query**: `staleTime` de 2 minutos y `retry: 1` para respetar el rate limit de 3 req/s de Jikan. `keepPreviousData` en el listado evita parpadeos al paginar.
- **useDebounce en `core/hooks`**: es un hook genérico sin dependencia de ningún módulo, por eso vive en `core` y no en `modules/anime`.
- **localStorage en `useEffect`**: escribir en el handler sincrónico podría causar inconsistencias si React re-renderiza antes de completar la actualización. El `useEffect` observa `favorites` y escribe solo después de que el estado está confirmado.