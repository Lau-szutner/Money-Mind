import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para obtener la ruta absoluta en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargamos el archivo YAML que creamos en la carpeta docs
// Asegúrate de que la ruta apunte correctamente a donde guardaste el swagger.yaml
const swaggerSpec = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

export default swaggerSpec;
