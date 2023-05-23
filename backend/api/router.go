package api

import (
	"database/sql"
	"backend/config"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

func WithDB(fn func(c *fiber.Ctx, db *sql.DB) error, db *sql.DB) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return fn(c, db)
	}
}

func httpServer(db *sql.DB) *fiber.App {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(requestid.New())

	apiObj := app.Group("/api")
	apiObj.Use(cors.New(cors.Config{
		AllowOrigins:     config.Config[config.CLIENT_URL],
		AllowCredentials: true,
		AllowHeaders:     "Content-Type, Content-Length, Accept-Encoding, Authorization, accept, origin",
		AllowMethods:     "POST, OPTIONS, GET, PUT",
		ExposeHeaders:    "Set-Cookie",
	}))

	// api endpoints rest api to integrate to frontend login page

	apiObj.Post("/login", WithDB(Login, db))
	apiObj.Post("/register", WithDB(CreateUser, db))
	apiObj.Get("/logout", Logout)

	// authed routes
	apiObj.Get("/session", AuthorizeSession, WithDB(Session, db))

	return app
}