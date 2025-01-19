---Pasu-----
USE Pasu
---Tables---
-- Crear tabla Personas
CREATE TABLE Personas (
    id_persona INT PRIMARY KEY IDENTITY(100,1),
    nombre1 VARCHAR(50) NOT NULL,
    nombre2 VARCHAR(50) NULL,
    apellido1 VARCHAR(50) NOT NULL,
    apellido2 VARCHAR(50) NULL,
    celular VARCHAR(15) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL
)

Select * from Personas
SELECT * FROM Personas WHERE usuario = 'diego123'
update Personas set contrasena = '12345' where id_persona = 104
delete Personas where id_persona in (105, 106)