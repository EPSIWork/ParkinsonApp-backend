import express from "express";
import redocExpress from "redoc-express";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./infrastructure/api/swagger";
import cors from "cors";
import { config } from "./config/config";
import UserRouter from "./infrastructure/api/routes/user.routes";
import FamilyMemberRouter from "./infrastructure/api/routes/familyMember.routes";


const app = express();
const port = config.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(cors());
app.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpecs);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api/users", UserRouter);
app.use("/api/familyMember", FamilyMemberRouter);

// Serve ReDoc
app.use("/", redocExpress({
  title: 'Parkinson Redoc',
  specUrl: '/api-docs.json'
}));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
