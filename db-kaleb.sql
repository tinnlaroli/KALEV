CREATE TABLE roles (
    id_rol SERIAL,
    nombre_rol VARCHAR(40) NOT NULL,
    PRIMARY KEY (id_rol)
);

CREATE TABLE estilos_aprendizaje (
    id_estilo SERIAL,
    nombre_estilo VARCHAR(40) NOT NULL,
    PRIMARY KEY (id_estilo)
);

CREATE TABLE materias (
    id_materia SERIAL,
    nombre_materia VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_materia)
);

CREATE TABLE usuarios (
    id_usuario SERIAL,
    nombre_usuario VARCHAR(40) NOT NULL,
    ap_paterno VARCHAR(40) NOT NULL,
    ap_materno VARCHAR(40),
    correo VARCHAR(60) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) UNIQUE NOT NULL,  -- Cambio: se amplió el tamaño a VARCHAR(20) para admitir formatos internacionales de teléfono
    id_rol INT NOT NULL,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE tutores (
    id_tutor SERIAL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id_tutor),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE director (
    id_director SERIAL,
    fecha_designacion DATE NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id_director),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE docentes (
    id_docente SERIAL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id_docente),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE grupos (
    id_grupo SERIAL,
    nombre_grupo VARCHAR(40) NOT NULL,
    id_docente INT NOT NULL,
    id_director INT NOT NULL,
    fecha_creacion DATE NOT NULL,
    grado VARCHAR(40) NOT NULL,
    PRIMARY KEY (id_grupo),
    FOREIGN KEY (id_docente) REFERENCES docentes(id_docente),
    FOREIGN KEY (id_director) REFERENCES director(id_director)
);

CREATE TABLE estudiantes (
    id_estudiante SERIAL,
    nombre VARCHAR(40) NOT NULL,
    ap_paterno VARCHAR(40) NOT NULL,
    ap_materno VARCHAR(40),
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(60) UNIQUE NOT NULL,
    telefono VARCHAR(20) UNIQUE NOT NULL,  -- Cambio: se amplió el tamaño a VARCHAR(20) para admitir formatos internacionales de teléfono
    id_grupo INT NOT NULL,
    fecha_registro TIMESTAMP NOT NULL,
    PRIMARY KEY (id_estudiante),
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo)
);

CREATE TABLE actividades (
    id_actividad SERIAL,
    nombre_actividad VARCHAR(40) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    id_grupo INT NOT NULL,
    PRIMARY KEY (id_actividad),
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo)
);

CREATE TABLE alumno_actividad (
    id_alumno_actividad SERIAL,
    id_estudiante INT NOT NULL,
    id_actividad INT NOT NULL,
    id_materia INT NOT NULL,
    estado VARCHAR(40) NOT NULL,
    calificacion FLOAT NOT NULL,
    PRIMARY KEY (id_alumno_actividad),
    FOREIGN KEY (id_actividad) REFERENCES actividades(id_actividad),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
    FOREIGN KEY (id_materia) REFERENCES materias(id_materia)
);

CREATE TABLE temas_materia (
    id_tema SERIAL,
    nombre_tema VARCHAR(40) NOT NULL,
    descripcion TEXT NOT NULL,
    id_materia INT NOT NULL,
    id_estilo INT NOT NULL,
    PRIMARY KEY (id_tema),
    FOREIGN KEY (id_materia) REFERENCES materias(id_materia),
    FOREIGN KEY (id_estilo) REFERENCES estilos_aprendizaje(id_estilo)
);

CREATE TABLE estilos_estudiante (
    id_estilo_estudiante SERIAL,
    id_estudiante INT NOT NULL,
    kinestesico_estilo FLOAT NOT NULL,
    visual_estilo FLOAT NOT NULL,
    auditivo_estilo FLOAT NOT NULL,
    lecto_escritor_estilo FLOAT NOT NULL,
    PRIMARY KEY (id_estilo_estudiante),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante)
);

CREATE TABLE jugador (
    id_jugador SERIAL,
    id_estudiante INT NOT NULL,
    alias VARCHAR(40) NOT NULL,
    PRIMARY KEY (id_jugador),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante)
);

CREATE TABLE juego (
    id_juego SERIAL,
    nombre_juego VARCHAR(40) NOT NULL,
    descripcion TEXT NOT NULL,
    id_materia INT NOT NULL,
    id_estilo INT NOT NULL,
    PRIMARY KEY (id_juego),
    FOREIGN KEY (id_materia) REFERENCES materias(id_materia),
    FOREIGN KEY (id_estilo) REFERENCES estilos_aprendizaje(id_estilo)
);

CREATE TABLE metricas (
    id_metrica SERIAL,
    id_juego INT NOT NULL,
    id_jugador INT NOT NULL,
    puntuacion INT NOT NULL,
    tiempo_empleado INTERVAL,  -- Cambio: se cambió de TIME a INTERVAL para medir tiempos de forma más flexible
    fecha_completado DATE NOT NULL,
    intentos INT NOT NULL,
    progreso_porcentaje FLOAT NOT NULL,
    PRIMARY KEY (id_metrica),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego)
);

CREATE TABLE clases_juego (
    id_clase_juego SERIAL,
    codigo_juego VARCHAR(40) NOT NULL,
    id_docente INT NOT NULL,
    id_juego INT NOT NULL,
    PRIMARY KEY (id_clase_juego),
    FOREIGN KEY (id_docente) REFERENCES docentes(id_docente),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego)
);

CREATE TABLE estrategias_ensenanza (
    id_estrategia SERIAL,
    descripcion TEXT NOT NULL,
    estilo_asociado VARCHAR(40) NOT NULL,
    id_tema INT NOT NULL,
    PRIMARY KEY (id_estrategia),
    FOREIGN KEY (id_tema) REFERENCES temas_materia(id_tema)
);

CREATE TABLE historial_recomendaciones (
    id_recomendacion SERIAL,
    id_estudiante INT NOT NULL,
    id_tema INT NOT NULL,
    id_estrategia INT NOT NULL,
    efectividad FLOAT NOT NULL,
    PRIMARY KEY (id_recomendacion),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
    FOREIGN KEY (id_tema) REFERENCES temas_materia(id_tema),
    FOREIGN KEY (id_estrategia) REFERENCES estrategias_ensenanza(id_estrategia)  -- Cambio: corregido error tipográfico de 'estrategias_ensenanza' a 'estrategias_enseñanza'
);

CREATE TABLE sesiones_juego (
    id_sesion SERIAL,
    id_usuario INT NOT NULL,
    id_juego INT NOT NULL,
    fecha TIMESTAMP NOT NULL,
    duracion_juego INTERVAL NOT NULL,  -- Cambio: se cambió de INT a INTERVAL para usar una unidad de tiempo más precisa y flexible
    intentos INT NOT NULL,
    monedas_ganadas INT NOT NULL,
    PRIMARY KEY (id_sesion),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego)
);

CREATE TABLE item (
    id_item SERIAL,
    nombre_item VARCHAR(40) NOT NULL,
    categoria_items VARCHAR(50) NOT NULL,
    color VARCHAR(40),
    formas_manchas VARCHAR(40),
    decoracion_ojos VARCHAR(40),
    accesorio_cabeza VARCHAR(40),
    costo_monedas INT NOT NULL,
    PRIMARY KEY (id_item)
);

CREATE TABLE compras (
    id_compra SERIAL,
    id_usuario INT NOT NULL,
    id_item INT NOT NULL,
    fecha_compra TIMESTAMP NOT NULL,
    cantidad INT NOT NULL,
    costo_total INT NOT NULL,
    PRIMARY KEY (id_compra),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_item) REFERENCES item(id_item)
);

CREATE TABLE animal (
    id_animal SERIAL,
    id_jugador INT NOT NULL,
    nombre_animal VARCHAR(40) NOT NULL,
    id_item INT NOT NULL,
    PRIMARY KEY (id_animal),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id_jugador),
    FOREIGN KEY (id_item) REFERENCES item(id_item)
);
