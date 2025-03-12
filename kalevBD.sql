CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(40) NOT NULL
);

CREATE TABLE estilos_aprendizaje (
    id_estilo SERIAL PRIMARY KEY,
    nombre_estilo VARCHAR(40) NOT NULL
);

CREATE TABLE materias (
    id_materia SERIAL PRIMARY KEY,
    nombre_materia VARCHAR(100) NOT NULL
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(40) NOT NULL,
    ap_paterno VARCHAR(40) NOT NULL,
    ap_materno VARCHAR(40),
    correo VARCHAR(60) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) UNIQUE NOT NULL,
    id_rol INT NOT NULL REFERENCES roles(id_rol)
);

CREATE TABLE tutores (
    id_tutor SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario)
);

CREATE TABLE director (
    id_director SERIAL PRIMARY KEY,
    fecha_designacion DATE NOT NULL,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario)
);

CREATE TABLE docentes (
    id_docente SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario)
);

CREATE TABLE grupos (
    id_grupo SERIAL PRIMARY KEY,
    nombre_grupo VARCHAR(40) NOT NULL,
    id_docente INT NOT NULL REFERENCES docentes(id_docente),
    id_director INT NOT NULL REFERENCES director(id_director),
    fecha_creacion DATE NOT NULL,
    grado VARCHAR(40) NOT NULL
);

CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    ap_paterno VARCHAR(40) NOT NULL,
    ap_materno VARCHAR(40),
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(60) UNIQUE NOT NULL,
    telefono VARCHAR(20) UNIQUE NOT NULL,
    id_grupo INT NOT NULL REFERENCES grupos(id_grupo),
    fecha_registro TIMESTAMP NOT NULL
);

CREATE TABLE actividades (
    id_actividad SERIAL PRIMARY KEY,
    nombre_actividad VARCHAR(40) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    id_grupo INT NOT NULL REFERENCES grupos(id_grupo)
);

CREATE TABLE alumno_actividad (
    id_alumno_actividad SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL REFERENCES estudiantes(id_estudiante),
    id_actividad INT NOT NULL REFERENCES actividades(id_actividad),
    id_materia INT NOT NULL REFERENCES materias(id_materia),
    estado VARCHAR(40) NOT NULL,
    calificacion FLOAT NOT NULL
);

CREATE TABLE temas_materia (
    id_tema SERIAL PRIMARY KEY,
    nombre_tema VARCHAR(40) NOT NULL,
    descripcion TEXT NOT NULL,
    id_materia INT NOT NULL REFERENCES materias(id_materia),
    id_estilo INT NOT NULL REFERENCES estilos_aprendizaje(id_estilo)
);

CREATE TABLE estilos_estudiante (
    id_estilo_estudiante SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL REFERENCES estudiantes(id_estudiante),
    kinestesico_estilo FLOAT NOT NULL,
    visual_estilo FLOAT NOT NULL,
    auditivo_estilo FLOAT NOT NULL,
    lecto_escritor_estilo FLOAT NOT NULL
);

CREATE TABLE jugador (
    id_jugador SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL REFERENCES estudiantes(id_estudiante),
    alias VARCHAR(40) NOT NULL
);

CREATE TABLE juego (
    id_juego SERIAL PRIMARY KEY,
    nombre_juego VARCHAR(40) NOT NULL,
    descripcion TEXT NOT NULL,
    id_materia INT NOT NULL REFERENCES materias(id_materia),
    id_estilo INT NOT NULL REFERENCES estilos_aprendizaje(id_estilo)
);

CREATE TABLE metricas (
    id_metrica SERIAL PRIMARY KEY,
    id_juego INT NOT NULL REFERENCES juego(id_juego),
    id_jugador INT NOT NULL REFERENCES jugador(id_jugador),
    puntuacion INT NOT NULL,
    tiempo_empleado TIME,
    fecha_completado DATE NOT NULL,
    intentos INT NOT NULL,
    progreso_porcentaje FLOAT NOT NULL
);

CREATE TABLE clases_juego (
    id_clase_juego SERIAL PRIMARY KEY,
    codigo_juego VARCHAR(40) NOT NULL,
    id_docente INT NOT NULL REFERENCES docentes(id_docente),
    id_juego INT NOT NULL REFERENCES juego(id_juego)
);

CREATE TABLE estrategias_ensenanza (
    id_estrategia SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL,
    estilo_asociado VARCHAR(40) NOT NULL,
    id_tema INT NOT NULL REFERENCES temas_materia(id_tema)
);

CREATE TABLE historial_recomendaciones (
    id_recomendacion SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL REFERENCES estudiantes(id_estudiante),
    id_tema INT NOT NULL REFERENCES temas_materia(id_tema),
    id_estrategia INT NOT NULL REFERENCES estrategias_ensenanza(id_estrategia),
    efectividad FLOAT NOT NULL
);

CREATE TABLE sesiones_juego (
    id_sesion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_juego INT NOT NULL REFERENCES juego(id_juego),
    fecha TIMESTAMP NOT NULL,
    duracion_juego TIME NOT NULL,
    intentos INT NOT NULL,
    monedas_ganadas INT NOT NULL
);

CREATE TABLE tipo_decoracion (
    id_tipo_decoracion SERIAL PRIMARY KEY,
    color VARCHAR(40) NOT NULL,
    forma VARCHAR(40) NOT NULL,
    decoracion_ojos VARCHAR(40) NOT NULL,
    accesorio_cabeza VARCHAR(40) NOT NULL
);

CREATE TABLE item (
    id_item SERIAL PRIMARY KEY,
    id_tipo_decoracion INT NOT NULL REFERENCES tipo_decoracion(id_tipo_decoracion),
    nombre_item VARCHAR(40) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria_items VARCHAR(50) NOT NULL,
    costo_monedas INT NOT NULL
);

CREATE TABLE compras (
    id_compra SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_item INT NOT NULL REFERENCES item(id_item),
    fecha_compra TIMESTAMP NOT NULL,
    cantidad INT NOT NULL,
    costo_total INT NOT NULL
);

CREATE TABLE animal (
    id_animal SERIAL PRIMARY KEY,
    id_jugador INT NOT NULL REFERENCES jugador(id_jugador),
    nombre_animal VARCHAR(40) NOT NULL,
    id_item INT NOT NULL REFERENCES item(id_item)
);