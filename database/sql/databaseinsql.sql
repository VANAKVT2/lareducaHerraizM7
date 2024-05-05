-- Creación de tablas
CREATE TABLE Tareas (
    id_entrega INTEGER PRIMARY KEY AUTOINCREMENT,
    id_curso INTEGER,
    nombre_entrega VARCHAR,
    puntuacion_maxima INTEGER CHECK (puntuacion_maxima >= 0 AND puntuacion_maxima <= 100),
    fecha_inicio DATE,
    fecha_final DATE,
    parcial_entrega INTEGER CHECK (parcial_entrega IN (1, 2, 3)),
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
);

CREATE TABLE Cursos (
    id_curso INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_curso VARCHAR,
    id_profesor INTEGER,
    FOREIGN KEY (id_profesor) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Participacion (
    id_usuario INTEGER,
    id_curso INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
);

CREATE TABLE Usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_usuario VARCHAR,
    apellidos_usuario VARCHAR,
    tipo_usuario INTEGER,
    FOREIGN KEY (tipo_usuario) REFERENCES TiposUsuario(id_tipo)
);

CREATE TABLE TiposUsuario (
    id_tipo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_tipo VARCHAR
);

CREATE TABLE Notas (
    id_usuario INTEGER,
    id_curso INTEGER,
    nota_parcial_1 INTEGER,
    nota_parcial_2 INTEGER,
    nota_parcial_3 INTEGER,
    nota_final INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
);

CREATE TABLE TareasEntregadas (
    id_entrega INTEGER,
    id_curso INTEGER,
    correccion BOOLEAN DEFAULT false,
    nota INTEGER,
    fecha_entrega DATE,
    a_tiempo BOOLEAN DEFAULT true,
    FOREIGN KEY (id_entrega) REFERENCES Tareas(id_entrega),
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
);