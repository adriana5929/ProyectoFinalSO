# Proyecto Final - Sistemas Operativos

## Stress Testing App con Docker, Next.js y PostgreSQL

### Descripción

Este proyecto implementa una aplicación web diseñada para generar cargas de trabajo intensivas sobre los recursos del sistema operativo, permitiendo analizar el comportamiento de CPU, memoria, entrada/salida (I/O) y contenedores Docker bajo condiciones de estrés controladas.

La solución fue desarrollada utilizando:

* Next.js
* Node.js
* PostgreSQL
* Docker
* Docker Compose
* Ubuntu sobre WSL2

---

## Objetivos

* Simular cargas intensivas sobre CPU.
* Simular operaciones pesadas de lectura en base de datos.
* Analizar el comportamiento del sistema operativo.
* Monitorear consumo de recursos mediante herramientas de Linux.
* Aplicar contenedorización utilizando Docker.

---

## Arquitectura del Sistema

```text
┌───────────────────────┐
│ Navegador Web         │
└──────────┬────────────┘
           │ HTTP
           ▼
┌───────────────────────┐
│ Contenedor Next.js    │
│ Stress Testing App    │
└──────────┬────────────┘
           │ PostgreSQL
           ▼
┌───────────────────────┐
│ Contenedor PostgreSQL │
│ Base de Datos         │
└───────────────────────┘
```

---

## Funcionalidades

### Estrés de CPU

Endpoint:

```http
/api/stress-cpu
```

Realiza múltiples operaciones criptográficas utilizando:

```javascript
crypto.pbkdf2Sync()
```

Generando una carga intensiva sobre el procesador.

---

### Estrés de Base de Datos

Endpoint:

```http
/api/stress-db
```

Ejecuta consultas complejas sobre PostgreSQL para generar:

* Alto consumo de CPU
* Uso intensivo de memoria
* Operaciones de lectura sobre disco
* Incremento de I/O

---

## Tecnologías Utilizadas

| Tecnología     | Versión   |
| -------------- | --------- |
| Node.js        | 22        |
| Next.js        | 16        |
| PostgreSQL     | 15        |
| Docker         | Última    |
| Docker Compose | Última    |
| Ubuntu WSL2    | Ubuntu 24 |

---

## Estructura del Proyecto

```text
stress-testing-app/
│
├── Dockerfile
├── docker-compose.yml
├── init.sql
├── package.json
├── README.md
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── stress-cpu/
│   │   │   └── stress-db/
│   │   └── page.js
│   │
│   └── lib/
│       └── db.js
```

---

## Despliegue

### Clonar repositorio

```bash
git clone git@github.com:adriana5929/ProyectoFinalSO.git
cd ProyectoFinalSO
```

### Construir contenedores

```bash
docker compose build
```

### Levantar servicios

```bash
docker compose up -d
```

### Verificar contenedores

```bash
docker ps
```

---

## Acceso a la Aplicación

Abrir en el navegador:

```text
http://localhost:3000
```

---

## Monitoreo de Recursos

### Docker Stats

```bash
docker stats
```

Permite observar:

* CPU
* Memoria
* Red
* I/O

---

### HTOP

```bash
htop
```

Permite visualizar:

* Procesos activos
* Consumo de CPU
* Consumo de RAM
* Hilos de ejecución

---

### VMSTAT

```bash
vmstat 1
```

Permite monitorear:

* Memoria
* Paginación
* Entrada/Salida
* Procesos

---

## Evidencias

### Interfaz Principal

Agregar captura de pantalla aquí.

### Monitoreo Docker

Agregar captura de docker stats.

### Monitoreo HTOP

Agregar captura de htop.

### Monitoreo VMSTAT

Agregar captura de vmstat.

---

## Resultados Obtenidos

Durante las pruebas se observó:

* Incremento significativo del uso de CPU durante las pruebas criptográficas.
* Aumento de operaciones de lectura sobre PostgreSQL.
* Uso controlado de recursos mediante Docker.
* Correcto funcionamiento de la aplicación bajo cargas concurrentes.

---

## Autor

Adriana Milena Noscue Dagua

Sebastian Cucalon Astorquiza

Proyecto Final – Sistemas Operativos - 
Universidad del valle - 
2026

