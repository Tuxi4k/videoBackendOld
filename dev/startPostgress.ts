import EmbeddedPostgres from "embedded-postgres";
import { existsSync } from "fs";

(async () => {
  try {
    const dbDir = "./.postgres";

    const isInitialized = existsSync(dbDir);

    const pg = new EmbeddedPostgres({
      databaseDir: dbDir,
      user: "postgres",
      password: "password",
      port: 5432,
      persistent: true,
      initdbFlags: ["--locale=en_US.UTF-8", "--encoding=UTF8"],
      onLog: (message) => console.log("📝 PostgreSQL Log:", message),
      onError: (err) => console.error("❌ PostgreSQL Error:", err),
    });
    
    if (!isInitialized) {
      await pg.initialise();
    }

    console.log("🚀 Starting PostgreSQL...");
    await pg.start();

    if (!isInitialized) {
      await pg.createDatabase("videoControlDev");
    }

    console.log("✅ Embedded PostgreSQL ready!");
    console.log(
      "🔗 URL: postgresql://postgres:password@localhost:5432/videoControlDev"
    );

    
    process.on("SIGINT", async () => {
      console.log("\n🛑 Shutting down PostgreSQL...");
      await pg.stop();
      process.exit(0);
    });


    await new Promise(() => {});
  } catch (error) {
    console.error("❌ Failed to start PostgreSQL:", error);

    
    if (error instanceof Error && error.message.includes("already exists")) {
      console.log(
        "🔄 Database already exists, trying to start without initialization..."
      );
    }

    process.exit(1);
  }
})();
