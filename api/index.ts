import express, { json, urlencoded } from "express";
import swaggerUi from "swagger-ui-express";
import pingController from "./controllers/ping";
import analyticController from "./controllers/analytic-data";
import swaggerDocument from "./swagger-output.json";
import env from "./env";

export const app = express();

async function startServer() {

  console.log("env", env.PROPERTY_ID, env.PORT);

  // Use body parser to read sent json payloads
  app.use(
    urlencoded({
      extended: true,
    }),
  );
  app.use(json());

  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  const port = env.PORT || 3000;
  // [START routes]
  app.use(pingController);
  app.use(analyticController);
  // [END routes]
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
  });
}

startServer();
