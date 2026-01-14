require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración para recibir JSON y hablar con el Frontend
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('✅ Servidor Traxión LOGISTICS activo');
});

// Ruta del Agente (Aquí conectarás la IA mañana)
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    
  // Simulamos una respuesta rápida para que tu equipo de Frontend pueda trabajar
    res.json({
        reply: "Hola, soy el Agente Traxión. Estoy analizando tu ruta...",
        data: {
            alert: "Ruta segura calculada",
            steps: ["Origen", "Punto A", "Destino"]
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});