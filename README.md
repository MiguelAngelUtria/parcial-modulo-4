# 📊 Módulo 4: Frontend de Estadísticas (Acortador de URLs)

Este repositorio contiene el código fuente y la infraestructura como código (IaC) para el **Módulo 4** del proyecto Acortador de URLs. Este módulo es responsable de visualizar las métricas de uso de los enlaces acortados.

## 🚀 Tecnologías

* **Frontend:** React + Vite
* **Gráficas:** Chart.js
* **Infraestructura:** Terraform (AWS S3 + CloudFront)
* **CI/CD:** GitHub Actions
* **Región AWS:** us-west-1 (California)

## 🌐 Arquitectura

El frontend se aloja en un bucket de **S3** y se distribuye globalmente mediante **CloudFront** para garantizar baja latencia y soporte HTTPS. Cada vez que se hace un push a la rama `main`, GitHub Actions construye el proyecto y actualiza los archivos en S3, invalidando la caché de CloudFront automáticamente.

## 🛠️ Cómo ejecutar en local

1.  Clonar el repositorio.
2.  Entrar a la carpeta del frontend:
    ```bash
    cd frontend
    ```
3.  Instalar dependencias:
    ```bash
    npm install
    ```
4.  Correr el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## ☁️ Infraestructura (Terraform)

La infraestructura se encuentra en la carpeta `/terraform`.

* **Bucket S3:** Almacenamiento estático web.
* **CloudFront:** CDN para distribución y caché.
* **Políticas:** Configuración de acceso público para lectura.

Para desplegar (requiere credenciales de AWS):
```bash
cd terraform
terraform init
terraform apply

## 🔗 Enlace de Producción
👉 **https://doj6evm42x5g8.cloudfront.net**