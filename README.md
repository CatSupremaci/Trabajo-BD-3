# Trabajo Fase 3 Bases de datos

1- Requisitos.
- Node 
- Git 
- Npm

2- Primer paso. 

Se debe clonar el repositorio y instalar las dependencias. git clone https://github.com/CatSupremaci/Trabajo-BD.git

3- Construir la base de datos en mysql.

-- Ingresar el siguente codigo para crear y poblar la base de datos:

CREATE DATABASE sistema_tickets;
USE sistema_tickets;

CREATE TABLE USUARIO (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE MODULO (
    modulo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    vigente BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE SEVERIDAD (
    severidad_id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE PRIORIDAD (
    prioridad_id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE TICKET (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    modulo_id INT,
    severidad_id INT,
    prioridad_id INT,
    descripcion_breve VARCHAR(255) NOT NULL,
    descripcion_detallada TEXT,
    estado VARCHAR(100) DEFAULT 'Trabajando en solución',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(usuario_id),
    FOREIGN KEY (modulo_id) REFERENCES MODULO(modulo_id),
    FOREIGN KEY (severidad_id) REFERENCES SEVERIDAD(severidad_id),
    FOREIGN KEY (prioridad_id) REFERENCES PRIORIDAD(prioridad_id)
);

CREATE TABLE HISTORIAL_DEL_MODULO (
    historial_modulo_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES TICKET(ticket_id)
);

CREATE TABLE HISTORIAL_SEVERIDAD (
    historial_severidad_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES TICKET(ticket_id)
);

CREATE TABLE TRANSACCIONES (
    transaccion_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    tipo_transaccion VARCHAR(100) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES TICKET(ticket_id)
);

CREATE TABLE CATEGORIA_DEL_TICKET (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE ARCHIVO (
    archivo_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(255) NOT NULL,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES TICKET(ticket_id)
);

CREATE TABLE COMENTARIO (
    comentario_id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT,
    usuario_id INT,
    contenido TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES TICKET(ticket_id),
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(usuario_id)
);

INSERT INTO USUARIO (nombre, email, password) VALUES 
('Alice Johnson', 'alice@example.com', 'password123'),
('Bob Smith', 'bob@example.com', 'password456'),
('Charlie Brown', 'charlie@example.com', 'password789');

INSERT INTO MODULO (nombre, vigente) VALUES 
('Módulo A', TRUE),
('Módulo B', TRUE),
('Módulo C', FALSE),
('Módulo D', TRUE);

INSERT INTO SEVERIDAD (descripcion) VALUES 
('Alta'),
('Media'),
('Baja');

INSERT INTO PRIORIDAD (descripcion) VALUES 
('Urgente'),
('Alta'),
('Normal'),
('Baja');

INSERT INTO CATEGORIA_DEL_TICKET (nombre) VALUES 
('Soporte Técnico'),
('Mantenimiento'),
('Desarrollo de Software'),
('Actualización de Sistema');


INSERT INTO TICKET (usuario_id, modulo_id, severidad_id, prioridad_id, descripcion_breve, descripcion_detallada, estado) VALUES 
(1, 1, 1, 1, 'Problema crítico en el sistema', 'El sistema ha dejado de responder tras la última actualización.', 'Trabajando en solución'),
(2, 2, 2, 3, 'Error en módulo de pagos', 'El módulo de pagos muestra un error al procesar transacciones.', 'Trabajando en solución'),
(3, 3, 3, 4, 'Solicitud de mejora', 'Se solicita una mejora en la interfaz de usuario.', 'Trabajando en solución');


INSERT INTO HISTORIAL_DEL_MODULO (ticket_id) VALUES 
(1),
(2),
(3);

INSERT INTO HISTORIAL_SEVERIDAD (ticket_id) VALUES 
(1),
(2),
(3);

INSERT INTO TRANSACCIONES (ticket_id, tipo_transaccion) VALUES 
(1, 'Creación de ticket'),
(2, 'Actualización de estado'),
(3, 'Cambio de prioridad');

INSERT INTO ARCHIVO (ticket_id, nombre_archivo, ruta_archivo) VALUES 
(1, 'log_error.txt', '/archivos/logs/log_error.txt'),
(2, 'captura_pantalla.png', '/archivos/capturas/captura_pantalla.png'),
(3, 'reporte_mejora.docx', '/archivos/documentos/reporte_mejora.docx');


INSERT INTO COMENTARIO (ticket_id, usuario_id, contenido) VALUES 
(1, 1, 'Se está trabajando en la solución de este problema.'),
(2, 2, 'El error ha sido replicado y se está analizando.'),
(3, 3, 'Se evaluará la solicitud de mejora en la próxima reunión.');

-- Instalar en VSCode la extencion Mysql, MySQL Syntax, mysql-inline-decorator.

-- Ingresar a Mysql desde el VSCode.

4- Construir Backend.

-- Ingresar a la carpeta que contiene el Backend con el comando `cd trabajo_tickets`.

-- Instalar las siguentes dependencias, `npm i`.

-- Correr el Backend con el comando `node app.js`.

5- Correr Frontend.

-- Instalar la extencion de VSCode "Live server".

-- Ingresar a la carpeta del Frontend y luego dar click derecho y buscar la opcion "Open with live server".