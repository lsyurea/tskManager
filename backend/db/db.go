package db

import (
	"database/sql"
	"fmt"
	"backend/config"
)

func ConnectDB() (*sql.DB, error) {
	user := config.Config[config.POSTGRES_USER]
	database := config.Config[config.POSTGRES_DB]
	host := config.Config[config.POSTGRES_SERVER_HOST]

	connectionString := fmt.Sprintf("postgresql://%s@%s:5432/%s?sslmode=disable", user, database, host)

	db, _ := sql.Open("postgres", connectionString)
	if err := db.Ping(); err != nil {
		return nil, err;
	}
	return db, nil
}