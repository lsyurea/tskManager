package cmd

import (
	"backend/config"
	"backend/api"
)

func main() {
	config.Init()
	api.StartServer()
}