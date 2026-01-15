require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración 
app.use(cors());
app.use(express.json());

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// EL CEREBRO
// Definir la personalidad y reglas de negocio para la rúbrica.

const SYSTEM_INSTRUCTION = `
Eres el "Coordinador de Logística Senior" de Traxión.
Tu misión es estandarizar la planeación de rutas.

Piensa internamente paso a paso, pero NO muestres tu razonamiento.
Devuelve ÚNICAMENTE el JSON solicitado.
NO agregues texto fuera del JSON.

REGLAS DE NEGOCIO:
1. Eficiencia: Si la ocupación del vehículo es < 60%, sugiere consolidar carga o cambiar de unidad.
2. Seguridad: Si el tiempo de conducción > 4 horas, añade una parada obligatoria.
3. Contexto: Si faltan datos, indícalo en recommendations.

ADICIONAL:
Calcula siempre combustible estimado y costo del viaje usando los consumos promedio y un precio de 25 MXN/L.
Si faltan datos, asume:
- Distancia promedio: 500 km
- Peso de carga: 10 toneladas
- Vehículo: según tipo especificado o Tráiler por defecto
No dejes fuel_estimated_liters ni cost_estimated_mxn en 0 o null.


FORMATO DE SALIDA OBLIGATORIO:
{
  "analysis": "Explicación breve para el usuario.",
  "summary": {
    "total_distance_km": 950,
    "estimated_time_hours": 15.8,
    "stops_required": 3,
    "fuel_estimated_liters": null,
    "cost_estimated_mxn": null
  },
  "route_details": [
    { "step": 1, "location": "Origen", "action": "Carga" }
  ],
  "recommendations": [],
  "vehicle_suggested": "Unidad recomendada"
}
`;

app.get('/', (req, res) => res.send('Servidor Traxión AI Online'));

app.post('/api/chat', async (req, res) => {
    try {
        
        const { origen, destino, unidad, peso, capacidad, prioridad } = req.body;
        console.log("Usuario dice:", origen, destino, unidad, peso, capacidad, prioridad);

        // Construir el prompt combinando las reglas con el mensaje del usuario
        const prompt = `${SYSTEM_INSTRUCTION}

            Usuario:
            - Origen: ${origen}
            - Destino: ${destino}
            - Unidad: ${unidad}
            - Peso: ${peso} toneladas
            - Capacidad: ${capacidad} toneladas
            - Prioridad: ${prioridad}

            Respuesta JSON:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Limpiar texto por si la IA pone ```json al principio
        let text = response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '');

        const jsonResponse = JSON.parse(text);
        res.json(jsonResponse);

    } catch (error) {
            console.error("Error con la IA:", error);
            res.status(500).json({ 
            analysis: "Hubo un error conectando con el sistema central.", 
            route_details: [], 
            recommendations: ["Intenta de nuevo"] 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Inteligente corriendo en http://localhost:${PORT}`);
});