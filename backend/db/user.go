package db

import (
	"database/sql"

	"golang.org/x/crypto/bcrypt"
)

type ResetPassword struct {
	ID int `json:"id"`
	Password string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type Login struct {
	Password string `json:"password"`
	Email string `json:"email"`
}
type User struct {
	ID int `json:"id"`
	Email string `json:"email"`
	Password string `json:"password"`
	Name string `json:"name"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}

func (user *User) UserExists(dbConn *sql.DB) bool {
	rows, err := dbConn.Query(GetUserByEmailQuery, user.Email)
	if err != nil || !rows.Next() {
		return false
	}

	return true
}

func (user *User) HashPassword() error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return err
	}
	user.Password = string(bytes)
	return nil
}