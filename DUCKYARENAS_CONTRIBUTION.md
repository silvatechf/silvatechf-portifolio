# Contribución individual: DuckyShop y DuckyBank

## Contexto

DuckyArenas es un proyecto académico desarrollado en equipo. Mi contribución se centra en componentes backend de la tienda virtual (DuckyShop) y la economía interna (DuckyBank). Este documento delimita mi ámbito de trabajo y no atribuye a una sola persona el proyecto completo.

## DuckyBank

- Modelo de cartera asociado al usuario.
- Registro de transacciones e historial de movimientos.
- Operaciones de crédito y débito con validaciones de saldo.
- Claves de idempotencia para reconocer operaciones repetidas.
- Restricciones de integridad para proteger la consistencia de los datos.

## DuckyShop

- Modelos de catálogo y compras.
- Validación de artículos, precios, cantidades y disponibilidad.
- Coordinación del flujo de compra con el débito de DuckyCoins.
- Integración con los servicios de entrega de artículos.
- Gestión de reintentos y conflictos de idempotencia.
- Coordinación mediante transacciones de base de datos.

## Aspectos técnicos

La implementación utiliza servicios de Django y transacciones de base de datos para coordinar las compras y los movimientos de saldo. La idempotencia ayuda a evitar duplicaciones no deseadas cuando se repite una solicitud. La atomicidad depende de que los componentes involucrados compartan la misma base de datos y respeten los límites transaccionales definidos.

## Evidencias

- [PR #87 — Implementación inicial de Bank y Shop](https://github.com/Martret92/duckyarenas-team5/pull/87), integrado en `develop`.
- [PR #122 — Pruebas de idempotencia de Shop y Bank](https://github.com/Martret92/duckyarenas-team5/pull/122), que debe consultarse por separado para comprobar su estado actual. En el momento de redactar este documento estaba abierto y pendiente de revisión.

El PR #122 se presenta como evidencia de trabajo en revisión, no como una integración completada.

## Alcance y limitaciones

Esta contribución cubre componentes Bank y Shop dentro del proyecto colectivo. No implica que todas las decisiones de integración de la economía global estén cerradas ni que toda la arquitectura del producto sea responsabilidad individual. La documentación oficial del equipo sigue siendo la fuente de verdad para el estado global del proyecto.

Este documento resume la contribución y las evidencias disponibles en los PR; no afirma que todos los cambios estén integrados en `main`.

## Competencias demostradas

Python, Django, modelado de datos, reglas de negocio, transacciones, idempotencia y pruebas de backend en un entorno de desarrollo colaborativo.

> Documento de portafolio personal sobre una contribución académica individual. No sustituye la documentación oficial de DuckyArenas.
