import { app } from "./express";

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => console.log(`Server is lintening on http://localhost:${PORT}`));