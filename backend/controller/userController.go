package controller

import (
	"database/sql"
	"net/http"
)

type Claims struct {
	db.User
	jwt.StandardClaims
}