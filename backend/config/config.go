package config

import (
	"os"
	"path/filepath"

	"github.com/apex/log"
	"github.com/joho/godotenv"
)

const (
	POSTGRES_USER = "POSTGRES_USER"
	POSTGRESS_PASSWORD = "POSTGRESS_PASSWORD"
	POSTGRES_DB = "POSTGRES_DB"
	CLIENT_URL = "CLIENT_URL"
	SERVER_PORT = "SERVER_PORT"
	JWT_KEY = "JWT_KEY"
	RUN_MIGRATIONS = "RUN_MIGRATIONS"
	POSTGRES_SERVER_HOST = "POSTGRES_SERVER_HOST"
	ENVIROMENT = "ENVIROMENT"
)

type ConfigType map[string]string

var Config = ConfigType{
	POSTGRES_USER: "",
	POSTGRESS_PASSWORD: "",
	POSTGRES_DB: "",
	CLIENT_URL: "",
	SERVER_PORT: "",
	JWT_KEY: "",
	RUN_MIGRATIONS: "",
	POSTGRES_SERVER_HOST: "localhost",
}

func Init() {
	env, exists := os.LookupEnv(ENVIROMENT)
	var envFilePath string
	if exists && env == "test" {
		envFilePath, _ = filepath.Abs("../.env.test")
	} else {
		envFilePath, _ = filepath.Abs("../.env")
	}
	
	if err := godotenv.Load(envFilePath); err != nil {
		log.WithField("reason", err.Error()).Fatal("Error loading .env file")
	}

	required := map[string]bool{
		POSTGRES_USER: true,
		POSTGRESS_PASSWORD: true,
		POSTGRES_DB: true,
		CLIENT_URL: true,
		SERVER_PORT: true,
		RUN_MIGRATIONS: true,
	}

	for key := range Config {
		value, exists := os.LookupEnv(key)
		if !exists && required[key] {
			log.WithField("key", key).Fatal("Missing required configuration")
		}
		Config[key] = value
	}

	log.Info("Configuration loaded")
}