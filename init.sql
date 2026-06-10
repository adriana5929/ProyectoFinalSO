CREATE TABLE logs_estres (
    id SERIAL PRIMARY KEY,
    componente VARCHAR(50),
    data_pesada TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO logs_estres (componente, data_pesada)
SELECT 
    'INIT_LOAD',
    repeat(md5(random()::text), 200)
FROM generate_series(1, 100000);

CREATE INDEX idx_ineficiente_estres ON logs_estres (md5(data_pesada));
