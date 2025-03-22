# Subir Datos
Descripción de la aplicación:
Esta aplicacion cumple con la fución de agregar negocios,tags y productos a una base de datos de firebase

## Instalación

### 1. Instalar Node.js y npm

- Descarga e instala Node.js (incluye npm) desde la [página oficial de Node.js](https://nodejs.org/).  
- Sigue las instrucciones específicas para Windows.

### 2. Descargar el proyecto

- Una vez instalado Node.js, descarga el archivo del proyecto haciendo clic en el botón verde `code` o `codigo` el repositorio desde GitHub.

### 3. Desempaquetar el proyecto

- Si el archivo descargado está comprimido (por ejemplo, en formato ZIP), descomprímelo en la ubicación que prefiera.

### 4. Instalar las dependencias

- Abre **PowerShell** y navega hasta la carpeta raíz del proyecto.<br><br> Puedes hacerlo con el comando (reemplaze `<ruta>` por la ubicacion de la carpeta:
  ```powershell
  cd <ruta>
  ```
- Ejecuta el siguiente comando para instalar las dependencias (dentro de la carpeta de `subir-datos\app`):
  ```powershell
  npm install
  ```

### 5. Ejecutar la aplicación

- Desde la misma ventana de **PowerShell**, inicia la aplicación en modo desarrollo con el comando:
  ```powershell
  npm run dev
  ```
- La aplicación se iniciará y podrás ver los cambios en tiempo real.

# Manual de uso
1. Cuando presione seleccionar archivo, seleccione el archivo `.xlsx` con el sus negocios/productos/tags<br><br>
Cabe a destacar que para hacer esto, el archivo debe tener un formato especifico, hay un archivo de ejemplo en la carpeta de `subir-datos` <br>
A continuacion al explicacion de cada columna:
## business
Aqui iran sus negocios
- firebaseUserId: este va ser igual al nombre del negocio
- name: nombre del negocio
- canton: canton
- cellPhone: numero de telefono
- currentLocation: este campo, es la latitud y longitud de donde se encuentra el negocio;
aqui hay un ejemplo del formato 
```
{latitude: 9.9336, longitude: -84.0800}
```
- description: descripcion del negocio
- distrito: distrito
- email: correlo electronico
- otherDirections: direcciones mas naturales "a la par de banco XYZ"
- provincia: provincia
- tagIds: tags del negocio, estas deben de tener exactamente el mismo nombre que como estan en la hoja de tags, cada una debe ir en una linea diferente y sin dejar espacios<br>
ejemplo:
```
Frutas
Verduras
Vegetales
```
- userStatus: pongalo en Accepted
- contacts: aqui hay contactos aparte del negocio, como pagina web o facebook<br>
cada contacto diferente debe ir en una linea diferente y sin dejar espacios<br>
Formato:
```
{contactType: <tipo de contacto>, contactUrl: <link>}
```
\<tipo de contacto\> solo puede tener uno de los siguientes valores (incluyendo '')<br>
1. 'Facebook'
2. 'Instagram'
3. 'Website'
4. 'Other Phone'
5. 'Fax'

- profilePhoto: no poner nada (por el momento)
- lastUpdate: no poner nada
- created: no poner nada
- fcmToken: no poner nada
 ## product
Aqui iran sus productos
- businessId: nombre del negocio al que pertenece
-cost: costo (solo numero sin comas)
-tags: tags del producto, estas deben de tener exactamente el mismo nombre que como estan en la hoja de tags, cada una debe ir en una linea diferente y sin dejar espacios<br>
ejemplo:
```
Dulce
Amargo
Salado
```
-name: nombre del producto
-description: descripcion
-amountAvailable: cuantos hay disponibles (solo numero)
-productPhoto: no poner nada (por el momento)
-created:  no poner nada
- lastUpdate:  no poner nada

## tags
- name: nombre de la tag
- description: descripcion de la tag

