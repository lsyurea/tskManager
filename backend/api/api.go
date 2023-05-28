package api

import (
	"github.com/apex/log"
	"github.com/gofiber/fiber/v2"
	"backend/config"
	"backend/db"
)

var server *fiber.App

func StartServer() {
	
	conn, err := db.ConnectDB()
	if err != nil {
		log.WithField("reason", err.Error()).Fatal("Db connection error occurred")
	}
	defer conn.Close()

	port := config.Config[config.SERVER_PORT]


	server = httpServer(conn)
	serverErr := server.Listen(port)
	if serverErr != nil {
		log.WithField("reason", serverErr.Error()).Fatal("Server error")
	}
}

func StopServer() {
	if server != nil {
		err := server.Shutdown()
		if err != nil {
			log.WithField("reason", err.Error()).Fatal("Shutdown server error")
		}
	}
}