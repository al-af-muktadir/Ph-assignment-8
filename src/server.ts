import { Server } from "http";
import app from "./app";

let server: Server | null = null;

const port = 5000;
// Application bootstrap function
async function bootstrap() {
  try {
    server = app.listen(port, () => {
      console.log(`Application is running on port ${port}!`);
    });
  } catch (error) {
    console.error("Error", error);
  }
}

bootstrap();
